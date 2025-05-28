export interface ResourceList{
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string[];
  isFavorite?: boolean;
}
