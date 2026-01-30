<script module lang="ts">
import { tv } from "tailwind-variants";

/**
 * Tailwind Variants styles for the Editable area component.
 */
export const editableArea = tv({
	base: ["relative", "inline-flex", "items-center", "w-full"],
});
</script>

<script lang="ts">
import { Editable } from "@ark-ui/svelte/editable";
import { twMerge } from "tailwind-merge";
import type { Snippet } from "svelte";

interface Props {
	/**
	 * The content to render inside the area.
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
</script>

<Editable.Area class={twMerge(editableArea(), className as string)} {...restProps}>
	{@render children?.()}
</Editable.Area>
