<script lang="ts">
	import { Status } from "@saas-ui/svelte/components/status";
	import { Tooltip } from "@saas-ui/svelte/components/tooltip";
	import type { StoryAccessibility } from "../../lib/accessibility";

	interface Props {
		a11y: StoryAccessibility;
		generatedAt?: string;
	}

	let { a11y, generatedAt }: Props = $props();

	const statusLabel = "Accessibility";

	const formattedDate = $derived(
		generatedAt
			? new Date(generatedAt).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				})
			: null
	);
</script>

<Tooltip interactive openDelay={200} closeDelay={300} variant="inverted">
	{#snippet trigger()}
		<span class="inline-flex items-center cursor-help">
			<Status value={a11y.status} size="sm">
				{statusLabel}
			</Status>
		</span>
	{/snippet}
	<div class="text-sm min-w-52 p-1">
		<div class="font-semibold text-fg-default mb-3">
			{a11y.status === "success"
				? "Accessibility test passed"
				: a11y.status === "error"
					? "Accessibility issues found"
					: "Test could not run"}
		</div>
		<div class="space-y-1.5 text-fg-muted">
			<div class="flex justify-between gap-6">
				<span>Violations:</span>
				<span class={a11y.violations > 0 ? "text-red-fg font-medium" : "text-green-fg font-medium"}>
					{a11y.violations >= 0 ? a11y.violations : "N/A"}
				</span>
			</div>
			<div class="flex justify-between gap-6">
				<span>Rules passed:</span>
				<span class="text-green-fg font-medium">{a11y.passes ?? "N/A"}</span>
			</div>
		</div>
		<div class="pt-3 mt-3 border-t border-border-default text-fg-subtle text-xs space-y-0.5">
			<div>Tested with Playwright + axe-core</div>
			<div>WCAG 2.1 Level AA</div>
			{#if formattedDate}
				<div>Last run: {formattedDate}</div>
			{/if}
		</div>
	</div>
</Tooltip>
