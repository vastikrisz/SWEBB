document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.pricing-card');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove('visible', 'left', 'right', 'animate-in', 'animate-out');
            if (i === index) {
                card.classList.add('visible');
            } else if (i < index) {
                card.classList.add('left');
            } else {
                card.classList.add('right');
            }
        });
    }

    leftArrow.addEventListener('click', function () {
        const previousIndex = currentIndex;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        cards[previousIndex].classList.add('animate-out');
        cards[currentIndex].classList.add('animate-in');
        showCard(currentIndex);
    });

    rightArrow.addEventListener('click', function () {
        const previousIndex = currentIndex;
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        cards[previousIndex].classList.add('animate-out');
        cards[currentIndex].classList.add('animate-in');
        showCard(currentIndex);
    });

    showCard(currentIndex); // Initialize the first card as visible
});
