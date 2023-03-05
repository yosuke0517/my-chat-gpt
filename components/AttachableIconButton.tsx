/** アイコンを付与できるボタン */
import React, { FC, MouseEventHandler, ReactNode } from 'react'
import { Button } from '@mantine/core'

type AttachableIconButtonProps = {
  type: AttachableIconButtonType
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  callback?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

export type AttachableIconButtonType = 'main' | 'sub' | 'cancel'

export const BUTTON_TYPES = {
  Main: 'main',
  Sub: 'sub',
  Cancel: 'cancel',
} as const

export type ButtonTypeKeys = keyof typeof BUTTON_TYPES
export type ButtonTypeValues = typeof BUTTON_TYPES[ButtonTypeKeys]

export const MAPPED_BUTTON_TYPES_LABEL: {
  [key in ButtonTypeValues]: string
} = {
  [BUTTON_TYPES.Main]: 'orange',
  [BUTTON_TYPES.Sub]: 'indigo',
  [BUTTON_TYPES.Cancel]: 'gray',
}

/** ButtonTypeに応じたcolorを返します */
const buttonTypeComputed = (type: AttachableIconButtonType): string => {
  return MAPPED_BUTTON_TYPES_LABEL[type]
}

export const AttachableIconButton: FC<AttachableIconButtonProps> = ({
  type,
  children,
  callback,
  leftIcon = null,
  rightIcon = null,
}) => {
  return (
    <Button
      className="w-112"
      color={buttonTypeComputed(type)}
      radius="xl"
      size="md"
      uppercase
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onClick={callback}
    >
      {children}
    </Button>
  )
}
