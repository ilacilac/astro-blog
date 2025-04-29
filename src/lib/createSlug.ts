import { GENERATE_SLUG_FROM_TITLE } from '../config'

export default function createSlug(title: string, slug: string | string[]) {
  const normalizedSlug = Array.isArray(slug) ? slug.join('-') : slug.split('/').join('-')

  return !GENERATE_SLUG_FROM_TITLE
    ? normalizedSlug
    : title
        // remove leading & trailing whitespace
        .trim()
        // output lowercase
        .toLowerCase()
        // replace spaces
        .replace(/\s+/g, '-')
        // remove special characters
        .replace(/[^\w-]/g, '')
        // remove leading & trailing separtors
        .replace(/^-+|-+$/g, '')
  // return !GENERATE_SLUG_FROM_TITLE
  //   ? normalizedSlug
  //   : normalizedSlug
  //       .split('/')
  //       .map((part) =>
  //         title
  //           .trim()
  //           .toLowerCase()
  //           .replace(/\s+/g, '-')
  //           .replace(/[^\w-]/g, '')
  //           .replace(/^-+|-+$/g, '')
  //       )
  //       .join('-')
}
