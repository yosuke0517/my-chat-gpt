import { ChangeEvent, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { Mavatar } from '../components/Avatar'
import { Center, Group, LoadingOverlay } from '@mantine/core'
import { uploadAvatarImage } from '../utils/uploadImage'
import Link from 'next/link'
import { ReplyIcon } from '@heroicons/react/solid'

const AvatarDemo = () => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    // profileからアバターのURLを取得しURLがなければ
    const getProfile = async () => {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', supabase.auth.user()?.id)
        .single()
      if (error && status !== 406) {
        throw new Error(error.message)
      }
      if (data) {
        setAvatarUrl(data.avatar_url)
      }
    }
    getProfile()
  }, [])

  const uploadAvatarImageCallback = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true)
    const result = await uploadAvatarImage(e)
    if (result) setAvatarUrl(result)
    setIsLoading(false)
  }

  return (
    <Layout title="Profile">
      <p>アバターのテストページ（カメラアイコンからアップロードできます</p>
      <Group position="center" direction="column">
        <LoadingOverlay visible={isLoading} />

        <Mavatar
          url={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${avatarUrl}`}
          uploadCallback={(e) => uploadAvatarImageCallback(e)}
        />
      </Group>
      <Center>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Center>
    </Layout>
  )
}

export default AvatarDemo
