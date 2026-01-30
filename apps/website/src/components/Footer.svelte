<script lang="ts">
import { Container } from "@saas-ui/svelte/layout/container";
import { Grid } from "@saas-ui/svelte/layout/grid";
import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
import { Link } from "@saas-ui/svelte/components/link";
import { Text } from "@saas-ui/svelte/typography/text";
import { Heading } from "@saas-ui/svelte/typography/heading";
import Logo from "./Logo.svelte";

const currentYear = new Date().getFullYear();

const linkGroups = [
	{
		title: "Resources",
		links: [
			{ label: "Documentation", href: "/docs" },
			{ label: "Blog", href: "/blog" },
			{ label: "Roadmap", href: "https://roadmap.saas-ui.dev" },
			{ label: "Changelog", href: "/changelog" },
		],
	},
	{
		title: "Products",
		links: [
			{ label: "Svelte components", href: "/docs/components/overview" },
			{ label: "Blocks", href: "/pro/blocks" },
			{ label: "Figma UI kit", href: "/pro/figma" },
			{ label: "Next.js starter kit", href: "https://saas-js.com" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "Licence", href: "/licence" },
			{ label: "Privacy", href: "/privacy" },
			{ label: "Terms", href: "/terms" },
		],
	},
];
</script>

<footer class="border-border-default border-t border-dashed py-12">
	<Container maxW="7xl">
		<HStack
			gap={8}
			class="flex-col-reverse items-start justify-between md:flex-row"
		>
			<VStack gap={4} class="items-start">
				<Logo />
				<Text size="sm" class="text-fg-muted">
					Created by Jacob Weinbren in the United Kingdom © {currentYear}
				</Text>
			</VStack>

			<Grid
				gap={10}
				class="w-full grid-cols-1 pb-8 sm:grid-cols-3 md:max-w-2xl md:pb-0"
			>
				{#each linkGroups as group}
					<VStack gap={2.5} class="items-start">
						<Heading
							as="h5"
							size="xs"
							weight="medium"
							class="text-fg-default"
						>
							{group.title}
						</Heading>
						{#each group.links as link}
							<Link
								href={link.href}
								class="text-fg-muted hover:text-fg-default text-sm transition-colors"
							>
								{link.label}
							</Link>
						{/each}
					</VStack>
				{/each}
			</Grid>
		</HStack>
	</Container>
</footer>
