import { atom, map } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'

// 상태를 atom으로 선언
export const expandedSections = persistentAtom<{ [key: string]: boolean }>(
  'expandedSections', // 로컬 스토리지에 저장될 키
  {}, // 초기값
  { encode: JSON.stringify, decode: JSON.parse } // 직렬화/역직렬화 방식
)
// activeTitle 상태를 관리하는 persistentAtom
export const activeTitle = persistentAtom<string | null>('activeTitle', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

// activeItem 상태를 관리하는 persistentAtom
export const activeItem = persistentAtom<string | null>('activeItem', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

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
