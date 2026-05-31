"use client";

import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";

export interface NotFoundPageProps {
  title?: string;
  heading?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

function NotFoundPage({
  title = "404",
  heading = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  actionLabel = "Go Home",
  actionHref = "/",
}: NotFoundPageProps) {
  return (
    <Box
      display="flex"
      direction="col"
      align="center"
      justify="center"
      padding="xl"
      gap="lg"
      minHeight="60vh"
      height="full"
      textAlign="center"
    >
      <Typography variant="h1" size="5xl" color="primary" weight="bold">
        {title}
      </Typography>
      <Typography variant="h2">{heading}</Typography>
      <Typography variant="lead">{message}</Typography>
      <Box
        display="flex"
        gap="md"
        align="center"
        justify="center"
        width="full"
        maxWidth="sm"
      >
        <Button variant="ghost">Contact Support</Button>
        <Button
          icon="phosphor.house"
          onClick={() => (window.location.href = actionHref)}
        >
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}

export { NotFoundPage };
