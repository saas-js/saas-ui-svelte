import Root from "./navbar-root.svelte";
import Content from "./navbar-content.svelte";
import Brand from "./navbar-brand.svelte";
import ItemGroup from "./navbar-item-group.svelte";
import Item from "./navbar-item.svelte";
import Link from "./navbar-link.svelte";

export {
	navbar,
	type NavbarVariants,
	type NavbarContext,
} from "./navbar-root.svelte";

export const NavbarRoot = Root;
export const NavbarContent = Content;
export const NavbarBrand = Brand;
export const NavbarItemGroup = ItemGroup;
export const NavbarItem = Item;
export const NavbarLink = Link;

export const Navbar = {
	Root,
	Content,
	Brand,
	ItemGroup,
	Item,
	Link,
};
