import Root from "./tabs-root.svelte";
import List from "./tabs-list.svelte";
import Trigger from "./tabs-trigger.svelte";
import Content from "./tabs-content.svelte";
import Indicator from "./tabs-indicator.svelte";
import ContentGroup from "./tabs-content-group.svelte";

export {
    TABS_CTX,
    tabs,
    type TabsVariants,
    type TabsContext,
} from "./tabs-root.svelte";

export const TabsRoot = Root;
export const TabsList = List;
export const TabsTrigger = Trigger;
export const TabsContent = Content;
export const TabsIndicator = Indicator;
export const TabsContentGroup = ContentGroup;

export const Tabs = {
    Root,
    List,
    Trigger,
    Content,
    Indicator,
    ContentGroup,
};
