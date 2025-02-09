import { useEffect, useState } from 'react'
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
        {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
        {name}
      </div>

      {isOpen && (
        <ul>
          {data.map((item) => {
            const isActivePost = currentPath === `/${name}/${item.slug}` // 현재 경로와 비교

            return (
              <li
                key={item.slug}
                className={`header-content-title ${isActivePost ? 'active-title' : ''}`}
              >
                <a href={`/${name}/${item.slug}`}>{item.data.title}</a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
