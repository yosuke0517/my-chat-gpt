import { Mavatar } from './Avatar'
import { ComponentMeta } from '@storybook/react'
import { ChangeEvent } from 'react'

export default {
  title: 'Avatar',
  component: Mavatar,
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
} as ComponentMeta<typeof Mavatar>

export const AvatarDemo = () => {
  const callback = (e: ChangeEvent<HTMLInputElement>) => {
    alert('upload demo!!')
  }
  return (
    <>
      <a
        href="https://mantine-component-catalog.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="text-indigo-300 underline">
          画像のアップロードはデモページにてログイン後ご確認ください
        </p>
      </a>
      <Mavatar
        url="/images/developer.png"
        uploadCallback={(e) => callback(e)}
      />
    </>
  )
}
