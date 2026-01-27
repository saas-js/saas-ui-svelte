<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		LocaleProvider,
		LocaleDisplay,
	} from "$saas/utilities/locale-provider";
	import { FormatNumber } from "$saas/utilities/format-number";
	import { Text } from "$saas/typography/text";
	import { Stack } from "$saas/layout/stack";

	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "utilities/Locale Provider",
		component: LocaleProvider,
		argTypes: {
			locale: {
				control: "text",
				description: "The locale to use for the application.",
				table: { defaultValue: { summary: "en-US" } },
			},
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls(["locale"]),
		},
		args: {
			locale: "en-US",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<LocaleProvider {...args}>
		<Stack gap={2}>
			<LocaleDisplay />
			<Text size="sm" class="text-fg-muted"
				>Number formatting (locale affects separators):</Text
			>
			<Text size="lg">
				<FormatNumber value={1234567.89} />
			</Text>
			<Text size="sm" class="text-fg-muted"
				>Date: {new Date().toLocaleDateString(args.locale)}</Text
			>
		</Stack>
	</LocaleProvider>
{/snippet}

{#snippet settingLocaleStory()}
	<Stack class="max-w-md">
		<div>
			<Text size="md" weight="medium" class="mb-2">English (US)</Text>
			<LocaleProvider locale="en-US">
				<Text size="lg">
					<FormatNumber
						value={1234.56}
						style="currency"
						currency="USD"
					/>
				</Text>
			</LocaleProvider>
		</div>

		<div>
			<Text size="md" weight="medium" class="mb-2">German (Germany)</Text>
			<LocaleProvider locale="de-DE">
				<Text size="lg">
					<FormatNumber
						value={1234.56}
						style="currency"
						currency="EUR"
					/>
				</Text>
			</LocaleProvider>
		</div>

		<div>
			<Text size="md" weight="medium" class="mb-2">Arabic (Bahrain)</Text>
			<LocaleProvider locale="ar-BH">
				<Text size="lg">
					<FormatNumber
						value={1234.56}
						style="currency"
						currency="BHD"
					/>
				</Text>
			</LocaleProvider>
		</div>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Setting Locale" template={settingLocaleStory} />
