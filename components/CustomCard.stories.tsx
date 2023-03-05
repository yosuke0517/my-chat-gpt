import { CustomCard, CustomCardProps } from './CustomCard'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'CustomCard',
  component: CustomCard,
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
} as ComponentMeta<typeof CustomCard>

export const CustomCardDemo = (props: CustomCardProps) => {
  return (
    <CustomCard
      title={props.title || '簡単なお仕事です'}
      content={
        props.content || '空港にいる男性から荷物を受け取る簡単なお仕事です'
      }
      status={props.status || 'New'}
      badgeColor={props.badgeColor || 'pink'}
      postUrl="/images/developer.png"
    />
  )
}

export const CustomCardLongText = () => {
  return (
    <CustomCard
      title="4行以降は改行"
      content="長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト長文テスト"
      status="PICKUP"
      badgeColor="green"
      postUrl="/images/developer.png"
    />
  )
}
