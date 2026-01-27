import Root from "./dialog-root.svelte";
import Trigger from "./dialog-trigger.svelte";
import Content from "./dialog-content.svelte";
import Header from "./dialog-header.svelte";
import Title from "./dialog-title.svelte";
import Body from "./dialog-body.svelte";
import Footer from "./dialog-footer.svelte";
import CloseButton from "./dialog-close-button.svelte";
import ActionTrigger from "./dialog-action-trigger.svelte";

export const DialogRoot = Root;
export const DialogTrigger = Trigger;
export const DialogContent = Content;
export const DialogHeader = Header;
export const DialogTitle = Title;
export const DialogBody = Body;
export const DialogFooter = Footer;
export const DialogCloseButton = CloseButton;
export const DialogActionTrigger = ActionTrigger;

export const Dialog = {
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
