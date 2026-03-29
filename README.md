# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.js.

## Description

This is a simple task management API that allows you to create, read, update, and delete tasks. The API follows RESTful conventions and uses JSON for request and response payloads.

### Prerequisites

Make sure you have the following installed on your system:
- Node.js (v12 or higher)
- npm (Node Package Manager)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager-api-VidyaSandeep
```

2. Install dependencies:
```bash
npm install
```

3. The project structure:
```
task-manager-api-VidyaSandeep/
├── app.js
├── package.json
├── task.json
├── README.md
└── test/
    ├── server.test.js
    ├── controllers/
    │   └── tasksController.js
    ├── middlewares/
    ├── models/
    │   └── tasksModel.js
    └── routes/
        └── tasksRoute.js
```

## Running the Server

Start the development server:

```bash
npm start
```

or

```bash
node app.js
```

The server will start on `http://localhost:3000`

## API Endpoints

All endpoints are prefixed with `/api/v1/tasks`

### Base URL
```
http://localhost:3000/api/v1/tasks
```

### 1. Get All Tasks
- **Endpoint:** `GET /api/v1/tasks`
- **Description:** Retrieve all tasks, with optional filtering by completion status and sorted by creation date
- **Query Parameters (Optional):**
  - `completed=true` - Get only completed tasks
  - `completed=false` - Get only incomplete tasks
- **Response:** `200 OK`
- **Examples (Postman):**
  - Get all tasks: `http://localhost:3000/api/v1/tasks`
  - Get completed tasks: `http://localhost:3000/api/v1/tasks?completed=true`
  - Get incomplete tasks: `http://localhost:3000/api/v1/tasks?completed=false`

### 2. Get Task by ID
- **Endpoint:** `GET /api/v1/tasks/:id`
- **Description:** Retrieve a specific task by its ID
- **Parameters:** 
  - `id` (path parameter) - Task ID
- **Response:** `200 OK` or `404 Not Found`
- **Example (Postman):**
  1. Create a new GET request
  2. Enter URL: `http://localhost:3000/api/v1/tasks/1`
  3. Click Send

### 3. Create a Task
- **Endpoint:** `POST /api/v1/tasks`
- **Description:** Create a new task
- **Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "priority": "medium"
}
```
- **Response:** `201 Created` or `400 Bad Request`
- **Example (Postman):**
  1. Create a new POST request
  2. Enter URL: `http://localhost:3000/api/v1/tasks`
  3. Go to Body tab, select raw, and choose JSON format
  4. Paste the request body above
  5. Click Send

### 4. Update a Task
- **Endpoint:** `PUT /api/v1/tasks/:id`
- **Description:** Update an existing task
- **Parameters:** 
  - `id` (path parameter) - Task ID
- **Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true,
  "priority": "high"
}
```
- **Response:** `200 OK`, `400 Bad Request`, or `404 Not Found`
- **Example (Postman):**
  1. Create a new PUT request
  2. Enter URL: `http://localhost:3000/api/v1/tasks/1`
  3. Go to Body tab, select raw, and choose JSON format
  4. Paste the request body above
  5. Click Send

### 5. Delete a Task
- **Endpoint:** `DELETE /api/v1/tasks/:id`
- **Description:** Delete a task
- **Parameters:** 
  - `id` (path parameter) - Task ID
- **Response:** `200 OK` or `404 Not Found`
- **Example (Postman):**
  1. Create a new DELETE request
  2. Enter URL: `http://localhost:3000/api/v1/tasks/1`
  3. Click Send

### 6. Get Tasks by Priority Level
- **Endpoint:** `GET /api/v1/tasks/priority/:level`
- **Description:** Retrieve all tasks with a specific priority level, sorted by creation date
- **Parameters:** 
  - `level` (path parameter) - Priority level: `low`, `medium`, or `high`
- **Response:** `200 OK` or `400 Bad Request`
- **Examples (Postman):**
  - Get high priority tasks: `http://localhost:3000/api/v1/tasks/priority/high`
  - Get medium priority tasks: `http://localhost:3000/api/v1/tasks/priority/medium`
  - Get low priority tasks: `http://localhost:3000/api/v1/tasks/priority/low`

