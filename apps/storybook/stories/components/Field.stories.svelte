<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Field } from "$saas/components/field";
	import { Input } from "$saas/components/input";
	import { Textarea } from "$saas/components/textarea";
	import { NativeSelect } from "$saas/components/native-select";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Field",
		component: Field.Root,
		argTypes: {
			disabled: commonArgTypes.disabled,
			invalid: commonArgTypes.invalid,
			required: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			readOnly: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"disabled",
				"invalid",
				"required",
				"readOnly",
				"children",
				"class",
			]),
		},
		args: {
			disabled: false,
			invalid: false,
			required: false,
			readOnly: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Field.Root {...args}>
		<Field.Label>Email</Field.Label>
		<Input
			placeholder="me@example.com"
			disabled={args.disabled}
			invalid={args.invalid}
		/>
	</Field.Root>
{/snippet}

{#snippet helperTextStory()}
	<Field.Root>
		<Field.Label>Email</Field.Label>
		<Input placeholder="me@example.com" />
		<Field.HelperText>This is a helper text</Field.HelperText>
	</Field.Root>
{/snippet}

{#snippet errorTextStory()}
	<Field.Root invalid>
		<Field.Label>Email</Field.Label>
		<Input invalid placeholder="me@example.com" />
		<Field.ErrorText>This is an error text</Field.ErrorText>
	</Field.Root>
{/snippet}

{#snippet disabledStory()}
	<Field.Root disabled>
		<Field.Label>Email</Field.Label>
		<Input disabled placeholder="me@example.com" />
	</Field.Root>
{/snippet}

{#snippet textareaStory()}
	<Field.Root>
		<Field.Label>Message</Field.Label>
		<Textarea placeholder="Enter your message here" />
	</Field.Root>
{/snippet}

{#snippet nativeSelectStory()}
	<Field.Root>
		<Field.Label>Native Select</Field.Label>
		<NativeSelect>
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
		</NativeSelect>
	</Field.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Helper Text" template={helperTextStory} />

<Story name="Error Text" template={errorTextStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Textarea" template={textareaStory} />

<Story name="Native Select" template={nativeSelectStory} />
