/**
 * Prop whitelist patterns for Storybook components.
 * Use these with <ArgTypes exclude={pattern} /> in .mdx files
 */

// Helper function to generate exclude pattern
const makePattern = (props: string[]): RegExp =>
	new RegExp(`^(?!(${props.join("|")})$).*$`);

// Component-specific prop patterns
export const accordionRootPattern = makePattern([
	"variant",
	"size",
	"orientation",
	"collapsible",
	"multiple",
	"defaultValue",
	"class",
	"children",
]);
export const accordionItemPattern = makePattern([
	"value",
	"disabled",
	"class",
	"children",
]);
export const accordionItemTriggerPattern = makePattern([
	"icon",
	"class",
	"children",
]);
export const accordionItemContentPattern = makePattern(["class", "children"]);

export const alertPattern = makePattern([
	"status",
	"variant",
	"colour",
	"title",
	"icon",
	"class",
	"children",
]);

export const buttonPattern = makePattern([
	"variant",
	"size",
	"colour",
	"loading",
	"loadingText",
	"icon",
	"disabled",
	"class",
	"children",
]);

export const checkboxPattern = makePattern([
	"checked",
	"size",
	"variant",
	"colour",
	"label",
	"description",
	"disabled",
	"invalid",
	"icon",
	"value",
	"class",
	"children",
]);
export const checkboxGroupPattern = makePattern([
	"orientation",
	"class",
	"children",
]);

export const radioGroupPattern = makePattern([
	"value",
	"defaultValue",
	"size",
	"variant",
	"colour",
	"orientation",
	"disabled",
	"invalid",
	"readOnly",
	"name",
	"onValueChange",
	"class",
	"children",
]);
export const radioItemPattern = makePattern([
	"value",
	"label",
	"disabled",
	"invalid",
	"class",
	"children",
]);

export const radioCardRootPattern = makePattern([
	"value",
	"defaultValue",
	"size",
	"align",
	"colour",
	"orientation",
	"disabled",
	"invalid",
	"readOnly",
	"name",
	"onValueChange",
	"class",
	"children",
]);
export const radioCardItemPattern = makePattern([
	"value",
	"label",
	"description",
	"icon",
	"addon",
	"disabled",
	"class",
	"children",
]);

export const segmentGroupRootPattern = makePattern([
	"value",
	"defaultValue",
	"size",
	"colour",
	"orientation",
	"disabled",
	"readOnly",
	"name",
	"onValueChange",
	"class",
	"children",
]);
export const segmentGroupItemPattern = makePattern([
	"value",
	"label",
	"icon",
	"disabled",
	"class",
	"children",
]);
export const segmentGroupIndicatorPattern = makePattern(["class"]);

export const dialogRootPattern = makePattern([
	"open",
	"size",
	"placement",
	"scrollBehavior",
	"motionPreset",
	"role",
	"initialFocusEl",
	"finalFocusEl",
	"restoreFocus",
	"lazyMount",
	"unmountOnExit",
	"class",
	"children",
]);

export const drawerRootPattern = makePattern([
	"open",
	"size",
	"placement",
	"attached",
	"role",
	"initialFocusEl",
	"finalFocusEl",
	"restoreFocus",
	"lazyMount",
	"unmountOnExit",
	"class",
	"children",
]);

export const iconPattern = makePattern([
	"as",
	"size",
	"weight",
	"mirrored",
	"viewBox",
	"colour",
	"style",
	"class",
	"children",
]);

export const inputPattern = makePattern([
	"variant",
	"size",
	"colour",
	"invalid",
	"disabled",
	"placeholder",
	"class",
	"children",
]);
export const inputGroupPattern = makePattern([
	"placement",
	"class",
	"children",
]);
export const inputElementPattern = makePattern([
	"placement",
	"class",
	"children",
]);

export const stackPattern = makePattern([
	"direction",
	"align",
	"justify",
	"class",
	"children",
]);

export const textPattern = makePattern([
	"as",
	"size",
	"weight",
	"variant",
	"truncate",
	"lineClamp",
	"class",
	"children",
]);

