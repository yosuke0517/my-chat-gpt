import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Button, Center, Group } from '@mantine/core'
import Link from 'next/link'
import { ReplyIcon } from '@heroicons/react/solid'

export const GroupDemo: NextPage = ({}) => {
  return (
    <Layout title="Group">
      <p>groupのテストページ</p>
      <p className="m-0">my: md, position: left, grow</p>
      <Group my="md" position="left" grow>
        <Button color="indigo">1</Button>
        <Button color="teal">2</Button>
        <Button color="orange">3</Button>
      </Group>
      <p className="m-0 text-center">
        my: md, position: center, direction: column
      </p>
      <Group my="md" position="center" direction="column">
        <Button color="indigo">1</Button>
        <Button color="teal">2</Button>
        <Button color="orange">3</Button>
      </Group>
      <p className="m-0 ">my: md, align: start</p>
      <Group my="md" align="start">
        <Button className="h-10" color="indigo">
          1
        </Button>
        <Button className="h-20" color="teal">
          2
        </Button>
        <Button className="h-32" color="orange">
          3
        </Button>
      </Group>
      <p className="m-0 ">my: md, direction: column, align: start</p>
      <Group my="md" direction="column" align="start">
        <Button className="w-12" color="indigo">
          1
        </Button>
        <Button className="w-20" color="teal">
          2
        </Button>
        <Button className="w-32" color="orange">
          3
        </Button>
      </Group>
      <Center>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Center>
    </Layout>
  )
}

export default GroupDemo
