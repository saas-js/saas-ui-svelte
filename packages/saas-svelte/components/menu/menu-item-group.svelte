<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import { getContext, type Snippet } from "svelte";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

interface Props {
	/**
	 * The menu item group content.
	 */
	children: Snippet;
	/**
	 * The group title/label.
	 */
	title?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { children, title, class: className, ...rest }: Props = $props();

const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.ItemGroup class={ctx?.styles?.itemGroup({ class: className })} {...rest}>
	{#if title}
		<Menu.ItemGroupLabel class={ctx?.styles?.itemGroupLabel()}>
			{title}
		</Menu.ItemGroupLabel>
	{/if}
	{@render children()}
</Menu.ItemGroup>
