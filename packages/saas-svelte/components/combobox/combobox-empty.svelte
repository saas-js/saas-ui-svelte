<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
import { Flex } from "$saas/layout/flex";

interface Props {
	/**
	 * The empty state content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className }: Props = $props();

const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Flex class={twMerge(ctx?.styles?.empty() ?? "", className as string)}>
	{@render children()}
</Flex>
