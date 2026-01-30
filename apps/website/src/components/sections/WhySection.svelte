<script lang="ts">
import { Container } from "@saas-ui/svelte/layout/container";
import { Grid } from "@saas-ui/svelte/layout/grid";
import { Box } from "@saas-ui/svelte/layout/box";
import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
import { Icon } from "@saas-ui/svelte/components/icon";
import { Text } from "@saas-ui/svelte/typography/text";
import { Heading } from "@saas-ui/svelte/typography/heading";
import Check from "phosphor-svelte/lib/Check";

const features = [
	[
		"Faster UI development",
		"Skip the boilerplate, focus on features",
		"Pre-built patterns for common SaaS interfaces",
	],
	[
		"Battle-tested components used in production",
		"Built-in accessibility (WCAG compliance)",
		"Consistent design language across your product",
	],
	[
		"Fully customisable styling",
		"Composable component architecture",
		"No vendor lock-in, it's open source",
	],
];
</script>

<section class="border-border-default border-y border-dashed py-16">
	<Container maxW="7xl">
		<HStack
			gap={4}
			class="mb-12 flex-col items-start lg:flex-row lg:items-end"
		>
			<Box class="flex-1">
				<Heading
					as="h2"
					size="4xl"
					weight="semibold"
					class="-tracking-wide"
				>
					Why product teams<br />choose Saas UI
				</Heading>
			</Box>
			<Box class="flex-1">
				<Text size="md" class="text-fg-muted">
					Pre-built, production-ready components that maintain design
					consistency, while accelerating development speed and time
					to market.
				</Text>
			</Box>
		</HStack>

		<Grid gap={4} class="grid-cols-1 md:grid-cols-3">
			{#each features as column}
				<VStack gap={0} as="ul">
					{#each column as feature}
						<HStack as="li" gap={2} class="py-2 font-medium">
							<Icon as={Check} size="sm" class="shrink-0" />
							<Text size="sm">{feature}</Text>
						</HStack>
					{/each}
				</VStack>
			{/each}
		</Grid>
	</Container>
</section>
