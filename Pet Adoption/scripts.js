const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

const petCards = document.querySelectorAll('.pet-card');

function showCardsOnScroll() {
    petCards.forEach(card => {
        if (isElementInViewport(card)) {
            card.classList.add('show');
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', showCardsOnScroll);


// Accordion
const accordionToggles = document.querySelectorAll('.accordion-toggle');

accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.accordion-icon');

        if (content.style.display === 'none') {
            content.classList.add('active');
            content.style.display = 'block';
            icon.innerText = '-';
        } else {
            content.classList.remove('active');
            content.style.display = 'none';
            icon.innerText = '+';
        }
    });
});
// Search
const searchInput = document.getElementById("searchInput");
const speciesFilter = document.getElementById("speciesFilter");
const ageFilter = document.getElementById("ageFilter");
function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedSpecies = speciesFilter.value;
    const selectedAge = ageFilter.value;

    petCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const species = card.querySelector(".pet-species").textContent;
        const age = card.querySelector(".pet-age").textContent;

        const nameMatch = name.includes(searchText);
        const speciesMatch = selectedSpecies === "" || species === selectedSpecies;
        const ageMatch = selectedAge === "" || age === selectedAge;

        if (nameMatch && speciesMatch && ageMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", applyFilters);
speciesFilter.addEventListener("change", applyFilters);
ageFilter.addEventListener("change", applyFilters);

