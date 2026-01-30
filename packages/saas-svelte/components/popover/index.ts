import Root from "./popover-root.svelte";
import Trigger from "./popover-trigger.svelte";
import Content from "./popover-content.svelte";
import Arrow from "./popover-arrow.svelte";
import Header from "./popover-header.svelte";
import Body from "./popover-body.svelte";
import Footer from "./popover-footer.svelte";
import Title from "./popover-title.svelte";
import Description from "./popover-description.svelte";
import CloseTrigger from "./popover-close-trigger.svelte";

export {
	popover,
	type PopoverVariants,
	type PopoverContext,
} from "./popover-root.svelte";

export const PopoverRoot = Root;
export const PopoverTrigger = Trigger;
export const PopoverContent = Content;
export const PopoverArrow = Arrow;
export const PopoverHeader = Header;
export const PopoverBody = Body;
export const PopoverFooter = Footer;
export const PopoverTitle = Title;
export const PopoverDescription = Description;
export const PopoverCloseTrigger = CloseTrigger;

export const Popover = {
	Root,
	Trigger,
	Content,
	Arrow,
	Header,
	Body,
	Footer,
	Title,
	Description,
	CloseTrigger,
};
