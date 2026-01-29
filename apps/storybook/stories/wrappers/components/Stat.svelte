<script lang="ts" module>
	// Wrapper components for complex Stat stories
	// These are imported by Stat.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Stat } from "$saas/components/stat";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Progress } from "$saas/components/progress";
	import { Icon } from "$saas/components/icon";
	import CurrencyDollar from "phosphor-svelte/lib/CurrencyDollar";

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

	interface Props {
		story:
			| "basic"
			| "formatOptions"
			| "indicator"
			| "valueUnit"
			| "progressBar"
			| "icon"
			| "trend"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Stat.Root>
		<Stat.Label>Unique visitors</Stat.Label>
		<Stat.ValueText>192.1k</Stat.ValueText>
	</Stat.Root>
{:else if story === "formatOptions"}
	<Stat.Root>
		<Stat.Label>Revenue</Stat.Label>
		<Stat.ValueText
			value={935.4}
			formatOptions={{ style: "currency", currency: "USD" }}
		/>
	</Stat.Root>
{:else if story === "indicator"}
	<Stat.Root>
		<Stat.Label>Unique visitors</Stat.Label>
		<Stat.ValueText>192.1k</Stat.ValueText>
		<Stat.DownTrend variant="plain">1.9%</Stat.DownTrend>
	</Stat.Root>
{:else if story === "valueUnit"}
	<Stat.Root>
		<Stat.Label>Time to complete</Stat.Label>
		<Stat.ValueText class="items-baseline">
			3 <Stat.ValueUnit>hr</Stat.ValueUnit>
			20 <Stat.ValueUnit>min</Stat.ValueUnit>
		</Stat.ValueText>
	</Stat.Root>
{:else if story === "progressBar"}
	<VStack gap={2} class="max-w-60">
		<Stat.Root>
			<Stat.Label>This week</Stat.Label>
			<Stat.ValueText
				value={1340}
				formatOptions={{
					currency: "USD",
					style: "currency",
					maximumFractionDigits: 0,
				}}
			/>
			<Stat.HelpText>+12% from last week</Stat.HelpText>
		</Stat.Root>
		<Progress.Root value={50}>
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
	</VStack>
{:else if story === "icon"}
	<Stat.Root class="max-w-60 border border-border-default p-4 rounded-md">
		<Stat.Label class="flex justify-between w-full">
			Sales
			<Icon as={CurrencyDollar} size="sm" class="text-fg-muted" aria-hidden="true" />
		</Stat.Label>
		<Stat.ValueText>$4.24k</Stat.ValueText>
	</Stat.Root>
{:else if story === "trend"}
	<Stat.Root class="flex-row flex-wrap items-center gap-x-2">
		<Stat.Label class="w-full">Unique</Stat.Label>
		<Stat.ValueText
			value={8456.4}
			formatOptions={{ style: "currency", currency: "USD" }}
		/>
		<Stat.UpTrend>12%</Stat.UpTrend>
		<Stat.HelpText class="w-full">since last month</Stat.HelpText>
	</Stat.Root>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Stat.Root class="flex-row flex-wrap items-center gap-x-2">
					<Stat.Label class="w-full">Revenue</Stat.Label>
					<Stat.ValueText>$8,456</Stat.ValueText>
					<Stat.UpTrend {colour}>12%</Stat.UpTrend>
				</Stat.Root>
				<Stat.Root class="flex-row flex-wrap items-center gap-x-2">
					<Stat.Label class="w-full">Visitors</Stat.Label>
					<Stat.ValueText>192.1k</Stat.ValueText>
					<Stat.DownTrend {colour}>1.9%</Stat.DownTrend>
				</Stat.Root>
			</HStack>
		{/each}
	</VStack>
{/if}
