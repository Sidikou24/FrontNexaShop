export interface Product {
    id: number;
    storeId: number;
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    warranty?: string;
    color?: string;
    imageUrl?: string;
  }
  