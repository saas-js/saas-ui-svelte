<script lang="ts">
import { Menu } from "@ark-ui/svelte/menu";
import { getContext } from "svelte";
import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

interface Props {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { class: className, ...rest }: Props = $props();

const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.Separator
	class={ctx?.styles?.separator({ class: className })}
	{...rest}
/>
