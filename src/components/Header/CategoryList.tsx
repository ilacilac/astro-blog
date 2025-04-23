import {
  useEffect,
  useState,
  type JSXElementConstructor,
  type Key,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
} from 'react'
import { Folder, FolderOpen } from 'lucide-react'

// 타입 정의 개선
interface PostItem {
  slug: string
  data: {
    title: string
    date: Date
    [key: string]: any
  }
}

interface CategoryListProps {
  name: string
  data: PostItem[]
  isActiveCategory: boolean
  currentPath: string
}

export default function CategoryList({
  name,
  data,
  isActiveCategory,
  currentPath,
}: CategoryListProps) {
  const [isOpen, setIsOpen] = useState(isActiveCategory)

  // 항목 수를 보여주는 뱃지 텍스트
  const badgeText = `${data.length} ${data.length === 1 ? 'item' : 'items'}`

  return (
    <div className="mb-4">
      <button
        className={`flex items-center justify-between w-full px-2 py-1 rounded hover:bg-[var(--gray-dark)] transition-colors ${isOpen ? 'text-[var(--text-color)]' : 'text-[var(--gray-light)]'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`category-${name}`}
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <FolderOpen size={20} aria-hidden="true" />
          ) : (
            <Folder size={20} aria-hidden="true" />
          )}
          <span className="capitalize">{name}</span>
        </div>
        <span className="text-xs text-[var(--gray-light)] bg-[var(--gray-dark)] px-2 py-0.5 rounded-full">
          {badgeText}
        </span>
      </button>

      {isOpen && (
        <ul
          id={`category-${name}`}
          className="mt-2 pl-6 space-y-2"
          role="region"
          aria-label={`${name} 목록`}
        >
          {data.map((item: PostItem) => {
            const isActivePost = currentPath.includes(`/${name}/${item.slug}`)
            const postPath = `/${name}/${item.slug}`

            return (
              <li
                key={item.slug}
                className={`text-sm ${isActivePost ? 'text-[var(--text-color)] font-medium' : 'text-[var(--gray-light)]'}`}
              >
                <a
                  href={postPath}
                  className="hover:text-[var(--text-color)] transition-colors block py-1 px-2 rounded hover:bg-[var(--gray-dark)]"
                  aria-current={isActivePost ? 'page' : undefined}
                >
                  {item.data.title}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
