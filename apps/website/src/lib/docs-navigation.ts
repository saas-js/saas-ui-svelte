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

function createNavItems(category: string, labels: string[]): NavItem[] {
    return labels.map((label) => ({
        label,
        href: `/docs/${category}/${toKebabCase(label)}`,
    }));
}

export function getDocsNavigation(): NavGroup[] {
    return [
        {
            title: "Getting Started",
            items: [{ label: "Introduction", href: "/docs" }],
        },
        {
            title: "Components",
            items: createNavItems("components", [
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
            items: createNavItems("layout", [
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
            items: createNavItems("typography", [
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
            items: createNavItems("utilities", [
                "FormatByte",
                "FormatNumber",
                "LocaleProvider",
                "Portal",
                "VisuallyHidden",
            ]),
        },
    ];
}
