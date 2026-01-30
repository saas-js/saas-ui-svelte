<script lang="ts">
	import { Navbar } from "@saas-ui/svelte/components/navbar";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Input } from "@saas-ui/svelte/components/input";
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
	import { toggleTheme } from "../lib/theme";

	const navLinks = [
		//{ href: "/blocks", label: "Blocks" },
		//{ href: "/pricing", label: "Pricing" },
		{ href: "/docs", label: "Docs" },
		//{ href: "/showcase", label: "Showcase" },
	];

	let drawerOpen = $state(false);

	$effect(() => {
		if (typeof window === "undefined") return;
		const mq = matchMedia("(min-width: 1024px)");
		const close = () => mq.matches && (drawerOpen = false);
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
			<Input.Group class="hidden w-40 lg:flex">
				<Input.Element placement="left">
					<MagnifyingGlassIcon class="size-3.5" aria-hidden="true" />
				</Input.Element>
				<Input placeholder="Search..." size="sm" class="px-8" />
				<Input.Element placement="right" class="pointer-events-auto">
					<Kbd size="sm">⌘K</Kbd>
				</Input.Element>
			</Input.Group>

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
				bind:open={drawerOpen}
				lazyMount
				unmountOnExit
			>
				<Drawer.Trigger
					variant="ghost"
					size="sm"
					aria-label="Open menu"
					class="px-0 lg:hidden w-7 min-w-7"
				>
					<List class="size-4" />
				</Drawer.Trigger>
				<Drawer.Content
					class="max-w-screen-sm mx-auto data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
				>
					<div class="flex items-center justify-between px-6 py-4">
						<Logo />
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
