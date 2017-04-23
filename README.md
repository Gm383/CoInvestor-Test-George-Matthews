Author - George Matthews

This simple webpage was created for the purposes of demonstrating my web knowledge for a job application to CoInvestor

The core functionality of the website relies on Javascript and JQuery functions to fill in and process the content of the slim HTML file (index.html). When the document is ready, the site uses AJAX requests to collect the content of the JSON data containing the information for the Managers, the Javascript and JQuery functions then navigate this JSON Data depending on the use of the function (For example navigating to attributes.addresses to retrieve the address data of each manager). 

Pagination functionality was also included to navigate the two pages of the data, and has been written to automatically allow for expansion of the data into multiple pages, cutting on maintenance time.  To reduce clutter and follow the natural movement of users across the page, the page buttons have been placed at the very bottom of the page, seperated from the list of managers by a line break. By handling the movement between pages using JQuery, the user is able to navigate each page of the data without refreshing the webpage itself.  

In regards to styling, I have decided to keep things simple and clean by using a core colour palette of Black, White, Grey, and a custom colour taken from the CoInvestor logo. All elements have been styled in this way, and comments within the external .css file allow for  transition to Sass css in the future.

This test took the better part of two days to write, with about a day dedicated to the actual programming, between about a quarter of a day spent on the wire frame and testing reports. 
