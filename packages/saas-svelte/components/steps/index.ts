import Root from "./steps-root.svelte";
import List from "./steps-list.svelte";
import Item from "./steps-item.svelte";
import Trigger from "./steps-trigger.svelte";
import Indicator from "./steps-indicator.svelte";
import Separator from "./steps-separator.svelte";
import Content from "./steps-content.svelte";
import CompletedContent from "./steps-completed-content.svelte";
import PrevTrigger from "./steps-prev-trigger.svelte";
import NextTrigger from "./steps-next-trigger.svelte";

export {
    STEPS_CTX,
    steps,
    type StepsVariants,
    type StepsContext,
} from "./steps-root.svelte";

export const StepsRoot = Root;
export const StepsList = List;
export const StepsItem = Item;
export const StepsTrigger = Trigger;
export const StepsIndicator = Indicator;
export const StepsSeparator = Separator;
export const StepsContent = Content;
export const StepsCompletedContent = CompletedContent;
export const StepsPrevTrigger = PrevTrigger;
export const StepsNextTrigger = NextTrigger;

export const Steps = {
    Root,
    List,
    Item,
    Trigger,
    Indicator,
    Separator,
    Content,
    CompletedContent,
    PrevTrigger,
    NextTrigger,
};
