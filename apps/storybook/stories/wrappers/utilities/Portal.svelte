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
		<p class="text-fg-muted mb-4">
			The content below is rendered at the end of document.body via portal.
		</p>
		<Portal>
			<div class="fixed bottom-4 left-4 p-4 bg-bg-subtle border border-border-default rounded-lg shadow-lg z-50">
				<p class="text-sm">This is portal content (rendered at document.body)</p>
			</div>
		</Portal>
		<Button variant="outline">Regular button (for comparison)</Button>
	</div>
{:else if story === "disabled"}
	<div>
		<p class="text-fg-muted mb-4">
			When disabled, content renders in place instead of via portal.
		</p>
		<div class="border border-dashed border-border-default p-4 rounded">
			<p class="text-sm mb-2">Parent container:</p>
			<Portal disabled>
				<div class="p-4 bg-bg-subtle border border-border-default rounded">
					This content is rendered in place (portal disabled)
				</div>
			</Portal>
		</div>
	</div>
{:else if story === "customContainer"}
	<div>
		<p class="text-fg-muted mb-4">
			Portal content rendered into a custom container element.
		</p>
		<Portal container={containerRef}>
			<div class="p-4 bg-bg-emphasized rounded">
				This content is rendered into the container below
			</div>
		</Portal>
		<div
			bind:this={containerRef}
			class="mt-4 p-4 border-2 border-dashed border-blue-500 rounded min-h-20"
		>
			<p class="text-sm text-fg-muted">Custom container (portal target)</p>
		</div>
	</div>
{/if}
