document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const prompt = card.querySelector('span').textContent;
            // In a real application, this would send the prompt to the AI.
            // Here, we just log it and provide a visual feedback.
            console.log(`Card Clicked: ${prompt}`);

            // Basic visual feedback (e.g., a temporary color change)
            card.style.backgroundColor = '#f0f0f0';
            setTimeout(() => {
                card.style.backgroundColor = 'var(--card-bg)';
            }, 300);
        });
    });
});