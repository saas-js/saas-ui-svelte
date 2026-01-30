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

<Box class="my-6 @container [&_.tab-trigger]:text-fg-muted [&_.tab-trigger]:bg-transparent [&_.tab-trigger]:border-transparent [&_.tab-trigger:hover]:text-fg-default [&_.tab-trigger[data-selected]]:bg-bg-default [&_.tab-trigger[data-selected]]:text-fg-default [&_.tab-trigger[data-selected]]:border-t-border-default [&_.tab-trigger[data-selected]]:border-l-border-default [&_.tab-trigger[data-selected]]:border-r-border-default [&_.tab-trigger[data-selected]]:border-b-transparent [&_.shiki-wrapper_pre]:bg-transparent! [&_.shiki-wrapper_pre.shiki]:bg-transparent! [&_pre[style]]:bg-transparent!">
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
