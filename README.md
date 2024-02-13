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

> [!IMPORTANT]
> To avoid port collisions, in the source code, the port value is `3000`

- Run the server

  `npm start`
  
## Authentication Endpoints

**POST [project_url]/auth/register**

Call this endpoint to sign up a new user. Use the authentication token in future calls to identify the user.

- Payload
  - name
  - email
  - password

- Possible responses

```
200 (OK)

{
  "msg": "User already exists. Please try logging in"
}

400 (Bad Request)

{
  "msg": "Please provide username and password"
}

201 (CREATED)

{
  "user": "username",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM2NGNlN2FkYWJlYjk4Njk4ZGZhMTQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzA3NDk0NjMyfQ.35BE1hUYA2lY3z2JOn90emY064_B3wphSl-ULW02pvc"
}
```

**POST [project_url]/auth/login**

Call this endpoint to log a user in. Use the authentication token in future calls to identify the user.

- Payload
  - email (required)
  - password (required)

- Possible responses

```
200 (OK)

{
    "user": "newuser1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM5ZTZlMmFmYTRiZDJlMjI3MGQxNWMiLCJ1c2VybmFtZSI6Im5ld3VzZXIxIiwiaWF0IjoxNzA3NzMxMTI1fQ.zXO66OjcuzE7-hG_iNOJm0khJ-YasGqxRPG9O3N3-80"
}

401 (Unauthorized)

{
    "msg": "Please provide username and password"
}

404 (Not Found)

{
    "username": "jhdfhsdf",
    "password": "password"
}

```

## Job endpoints

Use the authentication token to identify the user.

- HTTP Header
  
` Authorization: Bearer 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

Call this endpoint to create a new job

**POST [project_url]/jobs**

- Possible responses

```

```

Call this endpoint to get all jobs by a user

**GET [project_url]/jobs**

- Possible responses

```
```

Call this endpoint to get all jobs with a specific id

**GET [project_url]/jobs/:id**

- Possible responses

```
```

Call this endpoint to get a job with a specific id

**PATCH [project_url]/jobs/:id**

- Possible responses

  ```
  ```

Call this endpoint to delete a job with a specific id

**DELETE [project_url]/jobs/:id**

- Possible responses

  ```
  ```
  


