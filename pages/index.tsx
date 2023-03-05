import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import z from 'zod'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Button, Group } from '@mantine/core'
import Markdown from 'markdown-to-jsx'
import { NextPage } from 'next'
import { SignupEmailForm } from '../components/SignupEmailForm'
import { UseFormReturnType } from '@mantine/form/lib/use-form'
import { IForm } from '../types'
import {
  getLocalStorage,
  LocalStorageKeyList,
  removeLocalStorage,
  setLocalStorage,
} from '../utils/localStorage'

export const chatRequestSchema = z.object({
  model: z.string(),
  temperature: z.number(),
  max_tokens: z.number(),
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
})

type ChatRequestBodyType = z.infer<typeof chatRequestSchema>

const initialRequestValue: ChatRequestBodyType = {
  model: 'gpt-3.5-turbo',
  temperature: 0.2,
  max_tokens: 1000,
  messages: [
    {
      role: 'user',
      content: '',
    },
  ],
}

interface IApiResponse {
  data: ChatResponseBody
  status: number
  statusText: string
}

interface ChatResponseBody {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    finish_reason: string
    message: {
      role: string
      content: string
    }
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

const initialMessage = {
  role: 'user',
  content: '',
}

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  const signupCallback = async (form: UseFormReturnType<IForm>) => {
    const { error } = await supabase.auth.signUp({
      email: form.values.email,
      password: form.values.password,
    })
    return error
  }
  const signinCallback = async (form: UseFormReturnType<IForm>) => {
    const { error } = await supabase.auth.signIn({
      email: form.values.email,
      password: form.values.password,
    })
    return error
  }
  useEffect(() => {
    setSession(supabase.auth.session())
    // ユーザがログイン、ログアウトなどのアクションを行うたびにonAuthStateChange内の処理を実施する
    supabase.auth.onAuthStateChange((_event, session) => {
      // 新しいセッション情報を受け取り更新する
      setSession(session)
    })
  }, [setSession])

  const [cards, setCards] = useState<{ id: string; text: string }[]>([
    { id: '1', text: 'Card 1' },
    { id: '2', text: 'Card 2' },
    { id: '3', text: 'Card 3' },
  ])

  const handleDrop = (draggedId: string, droppedId: string) => {
    const draggedIndex = cards.findIndex((c) => c.id === draggedId)
    const droppedIndex = cards.findIndex((c) => c.id === droppedId)
    const newCards = [...cards]
    newCards[draggedIndex] = cards[droppedIndex]
    newCards[droppedIndex] = cards[draggedIndex]
    setCards(newCards)
  }

  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [cacheMessages, setCacheMessages] = useState([])

  useEffect(() => {
    Prism.highlightAll()
  }, [outputValue])

  const API_KEY = process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY
  const API_URL = 'https://api.openai.com/v1/chat/completions'

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cacheMessages = () => {
      const chaceMessages = getLocalStorage(LocalStorageKeyList.Messages)
      if (!chaceMessages) {
        setLocalStorage(LocalStorageKeyList.Messages, [])
        return []
      }
      return chaceMessages
    }

    const inputMessage = {
      ...initialMessage,
      content: inputValue,
    }
    // 履歴を含むメッセージ
    if (!cacheMessages) setLocalStorage(LocalStorageKeyList.Messages, [])
    const latestMessages = [...cacheMessages(), inputMessage]
    const requestBody: ChatRequestBodyType = {
      ...initialRequestValue,
      messages: latestMessages,
    }

    setLocalStorage(LocalStorageKeyList.Messages, latestMessages)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    }

    try {
      const response = await axios.post<ChatRequestBodyType, IApiResponse>(
        API_URL,
        requestBody,
        { headers }
      )

      setOutputValue(response.data.choices[0].message.content)
      return
    } catch (error) {
      console.error(error)
      return 'An error occurred while fetching the response from the API.'
    }
  }

  const removeCache = () => {
    removeLocalStorage(LocalStorageKeyList.Messages)
  }

  const highlightAll = () => {
    Prism.highlightAll()
  }

  return (
    <div className="w-full">
      <Head>
        <title>mantineカタログ集</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <SignupEmailForm
          signupCallback={signupCallback}
          signinCallback={signinCallback}
        />
      ) : (
        <Group direction="column" position="center">
          <form onSubmit={handleFormSubmit} className="w-full">
            <div className="flex">
              <textarea
                className="min-h-100 w-full"
                placeholder="質問を入力"
                onChange={handleInputChange}
                value={inputValue}
              />
              <Button className="ml-4" type="submit" color="indigo">
                Submit
              </Button>
            </div>
            <Markdown>{outputValue}</Markdown>
            <button type="button" onClick={removeCache}>
              remove Cache
            </button>
            <button type="button" onClick={highlightAll}>
              highlightAll
            </button>
          </form>
        </Group>
      )}
    </div>
  )
}
export default Home
