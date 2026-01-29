<script lang="ts" module>
	// Wrapper components for complex LinkOverlay stories
	// These are imported by LinkOverlay.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { LinkBox, LinkOverlay } from "$saas/components/link-overlay";
	import { Link } from "$saas/components/link";
	import { Text } from "$saas/typography/text";
	import { Heading } from "$saas/typography/heading";
	import { VStack } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "article" | "card";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<LinkBox>
		<VStack gap={2}>
			<Heading as="h4" size="lg">Wanna try it out?</Heading>
			<Text class="text-fg-muted">
				This entire area is a link. Click it to see the effect.
			</Text>
			<LinkOverlay href="#" variant="underline" colour="accent">
				Click me
			</LinkOverlay>
		</VStack>
	</LinkBox>
{:else if story === "article"}
	<LinkBox
		as="article"
		class="max-w-sm p-5 border border-border-default rounded-md"
	>
		<Text as="span" size="sm" class="text-fg-muted">
			<time datetime="2021-01-15">13 days ago</time>
		</Text>
		<Heading size="lg" class="my-2">
			<LinkOverlay href="#">Svelte 5 Workshop</LinkOverlay>
		</Heading>
		<Text class="text-fg-muted mb-3">
			Catch up on what's been cooking at Svelte and explore some of the
			popular community resources.
		</Text>
		<Link
			href="#inner-link"
			variant="underline"
			colour="teal"
			class="relative z-1"
		>
			Inner Link
		</Link>
	</LinkBox>
{:else if story === "card"}
	<LinkBox
		class="max-w-sm p-6 border border-border-default rounded-lg bg-bg-subtle"
	>
		<VStack gap={3} class="items-start">
			<Text
				size="xs"
				class="text-fg-muted uppercase tracking-wide font-medium"
			>
				Tutorial
			</Text>
			<Heading size="md">
				<LinkOverlay href="#">
					Getting Started with SvelteKit
				</LinkOverlay>
			</Heading>
			<Text size="sm" class="text-fg-muted">
				Learn how to build modern web applications with SvelteKit, the
				official application framework for Svelte.
			</Text>
		</VStack>
	</LinkBox>
{/if}
