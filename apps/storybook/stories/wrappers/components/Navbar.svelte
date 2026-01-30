<script lang="ts" module>
	// Wrapper components for complex Navbar stories
	// These are imported by Navbar.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Navbar } from "$saas/components/navbar";
	import { Button } from "$saas/components/button";
	import { Box } from "$saas/layout/box";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Drawer } from "$saas/components/drawer";
	import { Link } from "$saas/components/link";
	import List from "phosphor-svelte/lib/List";
	import X from "phosphor-svelte/lib/X";
	import { createMobileNav } from "$saas/utils/mobile-nav.svelte";
	import { colours, navbarVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "bordered"
			| "glass"
			| "solid"
			| "variants"
			| "sticky"
			| "hideOnScroll"
			| "colours"
			| "mobileNav";
	}

	let { story }: Props = $props();
</script>

{#snippet logoSvg(color?: string)}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 172" width="100px">
		<path
			d="M117.67 16.59h-54c-1.86 0-3.36 1.5-3.36 3.36V46.2c0 2.11-.89 4.11-2.46 5.52l-.1.09a7.438 7.438 0 0 1-4.96 1.9H20.24c-1.86 0-3.36 1.5-3.36 3.36v38.44c0 1.86 1.5 3.36 3.36 3.36h34.51c1.86 0 3.36-1.5 3.36-3.36V59.25c0-2.11.89-4.11 2.46-5.52a7.438 7.438 0 0 1 4.96-1.9h52.15c1.86 0 3.36-1.5 3.36-3.36V19.95a3.37 3.37 0 0 0-3.37-3.36z"
			class={color === "white" ? "fill-white" : "fill-accent-solid"}
		></path>
		<path
			d="M117.67 72.78h-34.5c-1.86 0-3.36 1.5-3.36 3.36v36.27c0 2.11-.89 4.11-2.46 5.52a7.438 7.438 0 0 1-4.96 1.9H20.24c-1.86 0-3.36 1.5-3.36 3.36v28.56c0 1.86 1.5 3.36 3.36 3.36h54c1.86 0 3.36-1.5 3.36-3.36v-26.3c0-2.11.89-4.11 2.46-5.52l.1-.09a7.438 7.438 0 0 1 4.96-1.9h32.54c1.86 0 3.36-1.5 3.36-3.36V76.13a3.337 3.337 0 0 0-3.35-3.35z"
			class={color === "white" ? "fill-white" : "fill-accent-solid"}
		></path>
		<path
			d="m221.7 58.08-5.35 10.82c-5.99-3.69-13.5-5.99-19.48-5.99-5.73 0-9.93 1.91-9.93 6.75 0 12.48 36.04 5.73 35.91 30.31 0 13.88-12.35 20.12-25.98 20.12-9.93 0-20.5-3.31-27.25-9.42l5.22-10.44c5.86 5.22 15.28 8.4 22.67 8.4 6.24 0 11.08-2.17 11.08-7.26 0-13.88-35.66-6.11-35.53-30.56 0-13.75 11.97-19.61 24.96-19.61 8.53 0 17.57 2.55 23.68 6.88zM277.38 111.31c-4.84 5.99-12.61 8.91-22.41 8.91-14.64 0-23.81-9.04-23.81-21.01 0-12.35 9.3-20.25 25.6-20.37h20.5V76.8c0-8.53-5.48-13.63-16.17-13.63-6.49 0-13.24 2.29-19.99 6.88l-5.98-10.19c9.42-5.6 16.3-8.53 29.16-8.53 17.45 0 27.25 8.91 27.38 23.81l.13 44.44H277.4v-8.27zm-.13-15.54v-6.24h-18.34c-9.55 0-14.01 2.55-14.01 9.04 0 6.11 4.97 10.06 13.12 10.06 10.45 0 18.47-5.47 19.23-12.86zM349.38 111.31c-4.84 5.99-12.61 8.91-22.41 8.91-14.64 0-23.81-9.04-23.81-21.01 0-12.35 9.3-20.25 25.6-20.37h20.5V76.8c0-8.53-5.48-13.63-16.17-13.63-6.49 0-13.24 2.29-19.99 6.88l-5.98-10.19c9.42-5.6 16.3-8.53 29.16-8.53 17.45 0 27.25 8.91 27.38 23.81l.13 44.44H349.4v-8.27zm-.12-15.54v-6.24h-18.34c-9.55 0-14.01 2.55-14.01 9.04 0 6.11 4.97 10.06 13.12 10.06 10.44 0 18.46-5.47 19.23-12.86zM425.59 58.08l-5.35 10.82c-5.99-3.69-13.5-5.99-19.48-5.99-5.73 0-9.93 1.91-9.93 6.75 0 12.48 36.04 5.73 35.91 30.31 0 13.88-12.35 20.12-25.98 20.12-9.93 0-20.5-3.31-27.25-9.42l5.22-10.44c5.86 5.22 15.28 8.4 22.67 8.4 6.24 0 11.08-2.17 11.08-7.26 0-13.88-35.66-6.11-35.53-30.56 0-13.75 11.97-19.61 24.96-19.61 8.53 0 17.57 2.55 23.68 6.88zM472.9 120.02c-8.55 0-15.12-2.22-19.51-6.6-4.39-4.37-6.62-10.91-6.62-19.43V51.87h8.8V88.6c0 8.73 1.31 14.71 4 18.28 2.71 3.59 7.28 5.41 13.59 5.41 6.3 0 10.85-1.8 13.52-5.35 2.65-3.52 3.93-9.52 3.93-18.34V51.87h8.54V94c0 8.56-2.22 15.1-6.61 19.46-4.39 4.35-11 6.56-19.64 6.56zM514.66 51.87h8.54v67.66h-8.54z"
			class="fill-current"
		></path>
	</svg>
{/snippet}

{#if story === "basic"}
	<Box class="h-20">
		<Navbar.Root>
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg()}
				</Navbar.Brand>
				<Navbar.ItemGroup>
					<Navbar.Item>
						<Navbar.Link href="#" active>Home</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">About</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Contact</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end" gap={2}>
					<Navbar.Item>
						<Button size="sm" variant="ghost">Login</Button>
					</Navbar.Item>
					<Navbar.Item>
						<Button size="sm" variant="glass" colour="accent">Sign up</Button>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
	</Box>
{:else if story === "bordered"}
	<Box class="overflow-auto h-80 rounded-l2">
		<Navbar.Root position="sticky" bordered>
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg()}
				</Navbar.Brand>
				<Navbar.ItemGroup>
					<Navbar.Item>
						<Navbar.Link href="#" active>Home</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">About</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Contact</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end" gap={2}>
					<Navbar.Item>
						<Button size="sm" variant="outline">Login</Button>
					</Navbar.Item>
					<Navbar.Item>
						<Button size="sm" variant="solid" colour="accent">Sign up</Button>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
		<Box class="p-6">
			<VStack gap={4}>
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
			</VStack>
		</Box>
	</Box>
{:else if story === "glass"}
	<Box class="overflow-auto h-80 rounded-l2 bg-linear-to-br from-accent-muted to-pink-muted">
		<Navbar.Root variant="glass" position="sticky">
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg()}
				</Navbar.Brand>
				<Navbar.ItemGroup>
					<Navbar.Item>
						<Navbar.Link href="#" active>Home</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">About</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Contact</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end" gap={2}>
					<Navbar.Item>
						<Button size="sm" variant="ghost">Login</Button>
					</Navbar.Item>
					<Navbar.Item>
						<Button size="sm" variant="glass" colour="accent">Sign up</Button>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
		<Box class="p-6">
			<VStack gap={4}>
				<Box class="w-full h-24 bg-white/50 rounded-l1" />
				<Box class="w-full h-24 bg-white/50 rounded-l1" />
				<Box class="w-full h-24 bg-white/50 rounded-l1" />
				<Box class="w-full h-24 bg-white/50 rounded-l1" />
			</VStack>
		</Box>
	</Box>
{:else if story === "solid"}
	<Box class="overflow-auto h-80 rounded-l2">
		<Navbar.Root variant="solid" colour="accent" position="sticky">
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg("white")}
				</Navbar.Brand>
				<Navbar.ItemGroup>
					<Navbar.Item>
						<Navbar.Link href="#" active>Home</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">About</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Contact</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end">
					<Navbar.Item>
						<Navbar.Link href="#">Log in</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Sign up</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
		<Box class="p-6">
			<VStack gap={4}>
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
			</VStack>
		</Box>
	</Box>
{:else if story === "variants"}
	<VStack gap={4} class="w-full">
		{#each navbarVariants as variant}
			<Box class="w-full">
				<Text size="sm" class="mb-2 text-fg-muted">{variant}</Text>
				<Box
					class={variant === "solid"
						? "bg-accent-solid rounded-l2"
						: "bg-bg-subtle rounded-l2"}
				>
					<Navbar.Root {variant} colour="accent" aria-label="{variant} variant navigation">
						<Navbar.Content maxW="max-w-4xl">
							<Navbar.Brand>
								{@render logoSvg(variant === "solid" ? "white" : undefined)}
							</Navbar.Brand>
							<Navbar.ItemGroup>
								<Navbar.Item>
									<Navbar.Link href="#" active>Home</Navbar.Link>
								</Navbar.Item>
								<Navbar.Item>
									<Navbar.Link href="#">About</Navbar.Link>
								</Navbar.Item>
							</Navbar.ItemGroup>
							<Navbar.ItemGroup justify="end" gap={2}>
								{#if variant === "solid"}
									<Navbar.Item>
										<Navbar.Link href="#">Login</Navbar.Link>
									</Navbar.Item>
								{:else}
									<Navbar.Item>
										<Button size="sm" variant="ghost">Login</Button>
									</Navbar.Item>
									<Navbar.Item>
										<Button size="sm" variant="glass" colour="accent">Sign up</Button>
									</Navbar.Item>
								{/if}
							</Navbar.ItemGroup>
						</Navbar.Content>
					</Navbar.Root>
				</Box>
			</Box>
		{/each}
	</VStack>
{:else if story === "sticky"}
	<Box class="h-64 overflow-auto bg-bg-subtle rounded-l2">
		<Navbar.Root position="sticky" bordered>
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg()}
				</Navbar.Brand>
				<Navbar.ItemGroup>
					<Navbar.Item>
						<Navbar.Link href="#" active>Home</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">About</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Contact</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end" gap={2}>
					<Navbar.Item>
						<Button size="sm" variant="outline">Login</Button>
					</Navbar.Item>
					<Navbar.Item>
						<Button size="sm" variant="solid" colour="accent">Sign up</Button>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
		<Box class="p-6">
			<VStack gap={4}>
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
			</VStack>
		</Box>
	</Box>
{:else if story === "hideOnScroll"}
	<Box class="overflow-auto h-80 bg-bg-subtle rounded-l2">
		<Navbar.Root position="sticky" bordered shouldHideOnScroll>
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg()}
				</Navbar.Brand>
				<Navbar.ItemGroup>
					<Navbar.Item>
						<Navbar.Link href="#" active>Home</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">About</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Contact</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end" gap={2}>
					<Navbar.Item>
						<Button size="sm" variant="outline">Login</Button>
					</Navbar.Item>
					<Navbar.Item>
						<Button size="sm" variant="solid" colour="accent">Sign up</Button>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
		<Box class="p-6">
			<VStack gap={4}>
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
			</VStack>
		</Box>
	</Box>
{:else if story === "colours"}
	<VStack gap={4} class="w-full">
		{#each colours as colour}
			<Box class="w-full overflow-hidden rounded-l2">
				<Navbar.Root variant="solid" {colour} aria-label="{colour} colour navigation">
					<Navbar.Content maxW="max-w-4xl">
						<Navbar.Brand>
							{@render logoSvg("white")}
						</Navbar.Brand>
						<Navbar.ItemGroup>
							<Navbar.Item>
								<Navbar.Link href="#" active>Home</Navbar.Link>
							</Navbar.Item>
							<Navbar.Item>
								<Navbar.Link href="#">About</Navbar.Link>
							</Navbar.Item>
						</Navbar.ItemGroup>
						<Navbar.ItemGroup justify="end">
							<Navbar.Item>
								<Text size="xs" class="text-(--c-contrast)">{colour}</Text>
							</Navbar.Item>
						</Navbar.ItemGroup>
					</Navbar.Content>
				</Navbar.Root>
			</Box>
		{/each}
	</VStack>
{:else if story === "mobileNav"}
	{@const mobileNav = createMobileNav()}
	<Box class="overflow-auto h-80 bg-bg-subtle rounded-l2">
		<Navbar.Root position="sticky" bordered>
			<Navbar.Content maxW="max-w-4xl">
				<Navbar.Brand>
					{@render logoSvg()}
				</Navbar.Brand>
				<Navbar.ItemGroup class="hidden md:flex">
					<Navbar.Item>
						<Navbar.Link href="#">Features</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#" active>Customers</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Integrations</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item>
						<Navbar.Link href="#">Pricing</Navbar.Link>
					</Navbar.Item>
				</Navbar.ItemGroup>
				<Navbar.ItemGroup justify="end" gap={2}>
					<Navbar.Item class="hidden md:flex">
						<Navbar.Link href="#">Login</Navbar.Link>
					</Navbar.Item>
					<Navbar.Item class="hidden md:flex">
						<Button size="sm" variant="glass" colour="accent">Sign Up</Button>
					</Navbar.Item>
					<Navbar.Item class="flex md:hidden">
						<Button
							size="sm"
							variant="ghost"
							aria-label={mobileNav.open ? "Close menu" : "Open menu"}
							onclick={() => mobileNav.toggle()}
						>
							{#if mobileNav.open}
								<X weight="bold" />
							{:else}
								<List weight="bold" />
							{/if}
						</Button>
					</Navbar.Item>
				</Navbar.ItemGroup>
			</Navbar.Content>
		</Navbar.Root>
		<Drawer.Root bind:open={mobileNav.open} placement="end" size="xs">
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.CloseButton />
				</Drawer.Header>
				<Drawer.Body>
					<VStack gap={2} class="w-full">
						{#each ["Features", "Customers", "Integrations", "Pricing"] as item}
							<Link href="#" class="justify-start w-full px-4 py-2">
								{item}
							</Link>
						{/each}
					</VStack>
				</Drawer.Body>
			</Drawer.Content>
		</Drawer.Root>
		<Box class="p-6">
			<VStack gap={4}>
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
				<Box class="w-full h-24 bg-bg-muted rounded-l1" />
			</VStack>
		</Box>
	</Box>
{/if}
