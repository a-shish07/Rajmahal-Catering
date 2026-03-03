'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  _id: string;
  title: string;
  section: string;
  imageUrl: string;
  publicId: string;
}

const SECTIONS = ['WEDDINGS', 'PRIVATE EVENTS', 'HIGH TEAS', 'LIFESTYLE'];

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [section, setSection] = useState(SECTIONS[0]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !title || !section) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('section', section);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setTitle('');
        setFile(null);
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchImages();
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchImages();
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      const res = await fetch(`/api/gallery/${editingImage._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingImage.title,
          section: editingImage.section,
        }),
      });

      if (res.ok) {
        setEditingImage(null);
        fetchImages();
      }
    } catch (err) {
      console.error('Error updating image:', err);
    }
  };

  return (
    <div className="space-y-12 pb-20 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading tracking-widest text-primary uppercase">GALLERY MANAGEMENT</h2>
          <p className="text-white/50 mt-2 font-serif italic text-sm">Upload and manage gallery images across sections.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Upload Form */}
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-24">
          <div className="bg-black/40 border border-white/10 p-6 md:p-8">
            <h3 className="text-lg font-heading tracking-widest mb-8 border-b border-primary/20 pb-4 uppercase">ADD NEW IMAGE</h3>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">TITLE</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter image title"
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-primary transition-colors text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">SECTION</label>
                <select 
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer"
                >
                  {SECTIONS.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">IMAGE FILE</label>
                <div className="relative border border-dashed border-white/20 p-4 hover:border-primary/40 transition-colors">
                  <input 
                    id="file-input"
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full opacity-0 absolute inset-0 cursor-pointer z-10"
                    required
                  />
                  <div className="text-center py-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                      {file ? file.name : 'Click to select image'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={uploading}
                className="w-full bg-primary text-black font-bold py-5 tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50 uppercase text-xs mt-4"
              >
                {uploading ? 'UPLOADING...' : 'UPLOAD TO GALLERY'}
              </button>
            </form>
          </div>
        </div>

        {/* Images List */}
        <div className="lg:col-span-8 space-y-8">
          {loading ? (
            <div className="flex justify-center p-20 text-primary animate-pulse tracking-widest text-xs uppercase">FETCHING IMAGES...</div>
          ) : images.length === 0 ? (
            <div className="text-center p-20 bg-white/5 border border-dashed border-white/10 text-white/40 tracking-widest uppercase text-xs italic">
              NO IMAGES FOUND. START BY UPLOADING SOME.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((img) => (
                <div key={img._id} className="group relative bg-black border border-white/10 overflow-hidden flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden bg-white/5">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  </div>
                  <div className="p-6 bg-black">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-heading tracking-widest uppercase truncate text-white">{img.title}</h4>
                        <span className="text-[9px] text-primary/70 tracking-[0.2em] uppercase font-bold mt-1 block">{img.section}</span>
                      </div>
                      <div className="flex gap-4 shrink-0">
                        <button 
                          onClick={() => setEditingImage(img)}
                          className="text-white/40 hover:text-primary transition-colors uppercase text-[9px] tracking-widest font-bold"
                        >
                          EDIT
                        </button>
                        <button 
                          onClick={() => handleDelete(img._id)}
                          className="text-white/40 hover:text-red-500 transition-colors uppercase text-[9px] tracking-widest font-bold"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-primary/20 p-8 md:p-12 max-w-lg w-full shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-heading tracking-widest mb-8 uppercase text-primary text-center">EDIT IMAGE INFO</h3>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">TITLE</label>
                  <input 
                    type="text" 
                    value={editingImage.title}
                    onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">SECTION</label>
                  <select 
                    value={editingImage.section}
                    onChange={(e) => setEditingImage({ ...editingImage, section: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-primary transition-colors text-white text-sm appearance-none cursor-pointer"
                  >
                    {SECTIONS.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-primary text-black font-bold py-4 tracking-widest hover:bg-white transition-all uppercase text-xs"
                  >
                    SAVE CHANGES
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditingImage(null)}
                    className="flex-1 bg-white/5 text-white font-bold py-4 tracking-widest hover:bg-white/10 transition-all uppercase text-xs"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
