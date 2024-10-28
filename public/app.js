function confirmDeletion(event) {
    if (!confirm("Are you sure you want to delete this chat?")) {
        event.preventDefault(); // Prevents form submission if "Cancel" is clicked
    }
}