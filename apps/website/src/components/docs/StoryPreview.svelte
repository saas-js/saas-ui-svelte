<script lang="ts">
import { Tabs } from "@saas-ui/svelte/components/tabs";
import { Box } from "@saas-ui/svelte/layout/box";
import { Clipboard, ClipboardIconButton } from "@saas-ui/svelte/components/clipboard";
import type { Snippet } from "svelte";

interface Props {
	/** The story name to pass to the wrapper */
	story: string;
	/** Raw code string for copying */
	code?: string;
	/** Pre-highlighted HTML from Shiki */
	codeHtml?: string;
	/** Children slot for the actual rendered component */
	children?: Snippet;
}

let { story, code, codeHtml, children }: Props = $props();

const hasCode = $derived(!!code && !!codeHtml);
</script>

<Box class="story-preview my-6">
	{#if hasCode}
		<Tabs.Root defaultValue="preview" variant="enclosed" size="sm">
			<Tabs.List class="tabs-list">
				<Tabs.Trigger value="preview" class="tab-trigger">Preview</Tabs.Trigger>
				<Tabs.Trigger value="code" class="tab-trigger">Code</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="preview" class="tab-content pt-0!">
				<Box class="p-6 border-x border-b border-border-default rounded-b-lg bg-bg-default">
					{@render children?.()}
				</Box>
			</Tabs.Content>

			<Tabs.Content value="code" class="tab-content pt-0!">
				<Box class="group relative border-x border-b border-border-default rounded-b-lg bg-bg-muted">
					<Box
						class="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Clipboard.Root value={code}>
							<ClipboardIconButton />
						</Clipboard.Root>
					</Box>
					<Box class="shiki-wrapper overflow-x-auto text-sm p-4">
						{@html codeHtml}
					</Box>
				</Box>
			</Tabs.Content>
		</Tabs.Root>
	{:else}
		<Box class="p-6 border border-border-default rounded-lg bg-bg-default">
			{@render children?.()}
		</Box>
	{/if}
</Box>

<style>
.story-preview {
	container-type: inline-size;
}

.story-preview :global(.tab-trigger) {
	color: var(--color-fg-muted);
	background-color: transparent;
	border-color: transparent;
}

.story-preview :global(.tab-trigger:hover) {
	color: var(--color-fg-default);
}

/* Selected tab - darker in light mode, brighter in dark mode */
.story-preview :global(.tab-trigger[data-selected]) {
	background-color: var(--color-bg-default);
	color: var(--color-fg-default);
	border-top-color: var(--color-border-default);
	border-left-color: var(--color-border-default);
	border-right-color: var(--color-border-default);
	border-bottom-color: transparent;
}

/* Override Shiki inline background styles */
.story-preview :global(.shiki-wrapper pre),
.story-preview :global(.shiki-wrapper pre.shiki),
.story-preview :global(pre[style]) {
	background-color: transparent !important;
	background: transparent !important;
}
</style>
