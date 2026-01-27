import Root from "./accordion-root.svelte";
import Item from "./accordion-item.svelte";
import ItemTrigger from "./accordion-item-trigger.svelte";
import ItemContent from "./accordion-item-content.svelte";

export {
    ACCORDION_CTX,
    accordion,
    type AccordionVariants,
    type AccordionContext,
    type AccordionItem as AccordionItemData,
} from "./accordion-root.svelte";

export const AccordionRoot = Root;
export const AccordionItem = Item;
export const AccordionItemTrigger = ItemTrigger;
export const AccordionItemContent = ItemContent;

export const Accordion = {
    Root,
    Item,
    ItemTrigger,
    ItemContent,
};
