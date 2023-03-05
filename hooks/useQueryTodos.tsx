import { supabase } from '../utils/supabase'
import { useQuery, useQueryClient } from 'react-query'
import { MatchRate, Todo } from '../types'
import { useEffect } from 'react'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { showNotification } from '@mantine/notifications'
import { DatabaseExport } from 'tabler-icons-react'
import { delay } from '../utils/delay'

export const useQueryTodos = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('todos')
      .on('UPDATE', (payload: SupabaseRealtimePayload<Todo>) => {
        console.log('更新された？')
        // DBの値が更新されたらstoreの値も更新
        queryClient.setQueryData(['todos'], {
          id: payload.new.id,
          created_at: payload.new.created_at,
          title: payload.new.title,
          assigned: payload.new.assigned,
          priority: payload.new.priority,
        })
        showNotification({
          title: 'Someone updated the todos table',
          message: `TODO: 【${payload.new.title}】のマッチ率を更新しました`,
          icon: <DatabaseExport />,
          color: 'teal',
          autoClose: 3000,
        })
      })
      .subscribe()

    // クリーンアップ処理
    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
  const getTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
    await delay(2000)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  })
}
