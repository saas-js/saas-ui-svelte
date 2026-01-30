<script lang="ts">
import { FileUpload as ArkFileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadClearTriggerProps } from "@ark-ui/svelte/file-upload";
import type { Snippet } from "svelte";

interface Props extends Omit<FileUploadClearTriggerProps, "children"> {
	/**
	 * The content of the clear trigger.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...rest }: Props = $props();
</script>

<ArkFileUpload.ClearTrigger class={className} {...rest}>
	{@render children?.()}
</ArkFileUpload.ClearTrigger>
