<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { NAVBAR_CTX, type NavbarContext } from "./navbar-root.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Maximum width using Tailwind classes like "max-w-4xl", "max-w-6xl". */
		maxW?: string;
		/** Content to render inside the navbar content area. */
		children?: Snippet;
		/** Additional CSS classes to apply. */
		class?: string;
	}

	let { maxW, children, class: className, ...rest }: Props = $props();

	const ctx = getContext<NavbarContext>(NAVBAR_CTX);
	const finalClass = $derived(
		ctx?.styles?.content({
			class: [maxW, className].filter(Boolean).join(" ") || undefined,
		}),
	);
</script>

<div class={finalClass} {...rest}>
	{@render children?.()}
</div>
