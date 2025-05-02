// src/models/Product.ts
export interface ProductDto {
    productId:        number;
    productName:      string;
    productDescription: string;
    productPrice:     number;
    productQuantity:  number;
    storeId:          number;
    categoryId:       number;
}

export class Product {
    constructor(
        public id:          number,
        public name:        string,
        public description: string,
        public price:       number,
        public stock:       number,
    ) {}

    /* Factory = point unique de transformation */
    static fromApi(dto: ProductDto): Product {
        return new Product(
            dto.productId,
            dto.productName,
            dto.productDescription,
            dto.productPrice,
            dto.productQuantity
        );
    }
}
