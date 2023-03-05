import { useState } from 'react'
import Link from 'next/link'
import { Modal, Button, Group, Paper } from '@mantine/core'
import { ReplyIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { ModalContainer } from '../components/ModalContainer'

const ModalDemo = () => {
  const [opened, setOpened] = useState(false)
  return (
    <Layout title="Modal">
      <p>モーダルのテストページ</p>
      <ModalContainer
        title="モーダルのタイトルが入ります"
        opened={opened}
        close={() => setOpened(false)}
        callback={() => alert('callback')}
        closeCallback={() => setOpened(false)}
      >
        <Paper>
          モーダルの内容が入ります（callbackを入れるとボタンが表示されます）
        </Paper>
      </ModalContainer>
      <Group direction="column" position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Group>
    </Layout>
  )
}

export default ModalDemo
