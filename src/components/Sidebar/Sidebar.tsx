// components/Header/Sidebar.tsx
import { useEffect, useState, useRef } from 'react'
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

// 타입 정의 추가
interface CategoryData {
  name: string
  data: any[]
}

interface SidebarProps {
  contentsByCategory: CategoryData[]
  currentPath: string
}

export default function Sidebar({ contentsByCategory, currentPath }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const contentAreaRef = useRef<HTMLDivElement>(null)

  // 사이드바 상태 초기화 (localStorage에서 가져옴)
  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      const savedSidebarState = localStorage.getItem('sidebarOpen')
      // 저장된 상태가 있으면 적용, 없으면 기본값 true 사용
      const initialState = savedSidebarState !== null ? savedSidebarState === 'true' : true

      // 상태 설정
      setIsOpen(initialState)

      // 초기 렌더링 완료 후 트랜지션 활성화
      setTimeout(() => {
        setIsInitialRender(false)
        document.documentElement.classList.remove('sidebar-closed-initial')
      }, 300)
    }
  }, [])

  // 스크롤 이벤트 리스너 최적화
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 10
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  const toggleSidebar = () => {
    // 모바일에서는 토글하지 않음
    if (window.innerWidth <= 640) {
      return
    }

    const newState = !isOpen
    setIsOpen(newState)

    // 상태를 localStorage에 저장
    localStorage.setItem('sidebarOpen', String(newState))

    // html 요소에도 상태 반영
    if (newState) {
      document.documentElement.classList.remove('sidebar-closed')
      document.documentElement.classList.remove('sidebar-closed-initial')
    } else {
      document.documentElement.classList.add('sidebar-closed')
    }
  }

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', isOpen)

    // html 요소에도 상태 반영
    if (isOpen) {
      document.documentElement.classList.remove('sidebar-closed')
      document.documentElement.classList.remove('sidebar-closed-initial')
    } else {
      document.documentElement.classList.add('sidebar-closed')
    }

    // 화면 크기 감지 - 디바운스 추가
    let resizeTimer: ReturnType<typeof setTimeout>

    const checkScreenSize = () => {
      const width = window.innerWidth
      const isMobileSize = width <= 640
      const isTabletSize = width > 640 && width <= 1024

      setIsMobile(isMobileSize)
      setIsTablet(isTabletSize)

      // 모바일 사이즈로 변경될 때 사이드바 닫기
      if (isMobileSize && isOpen) {
        setIsOpen(false)
        localStorage.setItem('sidebarOpen', 'false')
        document.documentElement.classList.add('sidebar-closed')
      }
    }

    checkScreenSize()

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkScreenSize, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [isOpen])

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : 'closed'} ${isScrolled ? 'scrolled' : ''}`}
      aria-expanded={isOpen}
      role="navigation"
    >
      {/* 왼쪽 아이콘 영역 - 항상 고정 */}
      <div className="sidebar-icons fixed left-0 top-0 w-[60px] h-full bg-[var(--primary)] flex flex-col justify-between z-[100] max-sm:w-full max-sm:h-[60px] max-sm:flex-row">
        <nav className="flex flex-col max-sm:flex-row">
          <button className="flex justify-center items-center w-[60px] h-[60px] cursor-pointer">
            <a
              href="/"
              className={`flex justify-center items-center ${currentPath === '/' ? 'active' : ''}`}
              aria-label="홈"
              aria-current={currentPath === '/' ? 'page' : undefined}
            >
              {currentPath === '/' ? (
                <HomeIcon width="32" height="32" color="#dce2fa" aria-hidden="true" />
              ) : (
                <HomeIcon width="32" height="32" color="var(--gray-light)" aria-hidden="true" />
              )}
              <span className="a11y-hidden">홈</span>
            </a>
          </button>
          <button
            className={`flex justify-center items-center w-[60px] h-[60px] cursor-pointer ${isTablet && isOpen ? 'bg-secondary' : ''}`}
            onClick={toggleSidebar}
            aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
            aria-expanded={isOpen}
          >
            <NotebookPen width="32" height="32" color="var(--gray-light)" aria-hidden="true" />
            <span className="a11y-hidden">탐색기</span>
          </button>
          <button
            className="flex justify-center items-center w-[60px] h-[60px] cursor-pointer"
            aria-label="검색"
          >
            <Search width="32" height="32" color="var(--gray-light)" aria-hidden="true" />
            <span className="a11y-hidden">검색</span>
          </button>
          <button className="flex justify-center items-center w-[60px] h-[60px] cursor-pointer">
            <a
              href="https://github.com/ilacilac"
              className="flex justify-center items-center"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github 새 창으로 바로가기"
            >
              <Github width="32" height="32" color="var(--gray-light)" aria-hidden="true" />
              <span className="a11y-hidden">Github 새 창으로 바로가기</span>
            </a>
          </button>
        </nav>
        <div className="flex justify-center items-center w-[60px] h-[60px] cursor-pointer">
          <button className="flex justify-center items-center w-[60px] h-[60px] cursor-pointer">
            <a
              href="/about"
              className={`flex justify-center items-center ${currentPath === '/about' ? 'active' : ''}`}
              aria-label="이력서"
              aria-current={currentPath === '/about' ? 'page' : undefined}
            >
              <CircleUserRound
                width="32"
                height="32"
                color="var(--gray-light)"
                aria-hidden="true"
              />
              <span className="a11y-hidden">이력서</span>
            </a>
          </button>
        </div>
      </div>

      {/* 오른쪽 콘텐츠 영역 - 열고 닫힘에 따라 이동 */}
      {!isMobile && (
        <div
          ref={contentAreaRef}
          className={`sidebar-content fixed left-[60px] top-0 w-[220px] h-full bg-[var(--secondary)] border-l border-[var(--gray-dark)] p-4 z-[90] transition-transform duration-300 ease-in-out ${!isOpen ? '-translate-x-full' : 'translate-x-0'} max-md:top-[60px] max-md:h-[calc(100vh-60px)]`}
          style={{
            boxShadow: isScrolled
              ? 'rgba(0, 0, 0, 0.12) 0px 4px 12px'
              : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            // 초기 렌더링 시에는 트랜지션 없이 위치 지정
            transition: isInitialRender
              ? 'none'
              : 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
          }}
          aria-hidden={!isOpen}
        >
          {contentsByCategory.map(({ name, data }: CategoryData) => {
            const isActiveCategory = currentPath.startsWith(`/${name}`)
            return (
              <CategoryList
                name={name}
                data={data}
                isActiveCategory={isActiveCategory}
                currentPath={currentPath}
                key={name}
              />
            )
          })}
        </div>
      )}

      {/* 전체 사이드바 크기 조절 영역 - 배경색만 가짐 */}
      <div
        className="sidebar-background fixed top-0 left-0 h-full transition-width duration-300 ease-in-out z-[40]"
        style={{
          width: isOpen ? '280px' : '60px',
          backgroundColor: 'var(--secondary)',
          transition: isInitialRender ? 'none' : 'width 0.3s ease-in-out',
          pointerEvents: 'none', // 클릭 이벤트가 뒤로 전달되도록 설정
        }}
      />
    </div>
  )
}
