<script lang="ts">
	import { Sidebar } from "@saas-ui/svelte/components/sidebar";
	import { Badge } from "@saas-ui/svelte/components/badge";
	import { Collapsible } from "@saas-ui/svelte/components/collapsible";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Icon } from "@saas-ui/svelte/components/icon";
	import { Box } from "@saas-ui/svelte/layout/box";
	import { Flex } from "@saas-ui/svelte/layout/flex";
	import { VStack } from "@saas-ui/svelte/layout/stack";
	import { Text } from "@saas-ui/svelte/typography/text";
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
	class="group/sidebar bg-bg-muted relative hidden h-auto w-72 min-w-56 border-r border-border-default py-2 transition-all duration-300 ease-(--easings-bounce-out) md:flex {open
		? 'translate-x-0'
		: '-translate-x-full w-0 min-w-0 overflow-hidden border-r-0'}"
>
	<Sidebar.Header class="flex shrink-0 items-center px-3 py-2">
		<Sidebar.NavItem>
			<Sidebar.NavButton class="gap-2 hover:bg-sidebar-accent-bg">
				<Flex
					align="center"
					justify="center"
					class="h-5 w-5 rounded bg-indigo-600 p-1"
				>
					<Logo class="h-full w-full text-white" />
				</Flex>
				Saas.js
			</Sidebar.NavButton>
		</Sidebar.NavItem>
		<Box class="flex-1"></Box>
		<Button variant="ghost" size="sm" class="h-8 w-8 min-w-8 shrink-0 [&_svg]:size-4">
			<Icon as={MagnifyingGlassIcon} size="sm" class="shrink-0" />
		</Button>
		<button
			type="button"
			class="hover:bg-sidebar-accent-bg inline-flex h-8 w-8 min-w-8 shrink-0 cursor-pointer items-center justify-center rounded transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-fg-muted"
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
		<Box role="group" class="relative">
			<VStack gap={0} class="pt-1">
				<Sidebar.NavItem>
					<Sidebar.NavButton class="h-7 gap-2 pl-2.5">
						<Icon as={BellIcon} size="sm" />
						Updates
						<Box class="flex-1"></Box>
						<Flex class="ml-auto gap-px pr-1">
							<Badge colour="indigo" variant="subtle">12</Badge>
						</Flex>
					</Sidebar.NavButton>
				</Sidebar.NavItem>
				<Sidebar.NavItem>
					<Sidebar.NavButton class="h-7 gap-2 px-2.5">
						<Icon as={ListChecksIcon} size="sm" />
						Tasks
					</Sidebar.NavButton>
				</Sidebar.NavItem>
			</VStack>
		</Box>

		<!-- Favourites group -->
		<Collapsible defaultOpen class="relative">
			<Flex
				align="center"
				gap={1}
				class="group/fav h-6 cursor-pointer select-none rounded-md text-xs transition-all duration-150 hover:bg-sidebar-accent-bg"
			>
				<Collapsible.Trigger
					class="mb-0 h-auto min-h-0 min-w-0 w-auto bg-transparent hover:bg-transparent px-2 py-0 shadow-none rounded-none text-xs leading-normal gap-0 justify-start flex flex-1 items-center font-medium [&_svg]:size-2.5"
				>
					Favourites
					<Collapsible.Indicator
						class="ml-1 inline-flex items-center justify-center transition-transform duration-150 ease-in-out"
					>
						<Icon as={CaretRightIcon} size="xs" />
					</Collapsible.Indicator>
				</Collapsible.Trigger>
				<Box class="pr-1">
					<button
						type="button"
						class="inline-flex h-6 w-6 min-w-6 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-sm text-xs font-medium opacity-0 transition-all duration-200 group-hover/fav:opacity-60 group-hover/fav:hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-fg-muted"
						aria-label="Add to favourites"
					>
						<Icon as={PlusIcon} size="xs" />
					</button>
				</Box>
			</Flex>
			<Collapsible.Content>
				<VStack gap={0} class="pt-1">
					<Sidebar.NavItem>
						<Sidebar.NavButton class="group/item h-7 gap-2 pl-2.5 pr-1">
							<Text as="span">🌟</Text>
							Leads
							<Box class="flex-1"></Box>
							<Flex
								class="ml-auto gap-px opacity-0 transition-all duration-200 group-hover/item:opacity-60 group-hover/item:hover:opacity-100"
							>
								<button
									type="button"
									class="inline-flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center gap-1 rounded-sm text-xs font-medium focus-visible:opacity-100 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-fg-muted"
									aria-label="Remove from favourites"
									title="Remove from favourites"
								>
									<Icon as={XIcon} size="xs" />
								</button>
							</Flex>
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton class="group/item h-7 gap-2 pl-2.5 pr-1">
							<Text as="span">🤝</Text>
							Closed
							<Box class="flex-1"></Box>
							<Flex
								class="ml-auto gap-px opacity-0 transition-all duration-200 group-hover/item:opacity-60 group-hover/item:hover:opacity-100"
							>
								<button
									type="button"
									class="inline-flex h-6 w-6 min-w-6 cursor-pointer items-center justify-center gap-1 rounded-sm text-xs font-medium focus-visible:opacity-100 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-fg-muted"
									aria-label="Remove from favourites"
								>
									<Icon as={XIcon} size="xs" />
								</button>
							</Flex>
						</Sidebar.NavButton>
					</Sidebar.NavItem>
				</VStack>
			</Collapsible.Content>
		</Collapsible>

		<!-- Workspace group -->
		<Collapsible defaultOpen class="relative">
			<Flex
				align="center"
				gap={1}
				class="h-6 cursor-pointer select-none rounded-md text-xs transition-all duration-150 hover:bg-sidebar-accent-bg"
			>
				<Collapsible.Trigger
					class="mb-0 h-auto min-h-0 min-w-0 w-auto bg-transparent hover:bg-transparent px-2 py-0 shadow-none rounded-none text-xs leading-normal gap-0 justify-start flex flex-1 items-center font-medium [&_svg]:size-2.5"
				>
					Workspace
					<Collapsible.Indicator
						class="ml-1 inline-flex items-center justify-center transition-transform duration-150 ease-in-out"
					>
						<Icon as={CaretRightIcon} size="xs" />
					</Collapsible.Indicator>
				</Collapsible.Trigger>
			</Flex>
			<Collapsible.Content>
				<VStack gap={0} class="pt-1">
					<Sidebar.NavItem>
						<Sidebar.NavButton class="h-7 gap-2 px-2.5">
							<Icon as={UserIcon} size="sm" />
							People
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton class="h-7 gap-2 px-2.5">
							<Icon as={BuildingsIcon} size="sm" />
							Companies
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton class="h-7 gap-2 px-2.5">
							<Icon as={GitBranchIcon} size="sm" />
							Workflows
						</Sidebar.NavButton>
					</Sidebar.NavItem>
					<Sidebar.NavItem>
						<Sidebar.NavButton active class="h-7 gap-2 px-2.5">
							<Icon as={ChartBarHorizontalIcon} size="sm" />
							Reports
						</Sidebar.NavButton>
					</Sidebar.NavItem>
				</VStack>
			</Collapsible.Content>
		</Collapsible>
	</Sidebar.Body>

	<Sidebar.Footer class="flex flex-col px-3 py-2"></Sidebar.Footer>

	<!-- Resize handle -->
	<Box
		class="after:bg-accent/20 absolute -right-1 inset-y-0 flex w-1.75 cursor-pointer justify-center after:pointer-events-none after:block after:h-full after:w-0.5 after:opacity-0 after:transition-opacity after:delay-200 after:duration-150 hover:after:opacity-100"
	></Box>
</Sidebar.Root>
