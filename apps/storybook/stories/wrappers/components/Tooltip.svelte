<script lang="ts" module>
	// Wrapper components for complex Tooltip stories
	// These are imported by Tooltip.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Tooltip } from "$saas/components/tooltip";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import Info from "phosphor-svelte/lib/Info";
	import Question from "phosphor-svelte/lib/Question";
	import { HStack, VStack } from "$saas/layout/stack";

	interface Props {
		story:
			| "basic"
			| "arrow"
			| "inverted"
			| "placements"
			| "offset"
			| "delays"
			| "interactive"
			| "disabled"
			| "customContent";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<div class="flex items-center justify-center p-8">
		<Tooltip content="This is a tooltip">
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{:else if story === "arrow"}
	<div class="flex items-center justify-center p-8">
		<Tooltip content="I have an arrow!" showArrow>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{:else if story === "inverted"}
	<div class="flex items-center justify-center p-8">
		<Tooltip content="Inverted tooltip" variant="inverted" showArrow>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{:else if story === "placements"}
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
{:else if story === "offset"}
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
{:else if story === "delays"}
	<HStack align="center" justify="center" gap={4} class="p-8">
		<Tooltip content="Instant tooltip" openDelay={0} showArrow>
			<Button variant="ghost">Instant</Button>
		</Tooltip>
		<Tooltip content="Delayed tooltip (700ms)" openDelay={700} showArrow>
			<Button variant="ghost">Delayed</Button>
		</Tooltip>
	</HStack>
{:else if story === "interactive"}
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
{:else if story === "disabled"}
	<HStack align="center" justify="center" gap={4} class="p-8">
		<Tooltip content="This tooltip is disabled" disabled showArrow>
			<Button variant="outline">Hover me (disabled)</Button>
		</Tooltip>
		<Tooltip content="This tooltip works" showArrow>
			<Button variant="outline">Hover me (enabled)</Button>
		</Tooltip>
	</HStack>
{:else if story === "customContent"}
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
{/if}
