import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Mail, Globe, Clock } from 'lucide-react';
import PageSEO from '@/components/seo/PageSEO';

const Privacy = () => {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Database,
      titleKey: 'privacy.sections.dataCollection.title',
      contentKey: 'privacy.sections.dataCollection.content',
    },
    {
      icon: Eye,
      titleKey: 'privacy.sections.dataUsage.title',
      contentKey: 'privacy.sections.dataUsage.content',
    },
    {
      icon: Lock,
      titleKey: 'privacy.sections.dataSecurity.title',
      contentKey: 'privacy.sections.dataSecurity.content',
    },
    {
      icon: UserCheck,
      titleKey: 'privacy.sections.yourRights.title',
      contentKey: 'privacy.sections.yourRights.content',
    },
    {
      icon: Globe,
      titleKey: 'privacy.sections.cookies.title',
      contentKey: 'privacy.sections.cookies.content',
    },
    {
      icon: Clock,
      titleKey: 'privacy.sections.retention.title',
      contentKey: 'privacy.sections.retention.content',
    },
    {
      icon: Mail,
      titleKey: 'privacy.sections.contact.title',
      contentKey: 'privacy.sections.contact.content',
    },
  ];

  return (
    <PageLayout>
      <PageSEO
        title={t('privacy.meta.title', 'Privacybeleid')}
        description={t('privacy.meta.description', 'Het privacybeleid van GROPPI Marketing Bureau.')}
        path="/privacy"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-card mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text">
            {t('privacy.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('privacy.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
                    {t(section.titleKey)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {t(section.contentKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">
            {t('privacy.footerNote')}
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
