<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Sidebar } from "$saas/components/sidebar";
	import { Button } from "$saas/components/button";
	import { Box } from "$saas/layout/box";
	import { Menu } from "$saas/components/menu";
	import { Avatar } from "$saas/components/avatar";
	import House from "phosphor-svelte/lib/House";
	import Users from "phosphor-svelte/lib/Users";

	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Sidebar",
		component: Sidebar.Root,
		argTypes: {
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["class"]),
		},
	});
</script>

{#snippet logoSvg()}
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

{#snippet basicStory()}
	<Box class="h-[400px]">
		<Sidebar.Root>
			<Sidebar.Header>
				{@render logoSvg()}
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
	</Box>
{/snippet}

<Story name="Basic" template={basicStory} />
