<script lang="ts">
import { Tabs } from "@saas-ui/svelte/components/tabs";
import { Box } from "@saas-ui/svelte/layout/box";
import { Clipboard, ClipboardIconButton } from "@saas-ui/svelte/components/clipboard";
import type { Snippet } from "svelte";

interface Props {
	/** The raw code string for copying */
	code: string;
	/** Pre-rendered HTML from syntax highlighter */
	html: string;
	/** Preview content slot */
	children?: Snippet;
	/** Additional classes */
	class?: string;
}

let { code, html, children, class: className }: Props = $props();
</script>

<Box class="code-preview {className ?? ''}">
	<Tabs.Root defaultValue="preview" variant="enclosed" size="sm">
		<Tabs.List class="tabs-list">
			<Tabs.Trigger value="preview" class="tab-trigger">Preview</Tabs.Trigger>
			<Tabs.Trigger value="code" class="tab-trigger">Code</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="preview" class="tab-content preview-content">
			<Box class="p-6">
				{@render children?.()}
			</Box>
		</Tabs.Content>

		<Tabs.Content value="code" class="tab-content code-content">
			<Box class="group relative">
				<Box
					class="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Clipboard.Root value={code}>
						<ClipboardIconButton />
					</Clipboard.Root>
				</Box>
				<Box class="shiki-wrapper overflow-x-auto text-sm p-6">
					{@html html}
				</Box>
			</Box>
		</Tabs.Content>
	</Tabs.Root>
</Box>

<style>
.code-preview {
	border-radius: var(--radius-lg);
	overflow: hidden;
}

.code-preview :global(.tabs-list) {
	background-color: var(--color-bg-muted);
	padding-left: 0.5rem;
}

.code-preview :global(.tab-trigger) {
	color: var(--color-fg-muted);
	background-color: transparent;
	border-color: transparent;
}

.code-preview :global(.tab-trigger:hover) {
	color: var(--color-fg-default);
}

/* Selected tab - darker in light mode, brighter in dark mode */
.code-preview :global(.tab-trigger[data-selected]) {
	background-color: var(--color-bg-default);
	color: var(--color-fg-default);
	border-top-color: var(--color-border-default);
	border-left-color: var(--color-border-default);
	border-right-color: var(--color-border-default);
	border-bottom-color: transparent;
}

.code-preview :global(.tab-content) {
	padding-top: 0;
	border: 1px solid var(--color-border-default);
	border-top: none;
	border-bottom-left-radius: var(--radius-lg);
	border-bottom-right-radius: var(--radius-lg);
}

.code-preview :global(.preview-content) {
	background-color: var(--color-bg-default);
}

.code-preview :global(.code-content) {
	background-color: var(--color-bg-subtle);
}
</style>
