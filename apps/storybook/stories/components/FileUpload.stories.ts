import type { Meta, StoryObj } from "@storybook/sveltekit";
import { FileUpload } from "$saas/components/file-upload";
import FileUploadWrapper from "../wrappers/components/FileUpload.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
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
		docs: {
			description: {
				component:
					"A component for uploading files via drag and drop or file selection dialog.",
			},
		},
		anatomy: `<script>
  import {
    FileUpload,
    FileUploadRoot,
    FileUploadTrigger,
    FileUploadDropzone,
    FileUploadList,
    FileUploadLabel,
    FileUploadInput,
    FileUploadClearTrigger,
  } from "@saas-ui/svelte/components/file-upload";
</script>

<FileUpload.Root maxFiles={5}>
  <FileUpload.Dropzone>
    <FileUpload.Label>Drop files here</FileUpload.Label>
  </FileUpload.Dropzone>
  <FileUpload.Trigger>Select Files</FileUpload.Trigger>
  <FileUpload.List />
  <FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
</FileUpload.Root>`,
		subComponents: [
			{
				name: "FileUpload.Root",
				description: "The file upload container.",
				props: {
					accept: {
						type: "Record<string, string[]>",
						default: "-",
						description: "The accepted file types.",
					},
					allowDrop: {
						type: "boolean",
						default: "true",
						description: "Whether to allow drag and drop.",
					},
					capture: {
						type: '"user" | "environment"',
						default: "-",
						description: "The capture mode for mobile devices.",
					},
					directory: {
						type: "boolean",
						default: "false",
						description: "Whether to allow directory selection.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the file upload is disabled.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description: "Whether the file upload is invalid.",
					},
					maxFiles: {
						type: "number",
						default: "1",
						description: "The maximum number of files.",
					},
					maxFileSize: {
						type: "number",
						default: "-",
						description: "The maximum file size in bytes.",
					},
					minFileSize: {
						type: "number",
						default: "-",
						description: "The minimum file size in bytes.",
					},
					name: {
						type: "string",
						default: "-",
						description: "The name attribute for the hidden input.",
					},
					required: {
						type: "boolean",
						default: "false",
						description: "Whether the file upload is required.",
					},
					onFileAccept: {
						type: "function",
						default: "-",
						description: "Callback when files are accepted.",
					},
					onFileChange: {
						type: "function",
						default: "-",
						description: "Callback when files change.",
					},
					onFileReject: {
						type: "function",
						default: "-",
						description: "Callback when files are rejected.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the file upload.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "FileUpload.Trigger",
				description: "A button that opens the file selection dialog.",
				props: {
					variant: {
						type: '"solid" | "outline" | "ghost" | "surface" | "plain"',
						default: '"outline"',
						description: "The visual style of the trigger button.",
					},
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
						default: '"sm"',
						description: "The size of the trigger button.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour palette of the trigger button.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the trigger button.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "FileUpload.Dropzone",
				description: "A dropzone area for drag and drop file uploads.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the dropzone.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "FileUpload.Label",
				description: "A label for the file upload dropzone.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the label.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "FileUpload.Input",
				description: "A text input-style trigger for file selection.",
				props: {
					placeholder: {
						type: "string",
						default: '"Select file(s)"',
						description: "Placeholder text when no file is selected.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "FileUpload.List",
				description: "Displays the list of uploaded files.",
				props: {
					showSize: {
						type: "boolean",
						default: "false",
						description: "Whether to show the file size.",
					},
					clearable: {
						type: "boolean",
						default: "false",
						description: "Whether to show a delete button for each file.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "FileUpload.ClearTrigger",
				description: "A button to clear all uploaded files.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the clear trigger.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
		],
	},
	args: {
		maxFiles: 1,
		disabled: false,
		invalid: false,
		directory: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic file upload with a trigger button.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Directory: Story = {
	parameters: {
		docs: {
			description: {
				story: "Enable directory selection with the `directory` prop.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "directory" },
		}) as any,
};

export const MediaCapture: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `capture` prop to access the device camera.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "mediaCapture" },
		}) as any,
};

export const MultipleFiles: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `maxFiles` to allow multiple file uploads.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "multipleFiles" },
		}) as any,
};

export const Dropzone: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `FileUpload.Dropzone` for drag and drop functionality.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "dropzone" },
		}) as any,
};

export const Input: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `FileUpload.Input` for a text input-style file upload.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "input" },
		}) as any,
};

export const Clearable: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add a clear button with `FileUpload.ClearTrigger`.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "clearable" },
		}) as any,
};

export const AcceptedFiles: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `accept` prop to restrict accepted file types.",
			},
		},
	},
	render: () =>
		({
			Component: FileUploadWrapper,
			props: { story: "acceptedFiles" },
		}) as any,
};
