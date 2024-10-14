export interface GameInformationProps {
  name: string;
  loading: boolean;
  description: string;
  rating: number;
  price: number;
  image: string;
  createGame: () => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setRating: (rating: number) => void;
  setPrice: (price: number) => void;
  setImage: (image: string) => void;
}

export interface GamePromptProps {
  generateGameListing: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  generatedImgs: string[];
  setPrompt: (prompt: string) => void;
  prompt: string;
}