export const tooltipPattern = makePattern([
	"content",
	"showArrow",
	"variant",
	"interactive",
	"openDelay",
	"closeDelay",
	"closeOnPointerDown",
	"positioning",
	"disabled",
	"class",
	"children",
]);

export const fieldPattern = makePattern([
	"disabled",
	"invalid",
	"required",
	"readOnly",
	"id",
	"class",
	"children",
]);
export const fieldLabelPattern = makePattern(["for", "class", "children"]);
export const fieldHelperTextPattern = makePattern(["class", "children"]);
export const fieldErrorTextPattern = makePattern(["class", "children"]);

export const kbdPattern = makePattern(["variant", "size", "class", "children"]);

export const codePattern = makePattern([
	"variant",
	"size",
	"colour",
	"class",
	"children",
]);

export const visuallyHiddenPattern = makePattern(["class", "children"]);
export const badgePattern = makePattern([
	"variant",
	"size",
	"colour",
	"class",
	"children",
]);
export const avatarPattern = makePattern([
	"src",
	"name",
	"size",
	"variant",
	"shape",
	"colour",
	"borderless",
	"onStatusChange",
	"fallback",
	"class",
	"children",
]);
export const avatarGroupPattern = makePattern([
	"size",
	"spaceX",
	"stacking",
	"borderless",
	"class",
	"children",
]);

export const groupPattern = makePattern([
	"orientation",
	"grow",
	"attached",
	"class",
	"children",
]);
export const dataListRootPattern = makePattern([
	"size",
	"orientation",
	"class",
	"children",
]);
export const dataListItemPattern = makePattern(["class", "children"]);
export const dataListItemLabelPattern = makePattern(["class", "children"]);
export const dataListItemValuePattern = makePattern(["class", "children"]);

export const blockquotePattern = makePattern([
	"colour",
	"justify",
	"variant",
	"cite",
	"showDash",
	"showIcon",
	"icon",
	"class",
	"children",
]);

export const floatPattern = makePattern([
	"placement",
	"offsetX",
	"offsetY",
	"offset",
	"class",
	"children",
]);
export const circlePattern = makePattern([
	"size",
	"variant",
	"colour",
	"class",
	"children",
]);
export const boxPattern = makePattern(["as", "class", "children"]);
export const aspectRatioPattern = makePattern(["ratio", "class", "children"]);

export const gridPattern = makePattern([
	"columns",
	"rows",
	"gap",
	"gapX",
	"gapY",
	"inline",
	"class",
	"children",
]);
export const gridItemPattern = makePattern([
	"colSpan",
	"rowSpan",
	"colStart",
	"colEnd",
	"rowStart",
	"rowEnd",
	"class",
	"children",
]);

export const bleedPattern = makePattern([
	"inline",
	"block",
	"inlineStart",
	"inlineEnd",
	"blockStart",
	"blockEnd",
	"class",
	"children",
]);

export const centrePattern = makePattern(["inline", "class", "children"]);
export const squarePattern = makePattern(["size", "class", "children"]);
export const absoluteCentrePattern = makePattern(["axis", "class", "children"]);

export const headingPattern = makePattern([
	"as",
	"size",
	"weight",
	"fontWeight",
	"class",
	"children",
]);
export const emPattern = makePattern(["class", "children"]);
export const markPattern = makePattern([
	"variant",
	"colour",
	"class",
	"children",
]);
export const highlightPattern = makePattern([
	"query",
	"text",
	"ignoreCase",
	"matchAll",
	"variant",
	"colour",
	"class",
]);

export const toastPattern = makePattern([
	"status",
	"variant",
	"colour",
	"icon",
	"title",
	"description",
	"action",
	"closable",
	"class",
	"children",
]);

export const actionBarPattern = makePattern([
	"open",
	"onOpenChange",
	"closeOnInteractOutside",
	"class",
	"children",
]);
export const actionBarSelectionTriggerPattern = makePattern([
	"class",
	"children",
]);
export const actionBarSeparatorPattern = makePattern(["class"]);
export const actionBarCloseButtonPattern = makePattern(["aria-label", "class"]);

