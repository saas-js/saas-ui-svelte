<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";

	interface Props {
		/**
		 * The step items to render.
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
		twMerge(ctx?.styles?.list(), className as string),
	);
</script>

{#snippet customList(getProps: () => Record<string, any>)}
	{@const allProps = getProps()}
	{@const {
		"aria-orientation": _orientation,
		"aria-owns": _owns,
		role: _role,
		class: propClass,
		...cleanProps
	} = allProps}
	<ol
		{...cleanProps}
		class={twMerge(propClass, finalClass)}
		role="group"
		aria-label="Steps"
		{...restProps}
	>
		{#if children}
			{@render children()}
		{/if}
	</ol>
{/snippet}

<Steps.List asChild={customList} />
