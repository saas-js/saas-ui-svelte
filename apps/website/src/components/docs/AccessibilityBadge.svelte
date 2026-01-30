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
		generatedAt ? new Date(generatedAt).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		}) : null
	);
</script>

<Tooltip interactive openDelay={200} closeDelay={300}>
	{#snippet trigger()}
		<span class="inline-flex items-center cursor-help">
			<Status value={a11y.status} size="sm">
				{statusLabel}
			</Status>
		</span>
	{/snippet}
	<div class="text-xs space-y-1.5 min-w-48">
		<div class="font-semibold mb-2">
			{a11y.status === "success" ? "Accessibility test passed" : a11y.status === "error" ? "Accessibility issues found" : "Test could not run"}
		</div>
		<div class="space-y-1 text-fg-muted">
			<div class="flex justify-between gap-4">
				<span>Violations:</span>
				<span class={a11y.violations > 0 ? "text-red-fg" : "text-green-fg"}>{a11y.violations >= 0 ? a11y.violations : "N/A"}</span>
			</div>
			<div class="flex justify-between gap-4">
				<span>Rules passed:</span>
				<span class="text-green-fg">{a11y.passes ?? "N/A"}</span>
			</div>
		</div>
		<div class="pt-2 mt-2 border-t border-border-default text-fg-subtle text-[11px]">
			<div>Tested with Playwright + axe-core</div>
			<div>WCAG 2.1 Level AA</div>
			{#if formattedDate}
				<div>Last run: {formattedDate}</div>
			{/if}
		</div>
	</div>
</Tooltip>
