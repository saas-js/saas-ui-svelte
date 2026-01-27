<script lang="ts">
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
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			Files
			<span
				class="ml-1 rounded bg-bg-subtle px-1.5 py-0.5 text-xs font-normal text-fg-muted"
				>3</span
			>
		</Card.Title>
	</Card.Header>
	<Card.Body class="p-0">
		<ul class="text-sm">
			<li class="flex items-center justify-between gap-3 px-4 py-3">
				<Square size={8} class="rounded border border-border-default">
					<Icon as={FilePpt} size="sm" weight="fill" colour="yellow" />
				</Square>
				<div class="min-w-0 flex-1">
					<Text weight="medium" class="truncate">Pitch deck.pptx</Text>
					<Text class="truncate text-fg-muted">
						2.3 MB • 2 days ago
					</Text>
				</div>
				<Button variant="ghost" size="sm" aria-label="Download">
					<Icon as={DownloadSimple} size="md" weight="bold" />
				</Button>
			</li>
			<Separator />
			<li class="flex items-center justify-between gap-3 px-4 py-3">
				<Square size={8} class="rounded border border-border-default">
					<Icon as={FileDoc} size="sm" weight="fill" colour="blue" />
				</Square>
				<div class="min-w-0 flex-1">
					<Text weight="medium" class="truncate">Blogpost.docx</Text>
					<Text class="truncate text-fg-muted">
						1 MB • a week ago
					</Text>
				</div>
				<Button variant="ghost" size="sm" aria-label="Download">
					<Icon as={DownloadSimple} size="md" weight="bold" />
				</Button>
			</li>
			<Separator />
			<li class="flex items-center justify-between gap-3 px-4 py-3">
				<Square size={8} class="rounded border border-border-default">
					<Icon as={FilePdf} size="sm" weight="fill" colour="red" />
				</Square>
				<div class="min-w-0 flex-1">
					<Text weight="medium" class="truncate">Flyer.pdf</Text>
					<Text class="truncate text-fg-muted">
						76 KB • 12 days ago
					</Text>
				</div>
				<Button variant="ghost" size="sm" aria-label="Download">
					<Icon as={DownloadSimple} size="md" weight="bold" />
				</Button>
			</li>
		</ul>
	</Card.Body>
</Card.Root>
