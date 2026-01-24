import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Layers, Plus, Save, Eye, EyeOff, Trash2, GripVertical, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import SortableSection from '@/components/admin/SortableSection';
import SectionEditorDialog from '@/components/admin/SectionEditorDialog';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PageSection {
  id: string;
  page_slug: string;
  section_type: string;
  display_order: number;
  is_visible: boolean;
  settings: unknown;
}

const AVAILABLE_PAGES = [
  { slug: 'home', label: 'Home Page' },
  { slug: 'about', label: 'About Page' },
  { slug: 'services', label: 'Services Page' },
  { slug: 'blog', label: 'Blog Page' },
  { slug: 'gallery', label: 'Gallery Page' },
  { slug: 'contact', label: 'Contact Page' },
  { slug: 'franchise', label: 'Franchise Page' },
];

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero Section', icon: '🎯' },
  { type: 'features', label: 'Features Grid', icon: '✨' },
  { type: 'stats', label: 'Statistics', icon: '📊' },
  { type: 'cta', label: 'Call to Action', icon: '📢' },
  { type: 'content', label: 'Content Block', icon: '📝' },
  { type: 'gallery', label: 'Gallery', icon: '🖼️' },
  { type: 'testimonials', label: 'Testimonials', icon: '💬' },
  { type: 'team', label: 'Team Members', icon: '👥' },
  { type: 'faq', label: 'FAQ Section', icon: '❓' },
  { type: 'contact', label: 'Contact Form', icon: '📧' },
];

const Pages = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState<PageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchSections();
  }, [selectedPage]);

  const fetchSections = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', selectedPage)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast({
        title: 'Error',
        description: 'Failed to load page sections',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          display_order: index,
        }));
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update all sections with new order
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        await supabase
          .from('page_sections')
          .update({ display_order: i, is_visible: section.is_visible })
          .eq('id', section.id);
      }

      toast({
        title: 'Saved!',
        description: 'Page layout has been updated',
      });
    } catch (error) {
      console.error('Error saving sections:', error);
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = async (sectionType: string) => {
    try {
      const newSection = {
        page_slug: selectedPage,
        section_type: sectionType,
        display_order: sections.length,
        is_visible: true,
        settings: {},
      };

      const { data, error } = await supabase
        .from('page_sections')
        .insert(newSection)
        .select()
        .single();

      if (error) throw error;
      
      setSections([...sections, data]);
      toast({
        title: 'Section added',
        description: `Added ${sectionType} section to the page`,
      });
    } catch (error) {
      console.error('Error adding section:', error);
      toast({
        title: 'Error',
        description: 'Failed to add section',
        variant: 'destructive',
      });
    }
  };

  const handleToggleVisibility = async (sectionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, is_visible: !s.is_visible } : s
    ));
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      setSections(sections.filter(s => s.id !== sectionId));
      toast({
        title: 'Section deleted',
        description: 'The section has been removed',
      });
    } catch (error) {
      console.error('Error deleting section:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete section',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gold-gradient-text flex items-center gap-3">
              <Layers className="w-8 h-8" />
              Page Editor
            </h1>
            <p className="text-muted-foreground mt-1">
              Drag and drop sections to customize your pages
            </p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="luxury-button"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Page Selector */}
        <GlassCard className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="text-sm font-medium">Select Page:</label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_PAGES.map((page) => (
                  <SelectItem key={page.slug} value={page.slug}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Sections */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Available Sections</h2>
            <GlassCard className="p-4 space-y-2">
              {SECTION_TYPES.map((section) => (
                <motion.button
                  key={section.type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddSection(section.type)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all text-left"
                >
                  <span className="text-2xl">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                  <Plus className="w-4 h-4 ml-auto text-muted-foreground" />
                </motion.button>
              ))}
            </GlassCard>
          </div>

          {/* Page Layout */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">
              Page Layout
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({sections.length} sections)
              </span>
            </h2>
            <GlassCard className="p-4 min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : sections.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Layers className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No sections yet. Add sections from the left panel.
                  </p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <SortableSection
                          key={section.id}
                          section={section}
                          sectionTypes={SECTION_TYPES}
                          onToggleVisibility={handleToggleVisibility}
                          onDelete={handleDeleteSection}
                          onEdit={setEditingSection}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Section Editor Dialog */}
      {editingSection && (
        <SectionEditorDialog
          section={editingSection}
          onClose={() => setEditingSection(null)}
          onSave={(updatedSection) => {
            setSections(sections.map(s => 
              s.id === updatedSection.id ? updatedSection : s
            ));
            setEditingSection(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Pages;
