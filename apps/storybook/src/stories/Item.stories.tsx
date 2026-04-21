import type { Meta, StoryObj } from '@storybook/react';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@ously/ods';

const meta = {
  title: 'Atoms/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof Item>;

export const DashboardStat: Story = {
  render: (args) => (
    <div className="dark w-[200px] p-4 bg-background">
      <Item {...args}>
        <ItemContent>
          <ItemDescription>Upcoming</ItemDescription>
          <span className="text-lg font-semibold text-white">May 25, 2024</span>
          <span className="text-sm text-muted-foreground">$1,000 scheduled</span>
        </ItemContent>
      </Item>
    </div>
  ),
  args: {
    variant: 'muted',
    size: 'default',
  }
};

export const ListRow: Story = {
  render: (args) => (
    <div className="dark w-[400px] p-4 bg-background">
      <Item {...args}>
        <ItemContent>
          <ItemTitle className="text-white">Vanguard VIG</ItemTitle>
          <ItemDescription className="normal-case tracking-normal">450 Shares</ItemDescription>
        </ItemContent>
        <div className="text-sm font-semibold text-white">$1,842.10</div>
      </Item>
    </div>
  ),
  args: {
    variant: 'muted',
    size: 'sm',
  }
};
