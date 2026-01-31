<script lang="ts">
import { Navbar } from "@saas-ui/svelte/components/navbar";
import { Button } from "@saas-ui/svelte/components/button";
import { Kbd } from "@saas-ui/svelte/components/kbd";
import { Separator } from "@saas-ui/svelte/components/separator";
import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
import GithubLogo from "phosphor-svelte/lib/GithubLogo";
import Sun from "phosphor-svelte/lib/Sun";
import Moon from "phosphor-svelte/lib/Moon";
import List from "phosphor-svelte/lib/List";
import X from "phosphor-svelte/lib/X";
import Logo from "./Logo.svelte";
import { toggleTheme } from "../lib/theme";
import { getSideMenuOpen, setSideMenuOpen } from "../lib/mobile-nav.svelte";
import { setSearchDialogOpen } from "../lib/search-dialog.svelte";

let mobileNavOpen = $derived(getSideMenuOpen());

// Normalize base URL - remove trailing slash to avoid double slashes
const rawBase = import.meta.env.BASE_URL || "";
const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

const navLinks = [
	{ href: `${base}/docs`, label: "Docs" },
	{ href: `${base}/storybook`, label: "Storybook" },
];
</script>

<Navbar.Root
	bordered
	class="bg-bg-default/95 fixed top-0 right-0 left-0 z-50"
>
	<Navbar.Content maxW="max-w-screen-2xl mx-auto">
		<Navbar.Brand>
			<Logo />
		</Navbar.Brand>

		<Navbar.ItemGroup gap={1} class="ml-6 hidden flex-1 lg:flex">
			{#each navLinks as { href, label }}
				<Navbar.Link href={href} class="text-md px-3 py-2 font-medium"
					>{label}</Navbar.Link
				>
			{/each}
		</Navbar.ItemGroup>

		<Navbar.ItemGroup gap={2} justify="end">
			<button
				type="button"
				onclick={() => setSearchDialogOpen(true)}
				class="border-border-default text-fg-muted hover:bg-bg-subtle hover:border-border-emphasized hidden h-7 w-40 cursor-pointer items-center gap-2 rounded border bg-transparent px-3 text-sm transition-colors lg:flex outline-0 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring) focus-visible:border-(--c-focus-ring)"
				style="--c-focus-ring: var(--colors-gray-focus-ring)"
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
				class="mx-2 hidden self-center lg:block"
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
				aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
				class="lg:hidden"
				onclick={() => setSideMenuOpen(!mobileNavOpen)}
			>
				{#if mobileNavOpen}
					<X class="size-4" />
				{:else}
					<List class="size-4" />
				{/if}
			</Button>
		</Navbar.ItemGroup>
	</Navbar.Content>
</Navbar.Root>
