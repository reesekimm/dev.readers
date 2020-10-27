export interface Book {
  /** 도서명 */
  title: string;
  /** 지은이, 옮긴이 */
  author: string;
  /** 출판사 */
  publisher: string;
  /** 출판일 */
  pubDate: string;
  /** ISBN13 */
  isbn13: string;
  /** 표지 이미지 */
  cover: string;
  /** 알라딘 상품 페이지 링크 */
  link: string;
}

export type Books = Book[];

export interface ISBN {
  isbn13: string;
}
