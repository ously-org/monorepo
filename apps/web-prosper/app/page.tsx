import { Box, Typography } from "@ously/ui";
import { MockCard } from "../components/MockCard";

export default function Home() {
  return (
    <>
      <Box padding="lg" display="flex" direction="col" gap="md">
        <Typography variant="h1">Dashboard Overview</Typography>
        <Typography variant="p">
          Welcome to your Prosper dashboard. Here you can see your latest
          analytics and manage your campaigns.
        </Typography>
        <Box display="grid" gap="md" columns="responsive-cards">
          {Array.from({ length: 6 }).map((_, i) => (
            <MockCard
              key={i}
              title={`Stat Card ${i + 1}`}
              description="Some descriptive text about this metric."
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

// TODO(ISSUE-84): Implement Account Settings shell
// TODO(ISSUE-126): Replace MockCard with real data fetching from API
