document.addEventListener('DOMContentLoaded', () => {
    // Get the hotel ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    

    // Complete hotel data

    // Validate hotelId and find matching hotel
    let hotel = null;
    if (hotelId && !isNaN(hotelId)) {
        hotel = hotels.find(h => h.id === parseInt(hotelId, 10));
    }

    // Display hotel details or an error message
    const hotelDetails = document.getElementById('hotelDetails');
    if (hotel) {
        hotelDetails.innerHTML = `
            <h1>${hotel.name}</h1>
            <p><strong>Location:</strong> ${hotel.locationDetails}</p>
            <p><strong>Price:</strong> ₱${hotel.price.toLocaleString()}</p>
            <p><strong>Rating:</strong> ${hotel.rating} Stars</p>
            <h3>Highlights:</h3>
            <ul>
                ${(hotel.highlights || []).map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <h3>Facilities:</h3>
            <ul>
                ${(hotel.facilities || []).map(facility => `<li>${facility}</li>`).join('')}
            </ul>
            <h3>Rooms:</h3>
            <ul>
                ${(hotel.rooms || []).map(room => `
                    <li><strong>${room.type}</strong>
                    <ul>
                        ${(room.amenities || []).map(amenity => `<li>${amenity}</li>`).join('')}
                    </ul>
                    </li>
                `).join('')}
            </ul>
        `;
    } else {
        hotelDetails.innerHTML = `<h1>Hotel not found!</h1>`;
        console.error("Hotel data not available.");
    }
});
