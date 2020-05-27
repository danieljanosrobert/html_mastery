/*
HTML feladatok leírását tárolja, minden feladathoz tartozzon egy 
  leírás, egy stringként tárolt 
  forráskód részlet és egy 
  másik forráskód részlet, amely a sikeres megoldást ellenőrzi. 
*/

import mongoose from 'mongoose'

export type TaskDocument = mongoose.Document & {
  description: string
  base_source_code: string
  solution: string
}

const taskSchema = new mongoose.Schema({
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
