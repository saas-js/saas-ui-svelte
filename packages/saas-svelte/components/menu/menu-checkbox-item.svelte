<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuCheckboxItemProps } from "@ark-ui/svelte/menu";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
import CheckIcon from "phosphor-svelte/lib/CheckIcon";
import { Centre } from "$saas/layout/centre";

interface Props extends MenuCheckboxItemProps {
	/**
	 * The checkbox item content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Whether to show the checkbox indicator. @default true
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

<Menu.CheckboxItem
	class={twMerge(ctx?.styles?.item() ?? "", className as string)}
	style={ctx?.colourStyle}
	{...rest}
>
	{#if startElement}
		<Centre class="size-4 shrink-0">
			{@render startElement()}
		</Centre>
	{:else if showIndicator}
		<Centre class="size-4 shrink-0">
			<Menu.ItemIndicator class={ctx?.styles?.itemIndicator()}>
				<CheckIcon class="size-3.5" weight="bold" aria-hidden="true" />
			</Menu.ItemIndicator>
		</Centre>
	{/if}
	<Menu.ItemText class="flex-1">
		{@render children()}
	</Menu.ItemText>
</Menu.CheckboxItem>
