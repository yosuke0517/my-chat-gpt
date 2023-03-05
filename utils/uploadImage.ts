import { ChangeEvent } from 'react'
import { supabase } from './supabase'

/** supabaseへ画像をアップロードする */
export const uploadAvatarImage = async (
  e: ChangeEvent<HTMLInputElement>
): Promise<string> => {
  if (!e.target.files || e.target.files.length === 0) {
    throw new Error('Please select the image file')
    return ''
  }
  const file = e.target.files[0]
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file)
  if (error) {
    throw new Error(error.message)
    return ''
  }
  await upsertProfile(fileName)
  return fileName
}

/** profileテーブルを更新（レコードがなければインサート）する */
export const upsertProfile = async (url: string) => {
  const { error } = await supabase.from('profiles').upsert(
    {
      id: supabase.auth.user()?.id,
      avatar_url: url,
    },
    {
      returning: 'minimal',
    }
  )
  if (error) throw new Error(error.message)
}
