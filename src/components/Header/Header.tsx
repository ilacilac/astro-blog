import React from 'react'
import {
  NotebookPen,
  Github,
  HomeIcon,
  Search,
  CircleUserRound,
  Folder,
  FolderOpen,
} from 'lucide-react'
import styles from './styles.module.scss'
import { useStore } from '@nanostores/react'
import {
  activeItem,
  activeTitle,
  expandedSections,
  setActiveItem,
  setActiveTitle,
  setExpandedSections,
} from '@/store/navigation'

type ContentItem = {
  slug: string
  data: { title: string }
}

type Category = {
  name: string
  data: ContentItem[]
}

interface HeaderProps {
  contentsByCategory: Category[]
}

const Header = ({ contentsByCategory }) => {
  const $expandedSections = useStore(expandedSections)
  const $activeTitle = useStore(activeTitle)
  const $activeItem = useStore(activeItem)

  return (
    <header className={styles['header']}>
      {/* S : 헤더 좌측 */}
      <div className={styles['header-left']}>
        <nav className={styles['nav-top']}>
          <button>
            <a href="/">
              <HomeIcon width={32} height={32} color="var(--gray-light)" />
              <p className="a11y-hidden">홈</p>
            </a>
          </button>
          <button>
            <NotebookPen width={32} height={32} color="var(--gray-light)" />
            <p className="a11y-hidden">탐색기</p>
          </button>
          <button>
            <Search width={32} height={32} color="var(--gray-light)" />
            <p className="a11y-hidden">검색</p>
          </button>
          <button>
            <a href="https://github.com/ilacilac" target="_blank">
              <Github width={32} height={32} color="var(--gray-light)" />
              <p className="a11y-hidden">Github 새 창으로 바로가기</p>
            </a>
          </button>
        </nav>
        <div className={styles['nav-bottom']}>
          <button>
            <a href="/about">
              <CircleUserRound width={32} height={32} color="var(--gray-light)" />
              <p className="a11y-hidden">이력서</p>
            </a>
          </button>
        </div>
      </div>
      {/* E : 헤더 좌측 */}

      {/* S : 헤더 우측 */}
      <div className={styles['header-right']}>
        {contentsByCategory.map(({ name, data }) => (
          <div key={name}>
            <div
              className={`${styles['header-title']} ${$expandedSections[name] ? styles['active-title'] : ''}`}
              onClick={() => setExpandedSections(name)}
              style={{ cursor: 'pointer' }}
            >
              {$expandedSections[name] ? <FolderOpen size={16} /> : <Folder size={16} />}
              {name}
            </div>

            {$expandedSections[name] && (
              <ul>
                {data.map((item) => (
                  <li
                    key={item.slug}
                    className={`${styles['header-content-title']} ${item.slug === $activeItem ? styles['active-title'] : ''}`}
                  >
                    <a href={`/${name}/${item.slug}`}>{item.data.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {/* E : 헤더 우측 */}
    </header>
  )
}

export default Header
