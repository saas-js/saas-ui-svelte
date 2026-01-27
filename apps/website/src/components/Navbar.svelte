<script lang="ts">
	import { Navbar } from "@saas-ui/svelte/components/navbar";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Input } from "@saas-ui/svelte/components/input";
	import { Kbd } from "@saas-ui/svelte/components/kbd";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import GithubLogo from "phosphor-svelte/lib/GithubLogo";
	import Sun from "phosphor-svelte/lib/Sun";
	import Moon from "phosphor-svelte/lib/Moon";
	import List from "phosphor-svelte/lib/List";
	import Logo from "./Logo.svelte";

	let isDark = $state(false);

	$effect(() => {
		if (typeof window !== "undefined") {
			const theme = localStorage.getItem("theme");
			if (theme) {
				isDark = theme === "dark";
			} else {
				isDark = window.matchMedia(
					"(prefers-color-scheme: dark)",
				).matches;
			}
		}
	});

	function toggleColorMode() {
		const html = document.documentElement;
		html.classList.add("no-transitions");

		if (isDark) {
			html.classList.remove("dark");
			html.classList.add("light");
			localStorage.setItem("theme", "light");
		} else {
			html.classList.remove("light");
			html.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}

		isDark = !isDark;

		requestAnimationFrame(() => {
			html.classList.remove("no-transitions");
		});
	}
</script>

<Navbar.Root bordered>
	<Navbar.Content maxW="max-w-screen-2xl mx-auto">
		<Navbar.Brand>
			<Logo />
		</Navbar.Brand>

		<Navbar.ItemGroup gap={1} class="hidden md:flex flex-1 ml-6">
			<Navbar.Link href="/blocks" class="text-md font-medium py-2 px-3"
				>Blocks</Navbar.Link
			>
			<Navbar.Link href="/pricing" class="text-md font-medium py-2 px-3"
				>Pricing</Navbar.Link
			>
			<Navbar.Link href="/docs" class="text-md font-medium py-2 px-3"
				>Docs</Navbar.Link
			>
			<Navbar.Link href="/showcase" class="text-md font-medium py-2 px-3"
				>Showcase</Navbar.Link
			>
		</Navbar.ItemGroup>

		<Navbar.ItemGroup gap={3} justify="end">
			<Input.Group class="hidden md:flex w-40" size="sm">
				<Input.Element placement="left">
					<MagnifyingGlass class="size-3.5" aria-hidden="true" />
				</Input.Element>
				<Input placeholder="Search..." class="px-8" />
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
				class="hidden md:block mx-2 self-center"
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

			<Button
				variant="ghost"
				size="sm"
				icon
				aria-label="Open menu"
				class="md:hidden"
			>
				<List class="size-4" />
			</Button>
		</Navbar.ItemGroup>
	</Navbar.Content>
</Navbar.Root>
