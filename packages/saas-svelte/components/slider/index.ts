import Root from "./slider-root.svelte";
import Control from "./slider-control.svelte";
import Track from "./slider-track.svelte";
import Range from "./slider-range.svelte";
import Thumb from "./slider-thumb.svelte";
import Label from "./slider-label.svelte";
import ValueText from "./slider-value-text.svelte";
import MarkerGroup from "./slider-marker-group.svelte";
import Marker from "./slider-marker.svelte";

export {
	SLIDER_CTX,
	slider,
	type SliderVariants,
	type SliderContext,
} from "./slider-root.svelte";

export const SliderRoot = Root;
export const SliderControl = Control;
export const SliderTrack = Track;
export const SliderRange = Range;
export const SliderThumb = Thumb;
export const SliderLabel = Label;
export const SliderValueText = ValueText;
export const SliderMarkerGroup = MarkerGroup;
export const SliderMarker = Marker;

export const Slider = {
	Root,
	Control,
	Track,
	Range,
	Thumb,
	Label,
	ValueText,
	MarkerGroup,
	Marker,
};
