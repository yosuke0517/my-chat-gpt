import { FC, ReactNode } from 'react'
import { Center, RingProgress, Text } from '@mantine/core'

export type RingIndicatorProps = {
  title: string
  color: string
  value: number
}

export const RingIndicator: FC<RingIndicatorProps> = ({
  title,
  color,
  value,
}) => {
  return (
    <Center>
      <Text color="gray">{title}</Text>
      <RingProgress
        size={140}
        thickness={14}
        sections={[{ value: value, color: color }]}
        roundCaps
        label={
          <Text color="blue" weight="bold" align="center" size="xl">
            {value}%
          </Text>
        }
      />
    </Center>
  )
}
