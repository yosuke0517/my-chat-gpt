import { FC, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  bg?: string
  children: ReactNode // ラップされたコンポーネントを受け取る
}

export const Layout: FC<Props> = ({
  children,
  bg = 'bg-black',
  title = 'Mantine',
}) => {
  const style = `flex w-full min-h-screen ${bg}`
  return (
    <div className={style}>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex flex-1 flex-col justify-center p-4">
        {children}
      </main>
      <footer></footer>
    </div>
  )
}
