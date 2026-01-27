<script module lang="ts">
	import { tv } from "tailwind-variants";

	export const fileUploadLabel = tv({
		base: ["text-sm font-medium leading-5 antialiased"],
	});
</script>

<script lang="ts">
	import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
	import type { FileUploadLabelProps } from "@ark-ui/svelte/file-upload";
	import type { Snippet } from "svelte";

	interface Props extends Omit<FileUploadLabelProps, "children"> {
		/**
		 * The content of the label.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<ArkFileUpload.Label class={fileUploadLabel({ class: className })} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</ArkFileUpload.Label>
