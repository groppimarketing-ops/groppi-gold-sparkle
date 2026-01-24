import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Globe, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: 'Saved',
      description: 'Settings have been updated',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gold-gradient-text flex items-center gap-3">
              <SettingsIcon className="w-8 h-8" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and site settings
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="luxury-button">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-background/50 border border-primary/20">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary/20">
              <Lock className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/20">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="site" className="data-[state=active]:bg-primary/20">
              <Globe className="w-4 h-4 mr-2" />
              Site
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input
                    placeholder="Your name"
                    className="bg-background/50"
                  />
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="security">
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-background/50"
                  />
                </div>

                <Button variant="outline">
                  Update Password
                </Button>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="notifications">
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email when you get new contact messages
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of site activity
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security-related events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="site">
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-6">Site Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Show maintenance page to visitors
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contact Form</p>
                    <p className="text-sm text-muted-foreground">
                      Allow visitors to submit contact forms
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Blog</p>
                    <p className="text-sm text-muted-foreground">
                      Display blog section on the website
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
