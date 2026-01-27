<script lang="ts">
	import type { Component } from "svelte";
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Text } from "@saas-ui/svelte/typography/text";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Square } from "@saas-ui/svelte/layout/centre";
	import FilePpt from "phosphor-svelte/lib/FilePptIcon";
	import FileDoc from "phosphor-svelte/lib/FileDocIcon";
	import FilePdf from "phosphor-svelte/lib/FilePdfIcon";
	import DownloadSimple from "phosphor-svelte/lib/DownloadSimpleIcon";

	const files: {
		name: string;
		size: string;
		date: string;
		icon: Component;
		colour: string;
	}[] = [
		{ name: "Pitch deck.pptx", size: "2.3 MB", date: "2 days ago", icon: FilePpt, colour: "yellow" },
		{ name: "Blogpost.docx", size: "1 MB", date: "a week ago", icon: FileDoc, colour: "blue" },
		{ name: "Flyer.pdf", size: "76 KB", date: "12 days ago", icon: FilePdf, colour: "red" },
	];
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			Files
			<span class="ml-1 rounded bg-bg-subtle px-1.5 py-0.5 text-xs font-normal text-fg-muted">
				{files.length}
			</span>
		</Card.Title>
	</Card.Header>
	<Card.Body class="p-0">
		<ul class="text-sm">
			{#each files as file, i}
				{#if i > 0}<Separator />{/if}
				<li class="flex items-center justify-between gap-3 px-4 py-3">
					<Square size={8} class="rounded border border-border-default">
						<Icon as={file.icon} size="sm" weight="fill" colour={file.colour} />
					</Square>
					<div class="min-w-0 flex-1">
						<Text weight="medium" class="truncate">{file.name}</Text>
						<Text class="truncate text-fg-muted">{file.size} • {file.date}</Text>
					</div>
					<Button variant="ghost" size="sm" aria-label="Download">
						<Icon as={DownloadSimple} size="md" weight="bold" />
					</Button>
				</li>
			{/each}
		</ul>
	</Card.Body>
</Card.Root>
