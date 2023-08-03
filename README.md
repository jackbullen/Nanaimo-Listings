# Nanaimo Listings
Welcome to our house listing application! Discover your dream home in Nanaimo, BC, with ease. Browse through a curated collection of residential properties, each showcased beautifully with details like price, bedrooms, bathrooms, and square footage. Get a glimpse of the property's neighbourhood by clicking on the map. Find your home sweet home today!

## Inspiration
The inspiration was to create a user-friendly and visually appealing house listing application for potential homebuyers and real estate enthusiasts in the **beautiful city of Nanaimo, BC**. We wanted to provide a platform where users could easily explore a curated collection of residential properties and learn about their features.

## What it does
Allows users to browse through an array of residential properties available for sale in Nanaimo. Each property listing showcases essential details, including the property's price, number of bedrooms, bathrooms, square footage, and much more. Moreover, users can virtually explore the property's neighbourhood and surrounding areas by clicking on a link that takes them directly to Google Maps.

## How we built it
The application's frontend was developed using HTML, JavaScript, CSS, DaisyUI, and Tailwind CSS. These technologies enabled us to create a responsive and visually appealing user interface. The data was scraped using the Selenium and Beatiful Soup in Python then saved to a csv file. The csv file was uploaded to a Google sheet and an API endpoint was created using Google apps scripts (). Three additional columns were added. Latitude and longitude were evaluated using the apps script geocoder class and a new description was added by querying davinci-003 through the OpenAI API. The app was then deployed through github pages. 

## Challenges we ran into
I decided to not scrape images and faced difficulties dealing with this decision. I found a URI that can take a latitude and longitude and produce a png image similar to google maps so I just embed this link in the app. It was annoying dealing with the rate limits on the apps script geocoder and openAI API (very limiting, 3 requests per minute...).

## Accomplishments that we're proud of
Creating a fully functional house listing application that provides an intuitive user experience and showcases property listings in a visually appealing manner. Successfully web scraping with Python. Setting up an API and processing data in Google sheets with apps script. Additionally, creating a responsive application that caters to various screen sizes.

## What we learned
Tailwind CSS and Daisy UI. Using JS to fetch data from an API, handle asynchronous operations, and create effects by linking to objects in the DOM. Uses and limitations of a serverless app. OpenAI API specification and offensive rate limits.

## What's next for Nanaimo Listings
Include advanced search and filtering options. Look into if it's possible to improve the apps script API to allow filtered queries from the JavaScript. Enhance the user experience by adding additional features such as property comparisons. Further data processing with apps script could be done as there are properties not in Nanaimo and undeveloped. Other directions for the app could be a prototype of a management system for real estate agents.