<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuItemProps } from "@ark-ui/svelte/menu";
import { getContext, type Snippet } from "svelte";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

interface Props extends MenuItemProps {
	/**
	 * The menu item content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...rest }: Props = $props();

const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.Item
	class={ctx?.styles?.item({ class: className })}
	style={ctx?.colourStyle}
	{...rest}
>
	{@render children()}
</Menu.Item>
