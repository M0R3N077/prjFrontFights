import { AlertTriangle } from 'lucide-react';

const Mobile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-neutral-100 p-4">
      <div className="text-center space-y-6">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500" strokeWidth={1.5} />
        <h1 className="text-4xl md:text-5xl font-bold text-red-500">
          Aviso de Compatibilidade
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300">
          Desculpe, sua versão não é compatível.
        </p>
        <p className="text-md text-neutral-400 max-w-md mx-auto">
          Para continuar utilizando nossos serviços, por favor, atualize para a versão mais recente ou entre em contato com o suporte para mais informações.
        </p>
      </div>
    </div>
  );
};

export default Mobile;