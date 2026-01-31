<script lang="ts">
import { Steps } from "@ark-ui/svelte/steps";
import { getContext, type Snippet, type Component } from "svelte";
import { twMerge } from "tailwind-merge";
import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";
import StepsTrigger from "./steps-trigger.svelte";
import StepsSeparator from "./steps-separator.svelte";
import CheckIcon from "phosphor-svelte/lib/CheckIcon";
import { Icon } from "$saas/components/icon";

interface Props {
	/**
	 * The index of this step (0-indexed).
	 */
	index: number;
	/**
	 * The title of this step.
	 */
	title?: string;
	/**
	 * The description of this step.
	 */
	description?: string;
	/**
	 * Custom icon component to display instead of number.
	 */
	icon?: Component<any>;
	/**
	 * Custom content for the step item.
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
	title,
	description,
	icon,
	children,
	class: className,
	"aria-label": ariaLabel,
	...restProps
}: Props = $props();

const ctx = getContext<StepsContext>(STEPS_CTX);
const finalClass = $derived(twMerge(ctx?.styles?.item(), className as string));

function handlePrefetch() {
	ctx?.onPrefetch?.(index);
}
</script>

<Steps.Item index={index} class={finalClass} onmouseenter={handlePrefetch} onfocusin={handlePrefetch} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<Steps.ItemContext>
			{#snippet render(itemCtx)}
				{@const state = itemCtx()}
				{@const isSubtle = ctx?.variant === "subtle"}
				<StepsTrigger index={index} aria-label={ariaLabel ?? title}>
					<Steps.Indicator
						class={twMerge(
							ctx?.styles?.indicator(),
							// Subtle variant base: no border, muted bg
							isSubtle && "bg-bg-muted text-fg-muted border-0",
							isSubtle && state.current && "text-fg-default",
							isSubtle &&
								state.completed &&
								"bg-bg-emphasized text-fg-default",
							// Solid variant base: has border
							!isSubtle &&
								"border-border-default bg-bg-default text-fg-muted border-2",
							!isSubtle &&
								state.current &&
								"bg-bg-muted text-fg-default border-(--c-solid)",
							!isSubtle &&
								state.completed &&
								"border-0 bg-(--c-solid) text-(--c-contrast)",
						)}
					>
						{#if state.completed}
							<Icon as={CheckIcon} size="sm" />
						{:else if icon}
							<Icon as={icon} size="sm" />
						{:else}
							{index + 1}
						{/if}
					</Steps.Indicator>
					{#if title || description}
						<div class="flex flex-col">
							{#if title}
								<div class={ctx?.styles?.title()}>{title}</div>
							{/if}
							{#if description}
								<div class={ctx?.styles?.description()}>
									{description}
								</div>
							{/if}
						</div>
					{/if}
				</StepsTrigger>
				<StepsSeparator
					index={index}
					last={state.last}
					completed={state.completed}
				/>
			{/snippet}
		</Steps.ItemContext>
	{/if}
</Steps.Item>
