<script module lang="ts">
	import { tv } from "tailwind-variants";

	export const fileUploadList = tv({
		slots: {
			root: "flex flex-col gap-2 w-full antialiased",
			item: [
				"flex items-center gap-3 p-3",
				"rounded-md border border-border-default",
				"bg-bg-default",
			],
			itemInfo: "flex-1 min-w-0",
			itemName: "text-sm font-medium truncate text-fg-default",
			itemSize: "text-xs text-fg-muted",
			itemDelete: [
				"shrink-0 p-1 rounded",
				"text-fg-muted hover:text-fg-default",
				"hover:bg-bg-subtle",
				"transition-colors duration-150",
				"cursor-pointer",
			],
		},
	});
</script>

<script lang="ts">
	import {
		FileUpload as ArkFileUpload,
		useFileUploadContext,
	} from "@ark-ui/svelte/file-upload";
	import X from "phosphor-svelte/lib/X";
	import File from "phosphor-svelte/lib/File";
	import { Icon } from "$saas/components/icon";

	interface Props {
		/**
		 * Whether to show the file size.
		 * @default false
		 */
		showSize?: boolean;
		/**
		 * Whether to show a delete button for each file.
		 * @default false
		 */
		clearable?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		showSize = false,
		clearable = false,
		class: className,
	}: Props = $props();

	const fileUpload = useFileUploadContext();
	const acceptedFiles = $derived(fileUpload().acceptedFiles);

	const { root, item, itemInfo, itemName, itemSize, itemDelete } =
		fileUploadList();

	function formatFileSize(bytes: number): string {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
	}
</script>

{#if acceptedFiles.length > 0}
	<ArkFileUpload.ItemGroup class={root({ class: className })}>
		{#each acceptedFiles as file}
			<ArkFileUpload.Item {file} class={item()}>
				<Icon as={File} size="lg" class="shrink-0 text-fg-muted" />
				<div class={itemInfo()}>
					<ArkFileUpload.ItemName class={itemName()} />
					{#if showSize}
						<ArkFileUpload.ItemSizeText class={itemSize()} />
					{/if}
				</div>
				{#if clearable}
					<ArkFileUpload.ItemDeleteTrigger class={itemDelete()}>
						<Icon as={X} size="sm" />
					</ArkFileUpload.ItemDeleteTrigger>
				{/if}
			</ArkFileUpload.Item>
		{/each}
	</ArkFileUpload.ItemGroup>
{/if}
