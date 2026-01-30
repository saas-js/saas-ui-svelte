<script lang="ts" module>
	// Wrapper components for complex FileUpload stories
	// These are imported by FileUpload.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { FileUpload } from "$saas/components/file-upload";
	import { Text } from "$saas/typography/text";
	import { Heading } from "$saas/typography/heading";
	import { Icon } from "$saas/components/icon";
	import { CloseButton } from "$saas/components/close-button";
	import { Input } from "$saas/components/input";
	import UploadSimple from "phosphor-svelte/lib/UploadSimple";
	import Camera from "phosphor-svelte/lib/Camera";
	import FileArrowUp from "phosphor-svelte/lib/FileArrowUp";

	interface Props {
		story:
			| "basic"
			| "directory"
			| "mediaCapture"
			| "multipleFiles"
			| "dropzone"
			| "input"
			| "clearable"
			| "acceptedFiles";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<FileUpload.Root>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload file
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{:else if story === "directory"}
	<FileUpload.Root directory>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload folder
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{:else if story === "mediaCapture"}
	<FileUpload.Root capture="environment">
		<FileUpload.Trigger>
			<Icon as={Camera} weight="fill" />
			Open Camera
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{:else if story === "multipleFiles"}
	<FileUpload.Root maxFiles={5}>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload files
		</FileUpload.Trigger>
		<FileUpload.List showSize clearable />
	</FileUpload.Root>
{:else if story === "dropzone"}
	<FileUpload.Root maxFiles={10} class="items-stretch max-w-xl">
		<FileUpload.Dropzone>
			<Icon as={UploadSimple} size="xl" class="text-fg-muted" />
			<Heading size="sm">Drag and drop here to upload</Heading>
			<Text size="sm" class="text-fg-muted">.png, .jpg up to 5MB</Text>
		</FileUpload.Dropzone>
		<FileUpload.List showSize clearable />
	</FileUpload.Root>
{:else if story === "input"}
	<FileUpload.Root class="gap-1 max-w-72">
		<FileUpload.Label>Upload file</FileUpload.Label>
		<FileUpload.Input />
	</FileUpload.Root>
{:else if story === "clearable"}
	<FileUpload.Root class="gap-1 max-w-72">
		<FileUpload.Label>Upload file</FileUpload.Label>
		<Input.Group>
			<Input.Element placement="left">
				<Icon as={FileArrowUp} size="sm" />
			</Input.Element>
			<FileUpload.Input class="ps-9 pe-9" />
			<Input.Element placement="right" class="pointer-events-auto">
				<FileUpload.ClearTrigger>
					<CloseButton size="xs" variant="ghost" class="me-1" />
				</FileUpload.ClearTrigger>
			</Input.Element>
		</Input.Group>
	</FileUpload.Root>
{:else if story === "acceptedFiles"}
	<FileUpload.Root accept={["image/png"]}>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload file
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{/if}
