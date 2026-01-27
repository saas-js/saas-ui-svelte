<script module lang="ts">
	import { tv } from "tailwind-variants";

	/**
	 * Tailwind Variants styles for the Editable control component.
	 */
	export const editableControl = tv({
		base: ["inline-flex", "items-center", "gap-1"],
	});
</script>

<script lang="ts">
	import { Editable } from "@ark-ui/svelte/editable";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The content to render inside the control.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		/**
		 * Additional props passed to Ark UI.
		 */
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const finalClass = $derived(twMerge(editableControl(), className));
</script>

<Editable.Control class={finalClass} {...restProps}>
	{@render children?.()}
</Editable.Control>
