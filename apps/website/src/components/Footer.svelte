<script lang="ts">
import { Container } from "@saas-ui/svelte/layout/container";
import { Grid } from "@saas-ui/svelte/layout/grid";
import { VStack, HStack } from "@saas-ui/svelte/layout/stack";
import { Link } from "@saas-ui/svelte/components/link";
import { Text } from "@saas-ui/svelte/typography/text";
import { Heading } from "@saas-ui/svelte/typography/heading";
import Logo from "./Logo.svelte";

// Normalize base URL - remove trailing slash to avoid double slashes
const rawBase = import.meta.env.BASE_URL || "";
const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
const currentYear = new Date().getFullYear();

const linkGroups = [
	{
		title: "Resources",
		links: [
			{ label: "Documentation", href: `${base}/docs` },
			{ label: "Blog", href: `${base}/blog` },
			{ label: "Roadmap", href: "https://roadmap.saas-ui.dev" },
			{ label: "Changelog", href: `${base}/changelog` },
		],
	},
	{
		title: "Products",
		links: [
			{ label: "Svelte components", href: `${base}/docs/components/overview` },
			{ label: "Blocks", href: `${base}/pro/blocks` },
			{ label: "Figma UI kit", href: `${base}/pro/figma` },
			{ label: "Next.js starter kit", href: "https://saas-js.com" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "Licence", href: `${base}/licence` },
			{ label: "Privacy", href: `${base}/privacy` },
			{ label: "Terms", href: `${base}/terms` },
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
