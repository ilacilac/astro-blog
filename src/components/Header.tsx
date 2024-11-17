import React from 'react'
import { NotebookPen, Github, Home, Inbox, Search, Settings, CircleUserRound } from 'lucide-react'
import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles['header']}>
      {/* <!-- S : 헤더 좌측 --> */}
      <div className={styles['header-left']}>
        <nav className={styles['nav-top']}>
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
      <div className={styles['header-right']}></div>
      {/* <!-- E : 헤더 우측 --> */}
    </header>
  )
}

export default Header
