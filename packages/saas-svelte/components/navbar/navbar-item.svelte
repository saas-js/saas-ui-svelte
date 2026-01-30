<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { NAVBAR_CTX, type NavbarContext } from "./navbar-root.svelte";

interface Props extends HTMLAttributes<HTMLLIElement> {
	/** Content to render inside the navbar item. */
	children?: Snippet;
	/** Additional CSS classes to apply. */
	class?: string;
}

let { children, class: className, ...rest }: Props = $props();

const ctx = getContext<NavbarContext>(NAVBAR_CTX);
const finalClass = $derived(ctx?.styles?.item({ class: className }));
</script>

<li class={finalClass} {...rest}>
	{@render children?.()}
</li>
