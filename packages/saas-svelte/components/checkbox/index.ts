import Root from "./checkbox-root.svelte";
import Control from "./checkbox-control.svelte";
import Label from "./checkbox-label.svelte";
import Indicator from "./checkbox-indicator.svelte";
import HiddenInput from "./checkbox-hidden-input.svelte";
import Group from "./checkbox-group.svelte";

export {
	CHECKBOX_CTX,
	checkbox,
	type CheckboxVariants,
	type CheckboxContext,
} from "./checkbox-root.svelte";

export {
	checkboxGroup,
	type CheckboxGroupVariants,
} from "./checkbox-group.svelte";

export const CheckboxRoot = Root;
export const CheckboxControl = Control;
export const CheckboxLabel = Label;
export const CheckboxIndicator = Indicator;
export const CheckboxHiddenInput = HiddenInput;
export const CheckboxGroup = Group;

export const Checkbox = {
	Root,
	Control,
	Label,
	Indicator,
	HiddenInput,
	Group,
};
