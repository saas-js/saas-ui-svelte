<script module lang="ts">
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

export const fileUploadList = tv({
	slots: {
		root: "w-full antialiased",
		item: [
			"flex items-center gap-3 p-3",
			"rounded-md border border-border-default",
			"bg-bg-default",
		],
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
import XIcon from "phosphor-svelte/lib/XIcon";
import FileIcon from "phosphor-svelte/lib/FileIcon";
import { Icon } from "$saas/components/icon";
import { Stack } from "$saas/layout/stack";

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

let { showSize = false, clearable = false, class: className }: Props = $props();

const fileUpload = useFileUploadContext();
const acceptedFiles = $derived(fileUpload().acceptedFiles);

const styles = fileUploadList();
</script>

{#if acceptedFiles.length > 0}
	<ArkFileUpload.ItemGroup class={twMerge(styles.root(), className as string)}>
		<Stack direction="column" gap={2}>
			{#each acceptedFiles as file}
				<ArkFileUpload.Item file={file} class={styles.item()}>
					<Icon as={FileIcon} size="lg" class="text-fg-muted shrink-0" />
					<Stack direction="column" gap={0} class="flex-1 min-w-0">
						<ArkFileUpload.ItemName class={styles.itemName()} />
						{#if showSize}
							<ArkFileUpload.ItemSizeText class={styles.itemSize()} />
						{/if}
					</Stack>
					{#if clearable}
						<ArkFileUpload.ItemDeleteTrigger class={styles.itemDelete()}>
							<Icon as={XIcon} size="sm" />
						</ArkFileUpload.ItemDeleteTrigger>
					{/if}
				</ArkFileUpload.Item>
			{/each}
		</Stack>
	</ArkFileUpload.ItemGroup>
{/if}
