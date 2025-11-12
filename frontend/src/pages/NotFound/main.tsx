import { useNavigate } from 'react-router-dom';
import type { NotFoundPageProps } from './types';

export const NotFoundPage = (props: NotFoundPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Voltar para Home
      </button>
    </div>
  );
};

export default NotFoundPage;
