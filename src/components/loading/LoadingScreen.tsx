
import { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [text, setText] = useState('');
  const fullText = 'LOADING...';
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Animação de digitação letra por letra
  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 200);
      
      return () => clearTimeout(timeout);
    } else {
      // Após completar o texto, aguarde um pouco antes de concluir o carregamento
      const timeout = setTimeout(() => {
        console.log("Text animation complete, setting loadingComplete to true");
        setLoadingComplete(true);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [text]);

  // Animar a rotação da luva
  useEffect(() => {
    const animateGlove = () => {
      setRotation(prev => (prev + 2) % 360);
      requestAnimationFrame(animateGlove);
    };
    
    const animation = requestAnimationFrame(animateGlove);
    
    return () => cancelAnimationFrame(animation);
  }, []);

  // Efeito de transição quando o carregamento é concluído
  useEffect(() => {
    if (loadingComplete) {
      console.log("Loading complete state reached, calling onLoadingComplete in 500ms");
      const timeout = setTimeout(() => {
        console.log("Calling onLoadingComplete callback");
        onLoadingComplete();
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [loadingComplete, onLoadingComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center transition-opacity duration-800  ${loadingComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

      <div className="mb-8 relative">
      <Dumbbell
       className="text-martial w-20 h-20" 
        style={{ 
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
            filter: 'drop-shadow(0 0 8px rgba(255,0,0,0.7))'
          }} 
        />

      </div>
      <div className="font-mono text-4xl md:text-6xl text-martial font-bold tracking-widest">
        {text}
      </div>
    </div>
  );
};

export default LoadingScreen;
