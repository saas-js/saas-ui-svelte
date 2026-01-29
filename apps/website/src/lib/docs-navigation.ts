interface NavItem {
	label: string;
	href?: string;
	children?: NavItem[];
}

interface NavGroup {
	title: string;
	items: NavItem[];
}

export function getDocsNavigation(): NavGroup[] {
	return [
		{
			title: "Getting Started",
			items: [
				{ label: "Introduction", href: "/docs" },
			],
		},
		{
			title: "Components",
			items: [
				{ label: "Accordion", href: "/docs/components/accordion" },
				{ label: "ActionBar", href: "/docs/components/actionbar" },
				{ label: "Alert", href: "/docs/components/alert" },
				{ label: "AppShell", href: "/docs/components/appshell" },
				{ label: "Avatar", href: "/docs/components/avatar" },
				{ label: "Badge", href: "/docs/components/badge" },
				{ label: "Breadcrumb", href: "/docs/components/breadcrumb" },
				{ label: "Button", href: "/docs/components/button" },
				{ label: "Card", href: "/docs/components/card" },
				{ label: "Checkbox", href: "/docs/components/checkbox" },
				{ label: "CheckboxCard", href: "/docs/components/checkboxcard" },
				{ label: "Clipboard", href: "/docs/components/clipboard" },
				{ label: "CloseButton", href: "/docs/components/closebutton" },
				{ label: "Collapsible", href: "/docs/components/collapsible" },
				{ label: "Combobox", href: "/docs/components/combobox" },
				{ label: "DataList", href: "/docs/components/datalist" },
				{ label: "Dialog", href: "/docs/components/dialog" },
				{ label: "Drawer", href: "/docs/components/drawer" },
				{ label: "Editable", href: "/docs/components/editable" },
				{ label: "EmptyState", href: "/docs/components/emptystate" },
				{ label: "Field", href: "/docs/components/field" },
				{ label: "FileUpload", href: "/docs/components/fileupload" },
				{ label: "Form", href: "/docs/components/form" },
				{ label: "GridList", href: "/docs/components/gridlist" },
				{ label: "HoverCard", href: "/docs/components/hovercard" },
				{ label: "Icon", href: "/docs/components/icon" },
				{ label: "Image", href: "/docs/components/image" },
				{ label: "Input", href: "/docs/components/input" },
				{ label: "Kbd", href: "/docs/components/kbd" },
				{ label: "Link", href: "/docs/components/link" },
				{ label: "LinkOverlay", href: "/docs/components/linkoverlay" },
				{ label: "List", href: "/docs/components/list" },
				{ label: "Menu", href: "/docs/components/menu" },
				{ label: "NativeSelect", href: "/docs/components/nativeselect" },
				{ label: "Navbar", href: "/docs/components/navbar" },
				{ label: "NumberInput", href: "/docs/components/numberinput" },
				{ label: "Pagination", href: "/docs/components/pagination" },
				{ label: "PasswordInput", href: "/docs/components/passwordinput" },
				{ label: "Persona", href: "/docs/components/persona" },
				{ label: "PinInput", href: "/docs/components/pininput" },
				{ label: "Popover", href: "/docs/components/popover" },
				{ label: "Portal", href: "/docs/components/portal" },
				{ label: "Progress", href: "/docs/components/progress" },
				{ label: "ProgressCircle", href: "/docs/components/progresscircle" },
				{ label: "Radio", href: "/docs/components/radio" },
				{ label: "RadioCard", href: "/docs/components/radiocard" },
				{ label: "SegmentGroup", href: "/docs/components/segmentgroup" },
				{ label: "Select", href: "/docs/components/select" },
				{ label: "Separator", href: "/docs/components/separator" },
				{ label: "Sidebar", href: "/docs/components/sidebar" },
				{ label: "Skeleton", href: "/docs/components/skeleton" },
				{ label: "Slider", href: "/docs/components/slider" },
				{ label: "Spinner", href: "/docs/components/spinner" },
				{ label: "Stat", href: "/docs/components/stat" },
				{ label: "Status", href: "/docs/components/status" },
				{ label: "Steps", href: "/docs/components/steps" },
				{ label: "Switch", href: "/docs/components/switch" },
				{ label: "Table", href: "/docs/components/table" },
				{ label: "Tabs", href: "/docs/components/tabs" },
				{ label: "Tag", href: "/docs/components/tag" },
				{ label: "Textarea", href: "/docs/components/textarea" },
				{ label: "Timeline", href: "/docs/components/timeline" },
				{ label: "Toast", href: "/docs/components/toast" },
				{ label: "ToggleTip", href: "/docs/components/toggletip" },
				{ label: "Tooltip", href: "/docs/components/tooltip" },
			],
		},
		{
			title: "Layout",
			items: [
				{ label: "AspectRatio", href: "/docs/layout/aspectratio" },
				{ label: "Bleed", href: "/docs/layout/bleed" },
				{ label: "Box", href: "/docs/layout/box" },
				{ label: "Centre", href: "/docs/layout/centre" },
				{ label: "Circle", href: "/docs/layout/circle" },
				{ label: "Container", href: "/docs/layout/container" },
				{ label: "Flex", href: "/docs/layout/flex" },
				{ label: "Float", href: "/docs/layout/float" },
				{ label: "Grid", href: "/docs/layout/grid" },
				{ label: "Group", href: "/docs/layout/group" },
				{ label: "Stack", href: "/docs/layout/stack" },
			],
		},
		{
			title: "Typography",
			items: [
				{ label: "Blockquote", href: "/docs/typography/blockquote" },
				{ label: "Code", href: "/docs/typography/code" },
				{ label: "Em", href: "/docs/typography/em" },
				{ label: "Heading", href: "/docs/typography/heading" },
				{ label: "Highlight", href: "/docs/typography/highlight" },
				{ label: "Mark", href: "/docs/typography/mark" },
				{ label: "Text", href: "/docs/typography/text" },
			],
		},
		{
			title: "Utilities",
			items: [
				{ label: "FormatByte", href: "/docs/utilities/formatbyte" },
				{ label: "FormatNumber", href: "/docs/utilities/formatnumber" },
				{ label: "LocaleProvider", href: "/docs/utilities/localeprovider" },
				{ label: "VisuallyHidden", href: "/docs/utilities/visuallyhidden" },
			],
		},
	];
}
