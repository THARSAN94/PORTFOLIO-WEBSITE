import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Maximize2,
  Minimize2,
  Printer,
  FileText,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

interface QuickCert {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  color: string;
}

const QUICK_CERTS: QuickCert[] = [
  {
    id: 'web-dev',
    title: 'Web Development Intern',
    subtitle: 'Brainery Spot Technology, Coimbatore',
    url: '/certificates/brainery_spot_web_dev_intern.svg',
    badge: '18/06/2024 - 18/07/2024',
    color: 'emerald'
  },
  {
    id: 'cloud-comp',
    title: 'Cloud Computing Intern',
    subtitle: 'Eagle-HiTech Softclou Pvt Ltd, Chennai',
    url: '/certificates/eagle_hitech_cloud_intern.svg',
    badge: '24/12/2025 - 22/01/2026',
    color: 'blue'
  }
];

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title
}) => {
  const [activeUrl, setActiveUrl] = useState<string>(imageUrl);
  const [activeTitle, setActiveTitle] = useState<string>(title);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [fitMode, setFitMode] = useState<'width' | 'screen'>('width');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl) {
      setActiveUrl(imageUrl);
      setActiveTitle(title);
      setZoomLevel(100);
    }
  }, [imageUrl, title]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoomLevel(100);
  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);
  const toggleFitMode = () => {
    setFitMode((prev) => (prev === 'width' ? 'screen' : 'width'));
    setZoomLevel(100);
  };

  const handleClose = () => {
    setZoomLevel(100);
    setIsFullscreen(false);
    onClose();
  };

  // Direct PDF Download of the certificate
  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      // Fetch SVG content
      const resp = await fetch(activeUrl);
      const svgText = await resp.text();

      // Convert SVG to high-res canvas image
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        // High resolution 2400 x 3400 for crisp 300dpi print
        canvas.width = 2400;
        canvas.height = 3400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imgData = canvas.toDataURL('image/jpeg', 0.95);

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
          });
          // A4 dimensions in pt: 595.28 x 841.89
          pdf.addImage(imgData, 'JPEG', 0, 0, 595.28, 841.89);
          const cleanName = activeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          pdf.save(`${cleanName}_certificate.pdf`);
        }
        URL.revokeObjectURL(blobUrl);
        setIsExporting(false);
      };

      img.onerror = () => {
        // Fallback: trigger direct download
        const link = document.createElement('a');
        link.href = activeUrl;
        link.download = `${activeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_certificate.svg`;
        link.click();
        setIsExporting(false);
      };

      img.src = blobUrl;
    } catch (err) {
      console.error('Failed to export certificate PDF', err);
      // Fallback
      window.open(activeUrl, '_blank');
      setIsExporting(false);
    }
  };

  // Direct Browser Print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${activeTitle} - Certificate</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-color: #ffffff;
            }
            img {
              width: 100vw;
              height: 100vh;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${activeUrl}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div
        className={`bg-[#faf7f0] dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-700 rounded-3xl w-full p-4 sm:p-6 paper-card relative flex flex-col justify-between transition-all duration-300 ${
          isFullscreen
            ? 'max-w-[98vw] h-[97vh]'
            : 'max-w-6xl max-h-[94vh] h-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-dashed border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {activeTitle || 'Certificate Document'}
                </h3>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  <Sparkles className="w-2.5 h-2.5" /> Ultra-High Resolution Vector
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Issued to: <span className="font-bold text-slate-800 dark:text-slate-200">THARSAN M</span> (Reg: 922523243115) • Verified Record
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* View Mode Toggle: Fit Width vs Fit Page */}
            <button
              onClick={toggleFitMode}
              title={fitMode === 'width' ? 'Switch to Fit Screen' : 'Switch to Fit Width (Large)'}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                fitMode === 'width'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700'
                  : 'bg-white text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{fitMode === 'width' ? 'Fit Width (Large)' : 'Fit Page'}</span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-1 shadow-xs">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset Zoom"
                className="px-2 py-0.5 text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 300}
                title="Zoom In"
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset to 100%"
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer ml-0.5 border-l border-slate-200 dark:border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Open Raw in New Tab */}
            <a
              href={activeUrl}
              target="_blank"
              rel="noreferrer"
              title="Open full-resolution vector in new tab"
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={handleClose}
              title="Close modal"
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-red-100 dark:hover:bg-red-950/60 hover:text-red-700 transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Quick Selector Tabs */}
        <div className="py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono-code text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
              Select Certificate:
            </span>
            {QUICK_CERTS.map((cert) => {
              const isSelected = activeUrl === cert.url;
              return (
                <button
                  key={cert.id}
                  onClick={() => {
                    setActiveUrl(cert.url);
                    setActiveTitle(cert.title);
                    setZoomLevel(100);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? cert.color === 'emerald'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  <span>{cert.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono-code ${
                      isSelected
                        ? 'bg-black/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cert.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400 hidden lg:block">
            Scroll inside to view full document • Zoom up to 300%
          </div>
        </div>

        {/* Certificate Canvas / Viewport */}
        <div className="flex-1 overflow-auto rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-950/70 p-3 sm:p-6 flex items-start justify-center min-h-[360px] relative">
          <div
            className={`transition-transform duration-200 ease-out flex justify-center ${
              fitMode === 'width' ? 'w-full max-w-4xl' : 'w-full h-full items-center'
            }`}
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center'
            }}
          >
            <div className="bg-white rounded-lg shadow-2xl border border-slate-300 dark:border-slate-800 overflow-hidden w-full transition-all">
              <img
                src={activeUrl}
                alt={activeTitle}
                className={`w-full ${fitMode === 'screen' ? 'max-h-[68vh] object-contain' : 'h-auto object-cover'}`}
                style={{
                  imageRendering: 'auto'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-3 pt-3 border-t-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code text-slate-800 dark:text-slate-300 font-bold">
              {activeTitle}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              (Vector SVG with crisp typography, stamps & signatures)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            {/* Download High-Res SVG */}
            <a
              href={activeUrl}
              download={`${activeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_certificate.svg`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 border border-slate-700"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download SVG</span>
            </a>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              title="Print certificate document"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
