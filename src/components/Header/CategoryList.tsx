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

export default function CategoryList({ name, data, isActiveCategory }: any) {
  const [isOpen, setIsOpen] = useState(isActiveCategory)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(window.location.pathname) // 현재 경로를 상태에 저장
  }, [])

  return (
    <div>
      <div
        className={`header-title ${isOpen ? 'active-title' : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FolderOpen size={20} /> : <Folder size={20} />}
        {name}
      </div>

      {isOpen && (
        <ul className="header-content-wrap">
          {data.map(
            (item: {
              slug: Key
              data: {
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
              }
            }) => {
              const isActivePost = currentPath.includes(`/${name}/${item.slug}`)

              return (
                <li
                  key={item.slug}
                  className={`header-content-title ${isActivePost ? 'active-title' : ''}`}
                >
                  <a href={`/${name}/${item.slug}`}>{item.data.title}</a>
                </li>
              )
            }
          )}
        </ul>
      )}
    </div>
  )
}
