# konnect
Kong take home assignment

# Designs and Tradeoffs
This project uses three techonologies from the MERN stack: MongoDB, Express.js, and Node.js. They are all open source and robust technologies that enbale fast development of full-stack applications. The code base uses MVC (model, view, controller) design pattern. 

Instead of SQL database, I opted in using NoSQL, document based MongoDB because it stores data in binary json format and is highly scalable in comparion to SQL database.

I created two data models, one for service catalog and one for detailed info on a specific service. And to better focus on the core part of the application, I excluded company info from the data model. 

Ideally, the change in Service data model should result in a change in Catalog data model since they are correlated. However, for simplicity, this also is excluded from the project.

I do not use more complicated API pagenation methods like [bucket pattern](https://www.mongodb.com/blog/post/paging-with-the-bucket-pattern--part-1) because the db will not have millions of rows of data. So a straightforward limit and skip will suffice here.


# Assumptions
* Service name and ID are unique
* The caller passes correct query string, parameters, and input in the body of the request
* The endpoint only return one company's service data

# Supported Features
* Have health check endpoint
* Return a full list of services 
* Return a specific service by `:serviceID`
* Search and filter the list by keyword, not case sensitive
* Support pagination by `limit` and `skip`
* Sort the list by user specified `:field_name` in either asc or desc order
* Fetch details of a specific service, including its different versions and endpoint
* Support CRUD on catalog.js and CR on service.js


