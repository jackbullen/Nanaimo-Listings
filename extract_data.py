#
# This file is for extracting the data from the downloaded html files in ./listings folder.
# Extracted data is price, bed, bath, sqft, addr, desc, info.
#

from  bs4 import BeautifulSoup
import os
import re
import urllib
import csv
html_files = [f for f in os.listdir('listings') if f.endswith('.html')]

def extract():
    dat = dict()
    # Open File
    for filename in html_files:
        with open('listings/'+ filename) as f:

            # Parse HTML File
            soup = BeautifulSoup(f, 'html.parser')
            # Find all elements with class names starting with "listing-summary_listPrice__"
            price = soup.find_all(class_=lambda x: x and x.startswith("listing-summary_listPrice__"))[0].text.strip()
            bed = soup.find_all(class_=lambda x: x and x.startswith("property-details_detailsRow"))[0].text.strip().split(' ')[0]
            bath = soup.find_all(class_=lambda x: x and x.startswith("property-details_detailsRow"))[0].text.strip().split(' ')[2]
            sqft = soup.find_all(class_=lambda x: x and x.startswith("property-details_detailsRow"))[1].text.strip().split(' ')[0]
            addr_st = soup.find_all(class_=lambda x: x and x.startswith("listing-address_splitLines"))[0].text.strip()
            addr = addr_st + ", " + soup.find_all(class_=lambda x: x and x.startswith("listing-summary_cityLine"))[0].text.strip()
            MLS = soup.find_all(class_=lambda x: x and x.startswith("listing-summary_mlsNum"))[0].text.strip().split(' ')[-1]
            desc = soup.find_all(class_=lambda x: x and x.startswith("listing-description_descriptionContent"))[0].text.strip()
            info = dict()
            for n in range(len(soup.find_all(class_=lambda x: x and x.startswith("bullet-section_bulletPointContainer")))):
                for i, field in enumerate(soup.find_all(class_=lambda x: x and x.startswith("bullet-section_bulletPointContainer"))[n].find_all('h4')):
                    info[field.text.strip()] = soup.find_all(class_=lambda x: x and x.startswith("bullet-section_bulletPointContainer"))[n].find_all('span')[2*i+1].text.strip()
            dat[MLS] = {'price':price, 
                        'bed':bed, 
                        'bath':bath,
                        'sqft':sqft,
                        'addr':addr,
                        'desc':desc,
                        'info':info
                    }
    return dat


dat = extract()
fields = ['price', 'bed', 'bath', 'sqft', 'addr', 'desc', 'info']
csv_file = "Data.csv"
try:
    with open(csv_file, 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fields)
        writer.writeheader()
        for data in dat:
            writer.writerow(dat[data])
except IOError:
    print("I/O error")