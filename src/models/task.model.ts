import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  status: string;
  price: number;
  originalPath: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  status: { type: String, required: true },
  price: { type: Number, required: true },
  originalPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;