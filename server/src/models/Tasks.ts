import mongoose from 'mongoose'

export type TaskDocument = mongoose.Document & {
  name: string
  description: string
  base_source_code: string
  solution: string
}

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  base_source_code: String,
  solution: {
    type: String,
    required: true,
  }
})

export const Task = mongoose.model<TaskDocument>('Task', taskSchema)
