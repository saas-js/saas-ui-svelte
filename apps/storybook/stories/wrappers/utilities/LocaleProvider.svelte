<script lang="ts" module>
	// Wrapper components for LocaleProvider stories
	// These are imported by LocaleProvider.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { LocaleProvider, LocaleDisplay } from "$saas/utilities/locale-provider";
	import { FormatNumber } from "$saas/utilities/format-number";
	import { Text } from "$saas/typography/text";
	import { Stack } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "settingLocale";
		locale?: string;
	}

	let { story, locale = "en-US" }: Props = $props();
</script>

{#if story === "basic"}
	<LocaleProvider {locale}>
		<Stack gap={2}>
			<LocaleDisplay />
			<Text size="sm" class="text-fg-muted">Number formatting (locale affects separators):</Text>
			<Text size="lg">
				<FormatNumber value={1234567.89} />
			</Text>
			<Text size="sm" class="text-fg-muted">Date: {new Date().toLocaleDateString(locale)}</Text>
		</Stack>
	</LocaleProvider>
{:else if story === "settingLocale"}
	<Stack class="max-w-md">
		<div>
			<Text size="md" weight="medium" class="mb-2">English (US)</Text>
			<LocaleProvider locale="en-US">
				<Text size="lg">
					<FormatNumber value={1234.56} style="currency" currency="USD" />
				</Text>
			</LocaleProvider>
		</div>

		<div>
			<Text size="md" weight="medium" class="mb-2">German (Germany)</Text>
			<LocaleProvider locale="de-DE">
				<Text size="lg">
					<FormatNumber value={1234.56} style="currency" currency="EUR" />
				</Text>
			</LocaleProvider>
		</div>

		<div>
			<Text size="md" weight="medium" class="mb-2">Arabic (Bahrain)</Text>
			<LocaleProvider locale="ar-BH">
				<Text size="lg">
					<FormatNumber value={1234.56} style="currency" currency="BHD" />
				</Text>
			</LocaleProvider>
		</div>
	</Stack>
{/if}
