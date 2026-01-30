export type FieldType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "number-input"
	| "textarea"
	| "select"
	| "checkbox"
	| "radio"
	| "switch"
	| "slider"
	| "pin-input";

export interface FieldOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export const FORM_CTX = Symbol("FORM_CTX");
