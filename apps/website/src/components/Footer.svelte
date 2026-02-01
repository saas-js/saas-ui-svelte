<script lang="ts">
	import { Container } from "@saas-ui/svelte/layout/container";
	import { HStack } from "@saas-ui/svelte/layout/stack";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Text } from "@saas-ui/svelte/typography/text";

	// Normalize base URL - remove trailing slash to avoid double slashes
	const rawBase = import.meta.env.BASE_URL || "";
	const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
	const currentYear = new Date().getFullYear();

	const links = [
		{ label: "Storybook", href: `${base}/storybook` },
		{ label: "Components", href: `${base}/docs/components/button` },
		{ label: "Licence", href: `${base}/licence` },
		{ label: "Privacy", href: `${base}/privacy` },
		{ label: "Terms", href: `${base}/terms` },
	];
</script>

<footer class="border-border-default border-t border-dashed py-8">
	<Container maxW="7xl">
		<HStack
			gap={6}
			class="flex-col items-center justify-between gap-4 sm:flex-row"
		>
			<Text size="sm" class="text-fg-muted">
				© {currentYear} Jacob Weinbren
			</Text>

			<HStack gap={6} class="flex-wrap justify-center">
				{#each links as link}
					<Link
						href={link.href}
						class="text-fg-muted hover:text-fg-default text-sm transition-colors"
					>
						{link.label}
					</Link>
				{/each}
			</HStack>
		</HStack>
	</Container>
</footer>
