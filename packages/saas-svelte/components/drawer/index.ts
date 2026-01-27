import Root from "./drawer-root.svelte";
import Trigger from "./drawer-trigger.svelte";
import Content from "./drawer-content.svelte";
import Header from "./drawer-header.svelte";
import Title from "./drawer-title.svelte";
import Body from "./drawer-body.svelte";
import Footer from "./drawer-footer.svelte";
import CloseButton from "./drawer-close-button.svelte";
import ActionTrigger from "./drawer-action-trigger.svelte";

export const DrawerRoot = Root;
export const DrawerTrigger = Trigger;
export const DrawerContent = Content;
export const DrawerHeader = Header;
export const DrawerTitle = Title;
export const DrawerBody = Body;
export const DrawerFooter = Footer;
export const DrawerCloseButton = CloseButton;
export const DrawerActionTrigger = ActionTrigger;

export const Drawer = {
    Root,
    Trigger,
    Content,
    Header,
    Title,
    Body,
    Footer,
    CloseButton,
    ActionTrigger,
};

export { DRAWER_CTX } from "./drawer-root.svelte";
