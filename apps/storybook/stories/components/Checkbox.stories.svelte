<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Checkbox } from "$saas/components/checkbox";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Link } from "$saas/components/link";
	import Plus from "phosphor-svelte/lib/Plus";
	import Check from "phosphor-svelte/lib/Check";
	import Minus from "phosphor-svelte/lib/Minus";
	import {
		colours,
		checkboxVariants,
		checkboxSizes,
		commonArgTypes,
		getControls,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Checkbox",
		component: Checkbox.Root,
		argTypes: {
			checked: {
				control: "boolean",
				table: { type: { summary: "boolean | 'indeterminate'" } },
			},
			size: {
				...commonArgTypes.size,
				options: checkboxSizes,
			},
			variant: {
				...commonArgTypes.variant,
				options: checkboxVariants,
				table: { defaultValue: { summary: "solid" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
				table: { defaultValue: { summary: "indigo" } },
			},
			label: {
				control: "text",
			},
			disabled: commonArgTypes.disabled,
			invalid: commonArgTypes.invalid,
			value: {
				control: "text",
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"checked",
				"size",
				"variant",
				"colour",
				"label",
				"disabled",
				"invalid",
				"value",
				"orientation",
				"class",
				"children",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			colour: "indigo",
			label: "Accept terms and conditions",
			checked: false,
		},
	});
</script>

<script lang="ts">
	// State for indeterminate story
	const indeterminateItems = [
		{ label: "Monday", value: "monday" },
		{ label: "Tuesday", value: "tuesday" },
		{ label: "Wednesday", value: "wednesday" },
		{ label: "Thursday", value: "thursday" },
	];

	let indeterminateValue = $state<string[]>(["monday"]);

	const allSelected = $derived(
		indeterminateValue.length === indeterminateItems.length,
	);
	const isIndeterminate = $derived(
		indeterminateValue.length > 0 &&
			indeterminateValue.length < indeterminateItems.length,
	);

	function handleSelectAll(details: { checked: boolean | "indeterminate" }) {
		indeterminateValue = details.checked
			? indeterminateItems.map((i) => i.value)
			: [];
	}
</script>

{#snippet basicStory(args: any)}
	<Checkbox.Root {...args} />
{/snippet}

{#snippet variantsStory()}
	<HStack align="start" gap={10}>
		{#each checkboxVariants as variant}
			<VStack gap={2} class="flex-1 items-center">
				<Text size="xs">
					{variant}
				</Text>
				<Checkbox.Root checked={false} {variant} label="Unchecked" />
				<Checkbox.Root checked {variant} label="Checked" />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet controlledStory(args: any)}
	<Checkbox.Root
		bind:checked={args.checked}
		label="Accept terms and conditions"
	/>
{/snippet}

{#snippet coloursStory()}
	<VStack align="start" gap={2}>
		{#each colours as colour}
			<HStack align="center" gap={10} class="w-full">
				<Text size="xs" class="min-w-[8ch]">
					{colour}
				</Text>
				{#each checkboxVariants as variant}
					<Checkbox.Root
						{variant}
						{colour}
						checked
						label="Checkbox"
					/>
				{/each}
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={12} class="flex-1">
		{#each checkboxSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Checkbox.Root {size} checked label="Checkbox" />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet statesStory()}
	<Stack gap={2}>
		<Checkbox.Root disabled label="Disabled" />
		<Checkbox.Root checked disabled label="Disabled Checked" />
		<Checkbox.Root invalid label="Invalid" />
	</Stack>
{/snippet}

{#snippet groupStory()}
	<Checkbox.Group label="Select framework">
		<Checkbox.Root value="react" label="React" />
		<Checkbox.Root value="svelte" label="Svelte" />
		<Checkbox.Root value="vue" label="Vue" />
		<Checkbox.Root value="angular" label="Angular" />
	</Checkbox.Group>
{/snippet}

{#snippet customIconStory()}
	<Checkbox.Root checked label="With Custom Icon" icon={Plus} />
{/snippet}

{#snippet indeterminateStory()}
	<VStack gap={2}>
		<Checkbox.Root
			checked={isIndeterminate ? "indeterminate" : allSelected}
			onCheckedChange={handleSelectAll}
			label="Weekdays"
		/>
		<Checkbox.Group bind:value={indeterminateValue} class="ps-6">
			{#each indeterminateItems as item}
				<Checkbox.Root value={item.value} label={item.label} />
			{/each}
		</Checkbox.Group>
	</VStack>
{/snippet}

{#snippet descriptionStory()}
	<Checkbox.Root class="items-start">
		<Checkbox.Control>
			<Checkbox.Indicator>
				<Check class="w-full h-full" weight="bold" />
			</Checkbox.Indicator>
		</Checkbox.Control>
		<Checkbox.Label>
			<div class="flex flex-col">
				<span class="text-fg-default">
					I agree to the terms and conditions
				</span>
				<span class="mt-1 font-normal text-fg-muted">
					By clicking this, you agree to our Terms and Privacy Policy.
				</span>
			</div>
		</Checkbox.Label>
		<Checkbox.HiddenInput />
	</Checkbox.Root>
{/snippet}

{#snippet linkStory()}
	<Checkbox.Root>
		<Checkbox.Control>
			<Checkbox.Indicator>
				<Check class="w-full h-full" weight="bold" />
			</Checkbox.Indicator>
		</Checkbox.Control>
		<Checkbox.Label>
			I agree to the{" "}
			<Link colour="teal" href="https://google.com"
				>terms and conditions</Link
			>
		</Checkbox.Label>
		<Checkbox.HiddenInput />
	</Checkbox.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="States" template={statesStory} />

<Story name="Group" template={groupStory} />

<Story name="Custom Icon" template={customIconStory} />

<Story name="Indeterminate" template={indeterminateStory} />

<Story name="Description" template={descriptionStory} />

<Story name="Link" template={linkStory} />
