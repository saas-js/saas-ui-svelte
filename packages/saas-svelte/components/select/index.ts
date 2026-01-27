import Root from "./select-root.svelte";
import Trigger from "./select-trigger.svelte";
import Value from "./select-value.svelte";
import AvatarValue from "./select-avatar-value.svelte";
import Content from "./select-content.svelte";
import Item from "./select-item.svelte";
import ItemGroup from "./select-item-group.svelte";
import Label from "./select-label.svelte";
import ClearTrigger from "./select-clear-trigger.svelte";
import Indicator from "./select-indicator.svelte";

export { select, type SelectVariants } from "./select-root.svelte";

export const SelectRoot = Root;
export const SelectTrigger = Trigger;
export const SelectValue = Value;
export const SelectAvatarValue = AvatarValue;
export const SelectContent = Content;
export const SelectItem = Item;
export const SelectItemGroup = ItemGroup;
export const SelectLabel = Label;
export const SelectClearTrigger = ClearTrigger;
export const SelectIndicator = Indicator;

export const Select = {
    Root,
    Trigger,
    Value,
    AvatarValue,
    Content,
    Item,
    ItemGroup,
    Label,
    ClearTrigger,
    Indicator,
};
