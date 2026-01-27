<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { FormatNumber } from "$saas/utilities/format-number";
	import { LocaleProvider } from "$saas/utilities/locale-provider";
	import { Text } from "$saas/typography/text";
	import { Stack, HStack } from "$saas/layout/stack";
	import { getControls } from "../utils";

	const { Story } = defineMeta({
		title: "utilities/Format Number",
		component: FormatNumber,
		argTypes: {
			value: {
				control: "number",
				description: "The number to format.",
			},
			style: {
				control: "select",
				options: ["decimal", "currency", "percent", "unit"],
				description: "The formatting style to use.",
			},
			currency: {
				control: "text",
				description: "The currency to use in currency formatting.",
			},
			unit: {
				control: "text",
				description: "The unit to use in unit formatting.",
			},
			minimumFractionDigits: {
				control: "number",
				description: "The minimum number of fraction digits to use.",
			},
			maximumFractionDigits: {
				control: "number",
				description: "The maximum number of fraction digits to use.",
			},
			notation: {
				control: "select",
				options: ["standard", "scientific", "engineering", "compact"],
				description: "The formatting notation to use.",
			},
			compactDisplay: {
				control: "select",
				options: ["short", "long"],
				description:
					"How to display the number in compact notation (only used when notation is compact).",
			},
			locale: {
				control: "text",
				description:
					"The locale to use for formatting. If not provided, uses the locale from LocaleProvider context.",
			},
		},
		parameters: {
			controls: getControls([
				"value",
				"style",
				"currency",
				"unit",
				"minimumFractionDigits",
				"maximumFractionDigits",
				"notation",
				"compactDisplay",
				"locale",
			]),
		},
		args: {
			value: 1450.45,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Text size="lg">
		<FormatNumber {...args} />
	</Text>
{/snippet}

{#snippet percentageStory()}
	<Text size="lg">
		<FormatNumber
			value={0.145}
			style="percent"
			maximumFractionDigits={2}
			minimumFractionDigits={2}
		/>
	</Text>
{/snippet}

{#snippet currencyStory()}
	<Text size="lg">
		<FormatNumber value={1234.45} style="currency" currency="USD" />
	</Text>
{/snippet}

{#snippet localeStory()}
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
{/snippet}

{#snippet unitStory()}
	<Text size="lg">
		<FormatNumber value={384.4} style="unit" unit="kilometer" />
	</Text>
{/snippet}

{#snippet compactStory()}
	<Text size="lg">
		<FormatNumber
			value={1500000}
			notation="compact"
			compactDisplay="short"
		/>
	</Text>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Percentage" template={percentageStory} />

<Story name="Currency" template={currencyStory} />

<Story name="Locale" template={localeStory} />

<Story name="Unit" template={unitStory} />

<Story name="Compact Notation" template={compactStory} />
