'use client';

import { useState, useEffect, ChangeEvent } from 'react';

interface Asset {
  _id: string;
  name: string;
  url: string;
  publicId: string;
  updatedAt: string;
}

export default function AssetManagement() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch('/api/assets');
      const data = await res.json();
      setAssets(data);
    } catch (err) {
      console.error('Error fetching assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (!e.target.files?.[0]) return;

    setUploading(name);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('name', name);

    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchAssets();
      }
    } catch (err) {
      console.error(`Error uploading ${name}:`, err);
    } finally {
      setUploading(null);
      // Reset input
      e.target.value = '';
    }
  };

  const getAsset = (name: string) => assets.find(a => a.name === name);

  return (
    <div className="space-y-12 pb-20 mt-20">
      <div>
        <h2 className="text-3xl md:text-4xl font-heading tracking-widest text-primary uppercase">PDF ASSETS</h2>
        <p className="text-white/50 mt-2 font-serif italic text-sm">Upload and manage Menu and Trays PDF files.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {['MENU', 'TRAYS'].map((assetName) => {
          const asset = getAsset(assetName);
          return (
            <div key={assetName} className="bg-black/40 border border-white/10 p-6 md:p-10 space-y-8 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-white/5 pb-4">
                <h3 className="text-xl md:text-2xl font-heading tracking-widest text-white uppercase">{assetName}</h3>
                {asset && (
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">
                    Updated: {new Date(asset.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-6">
                {asset ? (
                  <div className="bg-white/5 p-6 border border-white/5 flex flex-col sm:flex-row items-center gap-6">
                    <div className="bg-primary/10 p-4 rounded-sm">
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 18h12V6l-4-4H4v16zm8-14l2 2h-2V4zM6 6h4v2H6V6zm0 4h8v2H6v-2zm0 4h8v2H6v-2z" />
                      </svg>
                    </div>
                    <div className="text-center sm:text-left flex-1 min-w-0">
                      <div className="text-xs font-bold text-white uppercase tracking-widest truncate mb-2">{assetName}_RAJMAHAL.PDF</div>
                      <a 
                        href={asset.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-[9px] text-primary hover:text-white transition-colors uppercase tracking-[0.2em] underline underline-offset-4 font-bold"
                      >
                        VIEW CURRENT PDF
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 border border-dashed border-white/10 text-white/30 uppercase tracking-widest text-[10px] italic">
                    No {assetName.toLowerCase()} PDF uploaded yet.
                  </div>
                )}

                <div className="pt-6">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-primary/70 mb-4 font-bold">
                    {asset ? 'REPLACE DOCUMENT' : 'UPLOAD DOCUMENT'}
                  </label>
                  <div className="relative group overflow-hidden">
                    <input 
                      type="file" 
                      accept=".pdf"
                      disabled={uploading === assetName}
                      onChange={(e) => handleFileUpload(e, assetName)}
                      className="w-full text-[10px] text-white/40 file:mr-4 file:py-3 file:px-6 file:border-0 file:text-[9px] file:uppercase file:tracking-[0.2em] file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary hover:file:text-black transition-all cursor-pointer disabled:opacity-50"
                    />
                    {uploading === assetName && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-[10px] tracking-[0.3em] text-primary font-bold animate-pulse">
                        UPLOADING FILE...
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-[9px] text-white/20 uppercase tracking-widest">ACCEPTED FORMAT: PDF ONLY (MAX 10MB)</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
