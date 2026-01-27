<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import {
		BREADCRUMB_CTX,
		type BreadcrumbContext,
	} from "./breadcrumb-root.svelte";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * The current page content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const context = getContext<BreadcrumbContext>(BREADCRUMB_CTX);
	const styles = $derived(context?.styles);

	const currentClasses = $derived.by(() => {
		// Current link is always default color (stands out from muted links)
		return ["text-fg-default", className].filter(Boolean).join(" ");
	});
</script>

<li class={styles?.item()}>
	<span role="link" aria-current="page" class={currentClasses} {...restProps}>
		{@render children()}
	</span>
</li>
