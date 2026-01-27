<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import type { MenuRadioItemProps } from "@ark-ui/svelte/menu";
	import { getContext, type Snippet } from "svelte";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
	import Check from "phosphor-svelte/lib/Check";

	interface Props extends MenuRadioItemProps {
		/**
		 * The radio item content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to show the radio indicator. @default true
		 */
		showIndicator?: boolean;
		/**
		 * Element to render at the start of the item (for custom content, overrides showIndicator).
		 */
		startElement?: Snippet;
	}

	let {
		children,
		class: className,
		showIndicator = true,
		startElement,
		...rest
	}: Props = $props();

	const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.RadioItem
	class={ctx?.styles?.item({ class: className })}
	style={ctx?.colourStyle}
	{...rest}
>
	{#if startElement}
		<span class="flex items-center justify-center w-4 shrink-0">
			{@render startElement()}
		</span>
	{:else if showIndicator}
		<span class="flex items-center justify-center w-4 shrink-0">
			<Menu.ItemIndicator class={ctx?.styles?.itemIndicator()}>
				<Check class="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
			</Menu.ItemIndicator>
		</span>
	{/if}
	<Menu.ItemText class="flex-1">
		{@render children()}
	</Menu.ItemText>
</Menu.RadioItem>
