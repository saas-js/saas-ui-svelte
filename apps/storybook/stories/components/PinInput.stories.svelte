<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { PinInput } from "$saas/components/pin-input";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		inputVariants,
		pinInputSizes,
		pinInputTypes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Pin Input",
		component: PinInput,
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"invalid",
				"disabled",
				"placeholder",
				"count",
				"type",
				"otp",
				"mask",
				"attached",
				"class",
			]),
		},
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: inputVariants,
			},
			size: {
				...commonArgTypes.size,
				options: pinInputSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			placeholder: {
				control: "text",
				description: "Placeholder text for each input.",
				table: { defaultValue: { summary: "○" } },
			},
			count: {
				control: "number",
				description: "The number of pin inputs to render.",
				table: { defaultValue: { summary: "4" } },
			},
			type: {
				control: "select",
				options: pinInputTypes,
				description: "The type of value the pin input should allow.",
				table: { defaultValue: { summary: "numeric" } },
			},
			otp: {
				control: "boolean",
				description: "Whether the pin input is in OTP mode.",
				table: { defaultValue: { summary: "false" } },
			},
			mask: {
				control: "boolean",
				description: "Whether to mask the input value.",
				table: { defaultValue: { summary: "false" } },
			},
			attached: {
				control: "boolean",
				description: "Whether the inputs are visually attached.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
		},
		args: {
			variant: "outline",
			size: "md",
			colour: "gray",
		},
	});
</script>

<script lang="ts">
	let controlledValue = $state(["", "", "", ""]);
</script>

{#snippet basicStory(args: any)}
	<PinInput {...args} />
{/snippet}

{#snippet sizesStory()}
	<Stack gap={4}>
		{#each pinInputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<PinInput {size} />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack gap={4}>
		{#each inputVariants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{variant}</Text>
				<PinInput {variant} />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet otpStory()}
	<PinInput otp />
{/snippet}

{#snippet maskStory()}
	<PinInput mask />
{/snippet}

{#snippet placeholderStory()}
	<PinInput placeholder="-" />
{/snippet}

{#snippet withFieldStory()}
	<form
		class="max-w-sm"
		onsubmit={(e) => {
			e.preventDefault();
			console.log("Form submitted");
		}}
	>
		<Stack gap={4} align="start">
			<Field.Root>
				<Field.Label>Enter OTP</Field.Label>
				<PinInput otp />
			</Field.Root>

			<Button type="submit">Verify</Button>
		</Stack>
	</form>
{/snippet}

{#snippet controlledStory()}
	<Stack gap={4}>
		<PinInput
			bind:value={controlledValue}
			onValueComplete={(details) =>
				console.log("Complete:", details.valueAsString)}
		/>
		<Text size="sm">Value: {controlledValue.join("") || "(empty)"}</Text>
	</Stack>
{/snippet}

{#snippet attachedStory()}
	<PinInput attached />
{/snippet}

{#snippet alphanumericStory()}
	<Stack gap={4}>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-24">numeric</Text>
			<PinInput type="numeric" />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-24">alphabetic</Text>
			<PinInput type="alphabetic" />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-24">alphanumeric</Text>
			<PinInput type="alphanumeric" />
		</HStack>
	</Stack>
{/snippet}

{#snippet disabledStory()}
	<PinInput disabled />
{/snippet}

{#snippet invalidStory()}
	<Field.Root invalid>
		<Field.Label>Verification Code</Field.Label>
		<PinInput />
		<Field.ErrorText>Invalid verification code</Field.ErrorText>
	</Field.Root>
{/snippet}

{#snippet coloursStory()}
	<Stack gap={4}>
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<PinInput {colour} />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet countStory()}
	<Stack gap={4}>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-16">4 digits</Text>
			<PinInput count={4} />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-16">6 digits</Text>
			<PinInput count={6} />
		</HStack>
		<HStack align="center" gap={4}>
			<Text size="xs" class="w-16">8 digits</Text>
			<PinInput count={8} />
		</HStack>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="One Time Code" template={otpStory} />

<Story name="Mask" template={maskStory} />

<Story name="Placeholder" template={placeholderStory} />

<Story name="With Field" template={withFieldStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Attached" template={attachedStory} />

<Story name="Alphanumeric" template={alphanumericStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Invalid" template={invalidStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Count" template={countStory} />
