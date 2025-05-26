
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from '../ui/dialog';
import { Button } from '../ui/buttonSlider';
import { Info, X } from 'lucide-react';
import { OlympicSport } from '../../data/OlympicSportsData';

interface SportInfoModalProps {
  sport: OlympicSport;
}

const SportInfoModal = ({ sport }: SportInfoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
        >
          <Info className="h-4 w-4 mr-2" />
          Ver detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-4 bg-black/90 border-white/20 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center justify-between">
            {sport.name}
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
              Desde {sport.olympicYear}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Descrição</h4>
            <p className="text-gray-200 text-sm leading-relaxed">{sport.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2 border-l-4 border-red-500 pl-3">
              História Olímpica
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">{sport.history}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SportInfoModal;