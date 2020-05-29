import mongoose from 'mongoose'

export type TaskDocument = mongoose.Document & {
  title: string
  description: string
  base_source_code: string
  solution: string,
  max_duration: number
}

const taskSchema = new mongoose.Schema({
  title: {
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
  },
  max_duration: Number
})

export const Task = mongoose.model<TaskDocument>('Task', taskSchema)
