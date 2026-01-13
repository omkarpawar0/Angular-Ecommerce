export interface Seller {
    email: string;
    localId: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
}


export interface sellerProduct {
    id?: string;
    sellerId: string;

    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    color: string;

    imageUrl: string;
    // images?: string[];

    discount?: number;
    brand?: string;
    // rating?: number;

    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;

}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  discount : number;
}
