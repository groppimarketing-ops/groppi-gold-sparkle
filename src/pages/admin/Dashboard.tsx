import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Image as ImageIcon,
  TrendingUp,
  Eye,
  Clock,
  ArrowRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  articles: number;
  services: number;
  messages: number;
  unreadMessages: number;
  media: number;
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  created_at: string;
  is_read: boolean;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    articles: 0,
    services: 0,
    messages: 0,
    unreadMessages: 0,
    media: 0,
  });
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats in parallel
        const [articlesRes, servicesRes, messagesRes, unreadRes, mediaRes] = await Promise.all([
          supabase.from('articles').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
          supabase.from('media').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          articles: articlesRes.count || 0,
          services: servicesRes.count || 0,
          messages: messagesRes.count || 0,
          unreadMessages: unreadRes.count || 0,
          media: mediaRes.count || 0,
        });

        // Fetch recent messages
        const { data: messages } = await supabase
          .from('contact_messages')
          .select('id, name, email, subject, created_at, is_read')
          .order('created_at', { ascending: false })
          .limit(5);

        if (messages) {
          setRecentMessages(messages);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Articles',
      value: stats.articles,
      icon: FileText,
      color: 'from-blue-500/20 to-cyan-500/20',
      link: '/admin/articles',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Briefcase,
      color: 'from-green-500/20 to-emerald-500/20',
      link: '/admin/services',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'from-orange-500/20 to-amber-500/20',
      link: '/admin/messages',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
    {
      title: 'Media Files',
      value: stats.media,
      icon: ImageIcon,
      color: 'from-purple-500/20 to-pink-500/20',
      link: '/admin/media',
    },
  ];

  const quickActions = [
    { label: 'Edit Pages', icon: TrendingUp, link: '/admin/pages' },
    { label: 'New Article', icon: FileText, link: '/admin/articles/new' },
    { label: 'Upload Media', icon: ImageIcon, link: '/admin/media' },
    { label: 'View Messages', icon: MessageSquare, link: '/admin/messages' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gold-gradient-text">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <GlassCard className={`p-6 bg-gradient-to-br ${stat.color} hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden group`}>
                  {stat.badge && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                      <span className="text-xs font-bold text-destructive-foreground">{stat.badge}</span>
                    </div>
                  )}
                  <stat.icon className="w-8 h-8 text-primary mb-4" />
                  <p className="text-3xl font-bold mb-1">
                    {isLoading ? '...' : stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.title}</p>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link to={action.link}>
                  <Button variant="outline" className="w-full h-auto py-4 glass-card border-primary/20 hover:border-primary/50 hover:bg-primary/10">
                    <action.icon className="w-5 h-5 mr-2 text-primary" />
                    {action.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Messages</h2>
            <Link to="/admin/messages" className="text-sm text-primary hover:underline">
              View all →
            </Link>
          </div>
          <GlassCard className="divide-y divide-primary/10">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No messages yet
              </div>
            ) : (
              recentMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="p-4 flex items-start gap-4 hover:bg-primary/5 transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                    message.is_read ? 'bg-muted' : 'bg-primary animate-pulse'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{message.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.email}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.subject || 'No subject'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="w-3 h-3" />
                    {new Date(message.created_at).toLocaleDateString()}
                  </div>
                </motion.div>
              ))
            )}
          </GlassCard>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
