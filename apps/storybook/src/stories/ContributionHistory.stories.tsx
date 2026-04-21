import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  Button, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@ously/ods';
import { Bar, BarChart, XAxis } from 'recharts';

const meta = {
  title: 'Widgets/ContributionHistory',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const chartData = [
  { month: "Dec", amount: 120 },
  { month: "Jan", amount: 200 },
  { month: "Feb", amount: 150 },
  { month: "Mar", amount: 250 },
  { month: "Apr", amount: 130 },
  { month: "May", amount: 280 },
]

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-2)",
  },
}

export const Default: Story = {
  render: () => (
    <div className="dark p-8 bg-background min-h-[400px] flex items-center justify-center">
      <Card className="w-full max-w-sm bg-card text-card-foreground border-border shadow-xl overflow-hidden rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-lg font-bold tracking-tight">Contribution History</CardTitle>
          <CardDescription className="text-muted-foreground font-mono text-xs mt-1">Last 6 months of activity</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="h-[180px] w-full mt-4 mb-6">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  className="font-mono text-[10px]"
                  tick={{ fill: 'currentColor', opacity: 0.5 }}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex flex-col bg-muted/50 rounded-lg p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Upcoming</span>
              <span className="font-mono font-bold text-base mb-1">May 25,<br/>2024</span>
              <span className="font-mono text-xs text-muted-foreground/80 mt-auto">$1,000<br/>scheduled</span>
            </div>
            <div className="flex flex-col bg-muted/50 rounded-lg p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Auto-Save Plan</span>
              <span className="font-mono font-bold text-base mb-1">Accelerated</span>
              <span className="font-mono text-xs text-muted-foreground/80 mt-auto">Recurring<br/>weekly</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 border-t border-border bg-card">
          <Button className="w-full font-mono font-medium h-12 rounded-sm transition-colors mt-2" size="lg">
            View Full Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
