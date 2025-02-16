import * as React from 'react'
import fs from 'fs'
import path from 'path'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { collections } from '@/content/config'
import { getCollection } from 'astro:content'

// 컬렉션 이름 타입 가져오기
type CollectionName = 'posts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getCollectionNames() {
  const collectionsKeys: string[] = Object.keys(collections)
  return collectionsKeys // ['posts', 'etc'] 반환
}
