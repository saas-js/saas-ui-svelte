<script lang="ts">
	import { Checkbox } from "@ark-ui/svelte/checkbox";

	interface Props {
		[key: string]: any;
	}

	let { ...restProps }: Props = $props();
</script>

<Checkbox.HiddenInput {...restProps} />
