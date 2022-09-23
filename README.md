


# <p align = "center"> Shortly Backend </p>

Check project frontend [here](https://github.com/williameiji/shortly-frontend)


##  :clipboard: Description

A url shortener system.

***

## :computer:	 Technologies and Concepts

- REST APIs
- Node.js
- JavaScript
- Postgres
- JsonWebToken
- NanoID
- Bcrypt
- Joi
- Nodemon

***

## :rocket: Routes

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:{
        "name": "Lorem Ips"
        "email": "lorem@gmail.com,
        "password": "lore",
        "passwordRef": "lore"
}
```
    
```yml 
POST /login
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "lore"
    }
```

```yml
POST /urls/shorten (authenticated)
    - Route to add a new url
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "link": "https://remarkable-hackwork.info",
    }
```
    
```yml 
GET /urls/:id 
    - Route to list a url by id
```

```yml
GET /urls/open/:shortUrl
    - Route that redirect the shorten url to original
``` 

```yml
DELETE /urls/:id (authenticated)
    - Route to delete a url
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /users/me (authenticated)
    - Route to list user information and urls
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /ranking
    - Route to list rank
``` 

## 🏁 Running the application

This project was started with the [Express](https://www.npmjs.com/package/express), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.


First, clone this repository on your machine:

```
git clone https://github.com/williameiji/shortly-backend
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server
```
npm start
```
