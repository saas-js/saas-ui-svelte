<script lang="ts">
	import { Portal } from "$saas/components/portal";
	import { Button } from "$saas/components/button";
	import { Box } from "$saas/layout/box";

	interface Props {
		story: "basic" | "disabled" | "customContainer";
	}

	let { story }: Props = $props();

	let containerRef: HTMLDivElement | null = $state(null);
</script>

{#if story === "basic"}
	<div>
		<p class="mb-4 text-fg-muted">
			The content below is rendered at the end of document.body via portal.
		</p>
		<Portal>
			<div class="fixed z-50 p-4 border rounded-lg shadow-lg bottom-4 left-4 bg-bg-subtle border-border-default">
				<p class="text-sm">This is portal content (rendered at document.body)</p>
			</div>
		</Portal>
		<Button variant="outline">Regular button (for comparison)</Button>
	</div>
{:else if story === "disabled"}
	<div>
		<p class="mb-4 text-fg-muted">
			When disabled, content renders in place instead of via portal.
		</p>
		<div class="p-4 border border-dashed rounded border-border-default">
			<p class="mb-2 text-sm">Parent container:</p>
			<Portal disabled>
				<div class="p-4 border rounded bg-bg-subtle border-border-default">
					This content is rendered in place (portal disabled)
				</div>
			</Portal>
		</div>
	</div>
{:else if story === "customContainer"}
	<div>
		<p class="mb-4 text-fg-muted">
			Portal content rendered into a custom container element.
		</p>
		<Portal container={containerRef}>
			<div class="p-4 rounded bg-bg-emphasized">
				This content is rendered into the container below
			</div>
		</Portal>
		<div
			bind:this={containerRef}
			class="p-4 mt-4 border-2 border-blue-500 border-dashed rounded min-h-20"
		>
			<p class="text-sm text-fg-muted">Custom container (portal target)</p>
		</div>
	</div>
{/if}
