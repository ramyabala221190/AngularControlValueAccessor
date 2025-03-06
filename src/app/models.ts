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
  