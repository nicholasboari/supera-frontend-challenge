import { Transfer } from "./transfer";

export interface ApiResponse {
  content: Transfer[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
}
