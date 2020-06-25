import { format } from 'date-fns'

export const getBlogLink = (slug: string) => {
  return `/entry/${slug}`
}

export const getCategoryLink = (category: string) => {
  return `/category/${category}`
}

export const getDateStr = date => {
  return format(date, 'yyyy/MM/dd')
}

export function compareDate(a: any, b: any) {
  return a.Date < b.Date ? 1 : -1
}

export const postIsPublished = (post: any) => {
  return post.Published === 'Yes'
}

export function postsTableToPostsMap(
  postsTable: any,
  preview: boolean = false
) {
  return Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      return post
    })
    .filter(Boolean)
    .sort(compareDate)
}

export const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}