export const breadcrumbRootPattern = makePattern([
	"size",
	"variant",
	"separator",
	"class",
	"children",
]);
export const breadcrumbItemPattern = makePattern([
	"showSeparator",
	"class",
	"children",
]);
export const breadcrumbLinkPattern = makePattern([
	"href",
	"showSeparator",
	"class",
	"children",
]);
export const breadcrumbCurrentLinkPattern = makePattern(["class", "children"]);
export const breadcrumbEllipsisPattern = makePattern([
	"showSeparator",
	"class",
]);

export const menuPattern = makePattern([
	"size",
	"colour",
	"open",
	"onOpenChange",
	"closeOnSelect",
	"loopFocus",
	"positioning",
	"typeahead",
	"class",
	"children",
]);
export const menuItemPattern = makePattern([
	"value",
	"valueText",
	"disabled",
	"closeOnSelect",
	"onSelect",
	"asChild",
	"class",
	"children",
]);

export const cardRootPattern = makePattern([
	"variant",
	"size",
	"class",
	"children",
]);
export const cardHeaderPattern = makePattern(["class", "children"]);
export const cardBodyPattern = makePattern(["class", "children"]);
export const cardFooterPattern = makePattern(["class", "children"]);
export const cardTitlePattern = makePattern(["class", "children"]);
export const cardDescriptionPattern = makePattern(["class", "children"]);

export const formPattern = makePattern(["form", "class", "children"]);
export const formFieldPattern = makePattern([
	"name",
	"label",
	"type",
	"placeholder",
	"helperText",
	"required",
	"disabled",
	"options",
	"min",
	"max",
	"step",
	"class",
	"children",
]);
export const submitButtonPattern = makePattern([
	"disableIfUntouched",
	"disableIfInvalid",
	"variant",
	"size",
	"colour",
	"class",
	"children",
]);
export const displayIfPattern = makePattern([
	"name",
	"condition",
	"fallback",
	"children",
]);

export const checkboxCardRootPattern = makePattern([
	"checked",
	"value",
	"variant",
	"size",
	"colour",
	"disabled",
	"onCheckedChange",
	"class",
	"children",
]);
export const checkboxCardControlPattern = makePattern([
	"align",
	"class",
	"children",
]);
export const checkboxCardContentPattern = makePattern([
	"align",
	"class",
	"children",
]);
export const checkboxCardLabelPattern = makePattern(["class", "children"]);
export const checkboxCardDescriptionPattern = makePattern([
	"class",
	"children",
]);
export const checkboxCardAddonPattern = makePattern(["class", "children"]);
export const checkboxCardIndicatorPattern = makePattern(["class"]);

export const comboboxPattern = makePattern([
	"items",
	"label",
	"placeholder",
	"emptyText",
	"size",
	"variant",
	"invalid",
	"disabled",
	"colour",
	"value",
	"onValueChange",
	"multiple",
	"openOnClick",
	"open",
	"onOpenChange",
	"allowCustomValue",
	"inputBehavior",
	"selectionBehavior",
	"isItemDisabled",
	"loading",
	"loadingText",
	"onInputValueChange",
	"disableFilter",
	"itemSnippet",
	"loadingContent",
	"highlightMatch",
	"minCharacters",
	"limit",
	"startElement",
	"itemDescriptionKey",
	"itemPrefixKey",
	"virtualised",
	"virtualItemHeight",
	"class",
]);
export const comboboxRootPattern = makePattern([
	"collection",
	"variant",
	"size",
	"invalid",
	"colour",
	"class",
	"children",
]);
export const comboboxControlPattern = makePattern(["class", "children"]);
export const comboboxInputPattern = makePattern(["placeholder", "class"]);
export const comboboxContentPattern = makePattern(["class", "children"]);
export const comboboxItemPattern = makePattern(["item", "class", "children"]);
export const comboboxItemTextPattern = makePattern(["class", "children"]);
export const comboboxItemIndicatorPattern = makePattern(["class", "children"]);

