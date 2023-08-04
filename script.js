const listingsPerPage = 6;



async function load() {

    const response = await fetch('./data/Data.json');

    const listings = await response.json();
    console.log(listings["addr"]);
    var pageNumber = 1;
    showListings(listings, pageNumber);

    document.getElementById('forward-button').addEventListener('click', () => {
      pageNumber = Math.min(pageNumber + 1, Math.ceil(listings.length / listingsPerPage) - 1);
      showListings(listings, pageNumber);
      window.scrollTo(0, 170);
    });
    document.getElementById('page-indicator').addEventListener('click', () => {
      window.scrollTo(0, 170);
    });
    document.getElementById('backward-button').addEventListener('click', () => {
      pageNumber = Math.max(pageNumber - 1, 0);
      showListings(listings, pageNumber);
      window.scrollTo(0, 170);
    });

    updatePageIndicator(listings, pageNumber);

}

function showListings(listings, pageNumber) {
    const listingContainer = document.getElementById('listing-container');
    listingContainer.innerHTML = '';
  
    const startIdx = pageNumber * listingsPerPage;
    const endIdx = Math.min(startIdx + listingsPerPage, listings.length);
  
    for (let i = startIdx; i < endIdx; i++) {
      const listing = listings[i];
      const listinfo = JSON.parse(listing.info.replace(/'/g, '"'));
      listingContainer.innerHTML += `
      <div class="p-4">
        <div class="card w-92 bg-base-100 shadow-xl">
          <div class="card-body">
            
          <figure class="relative">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.addr)}" target="_blank">
            <img src="https://pp.walk.sc/tile/e/0/748x600/loc/lat=${listing.lat}/lng=${listing.long}.png" class="relative" alt="Map Image"> </img>
          </a>
          <div class="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </figure>
        
            <div class="card-body">
            <h2 class="card-title">${listing.addr.split(',')[0]}</h2>
              <p>Price: ${listing.price}$</p>
              <p>Bedrooms: ${listing.bed}</p>
              <p>Bathrooms: ${listing.bath}</p>
              <p>Square feet: ${listing.sqft}</p>
              <div tabindex="0" class="collapse bg-base-200"> 
              <div class="collapse-title text-xl font-medium">
                Description
              </div>
              <div class="collapse-content"> 
                <p>${listing.new_desc.split('.')}</p>
              </div>
            </div>
            <div tabindex="0" class="collapse bg-base-200"> 
            <div class="collapse-title text-xl font-medium">
              Details
            </div>
            <div class="collapse-content"> 
              <p>Date Listed: ${(listinfo["Date Listed"] || "N/A")}</p>
              <p>Last Updated: ${(listinfo['Last Updated'] || "N/A")}</p>
              <p>Property Tax: ${(listinfo['Property Tax'] || "N/A")}</p>
              <p>Property Type: ${(listinfo["Property Type"] || "N/A")}</p>
              <p>Subdivision: ${(listinfo["PSubdivision"] || "N/A")}</p>
              <p>Property Type: ${(listinfo["Property Type"] || "N/A")}</p>
              <p>Heating: ${(listinfo["Heating"] || "N/A")}</p>
              <p>Property Type: ${(listinfo["Property Type"] || "N/A")}</p>
              <p>Pet Policy: ${(listinfo["Pet Policy"] || "N/A")}</p>
              <p>Stories: ${(listinfo["Stories"] || "N/A")}</p>
              <p>Flooring: ${(listinfo["Flooring"] || "N/A")}</p>
              <p>Sewer: ${(listinfo["Sewer"] || "N/A")}</p>
              <p>Parking Features: ${(listinfo["Parking Features"] || "N/A")}</p>
              <p>Exterior Features: ${(listinfo["Exterior Features"] || "N/A")}</p>
              <p>Building Features: ${(listinfo["Building Features"] || "N/A")}</p>
            </div>
          </div>
            <div class="card-actions justify-end">
            </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }
    document.getElementById('forward-button').addEventListener('click', () => {
      pageNumber = Math.min(pageNumber + 1, Math.ceil(listings.length / listingsPerPage) - 1);
      showListings(listings, pageNumber);
      scrollToTopOfContainer();
    });
  
    document.getElementById('backward-button').addEventListener('click', () => {
      pageNumber = Math.max(pageNumber - 1, 0);
      showListings(listings, pageNumber);
      scrollToTopOfContainer();
    });
  
    updatePageIndicator(listings, pageNumber);
  }

  function updatePageIndicator(listings, pageNumber) {
    const pageIndicator = document.getElementById('page-indicator');
    const totalPages = Math.ceil(listings.length / listingsPerPage);
    pageNumber = pageNumber + 1;
    pageIndicator.textContent = `Page ${pageNumber} of ${totalPages}`;
  }


document.addEventListener('DOMContentLoaded', function() {
  const listingImage = document.querySelector('.listing-image');

  listingImage.addEventListener('load', function() {
    const markerPlaceholder = document.querySelector('.marker-placeholder');
    markerPlaceholder.innerHTML = '<div class="absolute top-0 left-0 w-4 h-4 bg-red-500 rounded-full"></div>';
  });
});

load();
