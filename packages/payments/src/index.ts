import { Polar } from "@polar-sh/sdk";

export const createPolarClient = (accessToken: string) => {
  return new Polar({
    accessToken,
    server: "sandbox", // Default to sandbox for dev
  });
};

export interface WebhookPayload {
  type: string;
  data: any;
}

export const validateWebhook = async (payload: WebhookPayload, secret: string) => {
    // Polar webhook validation logic
    // (To be fully implemented based on Polar docs)
    return true; 
};
