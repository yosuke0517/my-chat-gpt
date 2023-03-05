import { NextPage } from 'next'
import { useQueryMatchRate } from '../hooks/useQueryMatchRate'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import {
  Center,
  Text,
  Grid,
  RingProgress,
  Container,
  Slider,
} from '@mantine/core'
import Link from 'next/link'
import { ReplyIcon } from '@heroicons/react/solid'

export const MatchRate: NextPage = ({}) => {
  const { data } = useQueryMatchRate()
  const [matchRate, setMatchRate] = useState<number | undefined>(0)
  useEffect(() => {
    setMatchRate(data?.match_rate)
    console.log(data)
  }, [data])
  // 複数値が入る可能性を考慮してkeyとして抽象化しておく
  const updateHandler = async (value: number, key: string) => {
    await supabase
      .from('match_rate')
      .update({ [key]: value })
      .eq('user_id', supabase.auth.user()?.id)
  }
  return (
    <Layout title="MatchRate">
      <p>subabaseのsubscribeを使用した、リアルタイム監視</p>
      <p>インディケータを操作したタイミングでDBを更新します</p>
      {data ? (
        <Grid>
          <Grid.Col>
            <Center>
              <Text color="gray">Match率</Text>
              <RingProgress
                size={140}
                thickness={14}
                sections={[{ value: data.match_rate, color: 'indigo' }]}
                label={
                  <Text color="blue" weight="bold" align="center" size="xl">
                    {matchRate}%
                  </Text>
                }
              />
            </Center>
          </Grid.Col>{' '}
        </Grid>
      ) : (
        <p>
          マッチ率が登録されていません。テストユーザ：ccc@gmail.comを使用してください
        </p>
      )}
      {data && (
        <Container>
          <Slider
            className={'my-10 w-96'}
            value={matchRate}
            color="blue"
            min={0}
            max={100}
            step={1}
            onChange={setMatchRate}
            onChangeEnd={(value) => updateHandler(value, 'match_rate')}
            marks={[
              { value: 20, label: '20%' },
              { value: 40, label: '40%' },
              { value: 60, label: '60%' },
              { value: 80, label: '80%' },
            ]}
          ></Slider>
        </Container>
      )}
      <Center>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Center>
    </Layout>
  )
}

export default MatchRate
