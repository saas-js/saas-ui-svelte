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
		{ href: "/blocks", label: "Blocks" },
		{ href: "/pricing", label: "Pricing" },
		{ href: "/docs", label: "Docs" },
		{ href: "/showcase", label: "Showcase" },
	];

	let isDark = $state(
		typeof document !== "undefined" &&
			document.documentElement.classList.contains("dark"),
	);
	let drawerOpen = $state(false);

	$effect(() => {
		if (typeof window === "undefined") return;
		const mq = matchMedia("(min-width: 1024px)");
		const close = () => mq.matches && (drawerOpen = false);
		close();
		mq.addEventListener("change", close);
		return () => mq.removeEventListener("change", close);
	});

	function toggleColorMode() {
		isDark = toggleTheme() === "dark";
	}
</script>

<Navbar.Root bordered>
	<Navbar.Content maxW="max-w-screen-2xl mx-auto">
		<Navbar.Brand>
			<Logo />
		</Navbar.Brand>

		<Navbar.ItemGroup gap={1} class="hidden lg:flex flex-1 ml-6">
			{#each navLinks as { href, label }}
				<Navbar.Link {href} class="text-md font-medium py-2 px-3"
					>{label}</Navbar.Link
				>
			{/each}
		</Navbar.ItemGroup>

		<Navbar.ItemGroup gap={2} justify="end">
			<Input.Group class="hidden lg:flex w-40">
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
				aria-label="Toggle color mode"
				onclick={toggleColorMode}
			>
				{#if isDark}
					<Sun class="size-4" />
				{:else}
					<Moon class="size-4" />
				{/if}
			</Button>

			<Separator
				orientation="vertical"
				class="hidden lg:block mx-2 self-center"
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
					class="lg:hidden w-7 min-w-7 px-0"
				>
					<List class="size-4" />
				</Drawer.Trigger>
				<Drawer.Content
					class="max-w-screen-sm mx-auto data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
				>
					<div class="flex items-center justify-between px-6 py-4">
						<Logo />
						<Drawer.CloseButton class="relative right-0 top-0" />
					</div>
					<nav class="flex flex-col items-center gap-4 py-8">
						{#each navLinks as { href, label }}
							<Link
								{href}
								variant="plain"
								class="text-lg font-medium py-2 px-4"
								>{label}</Link
							>
						{/each}
					</nav>
				</Drawer.Content>
			</Drawer.Root>
		</Navbar.ItemGroup>
	</Navbar.Content>
</Navbar.Root>
