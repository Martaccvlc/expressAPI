import { Request, Response } from 'express';
import sharp from 'sharp';
import crypto from 'crypto';
import Task from '../models/image.model';
import Image from '../models/task.model';

const resolutions = [1024, 800];

export const createTask = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2));
    const task = new Task({
      status: 'pending',
      price,
      originalPath: req.file.path
    });
    
    await task.save();

    processImage(req.file.buffer, req.file.mimetype, task._id);

    res.status(201).send({ taskId: task._id, status: task.status, price: task.price });
  } catch (error) {
    res.status(500).send('Server error.');
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('images');
    if (!task) {
      return res.status(404).send('Task not found.');
    }

    const response = {
      taskId: task._id,
      status: task.status,
      price: task.price,
      images: task.status === 'completed' ? await Image.find({ taskId: task._id }) : undefined
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Server error.');
  }
};

const processImage = async (buffer: Buffer, contentType: string, taskId: any) => {
  try {
    for (const resolution of resolutions) {
      const resizedBuffer = await sharp(buffer).resize(resolution).toBuffer();

      const image = new Image({
        resolution: resolution.toString(),
        data: resizedBuffer,
        contentType: contentType,
        taskId: taskId
      });

      await image.save();
    }

    await Task.findByIdAndUpdate(taskId, { status: 'completed', updatedAt: new Date() });
  } catch (error) {
    await Task.findByIdAndUpdate(taskId, { status: 'failed', updatedAt: new Date() });

  }
};