export const selectRootPattern = makePattern([
	"collection",
	"size",
	"variant",
	"colour",
	"disabled",
	"multiple",
	"closeOnSelect",
	"loopFocus",
	"value",
	"defaultValue",
	"onValueChange",
	"positioning",
	"class",
	"children",
]);
export const selectTriggerPattern = makePattern([
	"clearable",
	"class",
	"children",
]);
export const selectValuePattern = makePattern([
	"placeholder",
	"class",
	"children",
]);
export const selectContentPattern = makePattern([
	"portal",
	"class",
	"children",
]);
export const selectItemPattern = makePattern([
	"item",
	"showIndicator",
	"class",
	"children",
]);
export const selectItemGroupPattern = makePattern([
	"label",
	"class",
	"children",
]);
export const selectLabelPattern = makePattern(["class", "children"]);
export const selectClearTriggerPattern = makePattern(["class", "children"]);
export const selectIndicatorPattern = makePattern(["class", "children"]);

export const popoverRootPattern = makePattern([
	"size",
	"open",
	"onOpenChange",
	"autoFocus",
	"closeOnEscape",
	"closeOnInteractOutside",
	"modal",
	"portalled",
	"lazyMount",
	"unmountOnExit",
	"positioning",
	"initialFocusEl",
	"class",
	"children",
]);
export const popoverTriggerPattern = makePattern(["class", "children"]);
export const popoverContentPattern = makePattern(["class", "children"]);
export const popoverArrowPattern = makePattern(["class"]);
export const popoverHeaderPattern = makePattern(["class", "children"]);
export const popoverBodyPattern = makePattern(["class", "children"]);
export const popoverFooterPattern = makePattern(["class", "children"]);
export const popoverTitlePattern = makePattern(["class", "children"]);
export const popoverDescriptionPattern = makePattern(["class", "children"]);
export const popoverCloseTriggerPattern = makePattern([
	"aria-label",
	"class",
	"children",
]);

export const navbarRootPattern = makePattern([
	"variant",
	"position",
	"bordered",
	"colour",
	"shouldHideOnScroll",
	"parentRef",
	"class",
	"children",
]);
export const navbarContentPattern = makePattern(["maxW", "class", "children"]);
export const navbarBrandPattern = makePattern(["class", "children"]);
export const navbarItemGroupPattern = makePattern([
	"gap",
	"justify",
	"class",
	"children",
]);
export const navbarItemPattern = makePattern(["class", "children"]);
export const navbarLinkPattern = makePattern([
	"active",
	"href",
	"class",
	"children",
]);

export const sidebarRootPattern = makePattern(["class", "children"]);
export const sidebarHeaderPattern = makePattern(["class", "children"]);
export const sidebarBodyPattern = makePattern(["class", "children"]);
export const sidebarFooterPattern = makePattern(["class", "children"]);
export const sidebarGroupPattern = makePattern(["class", "children"]);
export const sidebarGroupHeaderPattern = makePattern(["class", "children"]);
export const sidebarGroupTitlePattern = makePattern(["class", "children"]);
export const sidebarGroupContentPattern = makePattern(["class", "children"]);
export const sidebarNavItemPattern = makePattern(["class", "children"]);
export const sidebarNavButtonPattern = makePattern([
	"active",
	"class",
	"children",
]);
export const sidebarItemPattern = makePattern([
	"active",
	"icon",
	"class",
	"children",
]);
export const sidebarLinkPattern = makePattern([
	"active",
	"icon",
	"href",
	"class",
	"children",
]);
export const sidebarTogglePattern = makePattern([
	"onclick",
	"class",
	"children",
]);

export const appShellPattern = makePattern([
	"header",
	"sidebar",
	"aside",
	"footer",
	"height",
	"class",
	"children",
]);

export const editablePattern = makePattern([
	"activationMode",
	"autoResize",
	"defaultValue",
	"value",
	"onValueChange",
	"onValueCommit",
	"onValueRevert",
	"onEditChange",
	"placeholder",
	"maxLength",
	"selectOnFocus",
	"submitMode",
	"disabled",
	"readOnly",
	"required",
	"invalid",
	"size",
	"colour",
	"name",
	"form",
	"class",
	"children",
]);
export const editableAreaPattern = makePattern(["class", "children"]);
export const editablePreviewPattern = makePattern(["class"]);
export const editableInputPattern = makePattern(["class"]);
export const editableTextareaPattern = makePattern(["rows", "class"]);
export const editableControlPattern = makePattern(["class", "children"]);
export const editableLabelPattern = makePattern(["class", "children"]);
export const editableTriggerPattern = makePattern([
	"variant",
	"size",
	"colour",
	"icon",
	"class",
	"style",
	"children",
]);

