import { FC } from 'react'
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core'

export type CustomCardProps = {
  title: string
  content: string
  status: string
  badgeColor: string
  postUrl: string
}

export const CustomCard: FC<CustomCardProps> = ({
  title,
  content,
  status,
  badgeColor,
  postUrl,
}) => {
  return (
    <Card shadow="md" className="mx-auto h-full max-w-lg">
      <Card.Section>
        <Image
          src={postUrl}
          height={220}
          fit="cover"
          className="object-center"
          alt="With default placeholder"
          withPlaceholder
        />
      </Card.Section>
      <Text mt="md" lineClamp={1} weight={800}>
        {title}
      </Text>
      <Badge mt="md" color={badgeColor} radius="lg" variant="filled">
        {status}
      </Badge>
      <Text mt="md" className="h-16 max-h-16" size="sm" lineClamp={3}>
        {content}
      </Text>
      <Button
        onClick={() => alert('click!!')}
        mt="md"
        size="xs"
        variant="light"
        color="indigo"
        fullWidth
      >
        応募する
      </Button>
    </Card>
  )
}
