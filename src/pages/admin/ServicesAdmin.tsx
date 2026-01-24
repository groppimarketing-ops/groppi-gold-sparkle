import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, Edit, Trash2, Check, X, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Service {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  slug: string;
  pricing_type: string | null;
  price_min: number | null;
  price_max: number | null;
  is_active: boolean;
  display_order: number;
}

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, title_en, title_ar, description_en, description_ar, slug, pricing_type, price_min, price_max, is_active, display_order')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to load services',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;

      setServices(services.map(s => 
        s.id === service.id ? { ...s, is_active: !s.is_active } : s
      ));
      
      toast({
        title: service.is_active ? 'Deactivated' : 'Activated',
        description: `Service has been ${service.is_active ? 'deactivated' : 'activated'}`,
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: 'Error',
        description: 'Failed to update service',
        variant: 'destructive',
      });
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;

    try {
      const { error } = await supabase
        .from('services')
        .update({
          title_en: editingService.title_en,
          title_ar: editingService.title_ar,
          description_en: editingService.description_en,
          description_ar: editingService.description_ar,
          pricing_type: editingService.pricing_type,
          price_min: editingService.price_min,
          price_max: editingService.price_max,
        })
        .eq('id', editingService.id);

      if (error) throw error;

      setServices(services.map(s => 
        s.id === editingService.id ? editingService : s
      ));
      setEditingService(null);
      
      toast({
        title: 'Saved',
        description: 'Service has been updated',
      });
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    }
  };

  const filteredServices = services.filter(service =>
    service.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.title_ar.includes(searchQuery)
  );

  const getPricingBadge = (type: string | null) => {
    switch (type) {
      case 'monthly':
        return { label: 'Monthly', color: 'bg-blue-500/20 text-blue-400' };
      case 'one_time':
        return { label: 'One-time', color: 'bg-green-500/20 text-green-400' };
      default:
        return { label: 'Custom', color: 'bg-purple-500/20 text-purple-400' };
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gold-gradient-text flex items-center gap-3">
            <Briefcase className="w-8 h-8" />
            Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your service offerings and pricing
          </p>
        </div>

        {/* Search */}
        <GlassCard className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="pl-10 bg-background/50"
            />
          </div>
        </GlassCard>

        {/* Services Table */}
        <GlassCard className="overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service, index) => {
                  const badge = getPricingBadge(service.pricing_type);
                  return (
                    <motion.tr
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-primary/10"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.title_en}</p>
                          <p className="text-sm text-muted-foreground" dir="rtl">
                            {service.title_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium w-fit ${badge.color}`}>
                            <DollarSign className="w-3 h-3" />
                            {badge.label}
                          </span>
                          {(service.price_min || service.price_max) && (
                            <span className="text-xs text-muted-foreground">
                              €{service.price_min || '?'} - €{service.price_max || '?'}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          service.is_active 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {service.is_active ? (
                            <>
                              <Check className="w-3 h-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3" />
                              Inactive
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleActive(service)}
                            className="h-8 w-8"
                          >
                            {service.is_active ? (
                              <X className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Check className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingService(service)}
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </GlassCard>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="glass-card border-primary/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title (English)</label>
                  <Input
                    value={editingService.title_en}
                    onChange={(e) => setEditingService({ ...editingService, title_en: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title (Arabic)</label>
                  <Input
                    value={editingService.title_ar}
                    onChange={(e) => setEditingService({ ...editingService, title_ar: e.target.value })}
                    className="bg-background/50"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description (English)</label>
                  <Textarea
                    value={editingService.description_en}
                    onChange={(e) => setEditingService({ ...editingService, description_en: e.target.value })}
                    className="bg-background/50"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description (Arabic)</label>
                  <Textarea
                    value={editingService.description_ar}
                    onChange={(e) => setEditingService({ ...editingService, description_ar: e.target.value })}
                    className="bg-background/50"
                    rows={4}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pricing Type</label>
                  <Select
                    value={editingService.pricing_type || 'custom'}
                    onValueChange={(value) => setEditingService({ ...editingService, pricing_type: value })}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="one_time">One-time</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Price (€)</label>
                  <Input
                    type="number"
                    value={editingService.price_min || ''}
                    onChange={(e) => setEditingService({ ...editingService, price_min: Number(e.target.value) || null })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Price (€)</label>
                  <Input
                    type="number"
                    value={editingService.price_max || ''}
                    onChange={(e) => setEditingService({ ...editingService, price_max: Number(e.target.value) || null })}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingService(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveService} className="luxury-button">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ServicesAdmin;