export const listRootPattern = makePattern([
	"as",
	"variant",
	"align",
	"class",
	"children",
]);
export const listItemPattern = makePattern(["class", "children"]);
export const listIndicatorPattern = makePattern([
	"size",
	"colour",
	"class",
	"children",
]);

export const emptyStatePattern = makePattern([
	"size",
	"align",
	"colour",
	"icon",
	"title",
	"description",
	"class",
	"children",
]);

export const fileUploadRootPattern = makePattern([
	"accept",
	"allowDrop",
	"capture",
	"directory",
	"disabled",
	"invalid",
	"maxFiles",
	"maxFileSize",
	"minFileSize",
	"name",
	"required",
	"onFileAccept",
	"onFileChange",
	"onFileReject",
	"class",
	"children",
]);
export const fileUploadTriggerPattern = makePattern([
	"variant",
	"size",
	"colour",
	"class",
	"children",
]);
export const fileUploadDropzonePattern = makePattern(["class", "children"]);
export const fileUploadListPattern = makePattern([
	"showSize",
	"clearable",
	"class",
]);
export const fileUploadLabelPattern = makePattern(["class", "children"]);
export const fileUploadInputPattern = makePattern(["placeholder", "class"]);
export const fileUploadClearTriggerPattern = makePattern(["class", "children"]);

export const gridListRootPattern = makePattern([
	"interactive",
	"class",
	"children",
]);
export const gridListHeaderPattern = makePattern(["class", "children"]);
export const gridListItemPattern = makePattern(["class", "children"]);
export const gridListCellPattern = makePattern([
	"flex",
	"shrink",
	"width",
	"class",
	"children",
]);

export const tagPattern = makePattern([
	"variant",
	"size",
	"colour",
	"closable",
	"onClose",
	"startElement",
	"endElement",
	"maxWidth",
	"class",
	"children",
]);

export const hoverCardRootPattern = makePattern([
	"size",
	"open",
	"onOpenChange",
	"openDelay",
	"closeDelay",
	"portalled",
	"lazyMount",
	"unmountOnExit",
	"positioning",
	"class",
	"children",
]);
export const hoverCardTriggerPattern = makePattern([
	"asChild",
	"class",
	"children",
]);
export const hoverCardContentPattern = makePattern(["class", "children"]);
export const hoverCardArrowPattern = makePattern(["class"]);

export const imagePattern = makePattern([
	"src",
	"alt",
	"width",
	"height",
	"aspectRatio",
	"rounded",
	"fit",
	"class",
	"style",
]);

export const linkBoxPattern = makePattern(["as", "class", "children"]);
export const linkOverlayPattern = makePattern([
	"variant",
	"colour",
	"href",
	"class",
	"children",
]);

export const numberInputPattern = makePattern([
	"size",
	"colour",
	"invalid",
	"disabled",
	"placeholder",
	"value",
	"defaultValue",
	"onValueChange",
	"min",
	"max",
	"step",
	"allowMouseWheel",
	"clampValueOnBlur",
	"allowOverflow",
	"spinOnPress",
	"inputMode",
	"locale",
	"formatOptions",
	"name",
	"required",
	"readOnly",
	"class",
]);

export const paginationPattern = makePattern([
	"count",
	"pageSize",
	"page",
	"defaultPage",
	"siblingCount",
	"size",
	"variant",
	"colour",
	"onPageChange",
	"class",
]);

export const passwordInputPattern = makePattern([
	"size",
	"colour",
	"invalid",
	"disabled",
	"placeholder",
	"defaultVisible",
	"visible",
	"onVisibleChange",
	"class",
	"rootClass",
]);

export const personaRootPattern = makePattern(["size", "class", "children"]);
export const personaAvatarPattern = makePattern([
	"src",
	"name",
	"shape",
	"variant",
	"colour",
	"ring",
	"class",
	"children",
]);
export const personaPresenceBadgePattern = makePattern(["presence", "class"]);
export const personaDetailsPattern = makePattern(["class", "children"]);
export const personaLabelPattern = makePattern(["class", "children"]);
export const personaSecondaryLabelPattern = makePattern(["class", "children"]);
export const personaTertiaryLabelPattern = makePattern(["class", "children"]);

