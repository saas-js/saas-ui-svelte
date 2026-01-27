import Root from "./editable-root.svelte";
import Area from "./editable-area.svelte";
import Preview from "./editable-preview.svelte";
import Input from "./editable-input.svelte";
import Textarea from "./editable-textarea.svelte";
import Control from "./editable-control.svelte";
import EditTrigger from "./editable-edit-trigger.svelte";
import SubmitTrigger from "./editable-submit-trigger.svelte";
import CancelTrigger from "./editable-cancel-trigger.svelte";
import Label from "./editable-label.svelte";

export const EditableRoot = Root;
export const EditableArea = Area;
export const EditablePreview = Preview;
export const EditableInput = Input;
export const EditableTextarea = Textarea;
export const EditableControl = Control;
export const EditableEditTrigger = EditTrigger;
export const EditableSubmitTrigger = SubmitTrigger;
export const EditableCancelTrigger = CancelTrigger;
export const EditableLabel = Label;

export const Editable = {
    Root,
    Area,
    Preview,
    Input,
    Textarea,
    Control,
    EditTrigger,
    SubmitTrigger,
    CancelTrigger,
    Label,
};

export { editableRoot, type EditableRootVariants } from "./editable-root.svelte";
export { editableArea } from "./editable-area.svelte";
export { editablePreview } from "./editable-preview.svelte";
export { editableInput } from "./editable-input.svelte";
export { editableTextarea } from "./editable-textarea.svelte";
export { editableControl } from "./editable-control.svelte";
export { editableLabel } from "./editable-label.svelte";
