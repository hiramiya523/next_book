// NextPageは、Next.jsのPages向けの型
import { NextPage } from "next"
// Headタグの指定に必要. メタデータを各ページに使いまわせる
import Head from "next/head"

import { GetStaticProps } from "next"


type SSGProps = {
  message: string
}

// SSGは getStaticPropsが返したpropsを受け取ることができる
const SSG:NextPage<SSGProps> = (props: SSGProps) => {
  const {message} = props

  return (
    <div>
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>
          このページは静的サイト生成によってビルド時に生成されたページです
        </p>
        <p>
          {message}
        </p>
      </main>
    </div>
  )
}

// 1. getStaticPropsという非同期関数を定義してexportすると、ビルド時に実行される
// 2. getStaticPropsは戻り値としてpropsを返すことができ、ページコンポーネントで描画される
// ※GetStaticProps<SSGProps> はSSGPropsを引数にとるgetStaticProps の型
// ※引数のcontextは、ReactのContextとは別物. 実行関連の情報がまとまったオブジェクト。
export const getStaticProps: GetStaticProps<SSGProps> = async(context) =>{
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp}に getStaticProps が実行されました。`

  return {
    // ここで返したpropsを元に、ページコンポーネントを描画する
    props: {
      message,
    },
  }

}


// ページコンポーネントは、export defaultでエクスポートする
export default SSG