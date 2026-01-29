import type { Meta, StoryObj } from "@storybook/sveltekit";
import { AppShell } from "$saas/components/app-shell";
import AppShellWrapper from "../wrappers/components/AppShell.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/App Shell",
	component: AppShell,
	argTypes: {
		header: {
			control: false,
			description: "The top header navigation.",
			table: { type: { summary: "Snippet" } },
		},
		sidebar: {
			control: false,
			description: "Main sidebar, positioned on the left.",
			table: { type: { summary: "Snippet" } },
		},
		aside: {
			control: false,
			description: "Secondary sidebar, positioned on the right.",
			table: { type: { summary: "Snippet" } },
		},
		footer: {
			control: false,
			description: "The footer.",
			table: { type: { summary: "Snippet" } },
		},
		height: {
			control: "text",
			description: "The height of the app shell.",
			table: { defaultValue: { summary: "100dvh" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["height", "class"]),
		docs: {
			description: {
				component:
					"A layout wrapper that provides a consistent structure for application layouts with header, sidebar, aside, and footer slots.",
			},
		},
		anatomy: `<script>
  import { AppShell } from "@saas-ui/svelte/components/app-shell";
</script>

<AppShell>
  {#snippet header()}
    <nav>Header / Navigation</nav>
  {/snippet}

  {#snippet sidebar()}
    <aside>Sidebar</aside>
  {/snippet}

  <main>Main Content</main>

  {#snippet aside()}
    <aside>Right Panel</aside>
  {/snippet}

  {#snippet footer()}
    <footer>Footer</footer>
  {/snippet}
</AppShell>`,
	},
};

export default meta;
type Story = StoryObj;

export const NavbarLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: "`AppShell` with a top `header` navbar layout, ideal for content-focused applications.",
			},
		},
	},
	render: () =>
		({
			Component: AppShellWrapper,
			props: { story: "navbarLayout" },
		}) as any,
};

export const SidebarLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: "`AppShell` with a `sidebar` layout, suitable for dashboards and admin interfaces.",
			},
		},
	},
	render: () =>
		({
			Component: AppShellWrapper,
			props: { story: "sidebarLayout" },
		}) as any,
};
