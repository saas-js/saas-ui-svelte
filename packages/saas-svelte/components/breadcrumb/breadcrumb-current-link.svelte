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

// Current link is always default color (stands out from muted links)
const currentClasses = $derived(
	className ? `text-fg-default ${className}` : "text-fg-default",
);
</script>

<li class={styles?.item()}>
	<span role="link" aria-current="page" class={currentClasses} {...restProps}>
		{@render children()}
	</span>
</li>
