export interface User {
  username: string
  mastery_level: number
  resolved_tasks: string[]
}

export interface AuthenticatableUser {
  username: string
  password: string
}

export interface RegisterableUser {
  username: string
  password: string
  confirm_password: string
}
