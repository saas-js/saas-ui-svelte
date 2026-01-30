<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

interface Props {
	/**
	 * The radio item group content.
	 */
	children: Snippet;
	/**
	 * The controlled value of the radio group.
	 */
	value?: string;
	/**
	 * Handler called when the value changes.
	 */
	onValueChange?: (details: { value: string }) => void;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let {
	children,
	value = $bindable(),
	onValueChange,
	class: className,
	...rest
}: Props = $props();

const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.RadioItemGroup
	bind:value={value}
	onValueChange={(e) => onValueChange?.(e)}
	class={twMerge(ctx?.styles?.itemGroup() ?? "", className as string)}
	{...rest}
>
	{@render children()}
</Menu.RadioItemGroup>
