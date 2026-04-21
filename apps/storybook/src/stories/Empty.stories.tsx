import type { Meta, StoryObj } from '@storybook/react';
import { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, Button } from '@ously/ods';
import { PlusIcon, Loader2Icon } from 'lucide-react';
import * as React from 'react';

const meta = {
  title: 'Atoms/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <div className="dark w-[400px] p-8 bg-background border border-border rounded-xl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <PlusIcon className="w-12 h-12 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle className="text-white">Distribute Track</EmptyTitle>
          <EmptyDescription>
            Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="lg">Create Release</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
};

export const Loading: Story = {
  render: () => (
    <div className="dark w-[400px] p-8 bg-background border border-border rounded-xl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
          </EmptyMedia>
          <EmptyTitle className="text-white">Syncing your accounts</EmptyTitle>
          <EmptyDescription>
            We're pulling in your latest transactions. This usually takes a few seconds.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Cancel</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
};
