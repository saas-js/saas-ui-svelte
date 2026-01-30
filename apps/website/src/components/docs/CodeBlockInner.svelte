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

<Box class="code-block relative group {className ?? ''}">
	<Box class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
		<Clipboard.Root value={code}>
			<ClipboardIconButton />
		</Clipboard.Root>
	</Box>
	<Box class="shiki-wrapper rounded-lg overflow-x-auto text-sm">
		{@html html}
	</Box>
</Box>
