<script lang="ts">
import { RadioGroup } from "@ark-ui/svelte/radio-group";

interface Props {
	[key: string]: any;
}

let { ...restProps }: Props = $props();
</script>

<RadioGroup.ItemHiddenInput {...restProps} />
