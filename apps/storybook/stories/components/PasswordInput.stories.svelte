<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { PasswordInput } from "$saas/components/password-input";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		passwordInputSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Password Input",
		component: PasswordInput,
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"invalid",
				"disabled",
				"placeholder",
				"class",
			]),
		},
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: passwordInputSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			placeholder: {
				control: "text",
				description: "Placeholder text for the input.",
			},
			class: commonArgTypes.class,
		},
		args: {
			size: "md",
			colour: "gray",
		},
	});
</script>

<script lang="ts">
	let controlledValue = $state("");
	let controlledVisible = $state(false);
</script>

{#snippet basicStory(args: any)}
	<div class="w-72">
		<PasswordInput aria-label="Password" {...args} />
	</div>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={4} class="max-w-72">
		{#each passwordInputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<PasswordInput
					{size}
					placeholder={size}
					aria-label="Password {size}"
					class="flex-1"
				/>
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet controlledStory()}
	<Stack gap={4} class="max-w-72">
		<PasswordInput
			bind:value={controlledValue}
			placeholder="Enter password"
			aria-label="Password"
		/>
		<Text size="sm"
			>Value: {controlledValue
				? "•".repeat(controlledValue.length)
				: "(empty)"}</Text
		>
	</Stack>
{/snippet}

{#snippet controlledVisibilityStory()}
	<Stack gap={4} class="max-w-72">
		<PasswordInput
			defaultValue="secret"
			visible={controlledVisible}
			onVisibleChange={(v) => (controlledVisible = v)}
			aria-label="Password"
		/>
		<Text size="sm"
			>Password is {controlledVisible ? "visible" : "hidden"}</Text
		>
	</Stack>
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
				<Field.Label>Username</Field.Label>
				<Input name="username" placeholder="Enter username" />
			</Field.Root>

			<Field.Root>
				<Field.Label>Password</Field.Label>
				<PasswordInput name="password" placeholder="Enter password" />
			</Field.Root>

			<Button type="submit">Submit</Button>
		</Stack>
	</form>
{/snippet}

{#snippet disabledStory()}
	<div class="w-72">
		<PasswordInput
			disabled
			placeholder="Disabled password"
			aria-label="Password"
		/>
	</div>
{/snippet}

{#snippet invalidStory()}
	<Field.Root invalid class="w-72">
		<Field.Label>Password</Field.Label>
		<PasswordInput placeholder="Enter password" />
		<Field.ErrorText>Password must be at least 8 characters</Field.ErrorText
		>
	</Field.Root>
{/snippet}

{#snippet coloursStory()}
	<Stack gap={4} class="max-w-md">
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<PasswordInput
					{colour}
					placeholder="Focus to see ring"
					aria-label="Password {colour}"
					class="flex-1"
				/>
			</HStack>
		{/each}
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Controlled Visibility" template={controlledVisibilityStory} />

<Story name="With Field" template={withFieldStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Invalid" template={invalidStory} />

<Story name="Colours" template={coloursStory} />
