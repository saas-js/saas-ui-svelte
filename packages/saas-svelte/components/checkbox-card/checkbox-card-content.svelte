<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import {
	CHECKBOX_CARD_CTX,
	type CheckboxCardVariants,
} from "./checkbox-card-root.svelte";
import { VStack } from "$saas/layout/stack";

const checkboxCardContent = tv({
	base: ["flex-1"],
	variants: {
		align: {
			start: "text-start",
			center: "text-center",
			end: "text-end",
		},
	},
	defaultVariants: {
		align: "start",
	},
});

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Alignment of the content.
	 * @default "start"
	 */
	align?: "start" | "center" | "end";
	/**
	 * The content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	align = "start",
	children,
	class: className,
	...restProps
}: Props = $props();

const finalClass = $derived(
	twMerge(checkboxCardContent({ align }), className as string),
);
</script>

<VStack gap={1} align={align} class={finalClass} {...(restProps as Record<string, unknown>)}>
	{@render children()}
</VStack>
