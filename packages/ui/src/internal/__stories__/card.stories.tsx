import type { Meta, StoryObj } from "@storybook/react";
import {
  Bell,
  CreditCard,
  MoreHorizontal,
  Settings,
  Users,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../avatar";
import { Button } from "../button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";

const meta = {
  title: "ODS/Primitive/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    size: "default",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Advanced composition showing a project management card.
 * Demonstrates use of AvatarGroup, custom progress bar, and CardAction.
 */
export const TeamProject: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CreditCard className="size-4" />
          </div>
          <CardAction>
            <Button size="icon" variant="ghost" className="size-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </CardAction>
        </div>
        <div className="mt-4">
          <CardTitle>Redesign Dashboard</CardTitle>
          <CardDescription>
            Update the analytics dashboard with new mobile responsive
            components.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">75%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[75%] bg-primary" />
        </div>
        <div className="flex items-center justify-between">
          <AvatarGroup size="sm">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://github.com/leerob.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage src="https://github.com/steventey.png" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3" />
            <span>5 Members</span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">Due in 4 days</span>
        <Button size="sm">View Project</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Notification card pattern using CardAction for utility actions.
 */
export const Notification: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="size-4 text-primary" />
          Notifications
        </CardTitle>
        <CardDescription>
          You have 3 unread messages from your team.
        </CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            Mark all as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
          >
            <div className="mt-1.5 size-2 rounded-full bg-primary" />
            <div className="grid gap-1">
              <p className="text-xs font-medium leading-none">
                New comment on "Project X"
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  ),
};

/**
 * Loading state using Skeleton components to match the Card layout.
 */
export const Loading: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-[100px]" />
      </CardFooter>
    </Card>
  ),
};

/**
 * Settings card layout with header borders and background-tinted footer.
 */
export const SettingsCard: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <CardHeader className="border-b">
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and security.
        </CardDescription>
        <CardAction>
          <Settings className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="grid gap-1">
              <p className="text-xs font-medium">Public Profile</p>
              <p className="text-xs text-muted-foreground">
                Allow anyone to see your activity.
              </p>
            </div>
            <div className="h-5 w-9 rounded-full bg-muted" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="grid gap-1">
              <p className="text-xs font-medium">Email Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive weekly digest emails.
              </p>
            </div>
            <div className="h-5 w-9 rounded-full bg-primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button size="sm" variant="outline" className="w-full">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  ),
};
