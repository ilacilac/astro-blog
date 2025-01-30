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
} from '@/store/navigation'
import { contentsAtom } from '@/store/contents'

const Header = ({ contentsByCategory }) => {
  const [isClient, setIsClient] = useState(false)
  const $expandedSections = useStore(expandedSections)
  const $activeTitle = useStore(activeTitle)
  const $activeItem = useStore(activeItem)
  const $contentsByCategory = useStore(contentsAtom)

  useEffect(() => {
    Object.keys($expandedSections).forEach((section) => {
      if (activeTitle.value === section) {
        setExpandedSections(section, true)
      }
    })
  }, [])
  useEffect(() => {
    setIsClient(true)
    // 현재 URL 정보를 기반으로 활성화 상태를 설정

    const path = window?.location.pathname.split('/').filter(Boolean) // ['', 'blog', 'article-1'] -> ['blog', 'article-1']
    setActiveTitle(path[0] || null) // 첫 번째 경로를 activeTitle로 설정
    setActiveItem(path[1] || null) // 두 번째 경로를 activeItem으로 설정
  }, [])

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
                // $activeTitle === name ? styles['active-title'] : ''
                $expandedSections[name] ? styles['active-title'] : ''
              }`}
              onClick={() => setExpandedSections(name)}
              style={{ cursor: 'pointer' }}
            >
              {/* <a href={`/${name}`}>{name}</a> */}
              {$expandedSections[name] ? <FolderOpen size={16} /> : <Folder size={16} />}
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
                    <li
                      key={item.slug}
                      // className={styles['header-content-title']
                      // title === $activeTitle ? styles['active-title'] : ''
                      // }
                      className={`${styles['header-content-title']} ${item.slug === $activeItem ? styles['active-title'] : ''}`}
                    >
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
