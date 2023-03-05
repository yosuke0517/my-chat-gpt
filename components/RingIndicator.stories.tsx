import { RingIndicator, RingIndicatorProps } from './RingIndicator'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'RingIndicator',
  component: RingIndicator,
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
} as ComponentMeta<typeof RingIndicator>

export const RingIndicatorDemo = (props: RingIndicatorProps) => {
  return (
    <RingIndicator
      title={props.title || 'タイトルが入ります'}
      color={props.color || 'blue'}
      value={props.value || 88}
    />
  )
}
