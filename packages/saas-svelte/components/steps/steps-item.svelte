<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const stepIndicator = tv({
		base: "",
		variants: {
			variant: {
				subtle: "bg-bg-muted text-fg-muted border-0",
				solid: "border-border-default bg-bg-default text-fg-muted border-2",
			},
			state: {
				incomplete: "",
				current: "",
				completed: "",
			},
		},
		compoundVariants: [
			// Subtle + current
			{
				variant: "subtle",
				state: "current",
				class: "text-fg-default",
			},
			// Subtle + completed
			{
				variant: "subtle",
				state: "completed",
				class: "bg-bg-emphasized text-fg-default",
			},
			// Solid + current
			{
				variant: "solid",
				state: "current",
				class: "bg-bg-muted text-fg-default border-(--c-solid)",
			},
			// Solid + completed
			{
				variant: "solid",
				state: "completed",
				class: "border-0 bg-(--c-solid) text-(--c-contrast)",
			},
		],
		defaultVariants: {
			variant: "solid",
			state: "incomplete",
		},
	});

	export type StepIndicatorVariants = VariantProps<typeof stepIndicator>;
</script>

<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import { getContext, type Snippet, type Component } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { STEPS_CTX, type StepsContext } from "./steps-root.svelte";
	import StepsTrigger from "./steps-trigger.svelte";
	import StepsSeparator from "./steps-separator.svelte";
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import { Icon } from "$saas/components/icon";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

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
	const finalClass = $derived(
		twMerge(ctx?.styles?.item(), className as string),
	);

	function handlePrefetch() {
		ctx?.onPrefetch?.(index);
	}
</script>

<Steps.Item
	{index}
	class={finalClass}
	onmouseenter={handlePrefetch}
	onfocusin={handlePrefetch}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Steps.ItemContext>
			{#snippet render(itemCtx)}
				{@const state = itemCtx()}
				{@const indicatorState = state.completed
					? "completed"
					: state.current
						? "current"
						: "incomplete"}
				<StepsTrigger {index} aria-label={ariaLabel ?? title}>
					<Steps.Indicator
						class={twMerge(
							ctx?.styles?.indicator(),
							stepIndicator({
								variant:
									ctx?.variant === "subtle"
										? "subtle"
										: "solid",
								state: indicatorState,
							}),
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
						<Stack gap={0}>
							{#if title}
								<Text
									as="span"
									class={twMerge(ctx?.styles?.title())}
									>{title}</Text
								>
							{/if}
							{#if description}
								<Text
									as="span"
									class={twMerge(ctx?.styles?.description())}
								>
									{description}
								</Text>
							{/if}
						</Stack>
					{/if}
				</StepsTrigger>
				<StepsSeparator
					{index}
					last={state.last}
					completed={state.completed}
				/>
			{/snippet}
		</Steps.ItemContext>
	{/if}
</Steps.Item>
