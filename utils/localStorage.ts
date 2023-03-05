export type StorageValueTypes =
  | string
  | number
  | any[]
  | object
  | boolean
  | null

export const LocalStorageKeyList = {
  Messages: 'myMessages',
}
/**
 * ローカルストレージに値をセットします
 */
export const setLocalStorage = (
  key: typeof LocalStorageKeyList[keyof typeof LocalStorageKeyList],
  value: StorageValueTypes
) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * ローカルストレージから値を取得します
 */
export const getLocalStorage = (
  key: typeof LocalStorageKeyList[keyof typeof LocalStorageKeyList]
) => {
  const value: string | null = localStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value)
}

export const removeLocalStorage = (
  key: typeof LocalStorageKeyList[keyof typeof LocalStorageKeyList]
) => {
  localStorage.removeItem(key)
}
