import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@ously/ods';
import { Button } from '@ously/ods';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Create project',
    description: 'Deploy your new project in one-click.',
    children: <p>This is the main content area of the card.</p>,
    footer: <Button>Deploy</Button>,
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Card',
    description: 'A compact version.',
    children: <p>Content goes here.</p>,
    size: 'sm',
  },
};
