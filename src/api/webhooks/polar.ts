import express from 'express';
import { Webhook, WebhookEvent } from 'svix';
import { Request, Response } from 'express';

// Define an augmented Request type to include the rawBody property
interface AugmentedRequest extends Request {
    rawBody?: Buffer;
}

// Create an Express Router for Polar webhooks
const polarWebhookRouter = express.Router();

// This middleware is crucial for Svix verification.
// It ensures that the raw request body is available for signature verification.
// It must be applied specifically to webhook routes *before* any other body parsers
// that might consume or alter the raw body (like `express.json()` without the `verify` option).
// We apply it here only to the specific webhook path.
polarWebhookRouter.use('/webhooks/polar', express.json({
    // Store the raw body buffer on the request object for Svix verification
    verify: (req: AugmentedRequest, res: Response, buf: Buffer) => {
        req.rawBody = buf;
    }
}));

polarWebhookRouter.post('/webhooks/polar', async (req: AugmentedRequest, res: Response) => {
    // 1. Get headers required by our platform's standard webhook verification (as per core lessons)
    // The Svix library internally expects 'svix-id', 'svix-timestamp', 'svix-signature',
    // but our platform standard dictates these headers come in as 'webhook-id', etc.
    const webhookId = req.header('webhook-id');
    const webhookTimestamp = req.header('webhook-timestamp');
    const webhookSignature = req.header('webhook-signature');

    // 2. Validate presence of required webhook headers
    if (!webhookId || !webhookTimestamp || !webhookSignature) {
        // In a production environment, use a dedicated logger (e.g., logger.warn)
        return res.status(400).send('Missing required webhook headers (webhook-id, webhook-timestamp, webhook-signature)');
    }

    // 3. Ensure the webhook secret is configured
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
        // This configuration error should ideally be caught at application startup.
        // Returning 500 here to indicate a server-side configuration issue.
        // In a production environment, use a dedicated logger (e.error)
        return res.status(500).send('Webhook secret not configured for Polar.sh integration.');
    }

    // 4. Ensure rawBody is available for verification
    if (!req.rawBody) {
        // This indicates a misconfiguration of the `express.json` middleware
        // where the `verify` function was not properly applied to this route.
        // In a production environment, use a dedicated logger (e.error)
        return res.status(500).send('Raw body not available for webhook verification. Check middleware configuration.');
    }

    // 5. Initialize Svix with the secret
    const wh = new Webhook(webhookSecret);

    let event: WebhookEvent;
    try {
        // 6. Verify the webhook payload and signature using the Svix library.
        // The raw body (`req.rawBody.toString()`) is essential here,
        // as Svix computes the signature based on the exact raw string.
        // We map our platform's standard header names to what the Svix library expects.
        event = wh.verify(req.rawBody.toString(), {
            'svix-id': webhookId,
            'svix-timestamp': webhookTimestamp,
            'svix-signature': webhookSignature,
        }) as WebhookEvent; // Type assertion for convenience
    } catch (err) {
        // Log the error internally for debugging, but return a generic 400 to the client
        // to avoid exposing too much information about the verification failure.
        // In a production environment, use a dedicated logger (e.g., logger.error)
        if (err instanceof Error) {
            // logger.error(`Polar webhook verification failed: ${err.message}`, { webhookId, webhookTimestamp });
        }
        return res.status(400).send('Webhook verification failed.');
    }

    // 7. Process the verified event based on its type
    try {
        switch (event.type) {
            case 'issue.pledged':
            case 'issue.funded': {
                interface IssueEventPayload {
                    issue: { id: string; repository: { name: string; organization: { name: string; }; }; };
                    pledge: { id: string; amount: { amount: number; currency: string; }; };
                }
                const payload = event.data as IssueEventPayload; // Type assertion

                // TODO: Implement business logic for when an issue receives a pledge or is funded.
                // This typically involves updating your database or notifying internal systems.
                // Example:
                // await databaseService.updateIssuePledgeStatus(payload.issue.id, event.type, payload.pledge.amount.amount, payload.pledge.amount.currency);
                // await notificationService.sendPledgeNotification(payload.issue.id, payload.pledge.amount);
                // logger.info(`Processed Polar event: ${event.type} for issue ${payload.issue.id}`);

                break;
            }
            case 'subscription.created': {
                interface SubscriptionCreatedPayload {
                    subscription: { id: string; user_id: string; tier_id: string; };
                    user: { id: string; email: string; };
                    tier: { id: string; name: string; };
                }
                const payload = event.data as SubscriptionCreatedPayload; // Type assertion

                // TODO: Implement business logic for new subscriptions.
                // This might involve creating a new subscription record in your database,
                // granting user access to premium features, etc.
                // Example:
                // await databaseService.createSubscription(payload.subscription.id, payload.user.id, payload.tier.id);
                // await userService.grantPremiumAccess(payload.user.id, payload.tier.id);
                // logger.info(`Processed Polar event: ${event.type} for user ${payload.user.id}`);

                break;
            }
            case 'subscription.tier.upgraded': {
                interface SubscriptionUpgradedPayload {
                    subscription: { id: string; user_id: string; tier_id: string; };
                    user: { id: string; email: string; };
                    tier: { id: string; name: string; }; // New tier
                    previous_tier: { id: string; name: string; }; // Previous tier
                }
                const payload = event.data as SubscriptionUpgradedPayload;

                // TODO: Implement logic for subscription tier upgrades (e.g., update user permissions)
                // logger.info(`Processed Polar event: ${event.type} for user ${payload.user.id}, upgraded to ${payload.tier.name}`);
                break;
            }
            case 'subscription.cancelled': {
                interface SubscriptionCancelledPayload {
                    subscription: { id: string; user_id: string; tier_id: string; };
                    user: { id: string; email: string; };
                    tier: { id: string; name: string; };
                }
                const payload = event.data as SubscriptionCancelledPayload;

                // TODO: Implement logic for subscription cancellation (e.g., revoke premium access)
                // logger.info(`Processed Polar event: ${event.type} for user ${payload.user.id}`);
                break;
            }
            default:
                // Log unhandled event types for future expansion or monitoring.
                // It's often good practice to acknowledge these as 200 OK as well,
                // to prevent unnecessary retries from Polar.
                // In a production environment, use a dedicated logger (e.g., logger.info or logger.warn)
                // logger.info(`Received unhandled Polar event type: ${event.type}`, { webhookId, webhookTimestamp });
                break;
        }
    } catch (processingError) {
        // Log errors during event processing internally.
        // Returning 200 OK tells Polar the webhook was received successfully,
        // even if our internal processing failed. This prevents Polar from retrying
        // endlessly for an issue on our side. Robust internal logging and monitoring
        // are crucial here to catch and address these failures.
        // In a production environment, use a dedicated logger (e.g., logger.error)
        if (processingError instanceof Error) {
            // logger.error(`Error processing Polar event type ${event.type}: ${processingError.message}`, { error: processingError, webhookId });
        }
        return res.status(200).send('Webhook received, but internal processing failed.');
    }

    // 8. Acknowledge successful receipt and processing of the webhook
    res.status(200).send('Webhook received and processed.');
});

export default polarWebhookRouter;