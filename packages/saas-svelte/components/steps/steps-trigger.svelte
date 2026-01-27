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
		 * The content of the trigger.
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
		twMerge(ctx?.styles?.trigger(), className as string),
	);
</script>

{#snippet customTrigger(getProps: () => Record<string, any>)}
	{@const allProps = getProps()}
	{@const {
		"aria-selected": _selected,
		"aria-controls": _controls,
		role: _role,
		class: propClass,
		...cleanProps
	} = allProps}
	<button
		{...cleanProps}
		class={twMerge(propClass, finalClass)}
		type="button"
		{...restProps}
	>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/snippet}

<Steps.Trigger asChild={customTrigger} />
