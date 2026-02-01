<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

	interface Props {
		/**
		 * The context trigger content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.ContextTrigger
	class={twMerge(ctx?.styles?.contextTrigger() ?? "", className as string)}
	{...rest}
>
	{@render children()}
</Menu.ContextTrigger>
