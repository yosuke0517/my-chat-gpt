import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { supabase } from '../utils/supabase'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { MatchRate } from '../types'
import { showNotification } from '@mantine/notifications'
import { DatabaseExport } from 'tabler-icons-react'

export const useQueryMatchRate = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('match_rate')
      .on('UPDATE', (payload: SupabaseRealtimePayload<MatchRate>) => {
        // DBの値が更新されたらstoreの値も更新
        queryClient.setQueryData(['matchRate'], {
          id: payload.new.id,
          created_at: payload.new.created_at,
          match_rate: payload.new.match_rate,
        })
        showNotification({
          title: 'Someone updated the performances table',
          message: `UserID: ${payload.new.id}のマッチ率を更新しました`,
          icon: <DatabaseExport />,
          color: 'teal',
          autoClose: 3000,
        })
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<MatchRate>) => {})
      .subscribe()

    // クリーンアップ処理
    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
  const getMatchRate = async () => {
    const { data, error } = await supabase
      .from('match_rate')
      .select('*')
      .eq('user_id', supabase.auth.user()?.id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<MatchRate, Error>({
    queryKey: ['matchRate'],
    queryFn: getMatchRate,
  })
}
