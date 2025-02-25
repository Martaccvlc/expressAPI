# Express API - Image Resizing Service

## Description

This is a REST API developed in Node with TypeScript that offers image processing services. The API allows the creation of tasks to generate image variants in specific resolutions and query the status and details of these tasks, including an associated price.

## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB
- Docker
- Sharp
- Multer
- Swagger/OpenAPI
- Dotenv
- Morgan
- Jest

## API Documentation

The full API documentation is available at `/api-docs` once the server is running.

## Endpoints

### 1. Create Image Processing Task

- **Method**: POST
- **Endpoint**: `/api/images/tasks`
- **Description**: Creates an image processing task.
- **Parameters**:
  - `image`: Image file to be processed (form-data)
- **Response**:
  ```json
  {
    "taskId": "65d4a54b89c5e342b2c2c5f6",
    "status": "pending",
    "price": 25.5
  }
  ```

### 2. Get Image Processing Task

- **Method**: GET
- **Endpoint**: `/api/images/tasks/:taskId`
- **Description**: Returns the status, price, and results of an image processing task.
- **Response**:
  ```json
  {
    "taskId": "65d4a54b89c5e342b2c2c5f6",
    "status": "completed",
    "price": 25.5,
    "images": [
      {
        "resolution": "1024",
        "path": "/output/image1/1024/f322b730b287.jpg"
      },
      {
        "resolution": "800",
        "path": "/output/image1/800/202fd8b3174.jpg"
      }
    ]
  }
  ```

## Execution

### Step 1: Clone the repository

```sh
git clone <repo-url>
cd imageprocessingapi
```

### Step 3: Configure Environment Variables

Ensure you have a `.env` file in the root of the project with the variables in .env.example

### Step 4: Run the application using Docker

Start the application and MongoDB using Docker Compose:
```sh
docker-compose up --build
```

### Step 5: Access the application

The application will be running at `http://localhost:(port assigned)` and the API documentation will be available at `/api-docs`.

### Step 6: Run the tests

To run the tests, use the following command:
Save an example image: test-image.jpg and then execute the command.
```sh
npm run test
```

## Notes

- The API uses `multer` to handle file uploads and `sharp` for image processing.
- It is recommended to use tools like [Postman](https://www.postman.com/) to test the API endpoints.
- The application is configured to save processed images in the `output` directory.
- Logs of all HTTP requests are saved using `morgan` in the `logs/access.log` file.
