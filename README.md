# Nanaimo Listings
Welcome to our house listing application! Discover your dream home in Nanaimo, BC, with ease. Browse through a curated collection of residential properties, each showcased beautifully with details like price, bedrooms, bathrooms, and square footage. Get a glimpse of the property's neighbourhood by clicking on the map. Find your home sweet home today!

## TODO
1. Optimize Data storage as severe lag after moving through a few pages.

## Inspiration
The inspiration was to create a user-friendly and visually appealing house listing application for potential homebuyers and real estate enthusiasts in the **beautiful city of Nanaimo, BC**. We wanted to provide a platform where users could easily explore a curated collection of residential properties and learn about their features.

## What it does
Allows users to browse through an array of residential properties available for sale in Nanaimo. Each property listing showcases essential details, including the property's price, number of bedrooms, bathrooms, square footage, and much more. Moreover, users can virtually explore the property's neighbourhood and surrounding areas by clicking on a link that takes them directly to Google Maps.

## How we built it
The application's frontend was developed using HTML, JavaScript, CSS, DaisyUI, and Tailwind CSS. These technologies enabled us to create a responsive and visually appealing user interface. The data was scraped using the Selenium and Beatiful Soup in Python then saved to a csv file. The csv file was placed into a google sheet and three additional columns were added. Latitude and longitude were evaluated using the apps script geocoder class and a new description was added by querying the OpenAI API. The data and site are deployed through github pages. 

## Challenges we ran into
I decided to not scrape images and faced difficulties dealing with this decision. I found a URI that can take a latitude and longitude and produce a png image similar to google maps so I just embedded this link in the app. It was annoying dealing with the rate limits on the apps script geocoder and openAI API.

## Accomplishments that we're proud of
An intuitive user experience. Web scraping the data with Python. Setting up an API and processing data in Google sheets with apps script. Catering to various screen sizes.

## What we learned
Tailwind CSS and Daisy UI. Using JS to fetch data from an API, handling asynchronous operations, and creating effects by linking objects in the DOM. Uses and limitations google sheets+app script as an API. How to use OpenAI API in apps script.

## What's next for Nanaimo Listings
Include advanced search and filtering options. Enhance the user experience by adding additional features such as wider description tags, recentering when closing description/details tags, and property comparisons. Further data processing with apps script could be done as there are properties not in Nanaimo and undeveloped. Other directions for the app could be a prototype of a management system for real estate agents.

<img width="1167" alt="IMG" src="https://github.com/jackbullen/Nanaimo-Listings/assets/37254717/fe14589e-80e3-4cfc-80b4-9ae8e5fbe3d6">

<img width="1161" alt="IMG2" src="https://github.com/jackbullen/Nanaimo-Listings/assets/37254717/20a92a76-e84d-4a2d-a4ef-503f01e657b7">


