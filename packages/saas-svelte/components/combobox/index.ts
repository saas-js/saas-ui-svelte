import PreComposed from "./combobox.svelte";
import Root from "./combobox-root.svelte";
import Label from "./combobox-label.svelte";
import Control from "./combobox-control.svelte";
import Input from "./combobox-input.svelte";
import IndicatorGroup from "./combobox-indicator-group.svelte";
import Trigger from "./combobox-trigger.svelte";
import ClearTrigger from "./combobox-clear-trigger.svelte";
import Content from "./combobox-content.svelte";
import Item from "./combobox-item.svelte";
import ItemText from "./combobox-item-text.svelte";
import ItemIndicator from "./combobox-item-indicator.svelte";
import ItemGroup from "./combobox-item-group.svelte";
import ItemGroupLabel from "./combobox-item-group-label.svelte";
import Empty from "./combobox-empty.svelte";

export {
	combobox,
	type ComboboxVariants,
	type ComboboxContext,
} from "./combobox-root.svelte";

export {
	Combobox as ComboboxPrimitive,
	createListCollection,
	type CollectionItem,
	type ListCollection,
} from "@ark-ui/svelte/combobox";

export const ComboboxRoot = Root;
export const ComboboxLabel = Label;
export const ComboboxControl = Control;
export const ComboboxInput = Input;
export const ComboboxIndicatorGroup = IndicatorGroup;
export const ComboboxTrigger = Trigger;
export const ComboboxClearTrigger = ClearTrigger;
export const ComboboxContent = Content;
export const ComboboxItem = Item;
export const ComboboxItemText = ItemText;
export const ComboboxItemIndicator = ItemIndicator;
export const ComboboxItemGroup = ItemGroup;
export const ComboboxItemGroupLabel = ItemGroupLabel;
export const ComboboxEmpty = Empty;

export const Combobox = Object.assign(PreComposed, {
	Root,
	Label,
	Control,
	Input,
	IndicatorGroup,
	Trigger,
	ClearTrigger,
	Content,
	Item,
	ItemText,
	ItemIndicator,
	ItemGroup,
	ItemGroupLabel,
	Empty,
});
