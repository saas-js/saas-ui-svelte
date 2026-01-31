<script lang="ts">
	import { Button } from "@saas-ui/svelte/components/button";
	import FunnelIcon from "phosphor-svelte/lib/FunnelIcon";
	import { emails, getPreview } from "./emails";

	interface Props {
		selectedId: string | null;
		onSelect: (id: string) => void;
		sidebarOpen: boolean;
		onToggleSidebar: () => void;
	}

	let { selectedId, onSelect, sidebarOpen, onToggleSidebar }: Props = $props();
</script>

<div class="flex flex-col flex-1 bg-bg-default">
	<!-- Header -->
	<div
		class="z-10 bg-bg-default shrink-0 justify-between items-center gap-2 h-12 flex sticky border-b border-border-default top-0 px-3"
	>
		<h2 class="text-[.8125rem] leading-4 font-medium text-fg-muted">Inbox</h2>
		<Button variant="ghost" size="sm" icon colour="gray" aria-label="Filter">
			<FunnelIcon size={16} />
		</Button>
	</div>

	<!-- Email list -->
	<div class="flex-1 overflow-y-auto p-2">
		{#each emails as email}
			<button
				type="button"
				class="appearance-none cursor-pointer w-full text-left mb-1 px-2.5 py-1.5 rounded transition-colors duration-150 hover:bg-bg-subtle focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-indigo-600 {selectedId ===
				email.id
					? 'bg-bg-subtle'
					: ''}"
				onclick={() => onSelect(email.id)}
			>
				<div class="justify-between items-center gap-2 w-full flex">
					<h4
						class="text-[.8125rem] leading-4 flex-1 font-medium overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{email.from}
					</h4>
					<p class="text-[.675rem] text-fg-muted shrink-0">{email.date}</p>
				</div>
				<p class="text-xs text-fg-emphasized mt-0.5">{email.subject}</p>
				<p
					class="text-xs text-fg-muted mt-0.5 overflow-hidden"
					style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
				>
					{getPreview(email.content)}
				</p>
			</button>
		{/each}
	</div>
</div>
