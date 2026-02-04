<script lang="ts">
	import { Container } from "@saas-ui/svelte/layout/container";
	import { HStack } from "@saas-ui/svelte/layout/stack";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Heading } from "@saas-ui/svelte/typography/heading";

	// Normalize base URL - remove trailing slash to avoid double slashes
	const rawBase = import.meta.env.BASE_URL || "";
	const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
</script>

<section class="border-border-default border-t border-dashed">
	<Container maxW="7xl">
		<HStack
			gap={6}
			class="border-border-default flex-col items-start justify-between border-x border-dashed px-8 py-16 md:flex-row md:items-end"
		>
			<Heading as="h2" size="3xl" weight="medium" class="tracking-tight">
				Join hundreds of developers<br />building better SaaS
				interfaces.
			</Heading>
			<HStack gap={2}>
				<Button
					as="a"
					href="{base}/docs"
					variant="glass"
					colour="indigo"
					class="text-md"
				>
					Browse all components
				</Button>
				<Button
					disabled
					as="a"
					href="{base}/blocks"
					variant="outline"
					class="text-md"
				>
					View blocks
				</Button>
			</HStack>
		</HStack>
	</Container>
</section>
