<script lang="ts" module>
	// Wrapper components for complex Tooltip stories
	// These are imported by Tooltip.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Tooltip } from "$saas/components/tooltip";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import Info from "phosphor-svelte/lib/Info";
	import Question from "phosphor-svelte/lib/Question";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Centre } from "$saas/layout/centre";

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
	<Centre class="p-8">
		<Tooltip content="This is a tooltip">
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</Centre>
{:else if story === "arrow"}
	<Centre class="p-8">
		<Tooltip content="I have an arrow!" showArrow>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</Centre>
{:else if story === "inverted"}
	<Centre class="p-8">
		<Tooltip content="Dark tooltip (inverted)" variant="inverted" showArrow>
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</Centre>
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
	<Centre class="p-8">
		<HStack align="center" justify="center" gap={4}>
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
	</Centre>
{:else if story === "delays"}
	<Centre class="p-8">
		<HStack align="center" justify="center" gap={4}>
			<Tooltip content="Instant tooltip" openDelay={0} showArrow>
				<Button variant="ghost">Instant</Button>
			</Tooltip>
			<Tooltip
				content="Delayed tooltip (700ms)"
				openDelay={700}
				showArrow
			>
				<Button variant="ghost">Delayed</Button>
			</Tooltip>
		</HStack>
	</Centre>
{:else if story === "interactive"}
	<Centre class="p-8">
		<Tooltip interactive showArrow>
			{#snippet trigger()}
				<Button variant="outline">Hover me</Button>
			{/snippet}
			<VStack gap={1}>
				<Text as="span" class="font-semibold">Interactive tooltip</Text>
				<Text as="span" size="xs" class="opacity-80"
					>You can hover over me!</Text
				>
			</VStack>
		</Tooltip>
	</Centre>
{:else if story === "disabled"}
	<Centre class="p-8">
		<HStack align="center" justify="center" gap={4}>
			<Tooltip content="This tooltip is disabled" disabled showArrow>
				<Button variant="outline">Hover me (disabled)</Button>
			</Tooltip>
			<Tooltip content="This tooltip works" showArrow>
				<Button variant="outline">Hover me (enabled)</Button>
			</Tooltip>
		</HStack>
	</Centre>
{:else if story === "customContent"}
	<Centre class="p-8">
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
				<Icon as={Info} size="xs" />
				<Text as="span">Search query info</Text>
			</HStack>
		</Tooltip>
	</Centre>
{/if}
