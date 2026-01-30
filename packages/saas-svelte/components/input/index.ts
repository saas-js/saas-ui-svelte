import Root from "./input.svelte";
import Addon from "./input-addon.svelte";
import Group from "./input-group.svelte";
import Element from "./input-element.svelte";

export { input, type InputVariants } from "./input.svelte";

export { default as InputAddon } from "./input-addon.svelte";
export { default as InputGroup } from "./input-group.svelte";
export { default as InputElement } from "./input-element.svelte";

export const Input = Object.assign(Root, {
	Root,
	Addon,
	Group,
	Element,
});
