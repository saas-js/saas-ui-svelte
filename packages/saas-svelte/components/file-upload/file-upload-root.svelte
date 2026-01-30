<script module lang="ts">
import { tv } from "tailwind-variants";

export const fileUploadRoot = tv({
	base: ["flex flex-col items-start gap-4 w-full antialiased"],
});
</script>

<script lang="ts">
import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadRootProps } from "@ark-ui/svelte/file-upload";
import type { Snippet } from "svelte";

interface Props extends Omit<FileUploadRootProps, "children"> {
	/**
	 * The accepted file types.
	 */
	accept?: FileUploadRootProps["accept"];
	/**
	 * Whether to allow drag and drop.
	 * @default true
	 */
	allowDrop?: boolean;
	/**
	 * The capture mode for mobile devices.
	 */
	capture?: "user" | "environment";
	/**
	 * Whether to allow directory selection.
	 * @default false
	 */
	directory?: boolean;
	/**
	 * Whether the file upload is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether the file upload is invalid.
	 * @default false
	 */
	invalid?: boolean;
	/**
	 * The maximum number of files.
	 * @default 1
	 */
	maxFiles?: number;
	/**
	 * The maximum file size in bytes.
	 */
	maxFileSize?: number;
	/**
	 * The minimum file size in bytes.
	 */
	minFileSize?: number;
	/**
	 * The name attribute for the hidden input.
	 */
	name?: string;
	/**
	 * Whether the file upload is required.
	 * @default false
	 */
	required?: boolean;
	/**
	 * Callback when files are accepted.
	 */
	onFileAccept?: FileUploadRootProps["onFileAccept"];
	/**
	 * Callback when files change.
	 */
	onFileChange?: FileUploadRootProps["onFileChange"];
	/**
	 * Callback when files are rejected.
	 */
	onFileReject?: FileUploadRootProps["onFileReject"];
	/**
	 * The content of the file upload.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	accept,
	allowDrop = true,
	capture,
	directory = false,
	disabled = false,
	invalid = false,
	maxFiles = 1,
	maxFileSize,
	minFileSize,
	name,
	required = false,
	onFileAccept,
	onFileChange,
	onFileReject,
	children,
	class: className,
	...rest
}: Props = $props();
</script>

<ArkFileUpload.Root
	accept={accept}
	allowDrop={allowDrop}
	capture={capture}
	directory={directory}
	disabled={disabled}
	invalid={invalid}
	maxFiles={maxFiles}
	maxFileSize={maxFileSize}
	minFileSize={minFileSize}
	name={name}
	required={required}
	onFileAccept={onFileAccept}
	onFileChange={onFileChange}
	onFileReject={onFileReject}
	class={fileUploadRoot({ class: className })}
	{...rest}
>
	<ArkFileUpload.HiddenInput aria-label="Upload file" />
	{@render children?.()}
</ArkFileUpload.Root>
