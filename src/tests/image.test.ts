import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import app from '../index';
import Task from '../models/task.model';
import Image from '../models/image.model';
import { request } from 'http';


// We create a test DB to not interact with the other one.
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/image-resizing-test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Image Resizing API', () => {
  it('should create a task and return taskId, status, and price', async () => {
    const filePath = path.join(__dirname, 'test-image.jpg');
    const response = await request(app)
      .post('/api/images/tasks')
      .attach('image', fs.readFileSync(filePath), 'test-image.jpg');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('taskId');
    expect(response.body).toHaveProperty('status', 'pending');
    expect(response.body).toHaveProperty('price');
  });

  it('should get the status, price, and images of a task', async () => {
    const task = new Task({
      status: 'completed',
      price: 25.5,
      originalPath: '/input/test-image.jpg'
    });
    await task.save();

    const image1 = new Image({
      resolution: '1024',
      path: '/output/test-image/1024/test-image.jpg',
      taskId: task._id
    });
    const image2 = new Image({
      resolution: '800',
      path: '/output/test-image/800/test-image.jpg',
      taskId: task._id
    });

    await image1.save();
    await image2.save();

    const response = await request(app).get(`/api/images/tasks/${task._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('taskId');
    expect(response.body).toHaveProperty('status', 'completed');
    expect(response.body).toHaveProperty('price', 25.5);
    expect(response.body).toHaveProperty('images');
    expect(response.body.images).toHaveLength(2);
  });

  it('should return 404 for a non-existent task', async () => {
    const nonExistentTaskId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/images/tasks/${nonExistentTaskId}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Task not found.');
  });
});

function afterAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}
function beforeAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

