export interface Category {
    _id: string;
    url: string;
    name: string;
    summary: string;
    description: string;
    thumbnail?: string;
    banner?: string;
    parent?: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: string;
  }