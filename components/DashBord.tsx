import { ShieldCheckIcon } from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { ActionIcon, Button, Center, Group } from '@mantine/core'
import { supabase } from '../utils/supabase'
import { Layout } from './Layout'

export const DashBord = ({}) => {
  const router = useRouter()
  const signOut = () => {
    // TODO フラッシュメッセージにする
    supabase.auth
      .signOut()
      .then((r) => console.log(r))
      .catch((e) => {
        console.log('ログアウト失敗')
        console.error(e)
      })
  }
  return (
    <div className="w-3/12 p-2">
      <Button
        className="mt-4 w-full"
        color="gray"
        onClick={() => router.push('/button')}
      >
        Button Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="red"
        onClick={() => router.push('/grid')}
      >
        Grid Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="pink"
        onClick={() => router.push('/group')}
      >
        Group Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="grape"
        onClick={() => router.push('/multi-select')}
      >
        MultiSelect Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="violet"
        onClick={() => router.push('/fetch-api')}
      >
        FetchApi （Loading） Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="indigo"
        onClick={() => router.push('/modal')}
      >
        Modal Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="blue"
        onClick={() => router.push('/avatar')}
      >
        Avatar Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="cyan"
        onClick={() => router.push('/card')}
      >
        Card Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="teal"
        onClick={() => router.push('/match-rate')}
      >
        MatchRate Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="green"
        onClick={() => router.push('/date-picker')}
      >
        DatePicker Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="lime"
        onClick={() => router.push('/notification')}
      >
        Notification Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="yellow"
        onClick={() => router.push('/hooks')}
      >
        Hooks Demo
      </Button>
      <Button
        className="mt-4 w-full"
        color="orange"
        onClick={() => router.push('/draggable')}
      >
        Draggable Demo
      </Button>

      <Center>
        <ActionIcon my="md" size="lg" onClick={signOut}>
          <LogoutIcon />
        </ActionIcon>
      </Center>
    </div>
  )
}
