// ISSUE_#none | 2026-05-31 | Rename Login to SignIn | antigravity | gemini-3.5-flash
import { SignInPage } from "@ously/ui";
import { getImageUrl } from "@ously/ui/lib/image";
import prosperIcon from "@asset/prosper-icon.svg";

export default function SignIn() {
  const apiUrl = (process.env as { [key: string]: string | undefined })["NEXT_PUBLIC_API_URL"] ?? "http://localhost:8787";

  return (
    <SignInPage
      logoImage={getImageUrl(prosperIcon)}
      logoAlt="Prosper Logo"
      signInUrl={`${apiUrl}/auth/google`}
      appName="Prosper"
    />
  );
}
