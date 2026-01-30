import Root from "./sidebar-root.svelte";
import Header from "./sidebar-header.svelte";
import Body from "./sidebar-body.svelte";
import Footer from "./sidebar-footer.svelte";
import Group from "./sidebar-group.svelte";
import GroupHeader from "./sidebar-group-header.svelte";
import GroupTitle from "./sidebar-group-title.svelte";
import GroupLabel from "./sidebar-group-label.svelte";
import GroupContent from "./sidebar-group-content.svelte";
import NavItem from "./sidebar-nav-item.svelte";
import NavButton from "./sidebar-nav-button.svelte";
import Item from "./sidebar-item.svelte";
import Link from "./sidebar-link.svelte";
import Toggle from "./sidebar-toggle.svelte";

export {
	SIDEBAR_CTX,
	sidebar,
	type SidebarContext,
} from "./sidebar-root.svelte";

export const SidebarRoot = Root;
export const SidebarHeader = Header;
export const SidebarBody = Body;
export const SidebarFooter = Footer;
export const SidebarGroup = Group;
export const SidebarGroupHeader = GroupHeader;
export const SidebarGroupTitle = GroupTitle;
export const SidebarGroupLabel = GroupLabel;
export const SidebarGroupContent = GroupContent;
export const SidebarNavItem = NavItem;
export const SidebarNavButton = NavButton;
export const SidebarItem = Item;
export const SidebarLink = Link;
export const SidebarToggle = Toggle;

export const Sidebar = {
	Root,
	Header,
	Body,
	Footer,
	Group,
	GroupHeader,
	GroupTitle,
	GroupLabel,
	GroupContent,
	NavItem,
	NavButton,
	Item,
	Link,
	Toggle,
};
