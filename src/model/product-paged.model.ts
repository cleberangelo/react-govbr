import { Product } from "./product.model"

export class ProductPaged {
    records?: Product[];
    pageNumber: number;
    pageSize: number;
    recordCount?: number;
    lastPage?: number;
}