**Example Response:**
```json
{
  "message": "Tasks with high priority",
  "count": 2,
  "tasks": [
    {
      "id": 1,
      "title": "Create a new project for developing a web application",
      "description": "Create a new project using Nodejs and Express",
      "completed": true,
      "priority": "high",
      "createdAt": "2026-03-01T00:00:00.000Z"
    },
    {
      "id": 4,
      "title": "Create a new project for developing a web application",
      "description": "Create a new project using Vue.js",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-03-15T00:00:00.000Z"
    }
  ]
}
```

The API implements comprehensive input validation and error handling:

## Input Validation & Error Handling

The API implements comprehensive input validation and error handling:

### Priority Levels

Tasks can have one of three priority levels:
- **low** - Low priority task
- **medium** - Medium priority task (default if not specified)
- **high** - High priority task

### Filtering and Sorting

**Filtering by Completion Status:**
- Use query parameter `?completed=true` to get only completed tasks
- Use query parameter `?completed=false` to get only incomplete tasks
- Omit the parameter to get all tasks

**Sorting:**
- All tasks are automatically sorted by creation date (oldest first)
- This applies to GET /tasks and GET /tasks/priority/:level endpoints

### Validation Rules

#### For Creating Tasks (POST /api/v1/tasks)

- **Title:** Required field, must be a non-empty string
- **Description:** Required field, must be a non-empty string
- **Completed:** Optional field, must be a boolean value (true/false), defaults to false
- **Priority:** Optional field, must be one of: low, medium, high; defaults to medium

#### For Updating Tasks (PUT /api/v1/tasks/:id)

- At least one field (title, description, completed, or priority) must be provided
- **Title:** If provided, must be a non-empty string
- **Description:** If provided, must be a non-empty string
- **Completed:** If provided, must be a boolean value (true/false)
- **Priority:** If provided, must be one of: low, medium, high

### Error Responses

#### 400 Bad Request
Returned when input validation fails:
```json
{
  "error": "Invalid input",
  "details": [
    "Title is required and must be a non-empty string",
    "Description is required and must be a non-empty string",
    "Completed status must be a boolean value (true or false)"
  ]
}
```

#### 404 Not Found
Returned when trying to access, update, or delete a non-existent task:
```json
{
  "error": "Task not found"
}
```

### Example Invalid Requests (Testing in Postman)

**Invalid POST Request (Missing Fields):**
- URL: `http://localhost:3000/api/v1/tasks`
- Method: POST
- Body:
```json
{
  "title": "Task Title"
}
```
- Response: 400 Bad Request (description is required)

**Invalid POST Request (Non-Boolean Completed):**
- URL: `http://localhost:3000/api/v1/tasks`
- Method: POST
- Body:
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": "yes"
}
```
- Response: 400 Bad Request (completed must be boolean)

**Invalid GET Request (Non-Existent Task):**
- URL: `http://localhost:3000/api/v1/tasks/999`
- Method: GET
- Response: 404 Not Found

## Running Tests

Run the test suite using tap:

```bash
npm test
```

This will execute all tests in the `test/server.test.js` file.

### Test Coverage

The test suite includes:
- POST /tasks - Create a new task
- POST /tasks with invalid data - Validation testing
- GET /tasks - Retrieve all tasks
- GET /tasks/:id - Retrieve a task by ID
- GET /tasks/:id with invalid id - Error handling
- PUT /tasks/:id - Update a task
- PUT /tasks/:id with invalid id - Error handling
- PUT /tasks/:id with invalid data - Validation testing
- DELETE /tasks/:id - Delete a task
- DELETE /tasks/:id with invalid id - Error handling

## Project Structure

- **app.js** - Main application file with Express setup and server configuration
- **test/controllers/tasksController.js** - Controller functions for handling task operations
- **test/routes/tasksRoute.js** - Route definitions for task endpoints
- **test/models/tasksModel.js** - Data model for tasks
- **test/server.test.js** - Test suite with tap tests
- **test/middlewares/** - Directory for middleware functions
- **task.json** - Task data file
- **package.json** - Project dependencies and scripts

## Dependencies

- **express** - Web framework for Node.js
- **supertest** - HTTP assertion library for testing
- **tap** - Test framework

## Configuration

- **Port:** 3000
- **API Version:** v1
- **Base Route:** /api/v1/tasks

## Response Formats

### Success Response
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "priority": "medium",
  "createdAt": "2026-03-15T00:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Status Codes

- **200 OK** - Request succeeded
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid request data
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

## License

This project is part of Airtribe Assignments.

## Author

Vidya Sandeep

## Contributing

For bug reports or suggestions, please check the project repository.
