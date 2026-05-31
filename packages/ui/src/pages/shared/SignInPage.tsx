"use client";
// ISSUE_#none | 2026-05-31 | Rename LoginPage to SignInPage | antigravity | gemini-3.5-flash
// ISSUE_#none | 2026-05-31 | Replace raw span with Box in SignInPage | antigravity | gemini-3.5-flash

import * as React from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Link } from "../../components/Link";
import { Typography } from "../../components/Typography";
import { OuslyImage } from "../../components/OuslyImage";

export interface SignInPageProps {
  logoImage?: string;
  logoAlt?: string;
  signInUrl: string;
  appName?: string;
}

function GoogleLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function SignInPage({
  logoImage,
  logoAlt = "App Logo",
  signInUrl,
  appName,
}: SignInPageProps) {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <Box
      display="flex"
      direction="col"
      align="center"
      justify="center"
      minHeight="screen"
      padding="xl"
      gap="xl"
    >
      <Box
        display="flex"
        direction="col"
        align="center"
        gap="lg"
        maxWidth="sm"
        width="full"
      >
        {logoImage && <OuslyImage src={logoImage} alt={logoAlt} size="xxl" />}

        <Box
          display="flex"
          direction="col"
          align="center"
          justify="center"
          gap="xs"
        >
          <Typography variant="no-style" size="2xl" weight="bold">
            Welcome to
          </Typography>
          {appName && (
            <Typography
              variant="no-style"
              size="3xl"
              color="primary"
              weight="bold"
            >
              {appName}
            </Typography>
          )}
        </Box>

        <Box
          display="flex"
          align="center"
          gap="sm"
          width="full"
          justify="center"
          style={{ cursor: "pointer" }}
          onClick={() => setAccepted(!accepted)}
        >
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked)}
            variant="important"
          />
          <Box textAlign="center">
            <Typography variant="no-style" size="xs" color="natural">
              Accept{" "}
              <Box display="inline" onClick={(e) => e.stopPropagation()}>
                <Link variant="underline" size="sm" href="#">
                  Terms of Service
                </Link>
              </Box>{" "}
              and{" "}
              <Box display="inline" onClick={(e) => e.stopPropagation()}>
                <Link variant="underline" size="sm" href="#">
                  Privacy Policy
                </Link>
              </Box>
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justify="center" width="full">
          <Button
            variant="outline"
            size="lg"
            disabled={!accepted}
            style={{
              width: "100%",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
            }}
            onClick={() => {
              window.location.href = signInUrl;
            }}
          >
            <GoogleLogo />
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export { SignInPage };
