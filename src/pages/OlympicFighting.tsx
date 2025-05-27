  import Navbar from '@/components/layout/Navbar';
import OlympicSportsSlider from '../components/olympicSlider/OlympicSportsSlider';

  const OlympicFighting = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Navbar />
        <OlympicSportsSlider />
      </div>
    );
  };

  export default OlympicFighting;