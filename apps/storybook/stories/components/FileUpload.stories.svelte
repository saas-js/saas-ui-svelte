<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { FileUpload } from "$saas/components/file-upload";
	import { Button } from "$saas/components/button";
	import { Text } from "$saas/typography/text";
	import { Heading } from "$saas/typography/heading";
	import { Stack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import { CloseButton } from "$saas/components/close-button";
	import { Input } from "$saas/components/input";
	import UploadSimple from "phosphor-svelte/lib/UploadSimple";
	import Camera from "phosphor-svelte/lib/Camera";
	import FileArrowUp from "phosphor-svelte/lib/FileArrowUp";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/File Upload",
		component: FileUpload.Root,
		argTypes: {
			maxFiles: {
				control: "number",
				description: "Maximum number of files allowed.",
				table: { defaultValue: { summary: "1" } },
			},
			maxFileSize: {
				control: "number",
				description: "Maximum file size in bytes.",
			},
			accept: {
				control: "object",
				description: "Accepted file types.",
			},
			disabled: commonArgTypes.disabled,
			invalid: commonArgTypes.invalid,
			directory: {
				control: "boolean",
				description: "Whether to allow directory selection.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"maxFiles",
				"maxFileSize",
				"accept",
				"disabled",
				"invalid",
				"directory",
				"class",
			]),
		},
		args: {
			maxFiles: 1,
			disabled: false,
			invalid: false,
			directory: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<FileUpload.Root {...args}>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload file
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{/snippet}

{#snippet directoryStory()}
	<FileUpload.Root directory>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload folder
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{/snippet}

{#snippet mediaCaptureStory()}
	<FileUpload.Root capture="environment">
		<FileUpload.Trigger>
			<Icon as={Camera} weight="fill" />
			Open Camera
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{/snippet}

{#snippet multipleFilesStory()}
	<FileUpload.Root maxFiles={5}>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload files
		</FileUpload.Trigger>
		<FileUpload.List showSize clearable />
	</FileUpload.Root>
{/snippet}

{#snippet dropzoneStory()}
	<FileUpload.Root maxFiles={10} class="max-w-xl items-stretch">
		<FileUpload.Dropzone>
			<Icon as={UploadSimple} size="xl" class="text-fg-muted" />
			<Heading size="sm">Drag and drop here to upload</Heading>
			<Text size="sm" class="text-fg-muted">.png, .jpg up to 5MB</Text>
		</FileUpload.Dropzone>
		<FileUpload.List showSize clearable />
	</FileUpload.Root>
{/snippet}

{#snippet inputStory()}
	<FileUpload.Root class="gap-1 max-w-72">
		<FileUpload.Label>Upload file</FileUpload.Label>
		<FileUpload.Input />
	</FileUpload.Root>
{/snippet}

{#snippet clearableStory()}
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
{/snippet}

{#snippet acceptedFilesStory()}
	<FileUpload.Root accept={["image/png"]}>
		<FileUpload.Trigger>
			<Icon as={UploadSimple} />
			Upload file
		</FileUpload.Trigger>
		<FileUpload.List />
	</FileUpload.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Directory" template={directoryStory} />

<Story name="Media Capture" template={mediaCaptureStory} />

<Story name="Multiple Files" template={multipleFilesStory} />

<Story name="Dropzone" template={dropzoneStory} />

<Story name="Input" template={inputStory} />

<Story name="Clearable" template={clearableStory} />

<Story name="Accepted Files" template={acceptedFilesStory} />
