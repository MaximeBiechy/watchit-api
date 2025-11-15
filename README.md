# WatchIt

**WatchIt** is a mobile app that allows users to browse movies, create custom lists, and rate films they wish to track or review later. This project was developed during my studies as a way to explore mobile and backend development while implementing modern and clean code practices.

The purpose of this app was educational, not commercial. It is not intended for app stores and has only been tested on Android devices. The code in this repository is provided for demonstration purposes and should not be reused in other projects.

# API

This repository contains the backend REST API for the WatchIt mobile application.

## Project Overview

The API is built with Node.js, Express, and MongoDB, using TypeScript and clean architecture principles. It provides authentication, movie browsing, list management, rating and other essential data for the mobile app.

The repository accompanying this API is the front-end mobile app:  
👉 https://github.com/MaximeBiechy/watchit-mobile-app

## Features

- JWT-based authentication
- TMDB API integration for movie data
- MongoDB data persistence via Mongoose
- Partial Jest test coverage
- OpenAPI for documentation
- Docker support
- Error logging with Sentry

## Tech Stack

- Node.js, Express
- TypeScript
- MongoDB + Mongoose
- JWT, Sentry, TMDB API
- Docker
- Jest (tests)

⚠️ The app has not been tested on iOS.  
⚠️ Code is intended for demonstration purposes only.

## Installation

For development, you will need [Docker](https://www.docker.com/) installed on your machine.
```bash
  docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

---
## Commands

---

## Usage

- You can access the API at `http://localhost:3000/api/v1/`.
- You can also access the documentation at `http://localhost:3000/api-docs`.

---
