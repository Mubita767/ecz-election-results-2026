import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Users,
  BarChart3,
  PieChart,
  Map,
  Activity,
  Grid3X3,
  ChevronRight,
  Monitor,
  Upload,
  Download,
  Trash2,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { eczUploadTemplate } from '../data/mockData';
import type { ProjectionScreen, ECZUploadData } from '../types';

const screenConfig: {
  id: ProjectionScreen;
  name: string;
  icon: React.ElementType;
  description: string;
}[] = [
  { id: 'candidates', name: 'Candidate Showcase', icon: Users, description: 'Full-screen candidate profiles with vote counts' },
  { id: 'results', name: 'Results Breakdown', icon: BarChart3, description: 'Bar charts and provincial vote tables' },
  { id: 'seats', name: 'Seat Allocation', icon: PieChart, description: 'Parliamentary hemicycle visualization' },
  { id: 'map', name: 'Provincial Map', icon: Map, description: 'Interactive geographic results map' },
  { id: 'turnout', name: 'Turnout Stats', icon: Activity, description: 'Participation statistics and comparisons' },
  { id: 'constituencies', name: 'Constituency Grid', icon: Grid3X3, description: 'Detailed constituency-level results' },
];

const partyColorOptions = [
  { label: 'UPND Red', value: '#DC2626' },
  { label: 'NRPUP Green', value: '#1B5E20' },
  { label: 'SP Orange', value: '#EA580C' },
  { label: 'CF Gold', value: '#F59E0B' },
  { label: 'PF Purple', value: '#7C3AED' },
  { label: 'IND Gray', value: '#6B7280' },
  { label: 'Cyan', value: '#06B6D4' },
  { label: 'Breaking Gold', value: '#F59E0B' },
];

