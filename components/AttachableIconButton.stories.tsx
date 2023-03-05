import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MouseEventHandler, ReactNode } from 'react'
import {
  AttachableIconButton,
  AttachableIconButtonType,
} from './AttachableIconButton'
import { Flower } from 'tabler-icons-react'
// @ts-ignore
import MDXDocument from './AttachableIconButton.mdx'

export default {
  title: 'AttachableIconButton',
  component: AttachableIconButton,
  argTypes: {
    // propsに渡すvariantをStorybookから変更できるように追加
    type: {
      // ラジオボタンで設定できるように指定
      control: { type: 'radio' },
      options: ['main', 'sub'],
    },
    // propsに渡すchildrenをStorybookから変更できるように追加
    children: {
      // テキストボックスで入力できるように指定
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      // ドキュメント用のmdxコンポーネントを指定
      page: MDXDocument,
    },
  },
} as ComponentMeta<typeof AttachableIconButton>

const callback = () => {
  alert('callback!!')
}

export const Main = (
  props: JSX.IntrinsicAttributes & {
    type: AttachableIconButtonType
    callback?: MouseEventHandler<HTMLButtonElement> | undefined
    children: ReactNode
  }
) => {
  return (
    <AttachableIconButton {...props} type="main" callback={callback}>
      <span>Main Button（Docsタブに使い方書いてあるよ）</span>
    </AttachableIconButton>
  )
}

export const Sub = (
  props: JSX.IntrinsicAttributes & {
    type: AttachableIconButtonType
    callback?: MouseEventHandler<HTMLButtonElement> | undefined
    children: ReactNode
  }
) => {
  return (
    <AttachableIconButton {...props} type="sub" callback={callback}>
      <span>Sub Button</span>
    </AttachableIconButton>
  )
}

export const LeftIconButton = (
  props: JSX.IntrinsicAttributes & {
    type: AttachableIconButtonType
    callback?: MouseEventHandler<HTMLButtonElement> | undefined
    children: ReactNode
  }
) => {
  return (
    <AttachableIconButton
      {...props}
      type="sub"
      callback={callback}
      leftIcon={<Flower className="h-6 w-6 text-orange-500" />}
    >
      <span>Left Icon Button</span>
    </AttachableIconButton>
  )
}

export const RightIconButton = (
  props: JSX.IntrinsicAttributes & {
    type: AttachableIconButtonType
    callback?: MouseEventHandler<HTMLButtonElement> | undefined
    children: ReactNode
  }
) => {
  return (
    <AttachableIconButton
      {...props}
      type="sub"
      callback={callback}
      rightIcon={<Flower className="h-6 w-6 text-pink-500" />}
    >
      <span>Right Icon Button</span>
    </AttachableIconButton>
  )
}

// テンプレートコンポーネントを実装
// Storybookから渡されたpropsをそのままButtonに渡す
const Template: ComponentStory<typeof AttachableIconButton> = (args) => (
  <AttachableIconButton {...args} />
)

// bindを呼び出しStoryを作成
export const TemplateTest = Template.bind({})

// デフォルトのpropsを設定する
TemplateTest.args = {
  type: 'main',
  callback,
  children: <span>画面上でPropsが触れるヤツ</span>,
}
