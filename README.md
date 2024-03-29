# konnect
Kong take home assignment

[Demo](https://youtu.be/tIuvxtTes_0)

# Designs and Tradeoffs
This project uses three techonologies from the MERN stack: MongoDB, Express.js, and Node.js. They are all open source and robust technologies that enbale fast development of full-stack applications. The code base uses MVC (model, view, controller) design pattern. 

Instead of SQL database, I opted in using NoSQL, document based MongoDB because it stores data in binary json format and is highly scalable in comparion to SQL database.

I created two data models. Frist one is Catalog for storing a list of high-level info on services and this can be used to populate the catalog page. The second one is called Service. It stores detailed info such as specific version and endpoint for one service. And to better focus on the core part of the application, I excluded company info from the data model. 

Ideally, the change in Service data model should result in a change in Catalog data model since they are correlated. However, for simplicity, this also is excluded from the project.

I do not use more complicated API pagenation methods like [bucket pattern](https://www.mongodb.com/blog/post/paging-with-the-bucket-pattern--part-1) because the db will not have millions of rows of data. So a straightforward limit and skip will suffice here.


# Assumptions
* Service name and ID are unique
* The caller passes correct query string, parameters, and input in the body of the request
* The endpoint only return one company's service data


# Test Plan
The test plan contains both unit and integration tests. 

### Unit Test
* Use `Jest` as the test framework [Jest with MongoDB](https://jestjs.io/docs/mongodb)
* Use MongoDB Memory Server since it provides the option to store data in memeory so that it does mess up the actual database

Tests catalog.js and service.js functions. Some examples below:
-  POST a new service into Catalog and checks that all fields are defined
- POST a new servie into the Catalog with malformatted body and the service should throw proper error code and messages
- GET the inserted services and check all fields are defined. Also check the validity of its JSON format
- GET by search query string and the count of returned items should match expected count
- GET serviecs by sorting the creationTime and verify that creationTime is sorted in client specified order

### Integretation Test
* Create test collections in the cloud
* Set up [runscope](https://www.runscope.com/) tests
* Test e2e scenerios mentioned in unit tests

# Run Service
The service is not deployed anywhere and follow below steps to run locally.

### Prerequisite:
1. Node.js `V12.8.4` or above
2. MongoDB `v5.0.2`

### Steps
1. Git clone `https://github.com/danielwzn/konnect.git`
2. `npm install`
3. `npm run dev` and by default the service will run on localhost:3000
4. Use POST localhost:5000/catalog/ and POST localhost:5000/service/ to populate the db with service data first before trying out other endpoints

# Supported Features
* Have health check endpoint
* Return a full list of services 
* Return a specific service by `:serviceID`
* Search and filter the list by keyword, not case sensitive
* Support pagination by `limit` and `skip`
* Sort the list by user specified `:field_name` in either asc or desc order
* Fetch details of a specific service, including its different versions and endpoint
* Support CRUD on catalog.js and CR on service.js

# Endpoints
This section contains endpoints for both catalog.js and service.js routes

### Catalog.js Routes
* GET localhost:PORT/catalog/health
* GET localhost:PORT/catalog/
* GET localhost:PORT/catalog/:seriveId
* GET localhost:PORT/catalog/services/search?q=
* GET localhost:PORT/catalog/services/sort?key=&order=
* GET localhost:PORT/catalog/services/page?skip=&limit=
* GET localhost:PORT/catalog/
* POST localhost:PORT/catalog/
* PATCH localhost:PORT/catalog/:serviceId
* DELETE localhost:PORT/catalog/:serviceId

### Service.js Routes
* GET localhost:PORT/service/health
* GET localhost:PORT/service/
* GET localhost:PORT/service/:serviceId
* GET localhost:PORT/service/:serviceId/:version
* POST localhost:PORT/service/






