<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ToggleTip, InfoTip } from "$saas/components/toggle-tip";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Info from "phosphor-svelte/lib/Info";
	import {
		commonArgTypes,
		getControls,
		toggleTipSizes,
		toggleTipPlacements,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Toggle Tip",
		component: ToggleTip,
		argTypes: {
			content: {
				control: "text",
				description: "The content of the toggle tip.",
			},
			size: {
				...commonArgTypes.size,
				options: toggleTipSizes,
				table: { defaultValue: { summary: "sm" } },
			},
			placement: {
				control: "select",
				options: toggleTipPlacements,
				description: "The placement of the toggle tip.",
				table: { defaultValue: { summary: "top" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["content", "size", "placement", "class"]),
		},
		args: {
			content: "This is some additional information.",
			size: "sm",
			placement: "top",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div class="flex items-center justify-center p-8">
		<ToggleTip
			{...args}
			triggerIcon={Info}
			triggerSize="xs"
			triggerAriaLabel="More information"
		/>
	</div>
{/snippet}

{#snippet infoTipStory()}
	<div class="flex items-center justify-center p-8">
		<HStack justify="center">
			<Text size="lg">File size: 1.45kb</Text>
			<InfoTip>The file size for content.tsx is 1.45kb</InfoTip>
		</HStack>
	</div>
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet positioningStory()}
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
{/snippet}

{#snippet customContentStory()}
	<HStack align="center" justify="center" class="p-8">
		<ToggleTip triggerText="Custom Content" triggerVariant="outline">
			<VStack gap={1}>
				<Text size="xs" weight="semibold">Custom Content</Text>
				<Text size="xs">
					This toggle tip has custom HTML content with multiple
					elements.
				</Text>
			</VStack>
		</ToggleTip>
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Info Tip" template={infoTipStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Positioning" template={positioningStory} />

<Story name="Custom Content" template={customContentStory} />
