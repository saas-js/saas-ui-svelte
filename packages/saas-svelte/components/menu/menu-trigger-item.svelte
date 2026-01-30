<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuTriggerItemProps } from "@ark-ui/svelte/menu";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

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
	class={twMerge(ctx?.styles?.triggerItem() ?? "", className as string)}
	style={ctx?.colourStyle}
	{...rest}
>
	<span class="pointer-events-none flex-1">{@render children()}</span>
	<CaretRightIcon class="pointer-events-none size-3.5" />
</Menu.TriggerItem>
