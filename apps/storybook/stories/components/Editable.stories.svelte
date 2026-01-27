<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Editable } from "$saas/components/editable";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import PencilSimple from "phosphor-svelte/lib/PencilSimple";
	import Check from "phosphor-svelte/lib/Check";
	import X from "phosphor-svelte/lib/X";
	import {
		commonArgTypes,
		getControls,
		colours,
		editableSizes,
		editableActivationModes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Editable",
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"disabled",
				"invalid",
				"activationMode",
				"class",
			]),
		},
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: editableSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			disabled: commonArgTypes.disabled,
			invalid: commonArgTypes.invalid,
			activationMode: {
				control: "select",
				options: editableActivationModes,
			},
			class: commonArgTypes.class,
		},
		args: {
			size: "md",
			colour: "gray",
			activationMode: "focus",
		},
	});
</script>

<script lang="ts">
	let name = $state("");
</script>

{#snippet basicStory(args: any)}
	<Editable.Root defaultValue="Click to edit" {...args}>
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{/snippet}

{#snippet controlledStory()}
	<Editable.Root
		value={name}
		onValueChange={(e) => (name = e.value)}
		placeholder="Click to edit"
	>
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{/snippet}

{#snippet withDoubleClickStory()}
	<Editable.Root
		defaultValue="Double click to edit"
		activationMode="dblclick"
	>
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{/snippet}

{#snippet disabledStory()}
	<Editable.Root disabled defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{/snippet}

{#snippet invalidStory()}
	<Editable.Root invalid defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{/snippet}

{#snippet textareaStory()}
	<Editable.Root defaultValue="Click to edit" autoResize class="w-full">
		<Editable.Area>
			<Editable.Preview class="min-h-14 items-start" />
			<Editable.Textarea class="min-h-14" />
		</Editable.Area>
	</Editable.Root>
{/snippet}

{#snippet withControlsStory()}
	<Editable.Root defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
		<Editable.Control>
			<Editable.EditTrigger icon aria-label="Edit">
				<PencilSimple
					class="size-3.5"
					weight="bold"
					aria-hidden="true"
				/>
			</Editable.EditTrigger>
			<Editable.CancelTrigger icon aria-label="Cancel">
				<X class="size-3.5" weight="bold" aria-hidden="true" />
			</Editable.CancelTrigger>
			<Editable.SubmitTrigger icon aria-label="Submit">
				<Check class="size-3.5" weight="bold" aria-hidden="true" />
			</Editable.SubmitTrigger>
		</Editable.Control>
	</Editable.Root>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Editable.Root
					defaultValue="Click to edit"
					{colour}
					class="w-full"
				>
					<Editable.Area>
						<Editable.Preview />
						<Editable.Input />
					</Editable.Area>
				</Editable.Root>
			</HStack>
		{/each}
	</VStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="With Double Click" template={withDoubleClickStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Invalid" template={invalidStory} />

<Story name="Textarea" template={textareaStory} />

<Story name="With Controls" template={withControlsStory} />

<Story name="Colours" template={coloursStory} />
