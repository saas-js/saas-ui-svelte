import { toKebabCase } from "./stories";

interface NavItem {
    label: string;
    href?: string;
    children?: NavItem[];
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

// Normalize base URL - remove trailing slash to avoid double slashes
function normalizeBase(base: string): string {
    return base.endsWith("/") ? base.slice(0, -1) : base;
}

function createNavItems(base: string, category: string, labels: string[]): NavItem[] {
    const b = normalizeBase(base);
    return labels.map((label) => ({
        label,
        href: `${b}/docs/${category}/${toKebabCase(label)}`,
    }));
}

export function getDocsNavigation(base: string = ""): NavGroup[] {
    const b = normalizeBase(base);
    return [
        {
            title: "Resources",
            items: [
                { label: "Storybook", href: `${b}/storybook` },
            ],
        },
        {
            title: "Getting Started",
            items: [{ label: "Introduction", href: `${b}/docs` }],
        },
        {
            title: "Components",
            items: createNavItems(base, "components", [
                "Accordion",
                "ActionBar",
                "Alert",
                "AppShell",
                "Avatar",
                "Badge",
                "Breadcrumb",
                "Button",
                "Card",
                "Checkbox",
                "CheckboxCard",
                "Clipboard",
                "CloseButton",
                "Collapsible",
                "Combobox",
                "DataList",
                "Dialog",
                "Drawer",
                "Editable",
                "EmptyState",
                "Field",
                "FileUpload",
                "Form",
                "GridList",
                "HoverCard",
                "Icon",
                "Image",
                "Input",
                "Kbd",
                "Link",
                "LinkOverlay",
                "List",
                "Menu",
                "NativeSelect",
                "Navbar",
                "NumberInput",
                "Pagination",
                "PasswordInput",
                "Persona",
                "PinInput",
                "Popover",
                "Progress",
                "ProgressCircle",
                "Radio",
                "RadioCard",
                "SegmentGroup",
                "Select",
                "Separator",
                "Sidebar",
                "Skeleton",
                "Slider",
                "Spinner",
                "Stat",
                "Status",
                "Steps",
                "Switch",
                "Table",
                "Tabs",
                "Tag",
                "Textarea",
                "Timeline",
                "Toast",
                "ToggleTip",
                "Tooltip",
            ]),
        },
        {
            title: "Layout",
            items: createNavItems(base, "layout", [
                "AspectRatio",
                "Bleed",
                "Box",
                "Centre",
                "Circle",
                "Container",
                "Flex",
                "Float",
                "Grid",
                "Group",
                "Stack",
            ]),
        },
        {
            title: "Typography",
            items: createNavItems(base, "typography", [
                "Blockquote",
                "Code",
                "Em",
                "Heading",
                "Highlight",
                "Mark",
                "Text",
            ]),
        },
        {
            title: "Utilities",
            items: createNavItems(base, "utilities", [
                "FormatByte",
                "FormatNumber",
                "LocaleProvider",
                "Portal",
                "VisuallyHidden",
            ]),
        },
    ];
}
