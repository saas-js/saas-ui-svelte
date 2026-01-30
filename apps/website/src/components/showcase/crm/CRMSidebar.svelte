<script lang="ts">
	import { Sidebar } from "@saas-ui/svelte/components/sidebar";
	import { Badge } from "@saas-ui/svelte/components/badge";
	import { Collapsible } from "@saas-ui/svelte/components/collapsible";
	import { Button } from "@saas-ui/svelte/components/button";
	import Logo from "../Logo.svelte";

	// Phosphor icons
	import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
	import SidebarSimpleIcon from "phosphor-svelte/lib/SidebarSimpleIcon";
	import BellIcon from "phosphor-svelte/lib/BellIcon";
	import ListChecksIcon from "phosphor-svelte/lib/ListChecksIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
	import PlusIcon from "phosphor-svelte/lib/PlusIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import UserIcon from "phosphor-svelte/lib/UserIcon";
	import BuildingsIcon from "phosphor-svelte/lib/BuildingsIcon";
	import GitBranchIcon from "phosphor-svelte/lib/GitBranchIcon";
	import ChartBarHorizontalIcon from "phosphor-svelte/lib/ChartBarHorizontalIcon";

	interface Props {
		open: boolean;
		onToggle: () => void;
	}

	let { open, onToggle }: Props = $props();
</script>

<Sidebar.Root
	class="group/sidebar bg-bg-muted relative hidden h-auto w-72 min-w-56 border-r-0 py-2 transition-all duration-300 ease-(--easings-bounce-out) md:flex {open
		? 'translate-x-0'
		: '-translate-x-full w-0 min-w-0 overflow-hidden'}"
