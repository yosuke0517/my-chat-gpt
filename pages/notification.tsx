import Link from 'next/link'
import { Group, Avatar, Button } from '@mantine/core'
import {
  showNotification,
  cleanNotificationsQueue,
  cleanNotifications,
  updateNotification,
} from '@mantine/notifications'
import { ReplyIcon } from '@heroicons/react/solid'
import { Check, X } from 'tabler-icons-react'
import { supabase } from '../utils/supabase'
import { delay } from '../utils/delay'
import { Layout } from '../components/Layout'

const NotificationDemo = () => {
  const cleanQueue = () => {
    cleanNotificationsQueue()
  }
  const cleanNotice = () => {
    cleanNotifications()
  }
  return (
    <Layout title="Notification">
      <Group direction="column" position="center">
        <p>通知のデモ（ボタンを押してください）</p>
        <Button
          className="w-40"
          onClick={() =>
            showNotification({
              title: 'Default notification',
              message: 'Hey there ! 🤥',
              autoClose: false,
            })
          }
        >
          シンプル
        </Button>
        <Button
          className="w-40"
          color="green"
          onClick={() =>
            showNotification({
              title: 'PR approved',
              message: 'Your PR approved and merged 🎉',
              icon: <Check size={18} />,
              color: 'teal',
              autoClose: false,
            })
          }
        >
          アイコン付与
        </Button>
        <Button
          className="w-40"
          color="red"
          onClick={() =>
            showNotification({
              title: 'Automatic test failed',
              message: 'Test failed... 😓',
              icon: <X size={18} />,
              color: 'red',
              autoClose: false,
            })
          }
        >
          Error パターン
        </Button>
        <Button
          className="w-40"
          color="orange"
          onClick={async () => {
            showNotification({
              id: 'load-profile',
              loading: true,
              title: 'Loading your profile',
              message: 'Please wait for a while 🙇',
              autoClose: false,
              disallowClose: true,
            })
            const { data, error, status } = await supabase
              .from('profiles')
              .select('avatar_url')
              .eq('id', supabase.auth.user()?.id)
              .single()
            await delay(2000)
            if (error && status !== 406) {
              throw new Error(error.message)
            }
            if (data) {
              updateNotification({
                id: 'load-profile',
                color: 'teal',
                title: 'Your profile was loaded🎉',
                message:
                  'Notification will close in 2 seconds, you can close this notification now',
                icon: (
                  <Avatar
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${data.avatar_url}`}
                  />
                ),
                autoClose: 2000,
              })
            }
          }}
        >
          非同期データ取得
        </Button>
        <Button className="w-40" color="gray" onClick={cleanQueue}>
          Clean queue
        </Button>
        <Button className="w-40" color="yellow" onClick={cleanNotice}>
          Clean all
        </Button>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Group>
    </Layout>
  )
}

export default NotificationDemo
