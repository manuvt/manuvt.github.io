<script>
    // Get the dark mode slider input element
    const darkModeSlider = document.getElementById('darkModeSlider');

    // Function to enable dark mode
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
    }

    // Function to disable dark mode
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
    }

    // Function to toggle dark mode based on the slider value
    function toggleDarkMode() {
        if (darkModeSlider.value === '1') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    // Event listener to handle dark mode slider changes
    darkModeSlider.addEventListener('input', toggleDarkMode);

    // Check if dark mode is enabled or not on page load (optional)
    // You can save the user's preference in localStorage and load it here
    // For simplicity, we are assuming dark mode is initially disabled
    disableDarkMode();
</script>
