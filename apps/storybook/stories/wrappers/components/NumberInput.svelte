<script lang="ts" module>
	// Wrapper components for complex NumberInput stories
	// These are imported by NumberInput.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { NumberInput } from "$saas/components/number-input";
	import { Field } from "$saas/components/field";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { colours, numberInputSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "minMax"
			| "step"
			| "mouseWheel"
			| "disabled"
			| "invalid"
			| "withField"
			| "formatPercent"
			| "formatCurrency"
			| "formatUnit"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<div class="w-52">
		<NumberInput aria-label="Number" defaultValue="10" />
	</div>
{:else if story === "sizes"}
	<Stack gap={4} class="max-w-52">
		{#each numberInputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<NumberInput {size} defaultValue="10" aria-label="Number {size}" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{:else if story === "minMax"}
	<div class="w-52">
		<NumberInput defaultValue="10" min={5} max={50} aria-label="Number" />
	</div>
{:else if story === "step"}
	<div class="w-52">
		<NumberInput defaultValue="2" step={3} aria-label="Number" />
	</div>
{:else if story === "mouseWheel"}
	<div class="w-52">
		<NumberInput defaultValue="10" allowMouseWheel aria-label="Number" />
	</div>
{:else if story === "disabled"}
	<div class="w-52">
		<NumberInput defaultValue="10" disabled aria-label="Number" />
	</div>
{:else if story === "invalid"}
	<Field.Root invalid class="w-52">
		<Field.Label>Enter Number</Field.Label>
		<NumberInput defaultValue="10" aria-label="Enter Number" />
		<Field.ErrorText>The entry is invalid</Field.ErrorText>
	</Field.Root>
{:else if story === "withField"}
	<Field.Root class="w-52">
		<Field.Label>Enter Number</Field.Label>
		<NumberInput aria-label="Enter Number" />
		<Field.HelperText>Enter a number between 1 and 10</Field.HelperText>
	</Field.Root>
{:else if story === "formatPercent"}
	<Stack gap={4} class="max-w-52">
		<NumberInput
			defaultValue="5"
			step={0.01}
			formatOptions={{
				style: "percent",
			}}
			aria-label="Percentage"
		/>
	</Stack>
{:else if story === "formatCurrency"}
	<Stack gap={4} class="max-w-52">
		<NumberInput
			defaultValue="45"
			formatOptions={{
				style: "currency",
				currency: "EUR",
				currencyDisplay: "code",
				currencySign: "accounting",
			}}
			aria-label="Amount"
		/>
	</Stack>
{:else if story === "formatUnit"}
	<Stack gap={4} class="max-w-52">
		<NumberInput
			defaultValue="4"
			formatOptions={{
				style: "unit",
				unit: "inch",
				unitDisplay: "long",
			}}
			aria-label="Length"
		/>
	</Stack>
{:else if story === "colours"}
	<Stack gap={4} class="max-w-72">
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<NumberInput {colour} defaultValue="10" aria-label="Number {colour}" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/if}
