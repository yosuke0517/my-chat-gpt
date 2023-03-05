import { NextPage } from 'next'
import { Center, Group, Loader } from '@mantine/core'
import { DraggableY } from '../components/DraggableY'
import { Todo } from '../types'
import { useQueryTodos } from '../hooks/useQueryTodos'
import { Layout } from '../components/Layout'

export const DraggableDemo: NextPage = ({}) => {
  const { data, status } = useQueryTodos()
  const changeItem = (item: Todo[]) => {
    // TODO update priority
    console.log('onChange')
    console.log(item)
  }
  return (
    <Layout title="draggable" bg="bg-gray-200">
      <p className="text-black">
        ごめんなさい。これだけmantine関係ない（興味本位で素のreactで実装してみた）
      </p>
      <p className="m-0 p-0 text-black">
        TODO: 縦横対応（二次元配列にするだけだと思ってる）
      </p>
      {status === 'loading' && (
        <Center>
          <Loader color="indigo" size="md" variant="bars" />
        </Center>
      )}
      <Group>
        {data && (
          <DraggableY
            initialItems={data}
            onChange={(newList) => changeItem(newList)}
          />
        )}
      </Group>
    </Layout>
  )
}

export default DraggableDemo
