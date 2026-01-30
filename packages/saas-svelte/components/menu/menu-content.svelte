<script lang="ts">
	import { Menu, useMenuContext } from "@ark-ui/svelte/menu";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";
	import "./menu-animations.css";

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

