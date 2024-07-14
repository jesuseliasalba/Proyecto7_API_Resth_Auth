# Project 7: Api Rest Auth

## _Rock The Code_

## Description

This project is a shop management web application built with Node.js and Express. It provides functionalities for managing users, products and shopping carts. The database used is mongoDB.

## Index:

- [Scripts](#Scripts)
- [Structure](#Structure)
- [Environmental Variables](#ENV)
- [Dependencies](#Dependencies)
- [Contact](#Contact)

## Scripts:

To start the api in normal operation:

```
npm run start
```

To start the API in developer mode and restart the API with every change:

```
npm run dev
```

And the last script we have is to be able to insert a data seed in our database:

```
npm run seed
```

> [!CAUTION]
> Beware that this last script deletes everything in the database.

## Structure

```
Proyecto7_API_Rest_Auth
├─ .gitignore
├─ index.js
├─ Insomnia_QuerysProject7.json
├─ package-lock.json
├─ package.json
└─ src
   ├─ api
   │  ├─ controllers
   │  │  ├─ cart.js
   │  │  ├─ product.js
   │  │  └─ user.js
   │  ├─ models
   │  │  ├─ cart.js
   │  │  ├─ product.js
   │  │  └─ user.js
   │  └─ routes
   │     ├─ cart.js
   │     ├─ product.js
   │     └─ user.js
   ├─ config
   │  ├─ db.js
   │  └─ jwt.js
   ├─ data
   │  └─ products-seed.js
   ├─ middlewares
   │  └─ auth.js
   └─ utils
      └─ seeds
         └─ products.js

```

### index.js

This file is the entry point of the application. It configures and starts the server, connects to the database and defines routes for users, products and carts. It handles global errors and listens on port 3000.

### Routes

#### User (`user.js`)

- `POST /register` - Register a new user.
- `POST /login` - Log in.
- `GET /me` - Obtain authenticated user information.
- `GET /` - List all users (for administrators only).
- `PUT /:id` - Update a user by ID (for administrators only).
- `PUT /` - Update the authenticated user itself.
- `DELETE /:id` - Delete a user by ID (for administrators only).
- `DELETE /` - Delete the authenticated user himself.

#### Cart (`cart.js`)

- `POST /create` - Create a new cart (for administrators only).
- `GET /all` - List all carts (for administrators only).
- `GET /` - List the cart of the authenticated user.
- `PUT /:id` - Update a cart by ID (for administrators only).
- `DELETE /:id` - Delete a cart by ID (for administrators only).

#### Product (`product.js`)

- `POST /create` - Create a new product (for administrators only).
- `GET /` - List all products (requires authentication).
- `PUT /:id` - Update a product by ID (for administrators only).
- `DELETE /:id` - Delete a product by ID (for administrators only).

### Configuration

#### JSON Web Token (`jwt.js`)

- `generateSign` - Generate a JWT token.
- `verifyJwt` - Verifies a JWT token.

#### Middleware (`auth.js`)

- `isAuth` - Middleware to verify if the user is authenticated.
- `isAdmin` - Middleware to verify if the user is an administrator.

## ENV

Make sure to create an `.env` file in the root of the project with the following environment variables:

- `DB_URL=` - With the URL of your database in MongoDB.
- `JWT_SIGN` - Here is your key for generating and verifying tokens.

## Insomnia

The `Insomnia_QuerysProject7.json` file contains all the requests that can be made to our API.

## Dependencies

- Node.js
- Express
- Dotenv
- Bcrypt
- Jsonwebtoken
- Mongoose

## Contact:

| [**Jesus Elias Alba**](http://instagram.com/jesuseliasalba) |
| :---------------------------------------------------------: |
