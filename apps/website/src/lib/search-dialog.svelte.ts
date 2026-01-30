// Global state for search dialog
let searchDialogOpen = $state(false);

export function getSearchDialogOpen() {
    return searchDialogOpen;
}

export function setSearchDialogOpen(open: boolean) {
    searchDialogOpen = open;
}

export function toggleSearchDialog() {
    searchDialogOpen = !searchDialogOpen;
}
