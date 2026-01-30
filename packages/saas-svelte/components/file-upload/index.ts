import Root from "./file-upload-root.svelte";
import Trigger from "./file-upload-trigger.svelte";
import Dropzone from "./file-upload-dropzone.svelte";
import List from "./file-upload-list.svelte";
import Label from "./file-upload-label.svelte";
import Input from "./file-upload-input.svelte";
import ClearTrigger from "./file-upload-clear-trigger.svelte";

export { fileUploadRoot } from "./file-upload-root.svelte";
export { fileUploadDropzone } from "./file-upload-dropzone.svelte";
export { fileUploadList } from "./file-upload-list.svelte";
export { fileUploadLabel } from "./file-upload-label.svelte";
export {
	fileUploadInput,
	fileUploadInputPlaceholder,
} from "./file-upload-input.svelte";

export const FileUploadRoot = Root;
export const FileUploadTrigger = Trigger;
export const FileUploadDropzone = Dropzone;
export const FileUploadList = List;
export const FileUploadLabel = Label;
export const FileUploadInput = Input;
export const FileUploadClearTrigger = ClearTrigger;

export const FileUpload = {
	Root,
	Trigger,
	Dropzone,
	List,
	Label,
	Input,
	ClearTrigger,
};
