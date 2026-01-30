<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import { getContext } from "svelte";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

interface Props {
	/**
	 * The link text.
	 */
	children: import("svelte").Snippet;
	/**
	 * The unique value of the menu item.
	 */
	value: string;
	/**
	 * The URL to navigate to.
	 */
	href: string;
	/**
	 * Where to open the link.
	 */
	target?: string;
	/**
	 * Relationship of the linked URL.
	 */
	rel?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: unknown;
}

let {
	children,
	value,
	href,
	target,
	rel,
	class: className,
	...rest
}: Props = $props();

const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.Item value={value} {...rest}>
	{#snippet asChild(itemProps)}
		<a
			href={href}
			target={target}
			rel={rel}
			class={ctx?.styles?.item({ class: className })}
			style={ctx?.colourStyle}
			{...itemProps()}
		>
			{@render children()}
		</a>
	{/snippet}
</Menu.Item>
