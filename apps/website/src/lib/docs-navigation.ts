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

function createNavItems(
	base: string,
	category: string,
	labels: string[],
): NavItem[] {
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
			items: [{ label: "Storybook", href: `${b}/storybook` }],
		},
		{
			title: "Getting Started",
			items: [{ label: "Introduction", href: `${b}/docs` }],
		},
		{
			title: "Components",
			items: createNavItems(base, "components", [
				"Accordion",
				"Action Bar",
				"Alert",
				"App Shell",
				"Avatar",
				"Badge",
				"Breadcrumb",
				"Button",
				"Card",
				"Checkbox",
				"Checkbox Card",
				"Clipboard",
				"Close Button",
				"Collapsible",
				"Combobox",
				"Data List",
				"Dialog",
				"Drawer",
				"Editable",
				"Empty State",
				"Field",
				"File Upload",
				"Form",
				"Grid List",
				"Hover Card",
				"Icon",
				"Image",
				"Input",
				"Kbd",
				"Link",
				"Link Overlay",
				"List",
				"Menu",
				"Native Select",
				"Navbar",
				"Number Input",
				"Pagination",
				"Password Input",
				"Persona",
				"Pin Input",
				"Popover",
				"Progress",
				"Progress Circle",
				"Radio",
				"Radio Card",
				"Segment Group",
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
				"Toggle Tip",
				"Tooltip",
			]),
		},
		{
			title: "Layout",
			items: createNavItems(base, "layout", [
				"Aspect Ratio",
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
				"Format Byte",
				"Format Number",
				"Locale Provider",
				"Portal",
				"Visually Hidden",
			]),
		},
		{
			title: "Legal",
			items: [
				{ label: "License", href: `${b}/license` },
				{ label: "Privacy", href: `${b}/privacy` },
				{ label: "Terms", href: `${b}/terms` },
			],
		},
	];
}
