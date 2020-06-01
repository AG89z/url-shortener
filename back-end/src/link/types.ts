export interface Link {
  id: string;
  author: string;
  link: string;
  destination: string;
  password?: string;
  expiry?: string;
  created: string;
}

export interface LinkCreator {
  destination: string;
  author: string;
  password?: string;
  expiry?: string;
}
