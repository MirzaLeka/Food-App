## Food App

Food App is a fictional representation of life like food order App. 

#### *Key features*
Please keep in mind that this is an alpha version of the app. It's an app I learned Angular on, so you will come across a lot of
code that lacks polish, not finished features or not implemented ones.
* Fetching cpmpanies from database and presenting them on UI
* Search, Filter, Sort and Paginate through companies
* Geolocation queries
* Create, Update, Delete User, Company (restaurant) and Order *(only with Postman)*
* User authentication and authorization *(only with Postman)*
* Upload scalable images *(only with Postman)*


#### *Future Milestones*
* Finished client side
* Authentication on client side
* Email notifications
* Support tickets
* Cached queries (Redis)
* 3-Tier Architecture (BLL, DAL, DTO)
* More...


#### *Stack*
Food App is built on popular **MEAN** stack.
```
# Frontend:
- HTML                  - CSS                  - Sass
- Javascript            - EcmaScript6+         - Angular / Rx.js
# Backend: 
- NodeJS                - ExpressJS
# Database:
- MongoDB               - Mongoose             - AWS S3
# Other modules:         
- Validator             - Moment               - Multer      
- JWT                   - BcryptJS             - Axios
# Testing
- Jasmine 
# Development environment:
- Visual Studio Code    - Postman
- Mlab                  - Robo3T
- Circle CI             - AWS SDK
``` 

#### *How App Works So Far*
There are three type of users in Food App. 

First there is a Customer. Customer is a person looking for food to order. Customer can look up companies and make orders.

Then there are Owners. These users can own companies, update and delete their own and update their user profile.

Finally there is an Admin user. Admin can terminate any user or company, demote or promote users and share all other privileges
with Owners.


When creating a company, Owner provides company name, email address, phone number and street address. Other details like description,
work hours, order hours, avatar are not mandatory fields. 

Each company also includes a list of cuisines, commonly described as categories. Each cuisine contains a list of food products that
relate to it.
In short, to add a product,you need a company and cuisine.


Each time you add new cuisine, Cuisines List table is updated with new item and users can see list of cuisines inside sidebar on UI.
Of course cuisines are not unique, so many companies can sell same type of cuisine. That's why what UI see on UI is a distinct 
selection of all cuisines that are in Cuisines List table.

Every time user clicks on one of the cuisines, it launches a service searches for companies containing picked (marked) cuisines. 


As for food products, whenever new product is added to a cuisine, it's also added to Trending Items table. These can be see on UI,
under trending section. Unlike with cuisines, trending items on UI are not unique, but rather random. Query returns 4 random items
from Trending Items table and user can cycle through these items.

When you click on Trending Item, it will take you on page of that company and (one day), also add that item into your cart for 
that company.


There is also a company rating feature. For now this is feature is used only for sorting. Every rating is generated random number.


#### *Dive in*:

```
# Install dependencies
  npm i
  
# Setup config
  Place config.json file in "server/config" folder. Please don't share that file with anyone.

# Run build
  npm run build

# Run Express server (port 3000)
  npm run serv

# Run Angular server (port 4200)
  npm run dev

# Prerequisites: 
  NodeJS must be installed on your pc
```

I'm open to all kind of feedback. If you have any suggestions for improvements, please let me know.
