<script lang="ts">
	import { Navbar } from "@saas-ui/svelte/components/navbar";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Kbd } from "@saas-ui/svelte/components/kbd";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Drawer } from "@saas-ui/svelte/components/drawer";
	import { Link } from "@saas-ui/svelte/components/link";
	import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
	import GithubLogo from "phosphor-svelte/lib/GithubLogo";
	import Sun from "phosphor-svelte/lib/Sun";
	import Moon from "phosphor-svelte/lib/Moon";
	import List from "phosphor-svelte/lib/List";
	import Logo from "./Logo.svelte";
	import MobileBackdrop from "./MobileBackdrop.svelte";
	import { toggleTheme } from "../lib/theme";
	import {
		getNavbarMenuOpen,
		setNavbarMenuOpen,
		closeAllMobileMenus,
	} from "../lib/mobile-nav.svelte";
	import { setSearchDialogOpen } from "../lib/search-dialog.svelte";

	const navLinks = [
		{ href: "/docs", label: "Docs" },
		{ href: "/storybook", label: "Storybook" },
	];

	let drawerOpen = $derived(getNavbarMenuOpen());

	$effect(() => {
		if (typeof window === "undefined") return;
		const mq = matchMedia("(min-width: 1024px)");
		const close = () => mq.matches && closeAllMobileMenus();
		close();
		mq.addEventListener("change", close);
		return () => mq.removeEventListener("change", close);
	});
</script>

<Navbar.Root
	bordered
	class="fixed top-0 left-0 right-0 z-50 bg-bg-overlay backdrop-blur-md"
>
	<Navbar.Content maxW="max-w-screen-2xl mx-auto">
		<Navbar.Brand>
			<Logo />
		</Navbar.Brand>

		<Navbar.ItemGroup gap={1} class="flex-1 hidden ml-6 lg:flex">
			{#each navLinks as { href, label }}
				<Navbar.Link {href} class="px-3 py-2 font-medium text-md"
					>{label}</Navbar.Link
				>
			{/each}
		</Navbar.ItemGroup>

		<Navbar.ItemGroup gap={2} justify="end">
			<button
				type="button"
				onclick={() => setSearchDialogOpen(true)}
				class="hidden w-40 lg:flex items-center gap-2 px-3 h-7 text-sm rounded border border-border-default bg-transparent text-fg-muted hover:bg-bg-subtle transition-colors cursor-pointer"
			>
				<MagnifyingGlassIcon class="size-3.5" aria-hidden="true" />
				<span class="flex-1 text-left text-xs">Search...</span>
				<Kbd size="sm">⌘K</Kbd>
			</button>

			<Button
				variant="ghost"
				size="sm"
				icon
				as="a"
				href="https://github.com/saas-js/saas-ui-svelte"
				target="_blank"
				aria-label="GitHub"
			>
				<GithubLogo class="size-4" />
			</Button>

			<Button
				variant="ghost"
				size="sm"
				icon
				aria-label="Toggle colour mode"
				onclick={toggleTheme}
			>
				<Sun class="hidden size-4 dark:block" />
				<Moon class="block size-4 dark:hidden" />
			</Button>

			<Separator
				orientation="vertical"
				class="self-center hidden mx-2 lg:block"
			/>

			<Button
				variant="glass"
				size="sm"
				colour="indigo"
				as="a"
				href="https://beta.saas-ui.dev/pricing"
			>
				Get Pro
			</Button>

			<Drawer.Root
				placement="top"
				size="md"
				open={drawerOpen}
				onOpenChange={(e) => setNavbarMenuOpen(e.open)}
				lazyMount
				unmountOnExit
			>
				<Drawer.Trigger
					variant="ghost"
					size="sm"
					icon
					aria-label="Open menu"
					class="lg:hidden"
				>
					<List class="size-4" />
				</Drawer.Trigger>
				<Drawer.Content
					hideBackdrop
					class="max-w-screen-sm mx-auto data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
				>
					<div class="flex items-center justify-end px-6 py-4">
						<Drawer.CloseButton class="relative top-0 right-0" />
					</div>
					<nav class="flex flex-col items-center py-8 gap-4">
						{#each navLinks as { href, label }}
							<Link
								{href}
								variant="plain"
								class="px-4 py-2 text-lg font-medium"
								>{label}</Link
							>
						{/each}
					</nav>
				</Drawer.Content>
			</Drawer.Root>
		</Navbar.ItemGroup>
	</Navbar.Content>
</Navbar.Root>

<MobileBackdrop />
