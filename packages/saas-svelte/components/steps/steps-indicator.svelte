<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";

	interface Props {
		/**
		 * The index of this step.
		 */
		index: number;
		/**
		 * Whether this step is the current step.
		 */
		current?: boolean;
		/**
		 * Whether this step is completed.
		 */
		completed?: boolean;
		/**
		 * Content to render inside the indicator (defaults to step number).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		[key: string]: any;
	}

	let {
		index,
		current = false,
		completed = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	const ctx = getContext<StepsContext>(STEPS_CTX);
	const baseClass = $derived(ctx?.styles?.indicator());
</script>

<Steps.Indicator
	class={twMerge(
		baseClass,
		"bg-bg-default border-border-default text-fg-muted",
		current && "border-(--c-solid) text-fg-default",
		completed && "bg-(--c-solid) border-0 text-(--c-contrast)",
		className as string,
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{index + 1}
	{/if}
</Steps.Indicator>
