import { atom, map } from 'nanostores'

// 상태를 atom으로 선언
export const expandedSections = atom<{ [key: string]: boolean }>({})
export const activeTitle = atom<string | null>(null)
export const activeItem = atom<string | null>(null)

// expandedSections 상태를 업데이트하는 함수
export function setExpandedSections(name: string) {
  // 현재 상태 가져오기
  const currentState = expandedSections.get()

  // 해당 섹션의 상태를 반전시킴
  expandedSections.set({
    ...currentState, // 기존 상태 유지
    [name]: !currentState[name], // 해당 섹션의 값만 반전
  })
}

// activeTitle 상태를 업데이트하는 함수
export function setActiveTitle(title: string | null) {
  activeTitle.set(title)
}

// activeItem 상태를 업데이트하는 함수
export function setActiveItem(item: string | null) {
  activeItem.set(item)
}
