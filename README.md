# URL Shortener service

## Project and research

### Context 

Our product allows the creation of advanced sales and marketing reports from a variety of sources and APIs.These reports and then shared with teams of the organization for strategy and decision making.
After a recent feedback session with one of our key customers, we learned how a pain point of our product is the production of long and “ugly” URLs that are difficult and cumbersome to share. Besides, the company data policy doesn’t allow them to use 3rd party URLs shorteners. This is most likely a wise decision, since short links can constitute a risk on two sides: for those who open the link, because the destination URL is hidden; but also for those that produce them, if the linked information are sensible (like with our reports), because malicious parties could arrive via brute force to their content (see e.g. https://bit.ly/3d1hCpn and https://bit.ly/2zj9mmo). 
As a consequence of this and previous similar feedback, we decided to develop an in-house service for URL shortening that will be available in our app. The development of an MVP will be the first step of the process.

### Goal

The service will have first of all to tackle the security issues that lead our customers to avoid 3rd party services: our short links will need to be safe to click and scanning our API to get reports of other organization will have to be extremely hard. This will be the priority, on top of which in the future we will be able to add more features.

### Solution

In order to make our links trustworthy, only authenticated users will be able to generate them and only URLs that refer to reports of our app will be accepted. The validation for this will happen on both the front and the back end side.
More problematic will be to avoid that malicious parties will try to access external reports by brute forcing the short URLs. A first line of defense will be to instruct our API gateway to conduct security checks on the incoming request, in particular rate limiting them. Other two strategies could be to allow an expiry date to the validity of the short links as well as a password for it. Finally, the users should be notified on the front-end of the potential risk of leaking their information when using short links.

### MVP

Taking all of this into account, in order to tackle the immediate needs of our customers, the MVP will be made of a simple widget/form to shorten links that will be embedded in our app. On the back-end side, a new micro service with its own API will be created

### Final considerations and possible future development

The reason why our customers decided not to use 3rd party shorteners is security. This is the focus of our solution. For this reason a feature that is popular on other shorteners (e.g. [Bitly](https://bitly.com/) or [Rebrandly](https://www.rebrandly.com/)) like custom short links should be left out as it could make the life easier to ill-intentioned that could use popular and common words in their scraping. At the same time a solution like content-preview of the linked URL becomes useless, since only link to our own product will be allowed. A feature that instead could be expanded in the future is analytics, with statistics viewable on the dashboard of our users on how the links are used.

## Testing

* First,  start the [back end](./back-end).

```npm install npm start``` (see the related [README](./back-end/README.md) for details)

* Then, test the React form component for the [front end](./form-component).

```npm install npm start``` (see the related [README](./form-component/README.md) for details)