<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
import { Text } from "$saas/typography/text";

interface Props {
	/**
	 * The command content (keyboard shortcut).
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className }: Props = $props();

const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Text as="span" class={twMerge(ctx?.styles?.itemCommand() ?? "", className as string)}>
	{@render children()}
</Text>
