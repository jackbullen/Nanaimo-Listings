#
# This file downloads the html files that from the real estate website. 
# Each downloaded html file is a seperate listing.
#

import requests
from bs4 import BeautifulSoup
import time
import random

def download_html_from_links(url):
    response = requests.get(url)
    if response.status_code == 200:
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        links = soup.find_all('a', class_='listing-card_listingCard__G6M8g')

        for i,link in enumerate(links):
            url = link['href']
            time.sleep(0.069*random.uniform(0,1))
            response = requests.get(url)
            if response.status_code == 200:
                html_filename = url.split('/')[-1] + '.html'
                with open('listings/'+str(i)+"_"+html_filename, 'w', encoding='utf-8') as f:
                    f.write(response.text)
                print(f"HTML downloaded from {url} and saved as {html_filename}")
            else:
                print(f"Failed to download HTML from {url}. Status code: {response.status_code}")
    else:
        print(f"Failed to fetch {url}. Status code: {response.status_code}")

if __name__ == '__main__':
    base_url = "https://www.WEBSITE.ca/BC/NANAIMO?pageNumber={}"
    num_pages = 35  # Change this to the number of pages you want to download

    for page_num in range(1, num_pages + 1):
        url = base_url.format(page_num)
        download_html_from_links(url)
