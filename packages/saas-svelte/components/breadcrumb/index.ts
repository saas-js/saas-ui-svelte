import Root from "./breadcrumb-root.svelte";
import Item from "./breadcrumb-item.svelte";
import Link from "./breadcrumb-link.svelte";
import CurrentLink from "./breadcrumb-current-link.svelte";
import Ellipsis from "./breadcrumb-ellipsis.svelte";
import Menu from "./breadcrumb-menu.svelte";

export {
    BREADCRUMB_CTX,
    breadcrumb,
    type BreadcrumbVariants,
    type BreadcrumbContext,
} from "./breadcrumb-root.svelte";

export const BreadcrumbRoot = Root;
export const BreadcrumbItem = Item;
export const BreadcrumbLink = Link;
export const BreadcrumbCurrentLink = CurrentLink;
export const BreadcrumbEllipsis = Ellipsis;
export const BreadcrumbMenu = Menu;

export const Breadcrumb = {
    Root,
    Item,
    Link,
    CurrentLink,
    Ellipsis,
    Menu,
};
