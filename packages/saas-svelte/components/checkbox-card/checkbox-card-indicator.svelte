<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import {
		CHECKBOX_CARD_CTX,
		type CheckboxCardVariants,
	} from "./checkbox-card-root.svelte";
	import { Flex } from "$saas/layout/flex";

	const checkboxCardIndicator = tv({
		base: [
			"shrink-0",
			"rounded",
			"border",
			"focus-visible:outline-offset-2",
			"focus-visible:outline-1",
			"focus-visible:outline-solid",
			"focus-visible:outline-(--c-solid)",
			"disabled:opacity-50",
			"fill-none",
			"stroke-current",
			"stroke-[3px]",
			"[stroke-linecap:round]",
			"[stroke-linejoin:round]",
			"text-white",
		],
		variants: {
			size: {
				sm: "size-3.5",
				md: "size-4 p-0.5",
				lg: "size-5 p-0.5",
			},
			variant: {
				subtle: "",
				surface: "",
				outline: "",
			},
			checked: {
				true: "",
				false: "",
			},
			disabled: {
				true: "opacity-50",
				false: "",
			},
		},
		compoundVariants: [
			// Unchecked - gray border for all variants
			{
				checked: false,
				class: "border-border-emphasized",
			},
			// Checked - solid background for all variants
			{
				checked: true,
				class: "bg-(--c-solid) border-(--c-solid)",
			},
		],
		defaultVariants: {
			size: "md",
			variant: "outline",
			checked: false,
			disabled: false,
		},
	});

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { class: className, ...restProps }: Props = $props();

	const ctx = getContext<{
		size: CheckboxCardVariants["size"];
		variant: CheckboxCardVariants["variant"];
		checked: boolean;
		disabled: boolean;
	}>(CHECKBOX_CARD_CTX);

	const size = $derived(ctx?.size ?? "md");
	const variant = $derived(ctx?.variant ?? "outline");
	const checked = $derived(ctx?.checked ?? false);
	const disabled = $derived(ctx?.disabled ?? false);

	const iconSize = {
		sm: "size-2.5",
		md: "size-3",
		lg: "size-3.5",
	} as const;

	const finalClass = $derived(
		twMerge(
			checkboxCardIndicator({
				size,
				variant,
				checked,
				disabled,
			}),
			className as string,
		),
	);
</script>

<Flex inline align="center" justify="center" class={finalClass} {...restProps}>
	{#if checked}
		<CheckIcon
			class={iconSize[size ?? "md"]}
			weight="bold"
			aria-hidden="true"
		/>
	{/if}
</Flex>
