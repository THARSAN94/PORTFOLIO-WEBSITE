import React, { useState } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import { X, Check, ZoomIn, RotateCcw, RotateCw, Crop, Upload, Sparkles } from 'lucide-react';

interface CropImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropSave: (croppedImageBase64: string) => void;
  onNewImageSelected?: (newSrc: string) => void;
}

export const CropImageModal: React.FC<CropImageModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropSave,
  onNewImageSelected,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [aspect, setAspect] = useState<number>(200 / 256); // Matches Polaroid card slot ratio (200/256)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen || !imageSrc) return null;

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      if (croppedImage) {
        onCropSave(croppedImage);
        onClose();
      }
    } catch (e) {
      console.error('Error cropping image:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && onNewImageSelected) {
          onNewImageSelected(event.target.result as string);
          setZoom(1);
          setRotation(0);
          setCrop({ x: 0, y: 0 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 paper-card relative flex flex-col gap-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-amber-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
              Crop & Position Your Profile Picture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-amber-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-900 border border-amber-300 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tip */}
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          <strong>Drag & move</strong> the image inside the frame to crop exactly where you want (e.g. adjust head/hair position).
        </p>

        {/* Cropper Container */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-950 rounded-2xl overflow-hidden border-2 border-amber-300 dark:border-slate-700 shadow-inner">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            showGrid={true}
            style={{
              containerStyle: { width: '100%', height: '100%' },
              cropAreaStyle: { border: '2px solid #f59e0b', borderRadius: '12px' },
            }}
          />
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center justify-between gap-2 bg-amber-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-amber-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">Frame Aspect Ratio:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setAspect(200 / 256)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                Math.abs(aspect - 200 / 256) < 0.01
                  ? 'bg-amber-500 text-amber-950 border-amber-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700'
              }`}
            >
              Card Frame (Exact Fit)
            </button>
            <button
              type="button"
              onClick={() => setAspect(4 / 5)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                Math.abs(aspect - 4 / 5) < 0.01
                  ? 'bg-amber-500 text-amber-950 border-amber-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700'
              }`}
            >
              4:5 (Portrait)
            </button>
            <button
              type="button"
              onClick={() => setAspect(1 / 1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                aspect === 1 / 1
                  ? 'bg-amber-500 text-amber-950 border-amber-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700'
              }`}
            >
              1:1 (Square)
            </button>
            <button
              type="button"
              onClick={() => setAspect(3 / 4)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                aspect === 3 / 4
                  ? 'bg-amber-500 text-amber-950 border-amber-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700'
              }`}
            >
              3:4 (Headshot)
            </button>
          </div>
        </div>

        {/* Sliders & Tools */}
        <div className="space-y-3 bg-amber-50/70 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-800">
          {/* Zoom Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Zoom Level</span>
              </span>
              <span className="font-mono text-amber-700 dark:text-amber-400">{zoom.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Rotation & Reset */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rotate:</span>
              <button
                type="button"
                onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-100 cursor-pointer"
                title="Rotate 90deg Counter-Clockwise"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-100 cursor-pointer"
                title="Rotate 90deg Clockwise"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setRotation(0);
              }}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-amber-100 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 font-bold text-xs hover:bg-amber-200 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-xs">
            <Upload className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <span>Choose Different File</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              ) : (
                <Check className="w-4 h-4 text-amber-400" />
              )}
              <span>{isProcessing ? 'Cropping...' : 'Crop & Save Photo'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
