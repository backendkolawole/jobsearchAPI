# node-jobsearch-api

`node-jobsearch-api` is a job tracker tool that helps you keep track of all your job applications and manage your job search all in one place. It follows a RESTFul API design architecture. For user signup and authentication, it uses `jsonwebtoken` an npm package.

## Motivation
The job search is a daunting endeavor and it's unavoidable. `node_jobsearch_api` is a tool that enables you to follow through with your plan to stay organized, focused and accountable.

## Goal
`node_jobsearch_api` helps you keep track of all your job applications and manage your job search all in one place.

## Usage

## Features

`node-jobsearch-api` is built using Nodejs and Express framework. It follows a RESTFul API design architecture and for user signup and authentication it uses `jsonwebtoken`

`jsonwebtoken` lets you authenticate endpoints using a JSON web token. A JSON Web Token, popularly known as JWT, is an open standard that defines a compact way to share information between a client and a server securely. It is intended to be used to secure RESTful endpoints without sessions.

Unlike the traditional server-side sessions — which save a session ID in memory and return it to the client — this standard creates a self-contained and digitally signed token that is verified each time a request is made.

## ⚙️ Installation

- Open CMD
  
- Change directory to desktop

  `cd desktop`
   
- Clone repository

  `git clone git@github.com:backendkolawole/node-jobsearch-api.git`

- Change the current directory

  `cd node-jobsearch-api`
  
- Install packages

  `npm install`

- Create a .env file in the root directory

  - Set up the `MONGO_URI` variable equal to the DB connection string
  - Set up the `PORT` variable
  - Set up the `JWT_SECRET` variable
 
> [!NOTE]
> `JWT_SECRET` is a string or buffer containing the secret key for verifying the token's signature.

> [!IMPORTANT]
> To avoid port collisions, in the source code, the port value is `3000`

- Run the server

  `npm start`
  
## Authentication Endpoints

**POST [project_url]/api/v1/auth/register**

Call this endpoint to sign up a new user. Use the authentication token in future calls to identify the user.

- Payload
  - name
  - email
  - password

- Possible responses

```
201 (CREATED)

{
    "user": {
        "name": "example name"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNiOWUxMjVlZWE5MDg1Njg2NmI1OGQiLCJuYW1lIjoiZXhhbXBsZSBuYW1lIiwiaWF0IjoxNzA3ODQzMDkwLCJleHAiOjE3MDg3MDcwOTB9.0_10uq1a5PwQ-FOl-mT4Ozu2yUPKVZ1eU1U2tpALq-s"
}

400 (Bad Request)

{
    "msg": "Duplicate value provided for email field. Please provide another value"
}

400 (Bad Request)

{
    "msg": "Please provide username, email and password"
}

```

**POST [project_url]/api/v1/auth/login**

Call this endpoint to log a user in. Use the authentication token in future calls to identify the user.

- Payload
  - email (required)
  - password (required)

- Possible responses

```
200 (OK)

{
    "user": {
        "name": "example name"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNiOWUxMjVlZWE5MDg1Njg2NmI1OGQiLCJuYW1lIjoiZXhhbXBsZSBuYW1lIiwiaWF0IjoxNzA3ODQzMjAxLCJleHAiOjE3MDg3MDcyMDF9.j9x2N9m6PcPCjskWXdcQpmzqJyX6vURGR0fJ23HXnAw"
}

401 (Unauthorized)

{
  "msg": "Invalid credentials"
}

```

## Job endpoints

Use the authentication token to identify the user.

- HTTP Header
  
` Authorization: Bearer 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

Call this endpoint to create a new job

**POST [project_url]/api/v1/jobs**

- Possible responses

```
200 (OK)

{
    "company": "example company",
    "position": "co-owner",
    "status": "pending",
    "createdBy": "65cb9e125eea90856866b58d",
    "_id": "65cb9f845eea90856866b595",
    "createdAt": "2024-02-13T16:57:40.058Z",
    "updatedAt": "2024-02-13T16:57:40.058Z",
    "__v": 0
}

401 (Unauthorized)

{
    "msg": "Invalid credentials"
}

```

Call this endpoint to get all jobs by a user

**GET [project_url]/api/v1/jobs**

- Possible responses

```
200 (OK)

[
    {
        "_id": "65cb9f845eea90856866b595",
        "company": "apple",
        "position": "backend developer",
        "status": "pending",
        "createdBy": "65cb9e125eea90856866b58d",
        "createdAt": "2024-02-13T16:57:40.058Z",
        "updatedAt": "2024-02-13T16:57:40.058Z",
        "__v": 0
    },
    {
        "_id": "65cb9fb85eea90856866b597",
        "company": "radish company",
        "position": "fullstack developer",
        "status": "pending",
        "createdBy": "65cb9e125eea90856866b58d",
        "createdAt": "2024-02-13T16:58:32.567Z",
        "updatedAt": "2024-02-13T16:58:32.567Z",
        "__v": 0
    }
]

401 (Unauthorized)

{
    "msg": "Invalid credentials"
}

```


**GET [project_url]/api/v1/jobs/:id**

Call this endpoint to get a job with a specific id

- Possible responses

```
200 (OK)

{
    "job": {
        "_id": "65cb9f845eea90856866b595",
        "company": "example company",
        "position": "co-owner",
        "status": "pending",
        "createdBy": "65cb9e125eea90856866b58d",
        "createdAt": "2024-02-13T16:57:40.058Z",
        "updatedAt": "2024-02-13T16:57:40.058Z",
        "__v": 0
    }
}

401 (Unauthorized)

{
    "msg": "Invalid credentials"
}

404 (Not Found)

{
    "msg": "No job with id: 65cb9f845eea90856866b594"
}

```


**PATCH [project_url]/api/v1/jobs/:id**

- Possible responses

```
200 (OK)

{
      "_id": "65cb9f845eea90856866b595",
      "company": "example company updated",
      "position": "co-owner",
      "status": "pending",
      "createdBy": "65cb9e125eea90856866b58d",
      "createdAt": "2024-02-13T16:57:40.058Z",
      "updatedAt": "2024-02-13T16:57:40.058Z",
      "__v": 0
    
}

401 (Unauthorized)

{
    "msg": "Invalid credentials"
}

404 (Not Found)

{
    "msg": "No job with id: 65cb9f845eea90856866b594"
}
```

Call this endpoint to delete a job with a specific id

**DELETE [project_url]/api/v1/jobs/:id**

- Possible responses

```
204 (No Content)


401 (Unauthorized)

{
    "msg": "Invalid credentials"
}

404 (Not Found)

{
    "msg": "No job with id: 65cb9f845eea90856866b594"
}
```
  