export const pinInputPattern = makePattern([
	"variant",
	"size",
	"colour",
	"invalid",
	"disabled",
	"placeholder",
	"value",
	"defaultValue",
	"onValueChange",
	"onValueComplete",
	"onValueInvalid",
	"count",
	"type",
	"otp",
	"mask",
	"attached",
	"autoFocus",
	"blurOnComplete",
	"selectOnFocus",
	"name",
	"required",
	"readOnly",
	"class",
]);

export const progressCirclePattern = makePattern([
	"value",
	"min",
	"max",
	"size",
	"colour",
	"showValue",
	"thickness",
	"rounded",
	"label",
	"class",
]);

export const progressRootPattern = makePattern([
	"value",
	"min",
	"max",
	"size",
	"variant",
	"shape",
	"colour",
	"striped",
	"animated",
	"class",
	"children",
]);
export const progressTrackPattern = makePattern(["class", "children"]);
export const progressRangePattern = makePattern(["class"]);
export const progressLabelPattern = makePattern(["class", "children"]);
export const progressValueTextPattern = makePattern(["class", "children"]);

export const formatBytePattern = makePattern([
	"value",
	"unit",
	"unitDisplay",
	"locale",
]);
export const formatNumberPattern = makePattern([
	"value",
	"style",
	"currency",
	"unit",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"notation",
	"compactDisplay",
	"locale",
]);
export const localeProviderPattern = makePattern(["locale", "children"]);

export const collapsiblePattern = makePattern([
	"id",
	"defaultOpen",
	"open",
	"disabled",
	"lazyMount",
	"unmountOnExit",
	"onOpenChange",
	"onExitComplete",
	"class",
	"children",
]);
export const collapsibleTriggerPattern = makePattern(["class", "children"]);
export const collapsibleContentPattern = makePattern(["class", "children"]);

export const clipboardPattern = makePattern([
	"id",
	"value",
	"timeout",
	"class",
	"children",
]);

export const closeButtonPattern = makePattern([
	"variant",
	"size",
	"colour",
	"aria-label",
	"class",
	"children",
]);

export const spinnerPattern = makePattern([
	"size",
	"colour",
	"label",
	"animationDuration",
	"borderWidth",
	"trackColour",
	"class",
]);

export const linkPattern = makePattern([
	"variant",
	"colour",
	"class",
	"children",
]);

export const nativeSelectPattern = makePattern([
	"variant",
	"size",
	"colour",
	"invalid",
	"disabled",
	"value",
	"class",
	"children",
]);

export const textareaPattern = makePattern([
	"variant",
	"size",
	"colour",
	"invalid",
	"disabled",
	"placeholder",
	"resize",
	"class",
]);

export const separatorPattern = makePattern([
	"orientation",
	"variant",
	"size",
	"colour",
	"class",
]);

export const skeletonPattern = makePattern([
	"loading",
	"variant",
	"height",
	"width",
	"class",
	"children",
]);
export const skeletonCirclePattern = makePattern(["variant", "size", "class"]);
export const skeletonTextPattern = makePattern([
	"variant",
	"noOfLines",
	"gap",
	"class",
]);

export const sliderRootPattern = makePattern([
	"size",
	"variant",
	"orientation",
	"colour",
	"disabled",
	"value",
	"defaultValue",
	"min",
	"max",
	"step",
	"name",
	"onValueChange",
	"onValueChangeEnd",
	"class",
	"children",
]);
export const sliderControlPattern = makePattern(["class", "children"]);
export const sliderTrackPattern = makePattern(["class", "children"]);
export const sliderRangePattern = makePattern(["class"]);
export const sliderThumbPattern = makePattern([
	"index",
	"name",
	"class",
	"children",
]);
export const sliderLabelPattern = makePattern(["class", "children"]);
export const sliderValueTextPattern = makePattern(["class", "children"]);
export const sliderMarkerGroupPattern = makePattern(["class", "children"]);
export const sliderMarkerPattern = makePattern([
	"value",
	"showDot",
	"class",
	"children",
]);

