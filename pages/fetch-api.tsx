import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Grid, Center } from '@mantine/core'
import { FetchTodos } from '../components/FetchTodos'
import Link from 'next/link'
import { ReplyIcon } from '@heroicons/react/solid'

export const FetchData: NextPage = ({}) => {
  return (
    <Layout title="Fetch Data">
      <p>react-queryでのフェッチのテストページ</p>
      <Grid>
        <Grid.Col span={6}>
          <FetchTodos />
        </Grid.Col>
        <Grid.Col span={6}>
          <FetchTodos />
        </Grid.Col>
      </Grid>
      <Center>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Center>
    </Layout>
  )
}

export default FetchData
