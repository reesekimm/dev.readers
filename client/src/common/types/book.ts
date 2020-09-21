export interface Book {
  [key: string]: unknown;
  /** 도서명 */
  title: string;
  /** 지은이, 옮긴이 */
  author: string;
  /** 출판사 */
  publisher: string;
  /** 출판일 */
  pubDate: string;
  /** 표지 이미지 */
  cover?: string; // TODO: cover 없을 경우 대체 이미지 제공
  /** 책 소개 */
  description?: string;
  /** 알라딘 상품 페이지 링크 */
  link?: string;
}

export type Books = Book[];
