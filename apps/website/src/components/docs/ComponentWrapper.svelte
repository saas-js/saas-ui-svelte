<script lang="ts">
	// Dynamic component wrapper that loads the appropriate story wrapper based on component name
	import { Alert } from "@saas-ui/svelte/components/alert";
	import { Text } from "@saas-ui/svelte/typography/text";

	interface Props {
		component: string;
		story: string;
	}

	let { component, story }: Props = $props();

	// Import all wrapper components statically
	import AccordionWrapper from "$wrappers/components/Accordion.svelte";
	import ActionBarWrapper from "$wrappers/components/ActionBar.svelte";
	import AlertWrapper from "$wrappers/components/Alert.svelte";
	import AppShellWrapper from "$wrappers/components/AppShell.svelte";
	import AvatarWrapper from "$wrappers/components/Avatar.svelte";
	import BadgeWrapper from "$wrappers/components/Badge.svelte";
	import BreadcrumbWrapper from "$wrappers/components/Breadcrumb.svelte";
	import ButtonWrapper from "$wrappers/components/Button.svelte";
	import CardWrapper from "$wrappers/components/Card.svelte";
	import CheckboxWrapper from "$wrappers/components/Checkbox.svelte";
	import CheckboxCardWrapper from "$wrappers/components/CheckboxCard.svelte";
	import ClipboardWrapper from "$wrappers/components/Clipboard.svelte";
	import CloseButtonWrapper from "$wrappers/components/CloseButton.svelte";
	import CollapsibleWrapper from "$wrappers/components/Collapsible.svelte";
	import ComboboxWrapper from "$wrappers/components/Combobox.svelte";
	import DataListWrapper from "$wrappers/components/DataList.svelte";
	import DialogWrapper from "$wrappers/components/Dialog.svelte";
	import DrawerWrapper from "$wrappers/components/Drawer.svelte";
	import EditableWrapper from "$wrappers/components/Editable.svelte";
	import EmptyStateWrapper from "$wrappers/components/EmptyState.svelte";
	import FieldWrapper from "$wrappers/components/Field.svelte";
	import FileUploadWrapper from "$wrappers/components/FileUpload.svelte";
	import FormWrapper from "$wrappers/components/Form.svelte";
	import GridListWrapper from "$wrappers/components/GridList.svelte";
	import HoverCardWrapper from "$wrappers/components/HoverCard.svelte";
	import IconWrapper from "$wrappers/components/Icon.svelte";
	import ImageWrapper from "$wrappers/components/Image.svelte";
	import InputWrapper from "$wrappers/components/Input.svelte";
	import KbdWrapper from "$wrappers/components/Kbd.svelte";
	import LinkWrapper from "$wrappers/components/Link.svelte";
	import LinkOverlayWrapper from "$wrappers/components/LinkOverlay.svelte";
	import ListWrapper from "$wrappers/components/List.svelte";
	import MenuWrapper from "$wrappers/components/Menu.svelte";
	import NativeSelectWrapper from "$wrappers/components/NativeSelect.svelte";
	import NavbarWrapper from "$wrappers/components/Navbar.svelte";
	import NumberInputWrapper from "$wrappers/components/NumberInput.svelte";
	import PaginationWrapper from "$wrappers/components/Pagination.svelte";
	import PasswordInputWrapper from "$wrappers/components/PasswordInput.svelte";
	import PersonaWrapper from "$wrappers/components/Persona.svelte";
	import PinInputWrapper from "$wrappers/components/PinInput.svelte";
	import PopoverWrapper from "$wrappers/components/Popover.svelte";
	import ProgressWrapper from "$wrappers/components/Progress.svelte";
	import ProgressCircleWrapper from "$wrappers/components/ProgressCircle.svelte";
	import RadioWrapper from "$wrappers/components/Radio.svelte";
	import RadioCardWrapper from "$wrappers/components/RadioCard.svelte";
	import SegmentGroupWrapper from "$wrappers/components/SegmentGroup.svelte";
	import SelectWrapper from "$wrappers/components/Select.svelte";
	import SeparatorWrapper from "$wrappers/components/Separator.svelte";
	import SidebarWrapper from "$wrappers/components/Sidebar.svelte";
	import SkeletonWrapper from "$wrappers/components/Skeleton.svelte";
	import SliderWrapper from "$wrappers/components/Slider.svelte";
	import SpinnerWrapper from "$wrappers/components/Spinner.svelte";
	import StatWrapper from "$wrappers/components/Stat.svelte";
	import StatusWrapper from "$wrappers/components/Status.svelte";
	import StepsWrapper from "$wrappers/components/Steps.svelte";
	import SwitchWrapper from "$wrappers/components/Switch.svelte";
	import TableWrapper from "$wrappers/components/Table.svelte";
	import TabsWrapper from "$wrappers/components/Tabs.svelte";
	import TagWrapper from "$wrappers/components/Tag.svelte";
	import TextareaWrapper from "$wrappers/components/Textarea.svelte";
	import TimelineWrapper from "$wrappers/components/Timeline.svelte";
	import ToastWrapper from "$wrappers/components/Toast.svelte";
	import ToggleTipWrapper from "$wrappers/components/ToggleTip.svelte";
	import TooltipWrapper from "$wrappers/components/Tooltip.svelte";

	const wrappers: Record<string, any> = {
		Accordion: AccordionWrapper,
		ActionBar: ActionBarWrapper,
		Alert: AlertWrapper,
		AppShell: AppShellWrapper,
		Avatar: AvatarWrapper,
		Badge: BadgeWrapper,
		Breadcrumb: BreadcrumbWrapper,
		Button: ButtonWrapper,
		Card: CardWrapper,
		Checkbox: CheckboxWrapper,
		CheckboxCard: CheckboxCardWrapper,
		Clipboard: ClipboardWrapper,
		CloseButton: CloseButtonWrapper,
		Collapsible: CollapsibleWrapper,
		Combobox: ComboboxWrapper,
		DataList: DataListWrapper,
		Dialog: DialogWrapper,
		Drawer: DrawerWrapper,
		Editable: EditableWrapper,
		EmptyState: EmptyStateWrapper,
		Field: FieldWrapper,
		FileUpload: FileUploadWrapper,
		Form: FormWrapper,
		GridList: GridListWrapper,
		HoverCard: HoverCardWrapper,
		Icon: IconWrapper,
		Image: ImageWrapper,
		Input: InputWrapper,
		Kbd: KbdWrapper,
		Link: LinkWrapper,
		LinkOverlay: LinkOverlayWrapper,
		List: ListWrapper,
		Menu: MenuWrapper,
		NativeSelect: NativeSelectWrapper,
		Navbar: NavbarWrapper,
		NumberInput: NumberInputWrapper,
		Pagination: PaginationWrapper,
		PasswordInput: PasswordInputWrapper,
		Persona: PersonaWrapper,
		PinInput: PinInputWrapper,
		Popover: PopoverWrapper,
		Progress: ProgressWrapper,
		ProgressCircle: ProgressCircleWrapper,
		Radio: RadioWrapper,
		RadioCard: RadioCardWrapper,
		SegmentGroup: SegmentGroupWrapper,
		Select: SelectWrapper,
		Separator: SeparatorWrapper,
		Sidebar: SidebarWrapper,
		Skeleton: SkeletonWrapper,
		Slider: SliderWrapper,
		Spinner: SpinnerWrapper,
		Stat: StatWrapper,
		Status: StatusWrapper,
		Steps: StepsWrapper,
		Switch: SwitchWrapper,
		Table: TableWrapper,
		Tabs: TabsWrapper,
		Tag: TagWrapper,
		Textarea: TextareaWrapper,
		Timeline: TimelineWrapper,
		Toast: ToastWrapper,
		ToggleTip: ToggleTipWrapper,
		Tooltip: TooltipWrapper,
	};

	const WrapperComponent = $derived(wrappers[component]);
</script>

{#if WrapperComponent}
	<WrapperComponent {story} />
{:else}
	<Alert status="error" title="Component wrapper not found">
		<Text size="sm">Unable to find wrapper for component: {component}</Text>
	</Alert>
{/if}
