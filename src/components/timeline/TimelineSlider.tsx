
import React, { useEffect, useRef, useState } from "react";
import { TimelineItem } from "@/data/timelineData";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface TimelineSliderProps {
  items: TimelineItem[];
  onSelect: (item: TimelineItem) => void;
  selectedItem: TimelineItem;
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({
  items,
  onSelect,
  selectedItem,
}) => {
  // Convert selectedItem to slider value
  const getSliderValue = (): number[] => {
    const index = items.findIndex(item => item.id === selectedItem.id);
    return [Math.max(0, index)];
  };

  // Handle slider value change
  const handleSliderChange = (value: number[]) => {
    const index = Math.round(value[0]);
    if (index >= 0 && index < items.length && items[index].id !== selectedItem.id) {
      onSelect(items[index]);
    }
  };

  // Calculate slider steps based on items length
  const sliderMax = items.length - 1;

  // Add custom styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Customize the thumb */
      .SliderThumb[data-orientation="horizontal"] {
        background: #f04438 !important;
        width: 1.25rem !important;
        height: 2.5rem !important;
        top: -1rem !important;
        border-radius: 0.25rem !important;
      }
      
      /* Customize the track */
      .SliderTrack[data-orientation="horizontal"] {
        height: 0.5rem !important;
        background: white !important;
        border-radius: 9999px !important;
      }
      
      /* Customize the range */
      .SliderRange[data-orientation="horizontal"] {
        height: 0.5rem !important;
        background: #f04438 !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="w-full relative pb-10 pt-6">
      {/* Slider component with proper styling */}
      <div className="relative">
        <Slider
          value={getSliderValue()}
          min={0}
          max={sliderMax}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>
      
      {/* Timeline markers */}
      <div className="relative w-full">
        {items.map((item, index) => {
          const isActive = item.id === selectedItem.id;
          return (
            <div
              key={item.id}
              className={cn(
                "absolute w-1 h-6 -bottom-8 transition-colors duration-300",
                isActive ? "bg-martial-red" : "bg-white",
              )}
              style={{
                left: `${(index / sliderMax) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {/* Marker extension */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <div 
                  className={cn(
                    "h-10 w-1 transition-colors duration-300",
                    isActive ? "bg-martial-red" : "bg-white",
                  )}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineSlider;
