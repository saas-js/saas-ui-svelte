<script lang="ts" module>
	// Wrapper components for complex ToggleTip stories
	// These are imported by ToggleTip.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { ToggleTip, InfoTip } from "$saas/components/toggle-tip";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Info from "phosphor-svelte/lib/Info";

	interface Props {
		story:
			| "basic"
			| "infoTip"
			| "sizes"
			| "positioning"
			| "customContent";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<div class="flex items-center justify-center p-8">
		<ToggleTip
			content="This is some additional information."
			triggerIcon={Info}
			triggerSize="xs"
			triggerAriaLabel="More information"
		/>
	</div>
{:else if story === "infoTip"}
	<div class="flex items-center justify-center p-8">
		<HStack justify="center">
			<Text size="lg">File size: 1.45kb</Text>
			<InfoTip>The file size for content.tsx is 1.45kb</InfoTip>
		</HStack>
	</div>
{:else if story === "sizes"}
	<div class="flex items-center justify-center p-8">
		<HStack gap={4}>
			<ToggleTip
				content="Extra small toggle tip"
				size="xs"
				triggerText="XS"
				triggerSize="xs"
			/>
			<ToggleTip
				content="Small toggle tip"
				size="sm"
				triggerText="SM"
				triggerSize="sm"
			/>
			<ToggleTip
				content="Medium toggle tip"
				size="md"
				triggerText="MD"
				triggerSize="md"
			/>
			<ToggleTip
				content="Large toggle tip"
				size="lg"
				triggerText="LG"
				triggerSize="lg"
			/>
		</HStack>
	</div>
{:else if story === "positioning"}
	<div class="flex items-center justify-center p-8">
		<HStack gap={4}>
			<ToggleTip
				content="Top placement"
				placement="top"
				triggerText="Top"
				triggerVariant="outline"
			/>
			<ToggleTip
				content="Right placement"
				placement="right"
				triggerText="Right"
				triggerVariant="outline"
			/>
			<ToggleTip
				content="Bottom placement"
				placement="bottom"
				triggerText="Bottom"
				triggerVariant="outline"
			/>
			<ToggleTip
				content="Left placement"
				placement="left"
				triggerText="Left"
				triggerVariant="outline"
			/>
		</HStack>
	</div>
{:else if story === "customContent"}
	<HStack align="center" justify="center" class="p-8">
		<ToggleTip triggerText="Custom Content" triggerVariant="outline">
			<VStack gap={1}>
				<Text size="xs" weight="semibold">Custom Content</Text>
				<Text size="xs">
					This toggle tip has custom HTML content with multiple elements.
				</Text>
			</VStack>
		</ToggleTip>
	</HStack>
{/if}
