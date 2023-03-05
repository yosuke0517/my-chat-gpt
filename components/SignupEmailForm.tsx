import { FC, FormEvent, MouseEventHandler, ReactNode, useState } from 'react'
import * as Yup from 'yup'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { useForm, yupResolver } from '@mantine/form'
import { IForm } from '../types'
import { supabase } from '../utils/supabase'
import { Layout } from './Layout'
import {
  Alert,
  Anchor,
  Button,
  Group,
  NumberInput,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { ApiError } from '@supabase/gotrue-js'
import { UseFormReturnType } from '@mantine/form/lib/use-form'

type SignupEmailFormProps = {
  signupCallback: (form: UseFormReturnType<IForm>) => Promise<ApiError | null>
  signinCallback: (form: UseFormReturnType<IForm>) => Promise<ApiError | null>
}

export const SignupEmailForm: FC<SignupEmailFormProps> = ({
  signupCallback,
  signinCallback,
}) => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('No email provided.'),
    // ログイン時はあまり細かくしない
    password: isRegister
      ? Yup.string()
          .required('No password provided.')
          .min(8, 'Password should be min 8 chars')
          .matches(/[a-z]+/, 'One lowercase char missing')
          .matches(/[A-Z]+/, 'One uppercase char missing')
          .matches(/[@$!%*#?&]+/, 'One special char missing')
      : Yup.string()
          .required('No password provided.')
          .min(8, 'Password should be min 8 chars'),
    age: Yup.number().min(15, 'Only over 15 for new account'),
  })
  const form = useForm<IForm>({
    schema: yupResolver(schema), // 定義したschemaを適用する
    initialValues: {
      email: '',
      password: '',
      age: 15,
    },
  })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isRegister) {
      const error = signupCallback(form)
      error.then((e) => {
        console.log('e')
        console.log(e)
        if (e?.message) setError(e.message)
      })
      form.reset()
    } else {
      const error = signinCallback(form)
      error.then((e) => {
        console.log('e')
        console.log(e)
        if (e?.message) setError(e.message)
      })
      form.reset()
    }
  }
  const singleValidation = (fieldName: 'email' | 'password' | 'age') => {
    form.validateField(fieldName)
  }
  return (
    <Layout title="SignupEmailForm">
      <Group direction="column" position="center">
        <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
        {error && (
          <Alert
            mt="md"
            icon={<ExclamationCircleIcon className="text-pink-500" />}
            title="Authorization Error"
            color="red"
            radius="md"
          >
            {error}
          </Alert>
        )}
        {/*mantineのuseFormを使った場合、ちょっとクセがあるがform.onSubmitに関数を入れる*/}
        <form
          className="flex flex-col items-end"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextInput
            mt="md"
            id="email"
            label="Email*"
            className="w-full"
            placeholder="example@gmail.com"
            {...form.getInputProps('email')} // mantineのuseFormの場合、この1行で値の表示と更新ができる
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault()
            }} // enterでsubmitしないように
            onBlur={() => singleValidation('email')} // リアルタイムバリデーションは鬱陶しいのでフォーカス外れたらバリデーションする
          />
          <PasswordInput
            mt="md"
            id="password"
            placeholder="password"
            className="w-full"
            label="Password*"
            description={
              isRegister
                ? 'Must include one upper + lower char & special char'
                : ''
            }
            {...form.getInputProps('password')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault()
            }}
            onBlur={() => singleValidation('password')}
          />
          {isRegister && (
            <NumberInput
              mt="md"
              id="age"
              label="Age"
              placeholder="Your age"
              {...form.getInputProps('age')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault()
              }}
              onBlur={() => singleValidation('age')}
            />
          )}
          <Group mt="lg" position="apart">
            <Button type="submit">{'Login'}</Button>
          </Group>
        </form>
      </Group>
    </Layout>
  )
}
