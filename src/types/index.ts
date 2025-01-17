export interface Image {
  src: any;
  id: string;
  url: string;
  photographer: string;
  alt: string;
}

export interface SearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Image[];
}