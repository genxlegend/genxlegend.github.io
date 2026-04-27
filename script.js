// Theme Toggle Logic
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Simple toggle between light and dark
themeBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Switch to sun icon for dark mode
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon'); // Switch back to moon
    }
});

// Accordion (Ladder) Animation Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        // Find the parent item
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        
        // Check if the clicked item is already active
        const isActive = item.classList.contains('active');
        
        // Close all other open items for a clean look
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = null;
        });

        // If it wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
            // Set max-height dynamically to the inner scroll height for smooth sliding
            content.style.maxHeight = content.scrollHeight + 25 + "px"; // 25px added for bottom padding
        }
    });
});
