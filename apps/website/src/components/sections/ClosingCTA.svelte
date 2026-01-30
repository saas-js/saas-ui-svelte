<script lang="ts">
	import { Container } from "@saas-ui/svelte/layout/container";
	import { HStack } from "@saas-ui/svelte/layout/stack";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Heading } from "@saas-ui/svelte/typography/heading";
</script>

<section class="border-dashed border-y border-border-default">
	<Container maxW="7xl">
		<HStack
			gap={6}
			class="flex-col items-start justify-between px-8 py-16 border-dashed md:flex-row md:items-end border-x border-border-default"
		>
			<Heading as="h2" size="3xl" weight="medium" class="tracking-tight">
				Join hundreds of developers<br />building better SaaS
				interfaces.
			</Heading>
			<HStack gap={2}>
				<Button
					as="a"
					href="/docs/components/overview"
					variant="glass"
					colour="indigo"
				>
					Browse all components
				</Button>
				<Button as="a" href="/blocks" variant="outline">
					View blocks
				</Button>
			</HStack>
		</HStack>
	</Container>
</section>
