<script lang="ts">
	import { Menu, useMenuContext } from "@ark-ui/svelte/menu";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

	interface Props {
		/**
		 * The menu content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to render the menu in a portal.
		 * @default true
		 */
		portal?: boolean;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		portal = true,
		...rest
	}: Props = $props();

	const ctx = getContext<MenuContext>(MENU_CTX);
	const menuApi = useMenuContext();

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Tab") {
			menuApi().setOpen(false);
		}
	}
</script>

{#snippet menuContent()}
	<Menu.Positioner class={ctx?.styles?.positioner()}>
		<Menu.Content
			class={ctx?.styles?.content({ class: className })}
			style={ctx?.colourStyle}
			onkeydown={handleKeyDown}
			{...rest}
		>
			{@render children()}
		</Menu.Content>
	</Menu.Positioner>
{/snippet}

{#if portal}
	<Portal>
		{@render menuContent()}
	</Portal>
{:else}
	{@render menuContent()}
{/if}

<style global>
	/* Apply slide animations based on menu placement */
	[data-scope="menu"][data-part="content"][data-placement^="right"] {
		animation: var(--animate-submenu-right);
	}
	[data-scope="menu"][data-part="content"][data-placement^="left"] {
		animation: var(--animate-submenu-left);
	}
	[data-scope="menu"][data-part="content"][data-placement^="top"] {
		animation: var(--animate-submenu-top);
	}
	[data-scope="menu"][data-part="content"][data-placement^="bottom"] {
		animation: var(--animate-submenu-bottom);
	}
	/* Fallback for menus without explicit placement */
	[data-scope="menu"][data-part="content"]:not([data-placement]) {
		animation: var(--animate-menu-in);
	}
</style>
