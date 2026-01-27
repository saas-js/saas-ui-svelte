<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

	interface Props {
		/**
		 * The footer content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: unknown;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

<div class={ctx?.styles?.footer({ class: className })} {...rest}>
	{@render children()}
</div>
