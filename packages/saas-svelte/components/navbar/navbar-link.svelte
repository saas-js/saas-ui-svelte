<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { NAVBAR_CTX, type NavbarContext } from "./navbar-root.svelte";

	interface Props extends HTMLAnchorAttributes {
		/** Whether this link is currently active. @default false */
		active?: boolean;
		/** Content to render inside the link. */
		children?: Snippet;
		/** Additional CSS classes to apply. */
		class?: string;
	}

	let {
		active = false,
		children,
		class: className,
		...rest
	}: Props = $props();

	const ctx = getContext<NavbarContext>(NAVBAR_CTX);
	const finalClass = $derived(ctx?.styles?.link({ class: className }));
</script>

<a
	class={finalClass}
	data-active={active ? "" : undefined}
	aria-current={active ? "page" : undefined}
	{...rest}
>
	{@render children?.()}
</a>
