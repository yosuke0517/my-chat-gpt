import { FC, ReactNode, useState } from 'react'
import { Group, Modal, Paper } from '@mantine/core'
import { AttachableIconButton } from './AttachableIconButton'

export type ModalContainerProps = {
  opened: boolean
  title: string
  callback?: () => void
  close: () => void
  closeCallback: () => void
  children: ReactNode
}

export const ModalContainer: FC<ModalContainerProps> = ({
  opened,
  close,
  title,
  callback,
  closeCallback,
  children,
}) => {
  return (
    <Modal
      title={title}
      centered
      opened={opened}
      onClose={() => closeCallback()}
    >
      <Paper>
        {children}
        {callback ? (
          <Group position="center" my="md">
            <AttachableIconButton type="cancel" callback={closeCallback}>
              <span>Cancel</span>
            </AttachableIconButton>
            <AttachableIconButton type="main" callback={callback}>
              <span>Action</span>
            </AttachableIconButton>
          </Group>
        ) : (
          <></>
        )}
      </Paper>
    </Modal>
  )
}
