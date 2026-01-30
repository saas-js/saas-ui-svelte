import Root from "./button.svelte";
import Group from "./button-group.svelte";

export { button, type ButtonVariants } from "./button.svelte";
export { default as ButtonGroup } from "./button-group.svelte";

export const Button = Object.assign(Root, {
	Root,
	Group,
});
