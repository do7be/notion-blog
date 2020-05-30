import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'do7beが読んだ記事についての感想を書くとこ', page: '/' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>
          {titlePre ? `${titlePre} |` : ''}{' '}
          do7beが読んだ記事についての感想を書くとこ
        </title>
        <meta
          name="description"
          content="do7beが読んだ記事についての感想を書くとこ"
        />
        <meta
          name="og:title"
          content="do7beが読んだ記事についての感想を書くとこ"
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@do7be" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className="active">{label}</a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
