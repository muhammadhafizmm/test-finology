export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    zipcode: string;
    street: string;
    suite?: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
};

export type UserFilterValue = {
  cities: string[];
  companies: string[];
  search: string;
};
