import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../Icon";
import type { IconId } from "../../const";
import { Box } from "../Box";

const meta: Meta<typeof Icon> = {
  title: "ODS/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "select",
      options: [
        "phosphor.house",
        "phosphor.user",
        "phosphor.gear",
        "phosphor.bell",
        "phosphor.magnifying_glass",
        "phosphor.chart_pie",
        "phosphor.caret_right",
        "phosphor.x",
        "phosphor.dots_three",
        "phosphor.plus",
        "phosphor.check",
        "phosphor.download",
      ] satisfies IconId[],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["foreground", "background", "primary", "muted"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    id: "phosphor.house",
  },
};

const icons: { category: string; ids: IconId[] }[] = [
  {
    category: "Navigation",
    ids: [
      "phosphor.arrow_left",
      "phosphor.arrow_right",
      "phosphor.arrow_up",
      "phosphor.arrow_down",
      "phosphor.caret_left",
      "phosphor.caret_right",
      "phosphor.caret_down",
      "phosphor.caret_up",
      "phosphor.caret_double_left",
      "phosphor.caret_double_right",
      "phosphor.dots_three",
      "phosphor.dots_three_vertical",
      "phosphor.sidebar_simple",
      "phosphor.house",
      "phosphor.house_simple",
    ],
  },
  {
    category: "Communication",
    ids: [
      "phosphor.chat",
      "phosphor.chat_circle",
      "phosphor.chat_dots",
      "phosphor.envelope",
      "phosphor.envelope_simple",
      "phosphor.phone",
      "phosphor.phone_call",
    ],
  },
  {
    category: "Actions",
    ids: [
      "phosphor.download",
      "phosphor.upload",
      "phosphor.trash",
      "phosphor.plus",
      "phosphor.minus",
      "phosphor.plus_circle",
      "phosphor.minus_circle",
      "phosphor.check",
      "phosphor.check_circle",
      "phosphor.pencil",
      "phosphor.pencil_simple",
      "phosphor.copy",
      "phosphor.magnifying_glass",
      "phosphor.funnel",
      "phosphor.share",
      "phosphor.share_network",
      "phosphor.paper_plane_right",
    ],
  },
  {
    category: "Files",
    ids: [
      "phosphor.file",
      "phosphor.file_text",
      "phosphor.file_code",
      "phosphor.file_image",
      "phosphor.folder",
      "phosphor.folder_open",
      "phosphor.folder_simple",
      "phosphor.image",
      "phosphor.camera",
    ],
  },
  {
    category: "UI / System",
    ids: [
      "phosphor.bell",
      "phosphor.bell_simple",
      "phosphor.notification",
      "phosphor.info",
      "phosphor.question",
      "phosphor.warning",
      "phosphor.warning_circle",
      "phosphor.eye",
      "phosphor.eye_slash",
      "phosphor.lock",
      "phosphor.lock_open",
      "phosphor.gear",
      "phosphor.gear_six",
      "phosphor.wrench",
    ],
  },
  {
    category: "Data & Charts",
    ids: [
      "phosphor.chart_bar",
      "phosphor.chart_bar_horizontal",
      "phosphor.chart_line",
      "phosphor.chart_line_up",
      "phosphor.chart_pie",
      "phosphor.chart_donut",
      "phosphor.grid_four",
      "phosphor.list",
      "phosphor.list_bullets",
      "phosphor.database",
    ],
  },
  {
    category: "Weather & Maps",
    ids: [
      "phosphor.sun",
      "phosphor.sun_dim",
      "phosphor.moon",
      "phosphor.moon_stars",
      "phosphor.cloud",
      "phosphor.cloud_check",
      "phosphor.cloud_rain",
      "phosphor.map_pin",
      "phosphor.map_pin_line",
      "phosphor.globe",
      "phosphor.globe_simple",
      "phosphor.compass",
      "phosphor.navigation_arrow",
    ],
  },
  {
    category: "Business",
    ids: [
      "phosphor.building",
      "phosphor.buildings",
      "phosphor.shopping_bag",
      "phosphor.shopping_cart",
      "phosphor.tag",
      "phosphor.tag_simple",
      "phosphor.wallet",
      "phosphor.credit_card",
      "phosphor.currency_circle_dollar",
      "phosphor.coin",
    ],
  },
  {
    category: "Users",
    ids: [
      "phosphor.user",
      "phosphor.users",
      "phosphor.user_plus",
      "phosphor.user_minus",
      "phosphor.user_check",
      "phosphor.user_circle",
      "phosphor.user_square",
      "phosphor.sign_in",
      "phosphor.sign_out",
    ],
  },
  {
    category: "Misc",
    ids: [
      "phosphor.star",
      "phosphor.star_four",
      "phosphor.heart",
      "phosphor.calendar",
      "phosphor.calendar_blank",
      "phosphor.clock",
      "phosphor.clock_afternoon",
      "phosphor.bookmark",
      "phosphor.bookmark_simple",
      "phosphor.lightning",
      "phosphor.gift",
      "phosphor.rocket",
      "phosphor.fire",
      "phosphor.crown",
      "phosphor.seal_check",
      "phosphor.trophy",
      "phosphor.code",
      "phosphor.terminal",
      "phosphor.qr_code",
      "phosphor.scan",
      "phosphor.flag",
      "phosphor.archive",
      "phosphor.key",
      "phosphor.shield",
      "phosphor.shield_check",
      "phosphor.monitor",
      "phosphor.device_mobile",
      "phosphor.keyboard",
      "phosphor.mouse",
      "phosphor.battery_high",
      "phosphor.wifi_high",
      "phosphor.bluetooth",
      "phosphor.plug",
      "phosphor.power",
      "phosphor.toggle_left",
      "phosphor.toggle_right",
      "phosphor.sliders",
      "phosphor.sliders_horizontal",
    ],
  },
];

export const Gallery: Story = {
  render: () => (
    <Box display="flex" direction="col" gap="lg">
      {icons.map((group) => (
        <Box key={group.category} display="flex" direction="col" gap="sm">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {group.category}
          </span>
          <Box display="flex" wrap="wrap" gap="sm">
            {group.ids.map((id) => (
              <Box
                key={id}
                display="flex"
                align="center"
                gap="xs"
                padding="xs"
                className="border rounded shrink-0"
              >
                <Icon id={id} />
                <span className="text-xs font-mono whitespace-nowrap">
                  {id.replace("phosphor.", "")}
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  ),
};

export const SizeSm: Story = {
  args: {
    id: "phosphor.house",
    size: "sm",
  },
};

export const SizeLg: Story = {
  args: {
    id: "phosphor.house",
    size: "lg",
  },
};

export const SizeXl: Story = {
  args: {
    id: "phosphor.house",
    size: "xl",
  },
};

export const ColorPrimary: Story = {
  args: {
    id: "phosphor.house",
    color: "primary",
  },
};

export const ColorMuted: Story = {
  args: {
    id: "phosphor.house",
    color: "muted",
  },
};
