 # README

 ## Overview

Todo App is a simple, user-friendly application built using React, TypeScript, Chakra UI, React Query, and Node.js with Express and SQLite. The application has two main components: a frontend user interface and a backend API.

The frontend, built with React, enables users to efficiently manage tasks by adding, removing, and editing them. It incorporates drag and drop functionality and displays the task list using the Chakra UI library.

The backend, built with Node.js and Express, provides RESTful APIs that facilitate communication with the frontend. SQLite serves as the database, storing tasks and their associated details.

React Query simplifies the frontend-backend communication process by handling data fetching and caching.
## Features

The frontend app boasts the following features:
- Adding new tasks to the list
- Marking tasks as complete
- Deleting tasks from the list
- Editing existing task names
- Dragging and dropping tasks to rearrange their order
## Setup

To run the app, follow these steps: 
1. Install Node.js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 
2. Install Yarn from [https://classic.yarnpkg.com/en/docs/install/#mac-stable](https://classic.yarnpkg.com/en/docs/install/#mac-stable) 
3. Install dependencies by running `yarn install` 
4. Start the app with `yarn start`

The app should now be accessible at [http://localhost:3000/](http://localhost:3000/) .
## Backend

The backend consists of a REST API built using Node.js, Express, and Knex for SQLite database interactions.
### Setup

To set up the backend: 
1. Install Node.js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 
2. Install dependencies by running `yarn install` 
3. Start the server with `yarn start`

The API should now be accessible at [http://localhost:5000/](http://localhost:5000/) .
### API Documentation

The API offers the following endpoints: 
- GET `/tasks`: Retrieves a list of all tasks 
- POST `/tasks`: Creates a new task 
- PUT `/tasks`: Reorders the task list 
- PUT `/tasks/:id`: Updates a task with a specified ID 
- DELETE `/tasks/:id`: Deletes a task with a specified ID

### `GET /tasks`

This endpoint returns a list of all tasks in the database. The response body is an object with a single property, `todos`, which is an array of task objects. Each task object has the following properties: 
- `id` (number): The ID of the task. 
- `name` (string): The name of the task. 
- `completed` (boolean): Whether or not the task is completed. 
- `sort` (number): The position of the task in the list.

Example response:

```json

{
  "todos": [
    {
      "id": 1,
      "name": "Task 1",
      "completed": false,
      "sort": 1
    },
    {
      "id": 2,
      "name": "Task 2",
      "completed": true,
      "sort": 2
    }
  ]
}
```

### `POST /tasks`

This endpoint creates a new task with the specified name. The request body should be a JSON object with a single property, `name`, which is a string containing the name of the new task. The response body is an object with a single property, `todo`, which is the newly created task object.

Example request:

```json

{
  "name": "New task"
}
```



Example response:

```json

{
  "todo": {
    "id": 3,
    "name": "New task",
    "completed": false,
    "sort": 3
  }
}
```


### `PUT /tasks/:id`

This endpoint updates an existing task with the specified ID. The request body should be a JSON object containing one or more properties to update. Only the properties that are specified in the request body will be updated; unspecified properties will be left unchanged. The response body is an object with a single property, `task`, which is the updated task object.

Example request:

```json

{
  "name": "Updated task name",
  "completed": true
}
```



Example response:

```json

{
  "task": {
    "id": 3,
    "name": "Updated task name",
    "completed": true,
    "sort": 3
  }
}
```


### `DELETE /tasks/:id`

This endpoint deletes the task with the specified ID. The response body is an object with a single property, `message`, which is a string indicating that the task was deleted.

Example response:

```json

{
  "message": "Task with id 3 deleted"
}
```


### `PUT /tasks`

This endpoint reorders the tasks in the list. The request body should be a JSON object with a single property, `todos`, which is an array of task objects in their new order. The response body is an object with a single property, `message`, which is a string indicating that the tasks were reordered successfully.

Example request:

```json

{
  "todos": [
    {
      "id": 2,
      "name": "Task 2",
      "completed": true,
      "sort": 1
    },
    {
      "id": 1,
      "name": "Task 1",
      "completed": false,
      "sort": 2
    }
  ]
}
```

Example response:

```json

{
  "message": "Tasks reordered successfully"
}
```
## Testing

The app features unit tests for both frontend and backend components. Frontend tests utilize Jest and React Testing Library, while backend tests employ Jest and Supertest.

To run the tests, use the command `yarn test`. The tests will automatically execute and generate a report detailing the number of passed and failed tests, as well as any error messages or stack traces.

## Future Iterations

Areas for improvement include:
- Mobile responsiveness: Enhancing layout optimization for smaller screens and adding support for touch interactions.
- Theming: Allowing users to switch themes for increased customization.
- Filtering: Enabling task filtering by state to provide a clearer view of progress.
- Integration testing: Writing tests to ensure seamless frontend-backend cooperation and accurate data transfer.
- Accessibility: Improving the app's usability for individuals with disabilities by adding alternative text to images, enhancing keyboard navigation, and ensuring compatibility with screen readers.
- More comprehensive unit tests
- More error handling

Given additional time, these improvements would be prioritized to create a more robust and user-friendly application.

## Screenshot

<img width="1725" alt="Screenshot 2023-04-26 at 6 19 30 AM" src="https://user-images.githubusercontent.com/25768124/234476623-b2af4520-b394-4ccf-a30e-793ed4d7c1d3.png">