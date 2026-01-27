<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Clipboard,
		ClipboardButton,
		ClipboardIconButton,
		ClipboardInput,
		ClipboardPrimitive,
	} from "$saas/components/clipboard";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Clipboard",
		component: Clipboard,
		argTypes: {
			value: {
				control: "text",
				description: "The value to be copied to the clipboard.",
			},
			timeout: {
				control: "number",
				description:
					"The timeout for showing the 'copied' state (in ms).",
				table: { defaultValue: { summary: "3000" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["value", "timeout", "class"]),
		},
		args: {
			value: "https://saas-ui.dev",
			timeout: 3000,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Clipboard {...args}>
		<ClipboardIconButton />
	</Clipboard>
{/snippet}

{#snippet buttonStory()}
	<Clipboard value="https://saas-ui.dev">
		<ClipboardButton />
	</Clipboard>
{/snippet}

{#snippet customLabelsStory()}
	<Clipboard value="https://saas-ui.dev">
		<ClipboardButton label="Kopiëer" copiedLabel="Gekopiëerd" />
	</Clipboard>
{/snippet}

{#snippet inputStory()}
	<Clipboard
		value="https://saas-ui.dev/docs/components/clipboard"
		class="max-w-xs"
	>
		<ClipboardPrimitive.Control class="relative flex items-center w-full">
			<ClipboardInput class="pr-10" />
			<div class="absolute right-1 flex items-center justify-center">
				<ClipboardIconButton
					class="border-none shadow-none bg-transparent hover:bg-bg-subtle -mr-2"
				/>
			</div>
		</ClipboardPrimitive.Control>
	</Clipboard>
{/snippet}

{#snippet timeoutStory()}
	<Clipboard value="https://saas-ui.dev" timeout={1000}>
		<ClipboardButton />
	</Clipboard>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Button" template={buttonStory} />

<Story name="Custom Labels" template={customLabelsStory} />

<Story name="Input" template={inputStory} />

<Story name="Timeout" template={timeoutStory} />