export const statRootPattern = makePattern(["class", "children"]);
export const statLabelPattern = makePattern(["class", "children"]);
export const statValueTextPattern = makePattern([
	"value",
	"formatOptions",
	"class",
	"children",
]);
export const statValueUnitPattern = makePattern(["class", "children"]);
export const statHelpTextPattern = makePattern(["class", "children"]);
export const statUpTrendPattern = makePattern([
	"variant",
	"colour",
	"class",
	"children",
]);
export const statDownTrendPattern = makePattern([
	"variant",
	"colour",
	"class",
	"children",
]);

export const statusPattern = makePattern([
	"value",
	"size",
	"colour",
	"class",
	"children",
]);

export const stepsRootPattern = makePattern([
	"count",
	"defaultStep",
	"step",
	"size",
	"orientation",
	"colour",
	"linear",
	"onStepChange",
	"onStepComplete",
	"class",
	"children",
]);
export const stepsListPattern = makePattern(["class", "children"]);
export const stepsItemPattern = makePattern([
	"index",
	"title",
	"description",
	"icon",
	"class",
	"children",
]);
export const stepsContentPattern = makePattern(["index", "class", "children"]);
export const stepsCompletedContentPattern = makePattern(["class", "children"]);
export const stepsPrevTriggerPattern = makePattern(["class", "children"]);
export const stepsNextTriggerPattern = makePattern(["class", "children"]);

export const tableRootPattern = makePattern([
	"size",
	"variant",
	"interactive",
	"stickyHeader",
	"striped",
	"showColumnBorder",
	"class",
	"children",
]);
export const tableHeaderPattern = makePattern(["class", "children"]);
export const tableBodyPattern = makePattern(["class", "children"]);
export const tableFooterPattern = makePattern(["class", "children"]);
export const tableRowPattern = makePattern(["class", "children"]);
export const tableColumnHeaderPattern = makePattern([
	"textAlign",
	"minW",
	"w",
	"class",
	"children",
]);
export const tableCellPattern = makePattern(["textAlign", "class", "children"]);
export const tableCaptionPattern = makePattern([
	"placement",
	"class",
	"children",
]);
export const tableScrollAreaPattern = makePattern([
	"maxW",
	"height",
	"borderWidth",
	"rounded",
	"class",
	"children",
]);
export const tableColumnGroupPattern = makePattern(["class", "children"]);
export const tableColumnPattern = makePattern(["htmlWidth", "class"]);

export const tabsRootPattern = makePattern([
	"size",
	"variant",
	"fitted",
	"justify",
	"colour",
	"defaultValue",
	"value",
	"activationMode",
	"lazyMount",
	"unmountOnExit",
	"orientation",
	"loopFocus",
	"onValueChange",
	"class",
	"children",
]);
export const tabsListPattern = makePattern(["class", "children"]);
export const tabsTriggerPattern = makePattern([
	"value",
	"disabled",
	"class",
	"children",
]);
export const tabsContentPattern = makePattern(["value", "class", "children"]);
export const tabsIndicatorPattern = makePattern(["class"]);
export const tabsContentGroupPattern = makePattern(["class", "children"]);

export const timelineRootPattern = makePattern([
	"size",
	"variant",
	"colour",
	"class",
	"children",
]);
export const timelineItemPattern = makePattern(["class", "children"]);
export const timelineConnectorPattern = makePattern(["class", "children"]);
export const timelineContentPattern = makePattern([
	"flex",
	"alignItems",
	"width",
	"class",
	"children",
]);
export const timelineTitlePattern = makePattern([
	"whiteSpace",
	"class",
	"children",
]);
export const timelineDescriptionPattern = makePattern(["class", "children"]);

export const containerPattern = makePattern([
	"maxW",
	"fluid",
	"centerContent",
	"class",
	"children",
]);

export const flexPattern = makePattern([
	"direction",
	"align",
	"justify",
	"wrap",
	"basis",
	"grow",
	"shrink",
	"gap",
	"inline",
	"class",
	"children",
]);
