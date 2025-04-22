export interface AddressModel {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  }
  
  
  export interface CompanyModel {
    name: string;
    catchPhrase: string;
    bs: string;
  }

  export interface Phone{
    phoneNumber:string,
    preferred:boolean,
    phoneType:string
  }
  
  export interface UserModel {
    id: number;
    name: string;
    dob:Date;
    profile:string;
    username: string;
    email: string;
    address: AddressModel[];
    phone: Phone[];
    website: string;
    company: CompanyModel;
    favourite:number
  }
  
  export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    images: string[]
    thumbnail: string
  }
  
  export interface Dimensions {
    width: number
    height: number
    depth: number
  }
  
  export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }
  
  export interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  