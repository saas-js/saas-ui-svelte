<script lang="ts">
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Link } from "@saas-ui/svelte/components/link";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { VStack } from "@saas-ui/svelte/layout/stack";
	import { Text } from "@saas-ui/svelte/typography/text";
	import GithubLogo from "phosphor-svelte/lib/GithubLogoIcon";
	import ArrowLineUp from "phosphor-svelte/lib/ArrowLineUpIcon";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOutIcon";

	interface TocItem {
		label: string;
		href: string;
		level?: number;
		children?: TocItem[];
	}

	interface Props {
		items: TocItem[];
		githubUrl?: string;
	}

	let { items, githubUrl }: Props = $props();

	let activeId = $state<string>("");

	function flattenItems(items: TocItem[]): TocItem[] {
		const result: TocItem[] = [];
		for (const item of items) {
			result.push(item);
			if (item.children) {
				result.push(...flattenItems(item.children));
			}
		}
		return result;
	}

	$effect(() => {
		if (typeof window === "undefined") return;

		const flatItems = flattenItems(items);
		const ids = flatItems.map((item) => item.href.replace("#", ""));

		const observer = new IntersectionObserver(
			(entries) => {
				// Find the first visible section
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{
				rootMargin: "-80px 0px -80% 0px",
				threshold: 0,
			}
		);

		// Observe all sections
		for (const id of ids) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			observer.disconnect();
		};
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function getIndentClass(level: number = 1): string {
		if (level === 1) return "";
		if (level === 2) return "ml-4";
		return "ml-8";
	}
</script>

<Box
	as="aside"
	class="hidden xl:block shrink-0 w-64 h-[calc(100vh-3.5rem)] sticky overflow-y-auto px-2 py-8 top-14 overscroll-contain"
>
	<VStack gap={4} class="items-start">
		<Box as="nav" class="w-full text-sm">
			<Text size="sm" weight="semibold" class="mb-3 text-fg-default">On this page</Text>
			<VStack gap={2} class="items-start">
				{#each items as item}
					{@const isActive = activeId === item.href.replace("#", "")}
					<Link
						href={item.href}
						class="text-sm transition-colors {getIndentClass(item.level)} {isActive
							? 'text-fg-default font-medium'
							: 'text-fg-muted hover:text-fg-default'}"
					>
						{item.label}
					</Link>
					{#if item.children}
						{#each item.children as child}
							{@const isChildActive = activeId === child.href.replace("#", "")}
							<Link
								href={child.href}
								class="text-sm transition-colors ml-4 {isChildActive
									? 'text-fg-default font-medium'
									: 'text-fg-muted hover:text-fg-default'}"
							>
								{child.label}
							</Link>
						{/each}
					{/if}
				{/each}
			</VStack>
		</Box>

		<VStack gap={2} class="items-start w-full pt-4 border-t border-border-default">
			{#if githubUrl}
				<Link
					href={githubUrl}
					class="flex items-center text-xs text-fg-muted gap-2 hover:text-fg-default transition-colors"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon as={GithubLogo} size="sm" />
					<Text size="xs">Edit on GitHub</Text>
					<Icon as={ArrowSquareOut} size="xs" />
				</Link>
			{/if}
			<Button
				variant="ghost"
				size="xs"
				onclick={scrollToTop}
				class="h-auto p-0 text-fg-muted hover:text-fg-default transition-colors"
			>
				<Icon as={ArrowLineUp} size="sm" />
				<Text size="xs">Scroll to top</Text>
			</Button>
		</VStack>
	</VStack>
</Box>
