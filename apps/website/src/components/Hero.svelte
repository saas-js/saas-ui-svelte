<script lang="ts">
	import { Button } from "@saas-ui/svelte/components/button";
	import { Container } from "@saas-ui/svelte/layout/container";
	import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
	import { Heading } from "@saas-ui/svelte/typography/heading";
	import { Text } from "@saas-ui/svelte/typography/text";
	import ClipboardButton from "./ClipboardButton.svelte";
</script>

<section class="relative pt-32 pb-20 overflow-hidden">
	<Container maxW="7xl">
		<VStack gap={8} class="items-center text-center">
			<VStack gap={5} class="items-center max-w-4xl">
				<Heading
					as="h1"
					size="6xl"
					weight="semibold"
					class="tracking-tight text-fg-default text-balance"
				>
					The Svelte component library for startups.
				</Heading>
				<Text size="lg" weight="medium" class="max-w-2xl text-fg-muted">
					Saas UI Svelte is an open source Svelte component system
					built on Ark UI. Designed to help you build beautiful,
					consistent SaaS applications.
				</Text>
			</VStack>

			<HStack gap={3} class="flex-col items-center sm:flex-row">
				<Button
					as="a"
					href="/docs/components/overview"
					variant="glass"
					colour="indigo"
					size="lg"
					class="min-w-44"
				>
					View all components
				</Button>

				<ClipboardButton />
			</HStack>
		</VStack>
	</Container>
</section>
