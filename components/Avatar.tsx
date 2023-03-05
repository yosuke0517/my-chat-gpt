import { ChangeEvent, FC } from 'react'
import { Group, Avatar, Center } from '@mantine/core'
import { CameraIcon, ReplyIcon } from '@heroicons/react/solid'

type AvatarProps = {
  url: string
  uploadCallback: (e: ChangeEvent<HTMLInputElement>) => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Mavatar: FC<AvatarProps> = ({
  url,
  uploadCallback,
  size = 'lg',
}) => {
  return (
    <Center>
      <Group
        className="relative w-fit"
        spacing="xs"
        direction="column"
        position="center"
        my="0"
      >
        {url && <Avatar size={size} src={url} radius="xl" />}

        <label htmlFor="avatar" className="absolute -bottom-2 left-20">
          <CameraIcon className="my-0 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => uploadCallback(e)}
        />
      </Group>
    </Center>
  )
}
