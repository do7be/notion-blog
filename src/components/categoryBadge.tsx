import blogStyles from '../styles/blog.module.css'

export default function CategoryBadge({
  category,
  pastel,
}: {
  category: string
  pastel: string
}) {
  return (
    <span
      className={blogStyles.category}
      style={{
        backgroundColor: `#${pastel}`,
      }}
    >
      {category}
    </span>
  )
}