>
	<Sidebar.Header class="flex shrink-0 items-center px-3 py-2">
		<Sidebar.NavItem>
			<Sidebar.NavButton class="gap-2 hover:bg-sidebar-accent-bg">
				<div
					class="flex h-5 w-5 items-center justify-center rounded bg-indigo-600 p-1"
				>
					<Logo class="h-full w-full text-white" />
				</div>
				Saas.js
			</Sidebar.NavButton>
		</Sidebar.NavItem>
		<div class="flex-1"></div>
		<Button variant="ghost" size="sm" class="h-8 w-8 min-w-8 shrink-0 [&_svg]:size-4">
			<MagnifyingGlassIcon size={16} class="shrink-0" />
		</Button>
		<button
			type="button"
			class="hover:bg-sidebar-accent-bg inline-flex h-8 w-8 min-w-8 shrink-0 cursor-pointer items-center justify-center rounded transition-colors duration-150"
			aria-label="Close sidebar"
			onclick={onToggle}
		>
			<svg
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 shrink-0 -scale-x-100 fill-none stroke-current"
			>
				<rect width="18" height="18" x="3" y="3" rx="2"></rect>
				<path d="M9 3v18"></path>
				<path d="m14 9 3 3-3 3"></path>
			</svg>
		</button>
	</Sidebar.Header>

	<Sidebar.Body class="flex flex-1 flex-col gap-4 overflow-y-auto p-3">
		<!-- Updates & Tasks group -->
		<div role="group" class="relative">
			<div class="flex flex-col pt-1">
				<Sidebar.NavItem>
					<Sidebar.NavButton class="h-7 gap-2 pl-2.5">
						<BellIcon size={16} />
						Updates
						<div class="flex-1"></div>
						<div class="ml-auto flex gap-px pr-1">
							<Badge colour="indigo" variant="subtle">12</Badge>
						</div>
					</Sidebar.NavButton>
				</Sidebar.NavItem>
				<Sidebar.NavItem>
					<Sidebar.NavButton class="h-7 gap-2 px-2.5">
						<ListChecksIcon size={16} />
						Tasks
					</Sidebar.NavButton>
				</Sidebar.NavItem>
			</div>
		</div>

		<!-- Favourites group -->
		<Collapsible defaultOpen class="relative">
			<div
				class="group/fav flex h-6 cursor-pointer select-none items-center gap-1 rounded-md text-xs transition-all duration-150 hover:bg-sidebar-accent-bg"
			>
				<Collapsible.Trigger
					class="mb-0 h-auto min-h-0 min-w-0 w-auto bg-transparent hover:bg-transparent px-2 py-0 shadow-none rounded-none text-xs leading-normal gap-0 justify-start flex flex-1 items-center font-medium [&_svg]:size-2.5"
				>
					Favourites
					<Collapsible.Indicator
						class="ml-1 inline-flex items-center justify-center transition-transform duration-150 ease-in-out"
					>
						<CaretRightIcon size={10} />
					</Collapsible.Indicator>
				</Collapsible.Trigger>
				<div class="pr-1">
					<button
						type="button"
						class="inline-flex h-6 w-6 min-w-6 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-sm text-xs font-medium opacity-0 transition-all duration-200 group-hover/fav:opacity-60 group-hover/fav:hover:opacity-100"
						aria-label="Add to favourites"
					>
						<PlusIcon size={14} />
					</button>
				</div>
			</div>
			<Collapsible.Content>
				<div class="flex flex-col pt-1">
					<Sidebar.NavItem>
						<Sidebar.NavButton class="group/item h-7 gap-2 pl-2.5 pr-1">
							<span>🌟</span>
							Leads
							<div class="flex-1"></div>
							<div
								class="ml-auto flex gap-px opacity-0 transition-all duration-200 group-hover/item:opacity-60 group-hover/item:hover:opacity-100"
							>
								<button
									type="button"
									class="inline-flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center gap-1 rounded-sm text-xs font-medium"
									aria-label="Remove from favourites"
									title="Remove from favourites"
								>
									<XIcon size={14} />
								</button>
							</div>
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton class="group/item h-7 gap-2 pl-2.5 pr-1">
							<span>🤝</span>
							Closed
							<div class="flex-1"></div>
							<div
								class="ml-auto flex gap-px opacity-0 transition-all duration-200 group-hover/item:opacity-60 group-hover/item:hover:opacity-100"
							>
								<button
									type="button"
									class="inline-flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center gap-1 rounded-sm text-xs font-medium"
									aria-label="Remove from favourites"
								>
									<XIcon size={14} />
								</button>
							</div>
						</Sidebar.NavButton>
					</Sidebar.NavItem>
				</div>
			</Collapsible.Content>
		</Collapsible>

		<!-- Workspace group -->
		<Collapsible defaultOpen class="relative">
			<div
				class="flex h-6 cursor-pointer select-none items-center gap-1 rounded-md text-xs transition-all duration-150 hover:bg-sidebar-accent-bg"
			>
				<Collapsible.Trigger
					class="mb-0 h-auto min-h-0 min-w-0 w-auto bg-transparent hover:bg-transparent px-2 py-0 shadow-none rounded-none text-xs leading-normal gap-0 justify-start flex flex-1 items-center font-medium [&_svg]:size-2.5"
				>
					Workspace
					<Collapsible.Indicator
						class="ml-1 inline-flex items-center justify-center transition-transform duration-150 ease-in-out"
					>
						<CaretRightIcon size={10} />
					</Collapsible.Indicator>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content>
				<div class="flex flex-col pt-1">
					<Sidebar.NavItem>
						<Sidebar.NavButton class="h-7 gap-2 px-2.5">
							<UserIcon size={16} />
							People
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton class="h-7 gap-2 px-2.5">
							<BuildingsIcon size={16} />
							Companies
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton class="h-7 gap-2 px-2.5">
							<GitBranchIcon size={16} />
							Workflows
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton active class="h-7 gap-2 px-2.5">
							<ChartBarHorizontalIcon size={16} />
							Reports
						</Sidebar.NavButton>
					</Sidebar.NavItem>
				</div>
			</Collapsible.Content>
		</Collapsible>
	</Sidebar.Body>

	<Sidebar.Footer class="flex flex-col px-3 py-2"></Sidebar.Footer>

	<!-- Resize handle -->
	<div
		class="after:bg-accent/20 absolute -right-1 inset-y-0 flex w-1.75 cursor-pointer justify-center after:pointer-events-none after:block after:h-full after:w-0.5 after:opacity-0 after:transition-opacity after:delay-200 after:duration-150 hover:after:opacity-100"
	></div>
</Sidebar.Root>
