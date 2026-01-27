<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import type { MenuTriggerItemProps } from "@ark-ui/svelte/menu";
	import { getContext, type Snippet } from "svelte";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
	import CaretRight from "phosphor-svelte/lib/CaretRight";

	interface Props extends MenuTriggerItemProps {
		/**
		 * The trigger item content.
		 */
		children: Snippet;
		/**
		 * The unique value of the menu item.
		 */
		value: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, value, class: className, ...rest }: Props = $props();

	const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.TriggerItem
	data-value={value}
	class={ctx?.styles?.triggerItem({ class: className })}
	style={ctx?.colourStyle}
	{...rest}
>
	<span class="flex-1 pointer-events-none">{@render children()}</span>
	<CaretRight class="w-3.5 h-3.5 pointer-events-none" />
</Menu.TriggerItem>
