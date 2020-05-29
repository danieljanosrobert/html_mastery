export interface Task {
  title: string
  description: string
  base_source_code: string
  max_duration: number
}

export interface ReviewableTask {
  username: string
  task_title: string
  source_code: string
}