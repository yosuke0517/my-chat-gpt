import { ModalContainer, ModalContainerProps } from './ModalContainer'
import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Button, Group } from '@mantine/core'

export default {
  title: 'ModalContainer',
  component: ModalContainer,
  argTypes: {
    // propsに渡すvariantをStorybookから変更できるように追加
    type: {
      // ラジオボタンで設定できるように指定
      control: { type: 'radio' },
    },
  },
  parameters: {
    docs: {
      // このコンポーネントに関しては触った方がわかりやすそうなので不要
      // page: MDXDocument,
    },
  },
} as ComponentMeta<typeof ModalContainer>

const callback = () => alert('callback!!')

export const Plane = (props: ModalContainerProps) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <ModalContainer
        title="タイトルが入ります"
        opened={opened}
        close={() => setOpened(false)}
        closeCallback={() => setOpened(false)}
      >
        <p>Modal 内容が入ります</p>
      </ModalContainer>
      <Group direction="column" position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  )
}

export const ExistCallback = (props: ModalContainerProps) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <ModalContainer
        title={props.title}
        opened={opened}
        close={() => close()}
        callback={callback}
        closeCallback={() => setOpened(false)}
      >
        <p>Modal 内容が入ります（コールバックを渡すとボタンが表示されます）</p>
      </ModalContainer>
      <Group direction="column" position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  )
}
