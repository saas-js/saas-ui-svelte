import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Accordion } from "$saas/components/accordion";
import AccordionWrapper from "../wrappers/components/Accordion.svelte";
import {
    commonArgTypes,
    getControls,
    variants,
    accordionSizes,
} from "../utils";

const meta: Meta = {
    title: "components/Accordion",
    component: Accordion.Root,
    argTypes: {
        variant: {
            ...commonArgTypes.variant,
            options: variants.filter((v) =>
                ["outline", "subtle", "enclosed", "plain"].includes(v),
            ),
        },
        size: {
            ...commonArgTypes.size,
            options: accordionSizes,
        },
        collapsible: {
            control: "boolean",
            table: { defaultValue: { summary: "false" } },
        },
        multiple: {
            control: "boolean",
            table: { defaultValue: { summary: "false" } },
        },
        defaultValue: {
            control: "object",
        },
        onPrefetch: {
            action: "prefetch",
            description:
                "Callback invoked when hovering over an item. Similar to Astro's link prefetching, this allows preloading data before selection.",
            table: { category: "Events" },
        },
        class: commonArgTypes.class,
        children: commonArgTypes.children,
    },
    parameters: {
        controls: getControls([
            "variant",
            "size",
            "collapsible",
            "multiple",
            "defaultValue",
            "class",
        ]),
        docs: {
            description: {
                component:
                    "A vertically stacked set of interactive headings that each reveal an associated section of content.",
            },
        },
        anatomy: `<script>
  import {
    Accordion,
    AccordionItem,
    AccordionItemTrigger,
    AccordionItemContent,
  } from "@saas-ui/svelte/components/accordion";
</script>

<Accordion.Root collapsible>
  <AccordionItem value="item-1">
    <AccordionItemTrigger>Section 1</AccordionItemTrigger>
    <AccordionItemContent>Content for section 1</AccordionItemContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionItemTrigger>Section 2</AccordionItemTrigger>
    <AccordionItemContent>Content for section 2</AccordionItemContent>
  </AccordionItem>
</Accordion.Root>`,
        // Sub-component props for documentation
        subComponents: [
            {
                name: "Accordion.Root",
                description: "The root container component for the accordion.",
                props: {
                    children: {
                        type: "Snippet",
                        default: "-",
                        description:
                            "Content to render inside the accordion (composition API).",
                    },
                    items: {
                        type: "AccordionItem[]",
                        default: "-",
                        description: "Array of items for simple usage.",
                    },
                    collapsible: {
                        type: "boolean",
                        default: "false",
                        description:
                            "Whether accordion items can be collapsed.",
                    },
                    multiple: {
                        type: "boolean",
                        default: "false",
                        description:
                            "Whether multiple accordion items can be open at once.",
                    },
                    defaultValue: {
                        type: "string[]",
                        default: "-",
                        description:
                            "The default value(s) of the accordion items to open.",
                    },
                    id: {
                        type: "string",
                        default: "-",
                        description:
                            "Unique identifier for the accordion. Required for accessibility.",
                    },
                    size: {
                        type: '"sm" | "md" | "lg"',
                        default: '"md"',
                        description: "The size of the accordion.",
                    },
                    variant: {
                        type: '"outline" | "subtle" | "enclosed" | "plain"',
                        default: '"outline"',
                        description: "The visual style of the accordion.",
                    },
                    onPrefetch: {
                        type: "(value: string) => void",
                        default: "-",
                        description:
                            "Callback invoked when hovering over an item (for prefetching content). Similar to Astro's link prefetching, this allows preloading data before selection.",
                    },
                    class: {
                        type: "string",
                        default: "-",
                        description: "Additional CSS classes to apply.",
                    },
                },
            },
            {
                name: "AccordionItem",
                description:
                    "A single accordion item containing a trigger and content.",
                props: {
                    children: {
                        type: "Snippet",
                        default: "-",
                        description:
                            "The content of the accordion item (trigger and content).",
                    },
                    value: {
                        type: "string",
                        default: "-",
                        description: "The unique value of the item.",
                    },
                    disabled: {
                        type: "boolean",
                        default: "false",
                        description: "Whether the item is disabled.",
                    },
                    class: {
                        type: "string",
                        default: "-",
                        description: "Additional CSS classes to apply.",
                    },
                },
            },
            {
                name: "AccordionItemTrigger",
                description:
                    "The clickable header that expands/collapses the content.",
                props: {
                    children: {
                        type: "Snippet",
                        default: "-",
                        description: "The content of the trigger.",
                    },
                    class: {
                        type: "string",
                        default: "-",
                        description: "Additional CSS classes to apply.",
                    },
                },
            },
            {
                name: "AccordionItemContent",
                description:
                    "The collapsible content section of an accordion item.",
                props: {
                    children: {
                        type: "Snippet",
                        default: "-",
                        description: "The content of the accordion item.",
                    },
                    class: {
                        type: "string",
                        default: "-",
                        description: "Additional CSS classes to apply.",
                    },
                },
            },
        ],
    },
    args: {
        variant: "outline",
        size: "md",
        collapsible: true,
        multiple: false,
    },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
    parameters: {
        docs: {
            description: {
                story: "Basic accordion with default styling and collapsible behavior.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "basic" },
        }) as any,
};

export const Controlled: Story = {
    parameters: {
        docs: {
            description: {
                story: "Controlled accordion with pre-selected item using the `value` prop.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "controlled" },
        }) as any,
};

export const WithIcon: Story = {
    parameters: {
        docs: {
            description: {
                story: "Accordion items with icons in the trigger for visual context.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "withIcon" },
        }) as any,
};

export const Multiple: Story = {
    parameters: {
        docs: {
            description: {
                story: "Multiple accordion items can be expanded at the same time using the `multiple` prop.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "multiple" },
        }) as any,
};

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: "Use the `size` prop to change the size of the accordion. Available sizes: `sm`, `md`, `lg`.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "sizes" },
        }) as any,
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: "Use the `variant` prop to change the visual style. Available variants: `outline`, `subtle`, `enclosed`, `plain`.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "variants" },
        }) as any,
};

export const DisabledItem: Story = {
    parameters: {
        docs: {
            description: {
                story: "Individual accordion items can be disabled to prevent interaction.",
            },
        },
    },
    render: () =>
        ({
            Component: AccordionWrapper,
            props: { story: "disabledItem" },
        }) as any,
};
