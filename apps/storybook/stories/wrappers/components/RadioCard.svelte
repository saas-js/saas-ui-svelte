<script lang="ts" module>
	// Wrapper components for complex RadioCard stories
	// These are imported by RadioCard.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { RadioCard } from "$saas/components/radio-card";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import Prohibit from "phosphor-svelte/lib/Prohibit";
	import Lock from "phosphor-svelte/lib/Lock";
	import CurrencyDollar from "phosphor-svelte/lib/CurrencyDollar";
	import TrendUp from "phosphor-svelte/lib/TrendUp";
	import Clock from "phosphor-svelte/lib/Clock";

	const colours = [
		"gray",
		"red",
		"orange",
		"yellow",
		"green",
		"teal",
		"blue",
		"cyan",
		"purple",
		"pink",
		"rose",
	] as const;

	const radioCardSizes = ["sm", "md", "lg"] as const;

	const frameworks = [
		{ value: "next", title: "Next.js", description: "Best for apps" },
		{ value: "vite", title: "Vite", description: "Best for SPAs" },
		{
			value: "astro",
			title: "Astro",
			description: "Best for static sites",
		},
	];

	interface Props {
		story:
			| "basic"
			| "controlled"
			| "sizes"
			| "colours"
			| "withIcon"
			| "centered"
			| "withAddon"
			| "vertical"
			| "disabled";
	}

	let { story }: Props = $props();

	let controlledValue = $state("next");
</script>

{#if story === "basic"}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="next">
			<RadioCard.Label>Select framework</RadioCard.Label>
			<HStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
					/>
				{/each}
			</HStack>
		</RadioCard.Root>
	</div>
{:else if story === "controlled"}
	<div class="max-w-3xl">
		<VStack gap={4} align="start">
			<Text size="sm" class="text-fg-muted">
				Selected: {controlledValue}
			</Text>
			<RadioCard.Root
				bind:value={controlledValue}
				onValueChange={({ value }) => (controlledValue = value)}
			>
				<RadioCard.Label>Select framework</RadioCard.Label>
				<HStack align="stretch">
					{#each frameworks as item}
						<RadioCard.Item
							label={item.title}
							description={item.description}
							value={item.value}
						/>
					{/each}
				</HStack>
			</RadioCard.Root>
		</VStack>
	</div>
{:else if story === "sizes"}
	<div class="w-64">
		<VStack gap={8}>
			{#each radioCardSizes as size}
				<RadioCard.Root {size} defaultValue="next">
					<RadioCard.Label>size = ({size})</RadioCard.Label>
					<HStack align="stretch">
						<RadioCard.Item label="Next.js" value="next" />
					</HStack>
				</RadioCard.Root>
			{/each}
		</VStack>
	</div>
{:else if story === "colours"}
	<div class="w-64">
		<VStack gap={6}>
			{#each colours as colour}
				<RadioCard.Root {colour} defaultValue="next">
					<RadioCard.Label>{colour}</RadioCard.Label>
					<HStack align="stretch">
						<RadioCard.Item label="Next.js" value="next" />
					</HStack>
				</RadioCard.Root>
			{/each}
		</VStack>
	</div>
{:else if story === "withIcon"}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="allow">
			<RadioCard.Label>Select permission</RadioCard.Label>
			<HStack align="stretch">
				<RadioCard.Item
					label="Allow"
					description="This user can access the system"
					value="allow"
					icon={ArrowRight}
				/>
				<RadioCard.Item
					label="Deny"
					description="This user will be denied access"
					value="deny"
					icon={Prohibit}
				/>
				<RadioCard.Item
					label="Lock"
					description="This user will be locked out"
					value="lock"
					icon={Lock}
				/>
			</HStack>
		</RadioCard.Root>
	</div>
{:else if story === "centered"}
	<div class="max-w-3xl">
		<RadioCard.Root align="center" defaultValue="fixed">
			<RadioCard.Label>Select contract type</RadioCard.Label>
			<HStack align="stretch">
				<RadioCard.Item
					label="Fixed Rate"
					value="fixed"
					icon={CurrencyDollar}
				/>
				<RadioCard.Item
					label="Milestone"
					value="milestone"
					icon={TrendUp}
				/>
				<RadioCard.Item label="Hourly" value="hourly" icon={Clock} />
			</HStack>
		</RadioCard.Root>
	</div>
{:else if story === "withAddon"}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="next">
			<RadioCard.Label>Select framework</RadioCard.Label>
			<HStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
						addon="Some addon text"
					/>
				{/each}
			</HStack>
		</RadioCard.Root>
	</div>
{:else if story === "vertical"}
	<div class="w-64">
		<RadioCard.Root orientation="vertical" defaultValue="next">
			<RadioCard.Label>Select framework</RadioCard.Label>
			<VStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
					/>
				{/each}
			</VStack>
		</RadioCard.Root>
	</div>
{:else if story === "disabled"}
	<div class="max-w-3xl">
		<RadioCard.Root defaultValue="next" disabled>
			<RadioCard.Label>Select framework (disabled)</RadioCard.Label>
			<HStack align="stretch">
				{#each frameworks as item}
					<RadioCard.Item
						label={item.title}
						description={item.description}
						value={item.value}
					/>
				{/each}
			</HStack>
		</RadioCard.Root>
	</div>
{/if}
