export interface Store {
  _id: { toString: () => string };
  id: any;
  name: string;
  description: string;
  logo: string;
  products: any[];
  ownerPublicKey: string;
  // Add other fields as needed
} 