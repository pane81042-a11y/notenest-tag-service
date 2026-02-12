# NoteNest Tag Service

The Tag Service is a serverless microservice responsible for managing tags in the NoteNest application.

It exposes a RESTful API that allows clients to create, retrieve, list, and delete tags. The service is fully independent and follows a microservice architecture pattern.

---

## Overview

Each tag contains:

- A unique ID (UUID)
- A name
- A creation timestamp

All data is stored in Amazon DynamoDB and accessed through AWS Lambda via API Gateway.

This service is designed to be lightweight, scalable, and isolated from other services in the system.

---

## Tech Stack

- Node.js 18
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Serverless Framework

---

## API Endpoints

- `POST /tags` — Create a tag  
- `GET /tags` — Retrieve all tags  
- `GET /tags/{id}` — Retrieve a specific tag  
- `DELETE /tags/{id}` — Delete a tag  

All responses are returned in JSON format.

---

## Architecture

The Tag Service is part of the NoteNest distributed system.  
It handles only tag-related operations and maintains separation of concerns from the Note Service.

This design allows independent scaling, deployment, and future expansion.

---

## License

MIT