export default function Control() {
  const {
    currentScreen,
    isAutoCycling,
    cycleInterval,
    tickerSpeed,
    setScreen,
    setAutoCycling,
    setCycleInterval,
    setTickerSpeed,
    processUpload,
    resetToDefault,
    customTickerItems,
    addTickerItem,
    removeTickerItem,
    clearCustomTicker,
    lastUploadTime,
  } = useStore();

  const cardsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState('');
  const [tickerText, setTickerText] = useState('');
  const [tickerColor, setTickerColor] = useState('#DC2626');
  const [tickerType, setTickerType] = useState<'result' | 'breaking' | 'update'>('result');

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.control-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.2,
      }
    );
  }, []);

  const handleFileUpload = useCallback(
    (file: File) => {
      setUploadStatus('idle');
      setUploadError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string) as ECZUploadData;
          // Validate required fields
          if (!json.candidates || !json.constituencies || !json.provinces || !json.summary) {
            throw new Error('Missing required fields: candidates, constituencies, provinces, summary');
          }
          processUpload(json);
          setUploadStatus('success');
        } catch (err) {
          setUploadStatus('error');
          setUploadError(err instanceof Error ? err.message : 'Invalid JSON file');
        }
      };
      reader.readAsText(file);
    },
    [processUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.json')) {
        handleFileUpload(file);
      } else {
        setUploadStatus('error');
        setUploadError('Please upload a .json file');
      }
    },
    [handleFileUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleDownloadTemplate = () => {
    const blob = new Blob([JSON.stringify(eczUploadTemplate, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ecz-upload-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddTicker = () => {
    if (!tickerText.trim()) return;
    addTickerItem(tickerText.trim(), tickerColor, tickerType);
    setTickerText('');
  };

  const formatUploadTime = (iso: string | null) => {
    if (!iso) return 'Never';
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#08080F] text-white">
      {/* Header */}
      <div className="border-b border-[#2A2A3E] bg-[#0E0E16]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B] flex items-center justify-center">
              <Monitor className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wider">Projection Control</h1>
              <p className="text-xs text-[#6B6B80]">ECZ Election Results System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 bg-[#141420] border border-[#2A2A3E] rounded-lg text-sm font-semibold text-[#A0A0B8] hover:border-[#F59E0B] hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/projection"
              className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] rounded-lg text-sm font-bold text-black hover:bg-[#fbbf24] transition-colors"
            >
              <Monitor className="w-4 h-4" />
              Open Projection
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* ====== SETTINGS ROW ====== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Auto Cycle Toggle */}
          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Auto-Cycle Screens</h3>
                <p className="text-xs text-[#6B6B80] mt-0.5">
                  Automatically rotate through all screens
                </p>
              </div>
              <button
                onClick={() => setAutoCycling(!isAutoCycling)}
                className={`toggle-switch ${isAutoCycling ? 'on' : ''}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isAutoCycling ? 'bg-[#F59E0B]' : 'bg-[#6B6B80]'}`} />
              <span className="text-xs text-[#6B6B80]">
                {isAutoCycling ? 'Currently cycling' : 'Manual mode'}
              </span>
            </div>
          </div>

          {/* Cycle Interval */}
          <div className="glass-panel rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-3">Cycle Interval</h3>
            <div className="flex gap-2">
              {[5, 8, 10, 15].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setCycleInterval(sec)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    cycleInterval === sec
                      ? 'bg-[#F59E0B] text-black'
                      : 'bg-[#0E0E16] text-[#A0A0B8] border border-[#2A2A3E] hover:border-[#3D3D5C]'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
            <p className="text-xs text-[#6B6B80] mt-2">
              Each screen shows for {cycleInterval} seconds
            </p>
          </div>

          {/* Ticker Speed */}
          <div className="glass-panel rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-3">Ticker Speed</h3>
            <input
              type="range"
              min={15}
              max={80}
              value={tickerSpeed}
              onChange={(e) => setTickerSpeed(Number(e.target.value))}
              className="w-full h-2 bg-[#0E0E16] rounded-full appearance-none cursor-pointer accent-[#F59E0B]"
            />
            <div className="flex justify-between text-xs text-[#6B6B80] mt-2">
              <span>Fast</span>
              <span className="font-mono text-[#F59E0B]">{tickerSpeed}s</span>
              <span>Slow</span>
            </div>
          </div>
        </div>

        {/* ====== SCREEN PREVIEW CARDS ====== */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-bold text-[#6B6B80] uppercase tracking-wider">
              Currently On Screen
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] live-dot" />
              <span className="text-sm font-bold text-[#F59E0B]">
                {screenConfig.find((s) => s.id === currentScreen)?.name || 'Unknown'}
              </span>
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {screenConfig.map((screen) => {
              const Icon = screen.icon;
              const isActive = currentScreen === screen.id;
              return (
                <motion.div
                  key={screen.id}
                  className={`control-card ${isActive ? 'screen-active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: isActive ? '#F59E0B22' : '#0E0E16',
                        border: `1px solid ${isActive ? '#F59E0B' : '#2A2A3E'}`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: isActive ? '#F59E0B' : '#6B6B80' }} />
                    </div>
                    {isActive && (
                      <span className="px-2 py-0.5 bg-[#F59E0B]/20 border border-[#F59E0B] rounded text-[10px] font-black text-[#F59E0B] tracking-wider">
                        LIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{screen.name}</h3>
                  <p className="text-xs text-[#6B6B80] mb-4">{screen.description}</p>

                  <button
                    onClick={() => {
                      setAutoCycling(false);
                      setScreen(screen.id);
                    }}
                    className="w-full btn-primary text-sm flex items-center justify-center gap-2"
                  >
                    <Monitor className="w-4 h-4" />
                    BEAM TO SCREEN
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ====== FILE UPLOAD SECTION ====== */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Data Upload</h3>
              <p className="text-xs text-[#6B6B80] mt-0.5">
                Upload ECZ JSON data to replace current results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-[#0E0E16] border border-[#2A2A3E] rounded-lg text-xs font-semibold text-[#A0A0B8] hover:border-[#F59E0B] hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Template
              </button>
              <button
                onClick={() => {
                  resetToDefault();
                  setUploadStatus('idle');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0E0E16] border border-[#2A2A3E] rounded-lg text-xs font-semibold text-[#A0A0B8] hover:border-red-500 hover:text-red-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Default
              </button>
            </div>
          </div>

          {/* Drag and drop area */}
          <div
            className={`upload-dropzone p-8 text-center ${isDragging ? 'dragover' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileInput}
              className="hidden"
            />
            <Upload className="w-10 h-10 text-[#6B6B80] mx-auto mb-3" />
            <p className="text-sm font-semibold text-white mb-1">
              {isDragging ? 'Drop your JSON file here' : 'Drag & drop a JSON file here, or click to browse'}
            </p>
            <p className="text-xs text-[#6B6B80]">
              Supports ECZ upload format (.json files only)
            </p>
          </div>

          {/* Upload status */}
          {uploadStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 px-4 py-3 bg-[#059669]/10 border border-[#059669]/30 rounded-lg"
            >
              <CheckCircle className="w-4 h-4 text-[#059669]" />
              <span className="text-sm text-[#34D399]">Data uploaded successfully!</span>
              <span className="text-xs text-[#6B6B80] ml-auto">
                <Clock className="w-3 h-3 inline mr-1" />
                {formatUploadTime(lastUploadTime)}
              </span>
            </motion.div>
          )}

          {uploadStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">{uploadError || 'Upload failed'}</span>
            </motion.div>
          )}

          {lastUploadTime && uploadStatus === 'idle' && (
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6B6B80]">
              <Clock className="w-3 h-3" />
              Last upload: {formatUploadTime(lastUploadTime)}
            </div>
          )}
        </div>

        {/* ====== TICKER EDITOR SECTION ====== */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Ticker Editor</h3>
              <p className="text-xs text-[#6B6B80] mt-0.5">
                Add custom messages to the scrolling ticker
              </p>
            </div>
            {customTickerItems.length > 0 && (
              <button
                onClick={clearCustomTicker}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>

          {/* Add ticker form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
            <div className="md:col-span-5">
              <input
                type="text"
                value={tickerText}
                onChange={(e) => setTickerText(e.target.value)}
                placeholder="Enter ticker message..."
                className="w-full px-4 py-2.5 bg-[#0E0E16] border border-[#2A2A3E] rounded-lg text-sm text-white placeholder-[#6B6B80] focus:border-[#F59E0B] focus:outline-none transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTicker();
                }}
              />
            </div>
            <div className="md:col-span-3">
              <select
                value={tickerColor}
                onChange={(e) => setTickerColor(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0E0E16] border border-[#2A2A3E] rounded-lg text-sm text-white focus:border-[#F59E0B] focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {partyColorOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                value={tickerType}
                onChange={(e) => setTickerType(e.target.value as 'result' | 'breaking' | 'update')}
                className="w-full px-4 py-2.5 bg-[#0E0E16] border border-[#2A2A3E] rounded-lg text-sm text-white focus:border-[#F59E0B] focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="result">Result</option>
                <option value="breaking">Breaking</option>
                <option value="update">Update</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                onClick={handleAddTicker}
                disabled={!tickerText.trim()}
                className="w-full btn-primary text-sm flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Custom ticker items list */}
          {customTickerItems.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#6B6B80]">
              No custom ticker items yet. Add one above.
            </div>
          ) : (
            <div className="space-y-2 max-h-[240px] overflow-auto no-scrollbar">
              {customTickerItems.map((item) => (
                <div
                  key={item.id}
                  className="ticker-item-row flex items-center gap-3"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.partyColor }}
                  />
                  {item.type === 'breaking' && (
                    <span className="px-1.5 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] text-[9px] font-black rounded tracking-wider shrink-0">
                      BREAKING
                    </span>
                  )}
                  {item.type === 'update' && (
                    <span className="px-1.5 py-0.5 bg-[#06B6D4]/20 text-[#06B6D4] text-[9px] font-black rounded tracking-wider shrink-0">
                      UPDATE
                    </span>
                  )}
                  <span className="text-sm text-[#A0A0B8] flex-1 truncate">{item.text}</span>
                  <button
                    onClick={() => removeTickerItem(item.id)}
                    className="p-1 rounded hover:bg-red-500/10 text-[#6B6B80] hover:text-red-400 transition-colors shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#2A2A3E] text-center">
          <p className="text-xs text-[#6B6B80]">
            ECZ Election Results Visualization System · Projection Control v1.0 · Mid-Election Mode
          </p>
          <p className="text-xs text-[#6B6B80] mt-2">
            Developed by <span className="text-[#F59E0B] font-semibold">Mupo Mubita</span> · mubitamupo@outlook.com · WhatsApp +260760457622
          </p>
        </div>
      </div>
    </div>
  );
}
