// Calender

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Display month view initially
        height: '300px',
        width: '50%',
        contentHeight: 'auto',
        eventMinHeight: 30,
        eventMargin: 2,
        events: [
            {
                title: 'Pet Adoption Workshop',
                start: '2023-09-05',
                end: '2023-09-05',
                url: 'link_to_event_page'
            },
            {
                title: 'Annual Fundraiser',
                start: '2023-09-10',
                end: '2023-09-12',
                url: 'link_to_event_page'
            },
            {
                title: 'Dog Training Session',
                start: '2023-09-15',
                end: '2023-09-15',
                url: 'link_to_event_page'
            },
            {
                title: 'Cat Adoption Event',
                start: '2023-09-20',
                end: '2023-09-20',
                url: 'link_to_event_page'
            },
            {
                title: 'Volunteer Orientation',
                start: '2023-09-25',
                end: '2023-09-25',
                url: 'link_to_event_page'
            },
            {
                title: 'Pet Grooming Workshop',
                start: '2023-09-30',
                end: '2023-09-30',
                url: 'link_to_event_page'
            },
            {
                title: 'Adopt-a-Rabbit Day',
                start: '2023-10-10',
                end: '2023-10-10',
                url: 'link_to_event_page'
            },
            {
                title: 'Puppy Playdate',
                start: '2023-10-15',
                end: '2023-10-15',
                url: 'link_to_event_page'
            },
            {
                title: 'Senior Pets Awareness Month',
                start: '2023-11-01',
                end: '2023-11-30',
                url: 'link_to_event_page'
            },
            {
                title: 'Holiday Adoption Special',
                start: '2023-12-15',
                end: '2023-12-31',
                url: 'link_to_event_page'
            },
        ],
        eventClick: function (info) {
            window.open(info.event.url, '_blank'); // Open event URL in a new tab
        }
    });
    calendar.render();
});
// Search
document.addEventListener('DOMContentLoaded', function () {
    const petCards = document.querySelectorAll('.pet-card');
    const searchInput = document.getElementById('searchInput');
    const filterDropdown = document.getElementById('filterDropdown');
    function showAllCards() {
        petCards.forEach(card => card.classList.add('show'));
    }
    function filterCards(category) {
        petCards.forEach(card => {
            if (category === 'all' || card.classList.contains(category)) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    }
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            showAllCards();
            return;
        }

        petCards.forEach(card => {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });


    filterDropdown.addEventListener('change', function () {
        const selectedCategory = filterDropdown.value;
        filterCards(selectedCategory);
    });

    showAllCards();
});

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

// NewsLetter
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const successMessage = document.createElement("p");
    successMessage.textContent = "Thank you for subscribing to our newsletter!";
    successMessage.classList.add("text-green-600", "mt-2");
    newsletterForm.appendChild(successMessage);
    newsletterEmail.value = "";
});
