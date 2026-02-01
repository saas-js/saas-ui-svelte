<script lang="ts">
	import { Status } from "@saas-ui/svelte/components/status";
	import { Tooltip } from "@saas-ui/svelte/components/tooltip";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { Flex } from "@saas-ui/svelte/layout/flex";
	import { VStack } from "@saas-ui/svelte/layout/stack";
	import { Text } from "@saas-ui/svelte/typography/text";
	import type { StoryAccessibility } from "../../lib/accessibility";

	interface Props {
		a11y: StoryAccessibility;
		generatedAt?: string;
	}

	let { a11y, generatedAt }: Props = $props();

	const statusLabel = "Accessibility";

	// Format date in a deterministic way to avoid SSR/client mismatch
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	}
	const formattedDate = $derived(
		generatedAt ? formatDate(generatedAt) : null,
	);
</script>

<Tooltip interactive openDelay={200} closeDelay={300}>
	{#snippet trigger()}
		<Text as="span" class="inline-flex cursor-help items-center">
			<Status value={a11y.status} size="sm">
				{statusLabel}
			</Status>
		</Text>
	{/snippet}
	<Box class="min-w-52 p-1 text-sm">
		<Text weight="semibold" class="text-fg-default mb-3">
			{a11y.status === "success"
				? "Accessibility test passed"
				: a11y.status === "error"
					? "Accessibility issues found"
					: "Test could not run"}
		</Text>
		<VStack gap={1.5} class="text-fg-muted">
			<Flex justify="between" gap={6}>
				<Text as="span">Violations:</Text>
				<Text
					as="span"
					weight="medium"
					class={a11y.violations > 0
						? "text-red-fg"
						: "text-green-fg"}
				>
					{a11y.violations >= 0 ? a11y.violations : "N/A"}
				</Text>
			</Flex>
			<Flex justify="between" gap={6}>
				<Text as="span">Rules passed:</Text>
				<Text as="span" weight="medium" class="text-green-fg"
					>{a11y.passes ?? "N/A"}</Text
				>
			</Flex>
		</VStack>
		<VStack
			gap={0.5}
			class="border-border-default text-fg-subtle mt-3 border-t pt-3 text-xs"
		>
			<Text size="xs">Tested with Playwright + axe-core</Text>
			<Text size="xs">WCAG 2.1 Level AA</Text>
			{#if formattedDate}
				<Text size="xs">Last run: {formattedDate}</Text>
			{/if}
		</VStack>
	</Box>
</Tooltip>
