<script module lang="ts">
	import { Text } from "$saas/typography/text";
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { NativeSelect } from "$saas/components/native-select";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { HStack, VStack } from "$saas/layout/stack";
	import {
		commonArgTypes,
		getControls,
		nativeSelectSizes,
		nativeSelectVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Select (Native)",
		component: NativeSelect,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: nativeSelectVariants,
				table: { defaultValue: { summary: "outline" } },
			},
			size: {
				...commonArgTypes.size,
				options: nativeSelectSizes,
				table: { defaultValue: { summary: "md" } },
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"invalid",
				"disabled",
				"class",
			]),
		},
		args: {
			variant: "outline",
			size: "sm",
			invalid: false,
			disabled: false,
			value: "",
		},
	});

	class HookFormState {
		framework = $state("");
		submitted = $state(false);
	}
</script>

{#snippet sizesStory()}
	<VStack gap={4} class="w-60">
		{#each nativeSelectSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<NativeSelect {size} value="" aria-label="Select framework">
					<option value="">Select option</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
					<option value="svelte">Svelte</option>
				</NativeSelect>
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={4} class="w-60">
		{#each nativeSelectVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<NativeSelect {variant} value="" aria-label="Select framework">
					<option value="">Select option</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
					<option value="svelte">Svelte</option>
				</NativeSelect>
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet hookFormStory()}
	{@const state = new HookFormState()}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			state.submitted = true;
		}}
	>
		<Field.Root invalid={state.submitted && !state.framework}>
			<Field.Label>Framework</Field.Label>
			<NativeSelect
				size="sm"
				invalid={state.submitted && !state.framework}
				class="w-60"
				name="framework"
				bind:value={state.framework}
			>
				<option value="">Select framework</option>
				<option value="react">React</option>
				<option value="vue">Vue</option>
				<option value="angular">Angular</option>
				<option value="svelte">Svelte</option>
			</NativeSelect>
			{#if state.submitted && !state.framework}
				<Field.ErrorText>Framework is required</Field.ErrorText>
			{/if}
		</Field.Root>

		<Button size="sm" type="submit" class="mt-4">Submit</Button>
	</form>
{/snippet}

{#snippet basicStory(args: any)}
	<NativeSelect {...args} class="w-60" value="" aria-label="Select framework">
		<option value="">Select option</option>
		<option value="react">React</option>
		<option value="vue">Vue</option>
		<option value="angular">Angular</option>
		<option value="svelte">Svelte</option>
	</NativeSelect>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="With Validation" template={hookFormStory} />
