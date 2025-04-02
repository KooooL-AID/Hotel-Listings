class HotelDirectory {
    constructor(hotels) {
        this.hotels = hotels;
        this.filteredHotels = hotels;
        this.initializeEventListeners();
    }
    

    initializeEventListeners() {
        document.getElementById('searchInput').addEventListener('input', 
            this.debounce(this.handleSearch.bind(this), 300)
        );
    }
    
    debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        console.log("Search term:", searchTerm);  // Debug log to see search input value
        this.filteredHotels = this.hotels.filter(hotel => 
            hotel.name.toLowerCase().includes(searchTerm) ||
            hotel.location.toLowerCase().includes(searchTerm) ||
            hotel.description.toLowerCase().includes(searchTerm) ||
            hotel.facilities.some(facility => 
                facility.toLowerCase().includes(searchTerm)
            )
        );
        this.renderHotels();
    }

    renderHotels() {
        const hotelsGrid = document.getElementById("hotelsGrid");
        
        if (this.filteredHotels.length === 0) {
            hotelsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search-minus"></i>
                    <h3>No Hotels Found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        hotelsGrid.innerHTML = this.filteredHotels
            .map(hotel => this.createHotelCard(hotel))
            .join("");
    }

    createHotelCard(hotel) {
        return `
            <div class="hotel-card" data-hotel-id="${hotel.id}">
                <div class="hotel-image-container">
                    <img src="${hotel.images[0]}" alt="${hotel.name}" class="hotel-image">
                    <div class="hotel-badge"></div>
                </div>
                <div class="hotel-info">
                    <h3 class="hotel-name">${hotel.name}</h3>
                    <p class="hotel-location">${hotel.location}</p>
                    <p class="hotel-location-details"> ${hotel.locationDetails}</p>
                    <p class="hotel-description">${hotel.description}</p>
                </div>
            </div>
        `;
    }
}
 // Dynamic Search
 document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.hotel-card').forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(query) ? '' : 'none';
    });
});

// Populate Missing Data
document.querySelectorAll('.hotel-card').forEach(card => {
    const price = card.querySelector('p:nth-child(3)').innerText.trim();
    const rating = card.querySelector('p:nth-child(4)').innerText.trim();
    if (!price) card.querySelector('p:nth-child(3)').innerText = 'Price: N/A';
    if (!rating) card.querySelector('p:nth-child(4)').innerText = 'Rating: N/A';
});
document.addEventListener("DOMContentLoaded", () => {
    const ratings = document.querySelectorAll(".rating");

    ratings.forEach(rating => {
        const starCount = parseFloat(rating.getAttribute("data-rating"));
        const fullStars = Math.floor(starCount);
        const halfStar = starCount % 1 !== 0 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        let starsHTML = "★".repeat(fullStars); // Full stars
        if (halfStar) starsHTML += "☆"; // Half star
        starsHTML += "✩".repeat(emptyStars); // Empty stars

        rating.innerHTML = starsHTML;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all hotel cards
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    // For each card
    hotelCards.forEach(function(card) {
        // Find the link inside the card's title
        const link = card.querySelector('h3 a');
        if (link) {
            const href = link.getAttribute('href');
            
            // Make the entire card clickable
            card.addEventListener('click', function(e) {
                // Check if the click was on an interactive element
                const isInteractiveElement = e.target.tagName === 'A' || 
                                           e.target.tagName === 'BUTTON' || 
                                           e.target.tagName === 'SELECT';
                
                // If not clicking on an interactive element, navigate to the hotel page
                if (!isInteractiveElement) {
                    window.location.href = href;
                }
            });
        }
    });
});
// Added functionality
// document.addEventListener("DOMContentLoaded", () => {
//     const hotelsGrid = document.getElementById("hotelsGrid");
//     const sortSelect = document.getElementById("sortSelect");
//     const locationFilter = document.getElementById("locationFilter");
//     const priceFilter = document.getElementById("priceFilter");
//     const ratingFilter = document.getElementById("ratingFilter");
//     const clearFiltersBtn = document.getElementById("clearFiltersBtn");

//     let hotels = Array.from(hotelsGrid.children);

//     const filterHotels = () => {
//         let filteredHotels = hotels;

//         // Filter by location
//         const location = locationFilter.value;
//         if (location) {
//             filteredHotels = filteredHotels.filter(hotel =>
//                 hotel.querySelector(".location").textContent.includes(location)
//             );
//         }

//         // Filter by price
//         const price = priceFilter.value;
//         if (price) {
//             const [minPrice, maxPrice] = price.split('-').map(Number);
//             filteredHotels = filteredHotels.filter(hotel => {
//                 const hotelPrice = parseFloat(hotel.querySelector(".price").textContent.replace(/[^0-9.]/g, ""));
//                 return hotelPrice >= minPrice && (maxPrice ? hotelPrice <= maxPrice : true);
//             });
//         }

//         // Filter by rating
//         const rating = ratingFilter.value;
//         if (rating) {
//             filteredHotels = filteredHotels.filter(hotel =>
//                 parseFloat(hotel.querySelector(".rating").dataset.rating) >= parseFloat(rating)
//             );
//         }

//         return filteredHotels;
//     };

//     const sortHotels = (hotelsToSort) => {
//         const sortValue = sortSelect.value;

//         return hotelsToSort.sort((a, b) => {
//             if (sortValue === "price-low") {
//                 return parseFloat(a.querySelector(".price").textContent.replace(/[^0-9.]/g, "")) -
//                        parseFloat(b.querySelector(".price").textContent.replace(/[^0-9.]/g, ""));
//             } else if (sortValue === "price-high") {
//                 return parseFloat(b.querySelector(".price").textContent.replace(/[^0-9.]/g, "")) -
//                        parseFloat(a.querySelector(".price").textContent.replace(/[^0-9.]/g, ""));
//             } else if (sortValue === "rating") {
//                 return parseFloat(b.querySelector(".rating").dataset.rating) -
//                        parseFloat(a.querySelector(".rating").dataset.rating);
//             }
//             return 0; // Default, no sorting
//         });
//     };

//     const updateHotelsDisplay = () => {
//         const filteredHotels = filterHotels();
//         const sortedHotels = sortHotels(filteredHotels);

//         hotelsGrid.innerHTML = "";
//         sortedHotels.forEach(hotel => hotelsGrid.appendChild(hotel));
//     };

//     sortSelect.addEventListener("change", updateHotelsDisplay);
//     locationFilter.addEventListener("change", updateHotelsDisplay);
//     priceFilter.addEventListener("change", updateHotelsDisplay);
//     ratingFilter.addEventListener("change", updateHotelsDisplay);

//     clearFiltersBtn.addEventListener("click", () => {
//         locationFilter.value = "";
//         priceFilter.value = "";
//         ratingFilter.value = "";
//         sortSelect.value = "";
//         updateHotelsDisplay();
//     });

//     // Initial display update
//     updateHotelsDisplay();
// });


