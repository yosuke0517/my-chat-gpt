import { ComponentMeta } from '@storybook/react'
import { DraggableProps, DraggableY } from './DraggableY'

export default {
  title: 'Draggable',
  component: DraggableY,
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
} as ComponentMeta<typeof Draggable>

const data = [
  {
    id: 1,
    created_at: '2022-11-22T13:54:23.284433+00:00',
    title: 'Task A',
    assigned: '1',
    priority: 3,
  },
  {
    id: 2,
    created_at: '2022-11-22T13:54:29.802012+00:00',
    title: 'Task B',
    assigned: '1',
    priority: 1,
  },
  {
    id: 3,
    created_at: '2022-11-22T13:54:35.121814+00:00',
    title: 'Task C',
    assigned: '1',
    priority: 2,
  },
  {
    id: 4,
    created_at: '2022-12-03T03:20:42.233349+00:00',
    title: 'Task D',
    assigned: '1',
    priority: 4,
  },
]

export const Draggable = (props: DraggableProps) => {
  return (
    <DraggableY initialItems={data} onChange={() => console.log('onChange')} />
  )
}
