# WatchIt API

This repository contains the backend REST API for the **WatchIt** mobile application.

**WatchIt** is a personal learning project built during my studies, designed to explore clean architecture, TypeScript, and modern full-stack practices. The purpose of this project is educational, not commercial.  
The code is shared for demonstration purposes only and should not be reused in other projects.

---

## Overview

This API provides data and functionalities for the WatchIt mobile app, including:

- User authentication
- Movie browsing via TMDB
- Watchlist and rating features
- Data persistence and caching

It follows clean architecture principles and includes structured DTOs, middleware, and modular design.

The mobile application can be found here:  
👉 https://github.com/MaximeBiechy/watchit-mobile-app

---

## Features

- JWT-based authentication
- TMDB API integration
- MongoDB storage via Mongoose
- Partial Jest test coverage
- OpenAPI auto-generated documentation
- Error tracking with Sentry
- Docker 

---

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT**
- **Sentry**
- **TMDB API**
- **Docker**
- **Jest**

---

## Installation

You will need **Docker** installed locally.

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Usage

- You can access the API at `http://localhost:3000/api/v1/`.
- You can also access the documentation at `http://localhost:3000/api-docs`.

---

 ## Notes

⚠️ This project is not fully complete, but the core features are functional.  
It may evolve further over time, as additional features could still be developed.<br>
⚠️ The app has not been tested on iOS.<br>
⚠️ This backend was developed as a learning project.<br>  
⚠️ Code is provided for demonstration purposes only and is not intended for reuse.
