import Group from "./radio-group.svelte";
import Item from "./radio-item.svelte";
import ItemControl from "./radio-item-control.svelte";
import ItemText from "./radio-item-text.svelte";
import Indicator from "./radio-indicator.svelte";
import ItemHiddenInput from "./radio-item-hidden-input.svelte";
import Label from "./radio-label.svelte";

export {
	RADIO_GROUP_CTX,
	radioGroup,
	type RadioGroupVariants,
	type RadioGroupContext,
} from "./radio-group.svelte";

export const RadioGroup = Group;
export const RadioItem = Item;
export const RadioItemControl = ItemControl;
export const RadioItemText = ItemText;
export const RadioIndicator = Indicator;
export const RadioItemHiddenInput = ItemHiddenInput;
export const RadioLabel = Label;

export const Radio = {
	Group,
	Item,
	ItemControl,
	ItemText,
	Indicator,
	ItemHiddenInput,
	Label,
};
