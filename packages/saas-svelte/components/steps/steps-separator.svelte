<script module lang="ts">
import { tv } from "tailwind-variants";

export const stepsSeparator = tv({
	base: "bg-border-default",
	variants: {
		variant: {
			subtle: "",
			solid: "",
		},
		completed: {
			true: "",
			false: "",
		},
		last: {
			true: "hidden",
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "subtle",
			completed: true,
			class: "bg-bg-emphasized",
		},
		{
			variant: "solid",
			completed: true,
			class: "bg-(--c-solid)",
		},
	],
	defaultVariants: {
		variant: "solid",
		completed: false,
		last: false,
	},
});
</script>

<script lang="ts">
import { Steps } from "@ark-ui/svelte/steps";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";

interface Props {
	/**
	 * The index of the step this separator follows.
	 */
	index: number;
	/**
	 * Whether this is the last separator (should be hidden).
	 */
	last?: boolean;
	/**
	 * Whether the step this separator follows is completed.
	 */
	completed?: boolean;
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	[key: string]: any;
}

let {
	index,
	last = false,
	completed = false,
	class: className,
	...restProps
}: Props = $props();

const ctx = getContext<StepsContext>(STEPS_CTX);
const baseClass = $derived(ctx?.styles?.separator());
const variant = $derived(ctx?.variant === "subtle" ? "subtle" : "solid");
</script>

<Steps.Separator
	class={twMerge(
		baseClass,
		stepsSeparator({ variant, completed, last }),
		className,
	)}
	{...restProps}
/>
