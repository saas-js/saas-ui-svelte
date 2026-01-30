<script lang="ts" module>
	// Wrapper components for complex Checkbox stories
</script>

<script lang="ts">
	import { Checkbox } from "$saas/components/checkbox";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Link } from "$saas/components/link";
	import Plus from "phosphor-svelte/lib/Plus";
	import Check from "phosphor-svelte/lib/Check";
	import {
		colours,
		checkboxVariants,
		checkboxSizes,
	} from "../../utils";

	interface Props {
		story:
			| "basic"
			| "variants"
			| "controlled"
			| "colours"
			| "sizes"
			| "states"
			| "group"
			| "customIcon"
			| "indeterminate"
			| "description"
			| "link";
	}

	let { story }: Props = $props();

	// State for controlled story
	let controlledChecked = $state(false);

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

{#if story === "basic"}
	<Checkbox.Root label="Accept terms and conditions" />
{:else if story === "variants"}
	<HStack align="start" gap={10}>
		{#each checkboxVariants as variant}
			<VStack gap={2} class="items-center flex-1">
				<Text size="xs">
					{variant}
				</Text>
				<Checkbox.Root checked={false} {variant} label="Unchecked" />
				<Checkbox.Root checked {variant} label="Checked" />
			</VStack>
		{/each}
	</HStack>
{:else if story === "controlled"}
	<Checkbox.Root
		bind:checked={controlledChecked}
		label="Accept terms and conditions"
	/>
{:else if story === "colours"}
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
{:else if story === "sizes"}
	<HStack align="start" gap={12} class="flex-1">
		{#each checkboxSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Checkbox.Root {size} checked label="Checkbox" />
			</VStack>
		{/each}
	</HStack>
{:else if story === "states"}
	<Stack gap={2}>
		<Checkbox.Root disabled label="Disabled" />
		<Checkbox.Root checked disabled label="Disabled Checked" />
		<Checkbox.Root invalid label="Invalid" />
	</Stack>
{:else if story === "group"}
	<Checkbox.Group label="Select framework">
		<Checkbox.Root value="react" label="React" />
		<Checkbox.Root value="svelte" label="Svelte" />
		<Checkbox.Root value="vue" label="Vue" />
		<Checkbox.Root value="angular" label="Angular" />
	</Checkbox.Group>
{:else if story === "customIcon"}
	<Checkbox.Root checked label="With Custom Icon" icon={Plus} />
{:else if story === "indeterminate"}
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
{:else if story === "description"}
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
{:else if story === "link"}
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
{/if}
