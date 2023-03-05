import { RecruitTypeValue } from '../const/recruit'

export type IForm = {
  email: string
  password: string
  age: number // いらないけどサンプルなので数値も入れておく
}

export type Todo = {
  id: number
  created_at: string
  title: string
  assigned: string
  priority: number
}

export type AuthForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  termsOfService: boolean
}

export type Post = {
  id: number
  created_at: string
  title: string
  content: string
  post_url: string
  status: RecruitTypeValue | ''
}

export type MatchRate = {
  id: number
  created_at: string
  match_rate: number
}
