import Link from 'next/link'
import Header from '../../components/header'
import CategoryBadge from '../../components/categoryBadge'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import {
  getBlogLink,
  getCategoryLink,
  getDateStr,
  postsTableToPostsMap,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { useKeyToPastel } from '../../lib/key-to-pastel'

export async function getStaticProps({
  params: { category },
  preview,
}: {
  params: any
  preview: boolean
}) {
  const postsTable = await getBlogIndex()
  const posts = postsTableToPostsMap(postsTable, preview)
  const filtered = posts.filter(post => post.Categories === category)

  return {
    props: {
      preview: preview || false,
      posts: filtered,
      category,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  return {
    paths: Object.keys(postsTable)
      .filter(post => postsTable[post].Published === 'Yes')
      .map(Categories => getCategoryLink(Categories)),
    fallback: true,
  }
}

export default ({ posts = [], preview, category }) => {
  const pastel = useKeyToPastel(category)

  return (
    <>
      <Header titlePre="" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>
          do7beが読んだ記事一覧{' '}
          <span
            className={blogStyles.category}
            style={{
              backgroundColor: `#${pastel}`,
            }}
          >
            {category}
          </span>
        </h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map(post => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <Link href="/entry/[slug]" as={getBlogLink(post.Slug)}>
                  <div className={blogStyles.titleContainer}>
                    {!post.Published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    <a className={blogStyles.link}>{post.Page}</a>
                  </div>
                </Link>
              </h3>
              {post.Categories && (
                <div className={blogStyles.categoryContainer}>
                  カテゴリー:{' '}
                  <CategoryBadge category={post.Categories} pastel={pastel} />
                </div>
              )}
              {post.Date && (
                <div className="posted">投稿日: {getDateStr(post.Date)}</div>
              )}
              <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
