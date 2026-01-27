<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Tooltip } from "$saas/components/tooltip";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import Info from "phosphor-svelte/lib/Info";
	import Question from "phosphor-svelte/lib/Question";
	import { HStack, VStack } from "$saas/layout/stack";
	import { commonArgTypes, getControls, tooltipVariants } from "../utils";

	const { Story } = defineMeta({
		title: "components/Tooltip",
		component: Tooltip,
		argTypes: {
			content: {
				control: "text",
			},
			showArrow: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			variant: {
				control: "select",
				options: tooltipVariants,
				table: { defaultValue: { summary: "default" } },
			},
			interactive: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			openDelay: {
				control: "number",
				table: { defaultValue: { summary: "0" } },
			},
			closeDelay: {
				control: "number",
				table: { defaultValue: { summary: "100" } },
			},
			positioning: {
				control: "object",
				table: {
					defaultValue: {
						summary: '{ placement: "bottom", strategy: "fixed" }',
					},
				},
			},
			disabled: commonArgTypes.disabled,
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"content",
				"showArrow",
				"variant",
				"interactive",
				"openDelay",
				"closeDelay",
				"positioning",
				"disabled",
				"class",
				"children",
			]),
		},
		args: {
			content: "This is a tooltip",
			showArrow: false,
			variant: "default",
			interactive: false,
			openDelay: 0,
			closeDelay: 0,
			positioning: { placement: "top" },
			disabled: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div class="flex items-center justify-center p-8">
		<Tooltip {...args}>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{/snippet}

{#snippet arrowStory()}
	<div class="flex items-center justify-center p-8">
		<Tooltip content="I have an arrow!" showArrow>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{/snippet}

{#snippet invertedStory()}
	<div class="flex items-center justify-center p-8">
		<Tooltip content="Inverted tooltip" variant="inverted" showArrow>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{/snippet}

{#snippet placementsStory()}
	<VStack align="center" gap={4} class="p-8">
		<HStack gap={4}>
			<Tooltip
				content="Tooltip top"
				positioning={{ placement: "top" }}
				showArrow
			>
				<Button variant="outline" size="sm">Top</Button>
			</Tooltip>
			<Tooltip
				content="Tooltip bottom"
				positioning={{ placement: "bottom" }}
				showArrow
			>
				<Button variant="outline" size="sm">Bottom</Button>
			</Tooltip>
			<Tooltip
				content="Tooltip left"
				positioning={{ placement: "left" }}
				showArrow
			>
				<Button variant="outline" size="sm">Left</Button>
			</Tooltip>
			<Tooltip
				content="Tooltip right"
				positioning={{ placement: "right" }}
				showArrow
			>
				<Button variant="outline" size="sm">Right</Button>
			</Tooltip>
		</HStack>
	</VStack>
{/snippet}

{#snippet offsetStory()}
	<HStack align="center" justify="center" gap={4} class="p-8">
		<Tooltip content="Default offset" showArrow>
			<Button variant="outline" size="sm">Default</Button>
		</Tooltip>
		<Tooltip
			content="Custom offset (16px)"
			positioning={{ offset: { mainAxis: 16, crossAxis: 4 } }}
			showArrow
		>
			<Button variant="outline" size="sm">Custom offset</Button>
		</Tooltip>
	</HStack>
{/snippet}

{#snippet delaysStory()}
	<HStack align="center" justify="center" gap={4} class="p-8">
		<Tooltip content="Instant tooltip" openDelay={0} showArrow>
			<Button variant="ghost">Instant</Button>
		</Tooltip>
		<Tooltip content="Delayed tooltip (700ms)" openDelay={700} showArrow>
			<Button variant="ghost">Delayed</Button>
		</Tooltip>
	</HStack>
{/snippet}

{#snippet interactiveStory()}
	<HStack align="center" justify="center" class="p-8">
		<Tooltip interactive showArrow>
			{#snippet trigger()}
				<Button variant="outline">Hover me</Button>
			{/snippet}
			<VStack gap={1}>
				<span class="font-semibold">Interactive tooltip</span>
				<span class="text-xs opacity-80">You can hover over me!</span>
			</VStack>
		</Tooltip>
	</HStack>
{/snippet}

{#snippet contentSlotStory()}
	<HStack align="center" justify="center" class="p-8">
		<Tooltip>
			{#snippet trigger()}
				<Button
					variant="outline"
					size="sm"
					icon
					aria-label="Search query help"
				>
					<Icon as={Question} />
				</Button>
			{/snippet}
			<HStack align="center" gap={2}>
				<Icon as={Info} class="size-3.5" />
				<span>Search query info</span>
			</HStack>
		</Tooltip>
	</HStack>
{/snippet}

{#snippet disabledStory()}
	<HStack align="center" justify="center" gap={4} class="p-8">
		<Tooltip content="This tooltip is disabled" disabled showArrow>
			<Button variant="outline">Hover me (disabled)</Button>
		</Tooltip>
		<Tooltip content="This tooltip works" showArrow>
			<Button variant="outline">Hover me (enabled)</Button>
		</Tooltip>
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Arrow" template={arrowStory} />
<Story name="Inverted" template={invertedStory} />
<Story name="Placements" template={placementsStory} />
<Story name="Offset" template={offsetStory} />
<Story name="Delays" template={delaysStory} />
<Story name="Interactive" template={interactiveStory} />
<Story name="Disabled" template={disabledStory} />
<Story name="Custom Content" template={contentSlotStory} />
