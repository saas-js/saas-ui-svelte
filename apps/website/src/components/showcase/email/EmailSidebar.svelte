<script lang="ts">
	import { Avatar } from "@saas-ui/svelte/components/avatar";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Sidebar } from "@saas-ui/svelte/components/sidebar";

	// Phosphor icons
	import TrayIcon from "phosphor-svelte/lib/TrayIcon";
	import EyeIcon from "phosphor-svelte/lib/EyeIcon";
	import NoteIcon from "phosphor-svelte/lib/NoteIcon";
	import NotePencilIcon from "phosphor-svelte/lib/NotePencilIcon";

	interface Props {
		open: boolean;
		onToggle: () => void;
	}

	let { open, onToggle }: Props = $props();
</script>

<div
	class="bg-gray-100 dark:bg-gray-900 flex-col min-w-56 h-auto transition-all flex border-r border-border-default duration-200 ease-[cubic-bezier(.34,1.24,0.64,1)] w-64 {open
		? 'translate-x-0'
		: '-translate-x-full w-0 min-w-0 overflow-hidden border-r-0'}"
>
	<header class="flex px-3 py-2 justify-between">
		<button
			type="button"
			aria-label="User menu"
			class="appearance-none cursor-pointer shrink-0 justify-center items-center min-w-7 h-7 transition-all duration-200 inline-flex rounded focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-fg-muted hover:bg-black/5 dark:hover:bg-white/10"
		>
			<Avatar name="John Doe" size="sm" />
		</button>
		<Button
			variant="surface"
			size="sm"
			icon
			colour="gray"
			aria-label="New message"
			class="bg-white dark:bg-gray-800"
		>
			<NotePencilIcon size={16} />
		</Button>
	</header>

	<div class="flex-col flex-1 gap-4 flex overflow-y-auto p-3">
		<div role="group" class="relative">
			<div class="items-center gap-1 h-6 text-xs flex rounded-md">
				<h5 class="flex-1 items-center font-medium flex px-2 text-fg-default">
					Favourites
				</h5>
			</div>
			<div class="flex-col flex pt-1">
				<Sidebar.NavItem>
					<Sidebar.NavButton active class="h-7 gap-2 px-2.5">
						<TrayIcon size={16} class="text-blue-500" />
						All inboxes
					</Sidebar.NavButton>
				</Sidebar.NavItem>
				<Sidebar.NavItem>
					<Sidebar.NavButton class="h-7 gap-2 px-2.5">
						<EyeIcon size={16} class="text-blue-500" />
						Unread
					</Sidebar.NavButton>
				</Sidebar.NavItem>
				<Sidebar.NavItem>
					<Sidebar.NavButton class="h-7 gap-2 px-2.5">
						<NoteIcon size={16} class="text-blue-500" />
						Drafts
					</Sidebar.NavButton>
				</Sidebar.NavItem>
			</div>
		</div>
	</div>
</div>
