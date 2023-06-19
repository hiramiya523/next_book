/**
 * getStaticPathsを用いた、複数ページのSSG
 * ポイント：動的パスルーティング、getStaticProps、getStaticPaths、fallback
 */
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { useRouter } from "next/router";

// interface PostProps extends ParsedUrlQuery {
//   id: string,
// }

type PostProps = {
  id: string;
};

const Post: NextPage<PostProps> = (props) => {
  const { id } = props;
  const router = useRouter();

  // フォールバック向け
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルド時に生成されたページです</p>
        <p>{`/posts/${id}に対応するページです`}</p>
      </main>
    </div>
  );
};

// getStaticPaths must used with getStaticProps
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { id: "1" }, },
    { params: { id: "2" }, },
    { params: { id: "3"} , },
  ];

  // fallbackは、getStaticPathsが生成するページが存在しない場合の処理を記載
  // true, false ⇒ 404, blockingを指定
  return {
    paths, 
    //アクセスしうるパス以外のパスに対するアクセスの対処
    fallback: false // 例えばtrueにして、posts/5でアクセスが来たらページ生成される
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  // context.paramsがundefinedになる可能性があると、コンパイラに怒られるので、以下対処パターン
  // 対処1. if判定
  // if(context.params === undefined){
  //   return {props: {id: "1"}};
  // }

  // const id = context.params.id as string;

  // 対処2. use 'as'
  // const id = (context.params as PostProps).id as string;

  // 対処3. オプションパラメータの付与（?)
  // const id = context.params?.id as string;

  // 対処4. Non-null assertion operator : コンパイラに対して、nullにならない事を伝える
  // const id = context.params!.id as string;

  // 対処5. params時点でas Propsとして、idの存在を確定させる
  const PostProps = context.params as PostProps;
  const id = PostProps.id;

  return {
    props: { id },
  };
};

export default Post;
