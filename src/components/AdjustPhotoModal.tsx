import React, { useState, useRef, useEffect } from 'react';
import { Profile } from '../types';
import { X, Check, Move, ZoomIn, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';

interface AdjustPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (zoom: number, offsetX: number, offsetY: number) => void;
}

export const AdjustPhotoModal: React.FC<AdjustPhotoModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [zoom, setZoom] = useState<number>(profile.avatarZoom ?? 100);
  const [offsetX, setOffsetX] = useState<number>(profile.avatarOffsetX ?? 0);
  const [offsetY, setOffsetY] = useState<number>(profile.avatarOffsetY ?? 0);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number; startX: number; startY: number }>({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    if (isOpen) {
      setZoom(profile.avatarZoom ?? 100);
      setOffsetX(profile.avatarOffsetX ?? 0);
      setOffsetY(profile.avatarOffsetY ?? 0);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      startX: offsetX,
      startY: offsetY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStart.current.x) / 2;
    const deltaY = (e.clientY - dragStart.current.y) / 2;
    setOffsetX(Math.max(-80, Math.min(80, dragStart.current.startX + deltaX)));
    setOffsetY(Math.max(-80, Math.min(80, dragStart.current.startY + deltaY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        startX: offsetX,
        startY: offsetY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = (e.touches[0].clientX - dragStart.current.x) / 2;
    const deltaY = (e.touches[0].clientY - dragStart.current.y) / 2;
    setOffsetX(Math.max(-80, Math.min(80, dragStart.current.startX + deltaX)));
    setOffsetY(Math.max(-80, Math.min(80, dragStart.current.startY + deltaY)));
  };

  const handleSave = () => {
    onSave(zoom, offsetX, offsetY);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div
        className="bg-[#faf7f0] dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 paper-card relative flex flex-col gap-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-amber-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
              Adjust Profile Photo Position
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-amber-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-900 border border-amber-300 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tip banner */}
        <div className="bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-xl p-2.5 text-xs text-amber-950 dark:text-amber-200 flex items-center gap-2 font-medium">
          <Move className="w-4 h-4 shrink-0 text-amber-700 dark:text-amber-400" />
          <span>
            <strong>Drag the photo</strong> below or use the sliders to lower, center, or zoom your head position!
          </span>
        </div>

        {/* Framing Preview Box */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="text-xs font-mono-code font-bold text-slate-500 mb-2">POLAROID PREVIEW</div>
          <div className="w-52 h-60 bg-white dark:bg-slate-950 p-3 pt-3 pb-8 rounded-2xl border-2 border-amber-300 dark:border-slate-700 shadow-lg relative flex flex-col items-center select-none">
            <div
              className="relative w-full h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                draggable={false}
                style={{
                  transform: `scale(${zoom / 100}) translate(${offsetX}%, ${offsetY}%)`,
                  transformOrigin: 'center center',
                }}
                className="w-full h-full object-cover transition-transform duration-75 pointer-events-none"
              />
              <div className="absolute inset-0 border-2 border-dashed border-amber-400/40 pointer-events-none rounded-xl" />
            </div>
            <div className="mt-2 text-center font-handwriting text-slate-700 dark:text-slate-300 font-bold text-xs">
              {profile.subtitle || 'B.Tech AI & DS'}
            </div>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => {
              setZoom(105);
              setOffsetY(18);
              setOffsetX(0);
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-200 dark:bg-slate-800 text-amber-950 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-slate-700 hover:bg-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Show Head / Hair Top</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setZoom(125);
              setOffsetY(22);
              setOffsetX(0);
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-amber-300 dark:border-slate-700 hover:bg-amber-200 cursor-pointer"
          >
            <span>Close Up Headshot</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setZoom(100);
              setOffsetY(0);
              setOffsetX(0);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-300 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Center</span>
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-3.5 bg-amber-50/80 dark:bg-slate-950/50 p-4 rounded-2xl border border-amber-200/80 dark:border-slate-800">
          {/* Vertical Position */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <ArrowUp className="w-3.5 h-3.5 text-amber-600" />
                <span>Vertical Position (Up / Down)</span>
                <ArrowDown className="w-3.5 h-3.5 text-amber-600" />
              </span>
              <span className="font-mono text-amber-700 dark:text-amber-400">{offsetY > 0 ? `+${offsetY}% (Lower Head)` : `${offsetY}% (Raise Head)`}</span>
            </div>
            <input
              type="range"
              min="-60"
              max="60"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Horizontal Position */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
                <span>Horizontal Position (Left / Right)</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </span>
              <span className="font-mono text-amber-700 dark:text-amber-400">{offsetX}%</span>
            </div>
            <input
              type="range"
              min="-60"
              max="60"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Zoom */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Photo Zoom</span>
              </span>
              <span className="font-mono text-amber-700 dark:text-amber-400">{zoom}%</span>
            </div>
            <input
              type="range"
              min="80"
              max="220"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-amber-300 dark:border-slate-700 hover:bg-amber-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span>Apply Photo Position</span>
          </button>
        </div>
      </div>
    </div>
  );
};
