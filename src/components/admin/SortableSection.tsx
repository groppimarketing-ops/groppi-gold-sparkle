import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Eye, EyeOff, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageSection {
  id: string;
  page_slug: string;
  section_type: string;
  display_order: number;
  is_visible: boolean;
  settings: unknown;
}

interface SortableSectionProps {
  section: PageSection;
  sectionTypes: { type: string; label: string; icon: string }[];
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (section: PageSection) => void;
}

const SortableSection = ({
  section,
  sectionTypes,
  onToggleVisibility,
  onDelete,
  onEdit,
}: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const sectionInfo = sectionTypes.find(s => s.type === section.section_type);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
        isDragging 
          ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20' 
          : section.is_visible
            ? 'border-primary/20 bg-background/50 hover:border-primary/40'
            : 'border-muted bg-muted/30 opacity-60'
      }`}
      layout
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="p-1 rounded hover:bg-primary/20 cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Section Icon */}
      <span className="text-2xl">{sectionInfo?.icon || '📦'}</span>

      {/* Section Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{sectionInfo?.label || section.section_type}</p>
        <p className="text-xs text-muted-foreground">
          {section.is_visible ? 'Visible' : 'Hidden'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleVisibility(section.id)}
          className="h-8 w-8"
        >
          {section.is_visible ? (
            <Eye className="w-4 h-4 text-muted-foreground" />
          ) : (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(section)}
          className="h-8 w-8"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(section.id)}
          className="h-8 w-8 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SortableSection;
