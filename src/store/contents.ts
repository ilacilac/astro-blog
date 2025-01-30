import { atom, map } from 'nanostores'

// 상태를 atom으로 선언
export const contentsAtom = atom([])

export function addContents(contents) {
  contentsAtom.set([...contentsAtom.get(), contents])
}
