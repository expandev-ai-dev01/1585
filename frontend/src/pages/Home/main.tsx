import type { HomePageProps } from './types';

export const HomePage = (props: HomePageProps) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao TODO List</h2>
      <p className="text-gray-600 mb-8">Sistema de gerenciamento de tarefas</p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700">A estrutura base do frontend foi criada com sucesso.</p>
        <p className="text-gray-700 mt-2">Pronto para receber as implementações de features.</p>
      </div>
    </div>
  );
};

export default HomePage;
