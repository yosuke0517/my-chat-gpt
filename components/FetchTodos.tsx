import { FC } from 'react'
import { useQueryTodos } from '../hooks/useQueryTodos'
import { Alert, Center, Loader, Text } from '@mantine/core'
import { ExclamationIcon } from '@heroicons/react/solid'

export const FetchTodos: FC = ({}) => {
  const { data, status } = useQueryTodos()
  if (status === 'loading')
    return (
      <Center>
        <Loader color="indigo" size="md" variant="bars" />
      </Center>
    )
  if (status === 'error')
    return (
      <Alert
        icon={<ExclamationIcon />}
        title="Fetch Error!"
        color="red"
        radius="md"
      >
        Something wrong happend !
      </Alert>
    )
  return (
    <div className="text-center">
      <Text weight="bold">Task List</Text>
      {data?.map((todo) => (
        <Text my="xs" size="sm" key={todo.id}>
          {todo.title}
        </Text>
      ))}
    </div>
  )
}
