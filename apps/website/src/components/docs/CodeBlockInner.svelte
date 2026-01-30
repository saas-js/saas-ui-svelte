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

<Box class="code-block group relative {className ?? ''}">
	<Box
		class="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
	>
		<Clipboard.Root value={code}>
			<ClipboardIconButton />
		</Clipboard.Root>
	</Box>
	<Box class="shiki-wrapper overflow-x-auto rounded-lg text-sm">
		{@html html}
	</Box>
</Box>
