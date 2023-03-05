/** 指定した秒数処理を止める */
export const delay = async (ms: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
