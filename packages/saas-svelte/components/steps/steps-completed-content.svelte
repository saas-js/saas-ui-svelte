<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";

	interface Props {
		/**
		 * The content to render when all steps are complete.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<StepsContext>(STEPS_CTX);
	const finalClass = $derived(
		twMerge(ctx?.styles?.content(), className as string),
	);
</script>

<Steps.CompletedContent class={finalClass} {...restProps}>
	{@render children?.()}
</Steps.CompletedContent>
