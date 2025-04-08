// components/Header/Sidebar.tsx
import { useEffect, useState } from 'react'
import CategoryList from '@/components/Header/CategoryList'
import {
  Folder,
  Github,
  HomeIcon,
  Search,
  NotebookPen,
  CircleUserRound,
  FolderOpen,
} from 'lucide-react'
export default function Sidebar({
  contentsByCategory,
  currentPath,
}: {
  contentsByCategory: any
  currentPath: string
}) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', isOpen)
    // document.body.classList.toggle('sidebar-closed', !isOpen)
  }, [isOpen])

  return (
    <>
      <div className="header-left">
        <nav className="nav-top">
          <button>
            <a href="/" className={currentPath === '/' ? 'active' : ''}>
              {currentPath === '/' ? (
                <HomeIcon width="32" height="32" color="#dce2fa" />
              ) : (
                <HomeIcon width="32" height="32" color="var(--gray-light)" />
              )}
              <p className="a11y-hidden">홈</p>
            </a>
          </button>
          <button onClick={toggleSidebar}>
            <NotebookPen width="32" height="32" color="var(--gray-light)" />
            <p className="a11y-hidden">탐색기</p>
          </button>
          <button>
            <Search width="32" height="32" color="var(--gray-light)" />
            <p className="a11y-hidden">검색</p>
          </button>
          <button>
            <a href="https://github.com/ilacilac" target="_blank">
              <Github width="32" height="32" color="var(--gray-light)" />
              <p className="a11y-hidden">Github 새 창으로 바로가기</p>
            </a>
          </button>
        </nav>
        <div className="nav-bottom">
          <button>
            <a href="/about" className={currentPath === '/about' ? 'active' : ''}>
              <CircleUserRound width="32" height="32" color="var(--gray-light)" />
              <p className="a11y-hidden">이력서</p>
            </a>
          </button>
        </div>
      </div>

      <div className={`header-right ${isOpen ? 'open' : ''}`}>
        {contentsByCategory.map(({ name, data }: any) => {
          const isActiveCategory = currentPath.startsWith(`/${name}`)
          return (
            <CategoryList
              name={name}
              data={data}
              isActiveCategory={isActiveCategory}
              currentPath={currentPath}
            />
          )
        })}
      </div>
    </>
  )
}
