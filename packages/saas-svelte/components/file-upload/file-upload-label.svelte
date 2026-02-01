<script module lang="ts">
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";

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

<ArkFileUpload.Label
	class={twMerge(fileUploadLabel(), className as string)}
	{...rest}
>
	{@render children?.()}
</ArkFileUpload.Label>
