<script module lang="ts">
import { tv } from "tailwind-variants";

export const fileUploadDropzone = tv({
	base: [
		"flex flex-col justify-center items-center gap-4",
		"p-4 rounded-md",
		"border border-dashed border-border-default",
		"bg-bg-default",
		"transition-colors duration-150 ease-out",
		"antialiased",
		"cursor-pointer",
		"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-fg-muted",
		"data-dragging:border-border-emphasized data-dragging:bg-bg-subtle",
	],
});
</script>

<script lang="ts">
import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadDropzoneProps } from "@ark-ui/svelte/file-upload";
import type { Snippet } from "svelte";

interface Props extends Omit<FileUploadDropzoneProps, "children"> {
	/**
	 * The content of the dropzone.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...rest }: Props = $props();
</script>

<ArkFileUpload.Dropzone
	class={fileUploadDropzone({ class: className })}
	{...rest}
>
	{@render children?.()}
</ArkFileUpload.Dropzone>
