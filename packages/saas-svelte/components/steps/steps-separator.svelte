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
const isSubtle = $derived(ctx?.variant === "subtle");
</script>

<Steps.Separator
	class={twMerge(
		baseClass,
		"bg-border-default",
		// Subtle variant: completed separator gets emphasized bg
		isSubtle && completed && "bg-bg-emphasized",
		// Solid variant: completed separator gets accent solid color
		!isSubtle && completed && "bg-(--c-solid)",
		last && "hidden",
		className as string,
	)}
	{...restProps}
/>
