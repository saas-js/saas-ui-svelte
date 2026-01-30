<script lang="ts">
import { Container } from "@saas-ui/svelte/layout/container";
import { HStack } from "@saas-ui/svelte/layout/stack";
import { Button } from "@saas-ui/svelte/components/button";
import { Heading } from "@saas-ui/svelte/typography/heading";
</script>

<section class="border-border-default border-y border-dashed">
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
