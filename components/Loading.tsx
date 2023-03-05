import { FC } from 'react'
import { Center, Loader } from '@mantine/core'

/** 基本的にはローディングに色の指定が必要な機会はないと思うが今回はデモなので見た目が映えるよう入れてみた */
export type LoadingProps = {
  color?:
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'indigo'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'oval' | 'bars' | 'dots'
}

export const Loading: FC<LoadingProps> = ({
  color = 'indigo',
  size = 'md',
  variant = 'oval',
}) => {
  return (
    <Center>
      <Loader color={color} size={size} variant={variant} />
    </Center>
  )
}
