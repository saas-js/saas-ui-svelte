<script lang="ts" module>
	// Wrapper components for FormatByte stories
	// These are imported by FormatByte.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { FormatByte } from "$saas/utilities/format-byte";
	import { LocaleProvider } from "$saas/utilities/locale-provider";
	import { Text } from "$saas/typography/text";
	import { Stack, HStack } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "sizes" | "formatBits" | "locale" | "unitDisplay";
		value?: number;
		unit?: "byte" | "bit";
		unitDisplay?: "long" | "short" | "narrow";
		locale?: string;
	}

	let {
		story,
		value = 1450.45,
		unit = "byte",
		unitDisplay = "short",
		locale,
	}: Props = $props();
</script>

{#if story === "basic"}
	<Text size="lg">
		File size: <FormatByte {value} {unit} {unitDisplay} {locale} />
	</Text>
{:else if story === "sizes"}
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
{:else if story === "formatBits"}
	<Text size="lg">
		File size: <FormatByte value={1450.45} unit="bit" />
	</Text>
{:else if story === "locale"}
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
{:else if story === "unitDisplay"}
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
{/if}
