import { Button } from "@ously/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Ously</h1>
      <Button>Ously Button</Button>
    </main>
  );
}

// TODO(ISSUE-84): Implement Account Settings shell
// TODO(ISSUE-86): Implement General Info form
// TODO(ISSUE-87): Implement Email Preferences form
// TODO(ISSUE-88): Implement Subscription & Billing UI placeholders
// TODO(ISSUE-89): Implement Account Deletion workflow
