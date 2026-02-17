
export interface Product {
  id: string;
  name: string;
  category: 'watch' | 'sunglasses';
  price: number;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type EditAction = {
  prompt: string;
  originalImage: string;
  editedImage: string | null;
  status: 'idle' | 'processing' | 'success' | 'error';
};
