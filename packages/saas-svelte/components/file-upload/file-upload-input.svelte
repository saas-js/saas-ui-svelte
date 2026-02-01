<script module lang="ts">
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";

	export const fileUploadInput = tv({
		base: [
			"appearance-none text-start outline-0",
			"w-full min-w-8 h-8",
			"text-sm leading-5",
			"relative px-3 rounded",
			"border border-border-default",
			"antialiased",
			"overflow-hidden",
			"disabled:opacity-50 disabled:cursor-not-allowed",
			"focus-visible:outline-solid focus-visible:outline-fg-muted focus-visible:border-fg-muted",
			"hover:border-border-emphasized hover:focus-visible:border-fg-muted",
			"cursor-pointer",
		],
	});
</script>

<script lang="ts">
	import {
		FileUpload as ArkFileUpload,
		useFileUploadContext,
	} from "@ark-ui/svelte/file-upload";
	import type { FileUploadTriggerProps } from "@ark-ui/svelte/file-upload";
	import { Text } from "$saas/typography/text";

	interface Props extends Omit<FileUploadTriggerProps, "children"> {
		/**
		 * Placeholder text when no file is selected.
		 * @default "Select file(s)"
		 */
		placeholder?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		placeholder = "Select file(s)",
		class: className,
		...rest
	}: Props = $props();

	const fileUpload = useFileUploadContext();
	const acceptedFiles = $derived(fileUpload().acceptedFiles);
	const displayText = $derived(
		acceptedFiles.length > 0
			? acceptedFiles.map((f) => f.name).join(", ")
			: null,
	);
</script>

<ArkFileUpload.Trigger
	class={twMerge(fileUploadInput(), className as string)}
	{...rest}
>
	{#if displayText}
		<Text as="span" size="sm" truncate class="block min-w-0"
			>{displayText}</Text
		>
	{:else}
		<Text as="span" size="sm" class="text-fg-muted">{placeholder}</Text>
	{/if}
</ArkFileUpload.Trigger>
