import Root from "./field-root.svelte";
import Label from "./field-label.svelte";
import HelperText from "./field-helper-text.svelte";
import ErrorText from "./field-error-text.svelte";

export { FIELD_CTX, type FieldContext, type FieldContextValue } from "./types";

export const FieldRoot = Root;
export const FieldLabel = Label;
export const FieldHelperText = HelperText;
export const FieldErrorText = ErrorText;

export const Field = {
	Root,
	Label,
	HelperText,
	ErrorText,
};
