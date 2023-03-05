import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { useState } from 'react'
import {
  Center,
  Container,
  Radio,
  RadioGroup,
  Text,
  MultiSelect,
  TransferListData,
  TransferList,
} from '@mantine/core'
import Link from 'next/link'
import { ReplyIcon } from '@heroicons/react/solid'

export const transferDataInitialValues: TransferListData = [
  [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'rust', label: 'Rust' },
    { value: 'py', label: 'Python' },
    { value: 'js', label: 'JavaScript' },
    { value: 'go', label: 'Golang' },
  ],
  [],
]

export const MultiSelectDemo: NextPage = ({}) => {
  const [radioValue, setRadioValue] = useState('react')
  const [selectValue, setSelectValue] = useState<string[]>([])
  const [transferValue, setTransferValue] = useState<TransferListData>(
    transferDataInitialValues
  )
  return (
    <Layout title="Multi Select">
      <p>セレクト系のテストページ</p>
      <Container>
        <Text>🚀 What is your most favorite frontend library ?</Text>
        <Center>
          <RadioGroup
            my="lg"
            value={radioValue}
            onChange={setRadioValue}
            required
          >
            <Radio value="react" label="React" />
            <Radio value="svelte" label="Svelte" />
            <Radio value="angular" label="Angular" />
            <Radio value="vue" label="Vue" />
          </RadioGroup>
        </Center>
        <Text>🚀 What is your favorite React framework ?</Text>
        <MultiSelect
          my="lg"
          value={selectValue}
          onChange={setSelectValue}
          data={['Next.js', 'Remix', 'Gatsby.js']}
          placeholder="Select items"
          clearable
        />
        <Text>🚀 What language has GC ?</Text>
        <TransferList
          className="text-center"
          my="lg"
          value={transferValue}
          onChange={setTransferValue}
          searchPlaceholder="Search..."
          nothingFound="..."
          titles={['w/o GC', 'w GC']}
          breakpoint="sm"
        />
        <Center>
          <Link href="/">
            <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
          </Link>
        </Center>
      </Container>
    </Layout>
  )
}

export default MultiSelectDemo
