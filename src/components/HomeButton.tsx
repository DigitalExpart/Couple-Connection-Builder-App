import { Home } from 'lucide-react';

interface HomeButtonProps {
  onClick: () => void;
}

export function HomeButton({ onClick }: HomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center group"
      title="Back to Welcome"
    >
      <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  );
}
