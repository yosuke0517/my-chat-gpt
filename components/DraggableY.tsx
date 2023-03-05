import React, { ComponentProps, FC, useRef, useState } from 'react'
import { Todo } from '../types'
import { Group } from '@mantine/core'
import { MAPPED_TODO_PRIORITY_LABEL } from '../const/recruit'

export type DraggableProps = {
  initialItems: Todo[]
  onChange?: (newItems: Todo[]) => void
}

/** 縦方向のみのドラッグ&ドロップによる入れ替え */
export const DraggableY: FC<DraggableProps> = ({ initialItems, onChange }) => {
  const [items, setItems] = useState<Todo[] | null>(
    initialItems ? [...initialItems] : null
  )
  const $refs = useRef<Map<string, HTMLElement>>(new Map())
  // 移動元対象の要素のID
  const [activeId, setActiveId] = useState<number | null>(null)
  // 移動先対象の要素のID
  const [targetIndex, setTargetIndex] = useState(-1)

  /**
   * ドラッグを開始する要素に設定するpropsを生成する
   * こう書くとイベントハンドリングをまとめて設定できる
   */
  const getHandleProps = (item: Todo, _index: number): ComponentProps<'li'> => {
    return {
      onDragStart(event) {
        // activeIdを設定
        setActiveId(item.id)

        // ドラッグしているデータと許容する動作を設定
        event.dataTransfer.setData('text/plain', String(item.id))
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'

        // ドラッグ時に表示される画像(要素)を設定
        const elm = $refs.current.get(String(item.id))
        if (elm) {
          const rect = elm.getBoundingClientRect()
          const posX = event.clientX - rect.left
          const posY = event.clientY - rect.top
          const img = new Image()
          img.src = 'example.gif'
          event.dataTransfer.setDragImage(elm, posX, posY)
        }
      },
      onDragEnd(_event) {
        // activeIdから移動中のアイテムのindexを取得
        const currentIndex = items?.findIndex(
          (target) => target.id === activeId
        )
        // indexが有効範囲であれば移動を実行
        if (items && currentIndex && currentIndex >= 0 && targetIndex >= 0) {
          const newItems = moveItem(items, currentIndex, targetIndex)
          setItems(newItems)
          // コールバックを呼び出す
          onChange?.(newItems)
        }

        // stateを初期化
        setActiveId(null)
        setTargetIndex(-1)
      },
    }
  }

  /**
   * refを受け取ってMapに格納する
   */
  const setElm = (id: string, elm: HTMLElement | null) => {
    if (elm) {
      $refs.current.set(id, elm)
    } else {
      $refs.current.delete(id)
    }
  }

  /**
   * ドラッグ先の要素に設定するpropsを生成する
   */
  const getItemProps = (item: Todo, index: number): ComponentProps<'li'> => {
    return {
      key: item.id,
      draggable: true,
      // <li ref={elm}></li> と同じ意味
      ref(elm) {
        setElm(String(item.id), elm)
      },
      /** ターゲット要素の半分より上か下かで挿入先を決定する */
      onDragOver(event) {
        event.preventDefault()
        const elm = $refs.current.get(String(item.id))
        if (!elm) return
        // カーソルが当たっている要素の相対位置情報を取得
        const rect = elm.getBoundingClientRect()
        // 要素内でのカーソル位置
        const posY = event.clientY - rect.top
        // 要素の縦幅に対しての割合(念のため0-1に丸めておく)
        const ratioY = Math.min(1, Math.max(0, posY / rect.height))
        // 移動先のindexを更新
        setTargetIndex(index + Math.round(ratioY))
      },
      // 初期のイベントはキャンセルしておく(制御されていないEventの発生を無くすため)
      onDragEnter(event) {
        event.preventDefault()
      },
      onDragLeave(event) {
        event.preventDefault()
      },
      onDrop(event) {
        event.preventDefault()
      },
    }
  }

  /**
   * 配列の要素を移動させる
   */
  function moveItem(arr: Todo[], currentIndex: number, targetIndex: number) {
    const targetItem = arr[currentIndex]
    let resArr = arr.map((target, i) => (i === currentIndex ? null : target))
    resArr.splice(targetIndex, 0, targetItem)
    return resArr.flatMap((target) => (target !== null ? [target] : []))
  }

  const getGhostProps = (item: Todo, index: number): ComponentProps<'li'> => {
    return {
      onDragOver(event) {
        event.preventDefault()
        // ゴーストの表示位置 = 移動先のindexなので座標計算は必要ない
        setTargetIndex(index)
      },
      onDragEnter(event) {
        event.preventDefault()
      },
      onDragLeave(event) {
        event.preventDefault()
      },
      onDrop(event) {
        event.preventDefault()
      },
    }
  }

  // 表示用のJSX.Elementを生成する
  const getViews = (): JSX.Element[] | undefined => {
    let views = items?.map((item, index) => {
      return (
        <li
          className="mt-1 w-40 list-none rounded-lg border border-solid border-gray-800 bg-white px-4 text-gray-700 shadow-md"
          key={item.id}
          {...getHandleProps(
            item,
            index
          )} /** スプレッド構文で内包されている関数を展開 */
          {...getItemProps(item, index)}
        >
          <p>{item.title}</p>
          <p>{MAPPED_TODO_PRIORITY_LABEL(index)}</p>
        </li>
      )
    })

    if (views && activeId && targetIndex >= 0) {
      const ghostItem = items?.find((target) => target.id === activeId)
      // 選択中のアイテムをゴーストとして移動先候補に挿入
      if (ghostItem) {
        const ghost = (
          <li
            key="__ghost__"
            className="mt-1 w-40 list-none rounded-lg border border-solid border-gray-800 bg-white px-4 text-gray-700 opacity-20 shadow-md"
            {...getGhostProps(ghostItem, targetIndex)}
          >
            <p>{ghostItem.title}</p>
            <p>{MAPPED_TODO_PRIORITY_LABEL(targetIndex)}</p>
          </li>
        )

        // targetIndexの位置にゴーストを挿入
        views = [
          ...views.slice(0, targetIndex),
          ghost,
          ...views.slice(targetIndex),
        ]

        console.log('after: views.length')
        console.log(views.length)
      }
    }

    return views
  }

  return (
    <Group direction="column">
      <ul className="list-none">{getViews()}</ul>
    </Group>
  )
}
