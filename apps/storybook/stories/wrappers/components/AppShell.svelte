<script lang="ts" module>
	// Wrapper components for complex AppShell stories
</script>

<script lang="ts">
	import { AppShell } from "$saas/components/app-shell";
	import { Navbar } from "$saas/components/navbar";
	import { Sidebar } from "$saas/components/sidebar";
	import { Menu } from "$saas/components/menu";
	import { Avatar } from "$saas/components/avatar";
	import { Text } from "$saas/typography/text";
	import { Heading } from "$saas/typography/heading";
	import { Box } from "$saas/layout/box";
	import { VStack } from "$saas/layout/stack";
	import { Button } from "$saas/components/button";
	import { Drawer } from "$saas/components/drawer";
	import { Link } from "$saas/components/link";
	import { Input } from "$saas/components/input";
	import House from "phosphor-svelte/lib/House";
	import Users from "phosphor-svelte/lib/Users";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import List from "phosphor-svelte/lib/List";
	import X from "phosphor-svelte/lib/X";
	import { createMobileNav } from "$saas/utils/mobile-nav.svelte";

	interface Props {
		story: "navbarLayout" | "sidebarLayout";
	}

	let { story }: Props = $props();

	const mobileNav = createMobileNav();
</script>

{#snippet logoSvg()}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 172" width="80px">
		<path
			d="M117.67 16.59h-54c-1.86 0-3.36 1.5-3.36 3.36V46.2c0 2.11-.89 4.11-2.46 5.52l-.1.09a7.438 7.438 0 0 1-4.96 1.9H20.24c-1.86 0-3.36 1.5-3.36 3.36v38.44c0 1.86 1.5 3.36 3.36 3.36h34.51c1.86 0 3.36-1.5 3.36-3.36V59.25c0-2.11.89-4.11 2.46-5.52a7.438 7.438 0 0 1 4.96-1.9h52.15c1.86 0 3.36-1.5 3.36-3.36V19.95a3.37 3.37 0 0 0-3.37-3.36z"
			class="fill-accent-solid"
		></path>
		<path
			d="M117.67 72.78h-34.5c-1.86 0-3.36 1.5-3.36 3.36v36.27c0 2.11-.89 4.11-2.46 5.52a7.438 7.438 0 0 1-4.96 1.9H20.24c-1.86 0-3.36 1.5-3.36 3.36v28.56c0 1.86 1.5 3.36 3.36 3.36h54c1.86 0 3.36-1.5 3.36-3.36v-26.3c0-2.11.89-4.11 2.46-5.52l.1-.09a7.438 7.438 0 0 1 4.96-1.9h32.54c1.86 0 3.36-1.5 3.36-3.36V76.13a3.337 3.337 0 0 0-3.35-3.35z"
			class="fill-accent-solid"
		></path>
		<path
			d="m221.7 58.08-5.35 10.82c-5.99-3.69-13.5-5.99-19.48-5.99-5.73 0-9.93 1.91-9.93 6.75 0 12.48 36.04 5.73 35.91 30.31 0 13.88-12.35 20.12-25.98 20.12-9.93 0-20.5-3.31-27.25-9.42l5.22-10.44c5.86 5.22 15.28 8.4 22.67 8.4 6.24 0 11.08-2.17 11.08-7.26 0-13.88-35.66-6.11-35.53-30.56 0-13.75 11.97-19.61 24.96-19.61 8.53 0 17.57 2.55 23.68 6.88zM277.38 111.31c-4.84 5.99-12.61 8.91-22.41 8.91-14.64 0-23.81-9.04-23.81-21.01 0-12.35 9.3-20.25 25.6-20.37h20.5V76.8c0-8.53-5.48-13.63-16.17-13.63-6.49 0-13.24 2.29-19.99 6.88l-5.98-10.19c9.42-5.6 16.3-8.53 29.16-8.53 17.45 0 27.25 8.91 27.38 23.81l.13 44.44H277.4v-8.27zm-.13-15.54v-6.24h-18.34c-9.55 0-14.01 2.55-14.01 9.04 0 6.11 4.97 10.06 13.12 10.06 10.45 0 18.47-5.47 19.23-12.86zM349.38 111.31c-4.84 5.99-12.61 8.91-22.41 8.91-14.64 0-23.81-9.04-23.81-21.01 0-12.35 9.3-20.25 25.6-20.37h20.5V76.8c0-8.53-5.48-13.63-16.17-13.63-6.49 0-13.24 2.29-19.99 6.88l-5.98-10.19c9.42-5.6 16.3-8.53 29.16-8.53 17.45 0 27.25 8.91 27.38 23.81l.13 44.44H349.4v-8.27zm-.12-15.54v-6.24h-18.34c-9.55 0-14.01 2.55-14.01 9.04 0 6.11 4.97 10.06 13.12 10.06 10.44 0 18.46-5.47 19.23-12.86zM425.59 58.08l-5.35 10.82c-5.99-3.69-13.5-5.99-19.48-5.99-5.73 0-9.93 1.91-9.93 6.75 0 12.48 36.04 5.73 35.91 30.31 0 13.88-12.35 20.12-25.98 20.12-9.93 0-20.5-3.31-27.25-9.42l5.22-10.44c5.86 5.22 15.28 8.4 22.67 8.4 6.24 0 11.08-2.17 11.08-7.26 0-13.88-35.66-6.11-35.53-30.56 0-13.75 11.97-19.61 24.96-19.61 8.53 0 17.57 2.55 23.68 6.88zM472.9 120.02c-8.55 0-15.12-2.22-19.51-6.6-4.39-4.37-6.62-10.91-6.62-19.43V51.87h8.8V88.6c0 8.73 1.31 14.71 4 18.28 2.71 3.59 7.28 5.41 13.59 5.41 6.3 0 10.85-1.8 13.52-5.35 2.65-3.52 3.93-9.52 3.93-18.34V51.87h8.54V94c0 8.56-2.22 15.1-6.61 19.46-4.39 4.35-11 6.56-19.64 6.56zM514.66 51.87h8.54v67.66h-8.54z"
			class="fill-current"
		></path>
	</svg>
{/snippet}

{#snippet logoIconSvg()}
	<svg
		version="1.1"
		viewBox="0 0 1683 1634"
		width="24px"
		class="fill-fg-default"
	>
		<g>
			<path
				d="M1302.23 134H791.489C773.942 134 759.717 148.857 759.717 167.197V426.566C759.717 447.361 751.261 467.179 736.456 481.091L735.476 482.012C722.593 494.106 705.883 500.804 688.56 500.804H380.772C363.225 500.804 349 515.661 349 533.992V913.806C349 932.138 363.225 947 380.772 947H707.111C724.659 947 738.883 932.138 738.883 913.806V555.458C738.883 534.663 747.34 514.837 762.146 500.933C775.029 488.839 791.739 482.141 809.061 482.141H1302.23C1319.78 482.141 1334 467.284 1334 448.953V167.197C1334 148.857 1319.78 134 1302.23 134Z"
			></path>
			<path
				d="M1302.23 688H975.891C958.344 688 944.119 702.856 944.119 721.178V1079.33C944.119 1100.11 935.662 1119.93 920.856 1133.82C907.973 1145.91 891.263 1152.6 873.941 1152.6H380.772C363.225 1152.6 349 1167.45 349 1185.78V1467.83C349 1486.15 363.225 1501 380.772 1501H891.513C909.06 1501 923.286 1486.15 923.286 1467.83V1208.16C923.286 1187.37 931.741 1167.56 946.547 1153.66L947.527 1152.74C960.409 1140.65 977.12 1133.96 994.443 1133.96H1302.23C1319.78 1133.96 1334 1119.1 1334 1100.78V721.178C1334 702.856 1319.78 688 1302.23 688Z"
			></path>
		</g>
	</svg>
{/snippet}

{#if story === "navbarLayout"}
	<AppShell height="400px">
		{#snippet header()}
			<Navbar.Root bordered>
				<Navbar.Content>
					<Navbar.Brand>
						{@render logoSvg()}
					</Navbar.Brand>
					<Navbar.ItemGroup class="hidden md:flex">
						<Navbar.Item>
							<Navbar.Link href="#" active>Home</Navbar.Link>
						</Navbar.Item>
						<Navbar.Item>
							<Navbar.Link href="#">About</Navbar.Link>
						</Navbar.Item>
						<Navbar.Item>
							<Navbar.Link href="#">Pricing</Navbar.Link>
						</Navbar.Item>
					</Navbar.ItemGroup>
					<div class="flex-1"></div>
					<Navbar.ItemGroup>
						<Navbar.Item class="hidden md:flex">
							<Input.Group class="w-40">
								<Input.Element placement="left">
									<MagnifyingGlass
										class="w-3.5 h-3.5"
										aria-hidden="true"
									/>
								</Input.Element>
								<Input
									size="sm"
									placeholder="Search"
									class="pl-8"
								/>
							</Input.Group>
						</Navbar.Item>
						<Navbar.Item class="flex md:hidden">
							<Button
								size="sm"
								variant="ghost"
								aria-label={mobileNav.open
									? "Close menu"
									: "Open menu"}
								onclick={() => mobileNav.toggle()}
							>
								{#if mobileNav.open}
									<X weight="bold" aria-hidden="true" />
								{:else}
									<List weight="bold" aria-hidden="true" />
								{/if}
							</Button>
						</Navbar.Item>
					</Navbar.ItemGroup>
				</Navbar.Content>
			</Navbar.Root>
		{/snippet}
		<Box class="flex-1 p-4">
			<Text size="sm">Your application content</Text>
		</Box>
		<Drawer.Root bind:open={mobileNav.open} placement="end" size="xs">
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.CloseButton />
				</Drawer.Header>
				<Drawer.Body>
					<VStack gap={2} class="w-full">
						{#each ["Home", "About", "Pricing"] as item}
							<Link
								href="#"
								class="justify-start w-full px-4 py-2"
							>
								{item}
							</Link>
						{/each}
					</VStack>
				</Drawer.Body>
			</Drawer.Content>
		</Drawer.Root>
	</AppShell>
{:else if story === "sidebarLayout"}
	<AppShell height="400px">
		{#snippet sidebar()}
			<Sidebar.Root>
				<Sidebar.Header>
					{@render logoIconSvg()}
					<div class="flex-1"></div>
					<Menu.Root>
						<Menu.Button
							variant="ghost"
							size="xs"
							aria-label="User menu"
						>
							<Avatar size="xs" colour="gray" />
						</Menu.Button>
						<Menu.Content>
							<Menu.Item value="signout">Sign out</Menu.Item>
						</Menu.Content>
					</Menu.Root>
				</Sidebar.Header>
				<Sidebar.Body>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.NavItem>
								<Sidebar.NavButton active>
									<House
										weight="regular"
										class="w-4 h-4"
										aria-hidden="true"
									/> Home
								</Sidebar.NavButton>
							</Sidebar.NavItem>
							<Sidebar.NavItem>
								<Sidebar.NavButton>
									<Users
										weight="regular"
										class="w-4 h-4"
										aria-hidden="true"
									/> Contacts
								</Sidebar.NavButton>
							</Sidebar.NavItem>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Body>
			</Sidebar.Root>
		{/snippet}
		<Box class="flex flex-col flex-1">
			<Box class="px-3 py-2 border-b shrink-0 border-border-default">
				<Heading size="sm">Users</Heading>
			</Box>
			<Box class="flex-1 p-4">
				<Text size="sm" class="text-fg-muted">Page content</Text>
			</Box>
		</Box>
	</AppShell>
{/if}
