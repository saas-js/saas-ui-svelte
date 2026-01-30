<script lang="ts">
import { Box } from "@saas-ui/svelte/layout/box";
import { Clipboard } from "@saas-ui/svelte/components/clipboard";
import { ClipboardIconButton } from "@saas-ui/svelte/components/clipboard";

interface Props {
	code: string;
	html: string;
	class?: string;
}

let { code, html, class: className }: Props = $props();
</script>

<Box class="group relative [&_.shiki-wrapper_pre]:bg-transparent! {className ?? ''}">
	<Box
		class="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
	>
		<Clipboard.Root value={code}>
			<ClipboardIconButton />
		</Clipboard.Root>
	</Box>
	<Box class="shiki-wrapper bg-bg-muted overflow-x-auto rounded-lg text-sm border border-border-default p-4">
		{@html html}
	</Box>
</Box>
