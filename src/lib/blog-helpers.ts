import { format } from 'date-fns'

export const getBlogLink = (slug: string) => {
  return `/entry/${slug}`
}

export const getDateStr = date => {
  return format(date, 'yyyy/MM/dd')
}

export function compareDate(a: any, b: any) {
  return a.Date < b.date ? 1 : -1
}

export const postIsPublished = (post: any) => {
  return post.Published === 'Yes'
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
