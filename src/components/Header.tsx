import React, { useEffect, useState } from 'react'
import {
  NotebookPen,
  Github,
  Home,
  Inbox,
  Search,
  Settings,
  CircleUserRound,
  HomeIcon,
  Folder,
  FolderOpen,
} from 'lucide-react'
import styles from './styles.module.scss'
import { getCollectionNames } from '@/lib/utils'
import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'
import {
  activeItem,
  activeTitle,
  expandedSections,
  setActiveItem,
  setActiveTitle,
  setExpandedSections,
} from '@/store/store'

const Header = ({ contentsByCategory }) => {
  // const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  // const [activeTitle, setActiveTitle] = useState<string | null>(null)
  // const [activeItem, setActiveItem] = useState<string | null>(null)

  const $expandedSections = useStore(expandedSections)
  const $activeTitle = useStore(activeTitle)
  const $activeItem = useStore(activeItem)

  useEffect(() => {
    // 현재 URL 정보를 기반으로 활성화 상태를 설정
    const path = window.location.pathname.split('/').filter(Boolean) // ['', 'blog', 'article-1'] -> ['blog', 'article-1']

    setActiveTitle(path[0] || null) // 첫 번째 경로를 activeTitle로 설정
    setActiveItem(path[1] || null) // 두 번째 경로를 activeItem으로 설정
  }, [])

  // const toggleSection = (name: string) => {
  //   setExpandedSections((prevState) => ({
  //     ...prevState,
  //     [name]: !prevState[name],
  //   }))
  // }

  console.log($expandedSections)
  console.log($activeTitle)
  console.log($activeItem)

  return (
    <header className={styles['header']}>
      {/* <!-- S : 헤더 좌측 --> */}
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
              <p className="a11y-hidden">Github 새 창 으로 바로가기</p>
            </a>
          </button>
        </nav>
        {/* <!-- Nav 하단 --> */}
        <div className={styles['nav-bottom']}>
          <button>
            <a href="/about">
              <CircleUserRound width={32} height={32} color="var(--gray-light)" />
              <p className="a11y-hidden">이력서</p>
            </a>
          </button>
        </div>
      </div>
      {/* <!-- E : 헤더 좌측 --> */}
      {/* <!-- S : 헤더 우측 --> */}
      <div className={styles['header-right']}>
        {contentsByCategory.map(({ name, data }) => (
          <div key={name}>
            <div
              className={`${styles['header-title']} ${
                $activeTitle === name ? styles['active-title'] : ''
              }`}
              onClick={() => setExpandedSections(name)}
              style={{ cursor: 'pointer' }}
            >
              {/* <a href={`/${name}`}>{name}</a> */}
              {name}
            </div>
            {$expandedSections[name] && (
              <ul>
                {data.map(
                  (item: {
                    slug: React.Key
                    data: {
                      title: string
                    }
                  }) => (
                    <li key={item.slug} className={styles['header-content-title']}>
                      <a href={`/${name}/${item.slug}`}>{item.data.title}</a>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
      {/* <!-- E : 헤더 우측 --> */}
    </header>
  )
}

export default Header
