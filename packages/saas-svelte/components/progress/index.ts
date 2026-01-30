import Root from "./progress-root.svelte";
import Track from "./progress-track.svelte";
import Range from "./progress-range.svelte";
import Label from "./progress-label.svelte";
import ValueText from "./progress-value-text.svelte";

export {
	PROGRESS_CTX,
	progress,
	type ProgressVariants,
	type ProgressContext,
} from "./progress-root.svelte";

export const ProgressRoot = Root;
export const ProgressTrack = Track;
export const ProgressRange = Range;
export const ProgressLabel = Label;
export const ProgressValueText = ValueText;

export const Progress = {
	Root,
	Track,
	Range,
	Label,
	ValueText,
};
