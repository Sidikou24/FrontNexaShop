// src/models/product.ts

// Interface qui correspond exactement à la structure de l'entité ProductEntity du backend
export interface ProductDto {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  warranty: string;
  color: string;
  storeId: number;
  categoryId: number;
}

// Interface pour les données reçues de l'API (correspond à la structure de ResponseModel<T>)
export interface ApiResponse<T> {
  success: boolean;
  body: T;
  errors?: string[];
  message?: string;
}

// Interface pour l'image (correspond à ImageEntity)
export interface ProductImage {
  imageId: number;
  productId: number;
  imageName: string;
  description: string;
  bytes: string; // Base64 string pour représenter le byte[]
  extension: string;
  imageUrl?: string; // Propriété supplémentaire pour le frontend
}

// Notre modèle de données pour le frontend
export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public warranty: string = '',
    public color: string = '',
    public categoryId: number = 0,
    public storeId: number = 0,
    public imageUrl?: string
  ) {}

  // Factory method pour transformer les données de l'API en objet Product
  static fromApi(dto: ProductDto): Product {
    return new Product(
      dto.productId,
      dto.productName,
      dto.productDescription,
      dto.productPrice,
      dto.productQuantity,
      dto.warranty || '',
      dto.color || '',
      dto.categoryId,
      dto.storeId
    );
  }

  // Méthode pour convertir Product en ProductDto pour l'envoi à l'API
  toApiDto(): ProductDto {
    return {
      productId: this.id,
      productName: this.name,
      productDescription: this.description,
      productPrice: this.price,
      productQuantity: this.stock,
      warranty: this.warranty,
      color: this.color,
      storeId: this.storeId,
      categoryId: this.categoryId
    };
  }
}

// Interface pour le nouveau produit dans le formulaire
export interface NewProductForm {
  id: number | null;
  name: string;
  category: string | number;
  description: string;
  price: number;
  stock: number;
  imageFile: File | null;
  warranty: string;
  color: string;
  storeId?: number;
  categoryId?: number;
}