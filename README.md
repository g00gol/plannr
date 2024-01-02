# React Client

The client is built with React + Vite + Typescript. It also uses TailwindCSS.

## First installation and setup

### 1. Install all required modules

```bash
$ npm i
```

### 2. Run the app using node

```bash
$ npm run dev
```

# FastAPI Python Server

This project's server is built in FastAPI with Python. Please see http://localhost:8000/docs for more info about the API.

## First installation and setup

### 1. Install all required modules

```bash
$ pip install -r requirements.txt
```

### 2. Run the app using uvicorn

```bash
$ python main.py
```

### 3. View

You can find API docs in browser at http://localhost:8000/docs

# Running with Docker

This project is also set up with Docker. It runs an instance with the client, server, and MongoDB. Please note that the MongoDB will not have data from your local machine.

## Note: Please make sure Docker is correctly installed on your computer.

### 1. To run, simply run:

```bash
$ docker-compose up --build
```
