import { SITE_TITLE } from "../consts";

export default function createSlug(title: string, staticSlug: string) {
  return !SITE_TITLE
    ? staticSlug
    : title
        // remove leading & trailing whitespace
        .trim()
        // output lowercase
        .toLowerCase()
        // replace spaces
        .replace(/\s+/g, "-")
        // remove special characters
        .replace(/[^\w-]/g, "")
        // remove leading & trailing separtors
        .replace(/^-+|-+$/g, "");
}
