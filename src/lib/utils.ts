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

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getCollectionNames() {
  const collectionsKeys: string[] = Object.keys(collections)
  return collectionsKeys // ['posts', 'etc'] 반환
}
