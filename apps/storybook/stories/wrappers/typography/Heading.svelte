<script lang="ts" module>
	// Wrapper components for complex Heading stories
	// These are imported by Heading.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Heading } from "$saas/typography/heading";
	import { Text } from "$saas/typography/text";
	import { Mark } from "$saas/typography/mark";
	import { Button } from "$saas/components/button";
	import { Stack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";

	const textSizes = [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"6xl",
		"7xl",
	] as const;
	const headingWeights = ["normal", "medium", "semibold", "bold"] as const;

	interface Props {
		story: "basic" | "sizes" | "multiline" | "weights" | "asElement" | "highlight" | "composition";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Heading>The quick brown fox jumps over the lazy dog</Heading>
{:else if story === "sizes"}
	<Stack>
		{#each textSizes as size}
			<Heading {size}>The quick brown fox jumps over the lazy dog</Heading>
		{/each}
	</Stack>
{:else if story === "multiline"}
	<Stack>
		{#each textSizes as size}
			<Heading {size}>
				The quick brown fox
				<br />
				jumps over the lazy dog
			</Heading>
		{/each}
	</Stack>
{:else if story === "weights"}
	<Stack>
		{#each headingWeights as w}
			<Heading weight={w}>{w}</Heading>
		{/each}
	</Stack>
{:else if story === "asElement"}
	<Stack>
		<Heading as="h1">Level 1</Heading>
		<Heading as="h2">Level 2</Heading>
		<Heading as="h3">Level 3</Heading>
	</Stack>
{:else if story === "highlight"}
	<Stack>
		<Heading size="3xl">
			Build modern SaaS applications with <Mark
				colour="indigo"
				variant="text">Saas UI</Mark
			>
		</Heading>
		<Text class="text-fg-muted">
			Saas UI provides enterprise-ready components and patterns to help
			you build professional applications faster than ever.
		</Text>
	</Stack>
{:else if story === "composition"}
	<Stack align="start">
		<Heading size="2xl">Modern payments for Stores</Heading>
		<Text class="mb-3 text-fg-muted">
			PayMe helps startups get paid by anyone, anywhere in the world
		</Text>
		<Button>
			Create account
			<Icon as={ArrowRight} size="sm" />
		</Button>
	</Stack>
{/if}
