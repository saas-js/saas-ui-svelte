<script lang="ts" module>
	// Wrapper components for FormatNumber stories
	// These are imported by FormatNumber.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { FormatNumber } from "$saas/utilities/format-number";
	import { LocaleProvider } from "$saas/utilities/locale-provider";
	import { Text } from "$saas/typography/text";
	import { Stack, HStack } from "$saas/layout/stack";

	interface Props {
		story:
			| "basic"
			| "percentage"
			| "currency"
			| "locale"
			| "unit"
			| "compactNotation";
		value?: number;
		style?: "decimal" | "currency" | "percent" | "unit";
		currency?: string;
		unit?: string;
		minimumFractionDigits?: number;
		maximumFractionDigits?: number;
		notation?: "standard" | "scientific" | "engineering" | "compact";
		compactDisplay?: "short" | "long";
		locale?: string;
	}

	let {
		story,
		value = 1450.45,
		style,
		currency,
		unit,
		minimumFractionDigits,
		maximumFractionDigits,
		notation,
		compactDisplay,
		locale,
	}: Props = $props();
</script>

{#if story === "basic"}
	<Text size="lg">
		<FormatNumber
			{value}
			{style}
			{currency}
			{unit}
			{minimumFractionDigits}
			{maximumFractionDigits}
			{notation}
			{compactDisplay}
			{locale}
		/>
	</Text>
{:else if story === "percentage"}
	<Text size="lg">
		<FormatNumber
			value={0.145}
			style="percent"
			maximumFractionDigits={2}
			minimumFractionDigits={2}
		/>
	</Text>
{:else if story === "currency"}
	<Text size="lg">
		<FormatNumber value={1234.45} style="currency" currency="USD" />
	</Text>
{:else if story === "locale"}
	<Stack>
		<HStack>
			<Text size="md" weight="medium" class="w-16">de-DE</Text>
			<LocaleProvider locale="de-DE">
				<Text size="lg">
					<FormatNumber value={1450.45} />
				</Text>
			</LocaleProvider>
		</HStack>

		<HStack>
			<Text size="md" weight="medium" class="w-16">zh-CN</Text>
			<LocaleProvider locale="zh-CN">
				<Text size="lg">
					<FormatNumber value={1450.45} />
				</Text>
			</LocaleProvider>
		</HStack>
	</Stack>
{:else if story === "unit"}
	<Text size="lg">
		<FormatNumber value={384.4} style="unit" unit="kilometer" />
	</Text>
{:else if story === "compactNotation"}
	<Text size="lg">
		<FormatNumber
			value={1500000}
			notation="compact"
			compactDisplay="short"
		/>
	</Text>
{/if}
