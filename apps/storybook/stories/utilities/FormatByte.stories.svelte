<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { FormatByte } from "$saas/utilities/format-byte";
	import { LocaleProvider } from "$saas/utilities/locale-provider";
	import { Text } from "$saas/typography/text";
	import { Stack, HStack } from "$saas/layout/stack";
	import { getControls } from "../utils";

	const { Story } = defineMeta({
		title: "utilities/Format Byte",
		component: FormatByte,
		argTypes: {
			value: {
				control: "number",
				description: "The byte size to format.",
			},
			unit: {
				control: "select",
				options: ["byte", "bit"],
				description: "The unit granularity to display.",
				table: { defaultValue: { summary: "byte" } },
			},
			unitDisplay: {
				control: "select",
				options: ["long", "short", "narrow"],
				description: "The unit display format.",
				table: { defaultValue: { summary: "short" } },
			},
			locale: {
				control: "text",
				description:
					"The locale to use for formatting. If not provided, uses the locale from LocaleProvider context.",
			},
		},
		parameters: {
			controls: getControls(["value", "unit", "unitDisplay", "locale"]),
		},
		args: {
			value: 1450.45,
			unit: "byte",
			unitDisplay: "short",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Text size="lg">
		File size: <FormatByte {...args} />
	</Text>
{/snippet}

{#snippet sizesStory()}
	<Stack>
		<Text size="lg">
			<FormatByte value={50} />
		</Text>
		<Text size="lg">
			<FormatByte value={5000} />
		</Text>
		<Text size="lg">
			<FormatByte value={5000000} />
		</Text>
		<Text size="lg">
			<FormatByte value={5000000000} />
		</Text>
	</Stack>
{/snippet}

{#snippet bitsStory()}
	<Text size="lg">
		File size: <FormatByte value={1450.45} unit="bit" />
	</Text>
{/snippet}

{#snippet localeStory()}
	<Stack>
		<HStack>
			<Text size="md" weight="medium" class="w-16">de-DE</Text>
			<LocaleProvider locale="de-DE">
				<Text size="lg">
					<FormatByte value={1450.45} />
				</Text>
			</LocaleProvider>
		</HStack>

		<HStack>
			<Text size="md" weight="medium" class="w-16">zh-CN</Text>
			<LocaleProvider locale="zh-CN">
				<Text size="lg">
					<FormatByte value={1450.45} />
				</Text>
			</LocaleProvider>
		</HStack>
	</Stack>
{/snippet}

{#snippet unitDisplayStory()}
	<Stack>
		<Text size="lg">
			<FormatByte value={50345.53} unitDisplay="narrow" />
		</Text>
		<Text size="lg">
			<FormatByte value={50345.53} unitDisplay="short" />
		</Text>
		<Text size="lg">
			<FormatByte value={50345.53} unitDisplay="long" />
		</Text>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Format Bits" template={bitsStory} />

<Story name="Locale" template={localeStory} />

<Story name="Unit Display" template={unitDisplayStory} />
