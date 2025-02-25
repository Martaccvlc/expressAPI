import { Schema, model, Document } from 'mongoose';

interface IImage extends Document {
  resolution: string;
  path: string;
  taskId: Schema.Types.ObjectId;
}

const imageSchema = new Schema<IImage>({
  resolution: { type: String, required: true },
  path: { type: String, required: true },
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
});

const Image = model<IImage>('Image', imageSchema);

export default Image;