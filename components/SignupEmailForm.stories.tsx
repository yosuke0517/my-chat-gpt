import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MouseEventHandler, ReactNode } from 'react'
import { SignupEmailForm } from './SignupEmailForm'
// @ts-ignore
import MDXDocument from './SignupEmailForm.mdx'
import { UseFormReturnType } from '@mantine/form/lib/use-form'
import { IForm } from '../types'
import { ApiError } from '@supabase/gotrue-js'

export default {
  title: 'SignupEmailForm',
  component: SignupEmailForm,
  parameters: {
    docs: {
      // ドキュメント用のmdxコンポーネントを指定
      page: MDXDocument,
    },
  },
} as ComponentMeta<typeof SignupEmailForm>

const signupCallback = async (_form: UseFormReturnType<IForm>) => {
  return new Promise<ApiError | null>((resolve, _reject) => {
    const { error } = { error: { message: '', status: 200 } as ApiError }
    alert('signupCallback')
    resolve(error)
  })
}
const signinCallback = async (_form: UseFormReturnType<IForm>) => {
  return new Promise<ApiError | null>((resolve, _reject) => {
    const { error } = {
      error: { message: 'invalid email', status: 400 } as ApiError,
    }
    resolve(error)
  })
}
// テンプレートコンポーネントを実装
// Storybookから渡されたpropsをそのままButtonに渡す
const Template: ComponentStory<typeof SignupEmailForm> = (args) => (
  <SignupEmailForm
    {...args}
    signupCallback={signupCallback}
    signinCallback={signinCallback}
  />
)

// bindを呼び出しStoryを作成
export const SignupEmailFormTemplate = Template.bind({})
