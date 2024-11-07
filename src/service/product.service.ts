import { apiClient as api } from "../auth/HttpInterceptor";
import { Product } from "../model/product.model";
import { ProductPaged } from "../model/product-paged.model";

export const ProductService = {
  read: async (id: number): Promise<Product> => {
    return (await api.get<Product>("/product/find/" + id)).data;
  },

  list: async (): Promise<Product[]> => {
    return (await api.get<Product[]>("/product/list")).data;
  },

  page: async (start: number, limit: number): Promise<ProductPaged> => {
    return (await api.get<ProductPaged>(`/product/page/${start}/${limit}`)).data;
  },

  create: async (data: Product): Promise<Product> => {
    return (await api.post<Product>("/product/create", data)).data;
  },

  update: async (data: Product): Promise<Product> => {
    return (await api.put<Product>("/product/update/" + data.id, data)).data;
  },
}
