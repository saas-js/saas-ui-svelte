<script lang="ts">
	import { Tabs } from "@saas-ui/svelte/components/tabs";
	import { Box } from "@saas-ui/svelte/layout/box";
	import {
		Clipboard,
		ClipboardIconButton,
	} from "@saas-ui/svelte/components/clipboard";
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

<Box
	class="[&_.tabs-list]:bg-bg-muted [&_.tab-trigger]:text-fg-muted [&_.tab-trigger:hover]:text-fg-default [&_.tab-trigger[data-selected]]:bg-bg-default [&_.tab-trigger[data-selected]]:text-fg-default [&_.tab-trigger[data-selected]]:border-t-border-default [&_.tab-trigger[data-selected]]:border-l-border-default [&_.tab-trigger[data-selected]]:border-r-border-default [&_.tab-content]:border-border-default [&_.preview-content]:bg-bg-default [&_.code-content]:bg-bg-subtle overflow-hidden rounded-lg [&_.tab-content]:rounded-b-lg [&_.tab-content]:border [&_.tab-content]:border-t-0 [&_.tab-content]:pt-0 [&_.tab-trigger]:border-transparent [&_.tab-trigger]:bg-transparent [&_.tab-trigger[data-selected]]:border-b-transparent [&_.tabs-list]:pl-2 {className ??
		''}"
>
	<Tabs.Root defaultValue="preview" variant="enclosed" size="sm">
		<Tabs.List class="tabs-list">
			<Tabs.Trigger value="preview" class="tab-trigger"
				>Preview</Tabs.Trigger
			>
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
				<Box class="shiki-wrapper overflow-x-auto p-6 text-sm">
					{@html html}
				</Box>
			</Box>
		</Tabs.Content>
	</Tabs.Root>
</Box>
