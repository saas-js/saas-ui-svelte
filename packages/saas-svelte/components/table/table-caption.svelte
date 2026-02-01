<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { getTableContext } from "./table.svelte";

	interface Props {
		/**
		 * Placement of the caption.
		 * @default "bottom"
		 */
		placement?: "top" | "bottom";
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Caption content.
		 */
		children?: Snippet;
	}

	let { placement = "bottom", class: className, children }: Props = $props();

	const ctx = getTableContext();
</script>

<caption
	class={twMerge(
		ctx?.styles.caption(),
		placement === "top" && "mt-0 mb-4 caption-top",
		className,
	)}
>
	{@render children?.()}
</caption>
