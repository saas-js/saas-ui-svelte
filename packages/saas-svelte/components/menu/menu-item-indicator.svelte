<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import { getContext, type Snippet } from "svelte";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
	import Check from "phosphor-svelte/lib/Check";

	interface Props {
		/**
		 * Custom indicator content.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.ItemIndicator
	class={ctx?.styles?.itemIndicator({ class: className })}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<Check class="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
	{/if}
</Menu.ItemIndicator>
