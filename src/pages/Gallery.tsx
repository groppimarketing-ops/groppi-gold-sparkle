import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Play } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all');

  // Placeholder gallery items
  const galleryItems = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      title: 'Luxury Interior',
      category: 'Interior',
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      title: 'Premium Products',
      category: 'Products',
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      title: 'Modern Architecture',
      category: 'Architecture',
    },
    {
      id: '4',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      title: 'Brand Story',
      category: 'Video',
    },
    {
      id: '5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
      title: 'Craftsmanship',
      category: 'Craft',
    },
    {
      id: '6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
      title: 'Global Presence',
      category: 'Events',
    },
    {
      id: '7',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      title: 'Elegant Design',
      category: 'Design',
    },
    {
      id: '8',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      title: 'Premium Quality',
      category: 'Quality',
    },
    {
      id: '9',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      title: 'Behind the Scenes',
      category: 'Video',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'images') return item.type === 'image';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'images', label: 'Images' },
    { key: 'videos', label: 'Videos' },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('gallery.subtitle')}
            title={t('gallery.title')}
            description={t('gallery.description')}
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as 'all' | 'images' | 'videos')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                    index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(item.url)}
                >
                  <div className="aspect-square">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-foreground font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.category}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.type === 'video' ? (
                      <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="h-5 w-5 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                        <ZoomIn className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Gallery;
