<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";

	interface Props {
		/**
		 * The index of the step this content belongs to.
		 */
		index: number;
		/**
		 * The content to render.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		[key: string]: any;
	}

	let { index, children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<StepsContext>(STEPS_CTX);
	const finalClass = $derived(
		twMerge(ctx?.styles?.content(), className as string),
	);
</script>

<Steps.Content {index} class={finalClass} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</Steps.Content>
