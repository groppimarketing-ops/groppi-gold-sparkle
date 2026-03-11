import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Briefcase, MapPin, Clock, Upload, ChevronDown, Loader2, CheckCircle, ExternalLink } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Job roles data
const jobRoles = [
  {
    id: 'performance-marketer',
    titleKey: 'careers.roles.performanceMarketer.title',
    type: 'fullTime',
    location: 'hybrid',
    responsibilitiesKey: 'careers.roles.performanceMarketer.responsibilities',
    requirementsKey: 'careers.roles.performanceMarketer.requirements',
  },
  {
    id: 'seo-specialist',
    titleKey: 'careers.roles.seoSpecialist.title',
    type: 'fullTime',
    location: 'hybrid',
    responsibilitiesKey: 'careers.roles.seoSpecialist.responsibilities',
    requirementsKey: 'careers.roles.seoSpecialist.requirements',
  },
  {
    id: 'web-designer',
    titleKey: 'careers.roles.webDesigner.title',
    type: 'freelance',
    location: 'remote',
    responsibilitiesKey: 'careers.roles.webDesigner.responsibilities',
    requirementsKey: 'careers.roles.webDesigner.requirements',
  },
  {
    id: 'content-creator',
    titleKey: 'careers.roles.contentCreator.title',
    type: 'partTime',
    location: 'hybrid',
    responsibilitiesKey: 'careers.roles.contentCreator.responsibilities',
    requirementsKey: 'careers.roles.contentCreator.requirements',
  },
  {
    id: 'sales-bd',
    titleKey: 'careers.roles.salesBd.title',
    type: 'fullTime',
    location: 'belgium',
    responsibilitiesKey: 'careers.roles.salesBd.responsibilities',
    requirementsKey: 'careers.roles.salesBd.requirements',
  },
];

const formSchema = z.object({
  fullName: z.string().min(2, 'validation.minLength').max(100, 'validation.maxLength'),
  email: z.string().email('validation.email').max(255),
  phone: z.string().optional(),
  role: z.string().min(1, 'validation.required'),
  linkedinUrl: z.string().url('validation.invalidUrl').optional().or(z.literal('')),
  message: z.string().max(500, 'validation.maxLength').optional(),
  consent: z.boolean().refine((val) => val === true, 'validation.required'),
});

type FormData = z.infer<typeof formSchema>;

const Careers = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: '',
      linkedinUrl: '',
      message: '',
      consent: false,
    },
  });

  const scrollToForm = (roleId?: string) => {
    if (roleId) {
      form.setValue('role', roleId);
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({ title: t('careers.form.invalidFileType'), variant: 'destructive' });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: t('careers.form.fileTooLarge'), variant: 'destructive' });
        return;
      }
      setCvFile(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!cvFile) {
      toast({ title: t('careers.form.cvRequired'), variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('cv-uploads')
        .upload(fileName, cvFile);

      if (uploadError) throw new Error('Failed to upload CV');

      setIsUploading(false);

      const response = await supabase.functions.invoke('submit-job-application', {
        body: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || undefined,
          role: data.role,
          linkedinUrl: data.linkedinUrl || undefined,
          message: data.message || undefined,
          cvPath: fileName,
        },
      });

      if (response.error) throw new Error(response.error.message || 'Failed to submit application');

      setIsSuccess(true);
      form.reset();
      setCvFile(null);
      
      toast({
        title: t('careers.form.successTitle'),
        description: t('careers.form.successMessage'),
      });
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: t('careers.form.errorTitle'),
        description: t('careers.form.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      fullTime: t('careers.types.fullTime'),
      partTime: t('careers.types.partTime'),
      freelance: t('careers.types.freelance'),
    };
    return typeMap[type] || type;
  };

  const getLocationLabel = (location: string) => {
    const locationMap: Record<string, string> = {
      belgium: t('careers.locations.belgium'),
      remote: t('careers.locations.remote'),
      hybrid: t('careers.locations.hybrid'),
    };
    return locationMap[location] || location;
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{t('careers.meta.title')} | GROPPI</title>
        <meta name="description" content={t('careers.meta.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-16">
        <div className="absolute inset-0 neural-lines opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gold-gradient-text">{t('careers.hero.title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('careers.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="glass-button"
                onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('careers.hero.viewRoles')}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                className="luxury-button"
                onClick={() => scrollToForm()}
              >
                {t('careers.hero.sendCv')}
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="roles" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="animate-fade-up text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('careers.roles.title')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('careers.roles.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobRoles.map((role, index) => (
              <div
                key={role.id}
                className={`glass-card p-6 hover:gold-glow transition-all duration-300 animate-fade-up-${Math.min(index + 1, 4)}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{t(role.titleKey)}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        {getTypeLabel(role.type)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        {getLocationLabel(role.location)}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>{t('careers.roles.responsibilitiesLabel')}:</strong> {t(role.responsibilitiesKey)}</p>
                      <p><strong>{t('careers.roles.requirementsLabel')}:</strong> {t(role.requirementsKey)}</p>
                    </div>
                  </div>
                  <Button
                    className="luxury-button shrink-0"
                    onClick={() => scrollToForm(role.id)}
                  >
                    {t('careers.roles.applyNow')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section ref={formRef} className="py-16 md:py-24 bg-gradient-to-b from-transparent to-background/50">
        <div className="container mx-auto px-4">
          <div className="animate-fade-up max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('careers.form.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('careers.form.subtitle')}
              </p>
            </div>

            {isSuccess ? (
              <div className="glass-card p-8 text-center animate-scale-in">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{t('careers.form.successTitle')}</h3>
                <p className="text-muted-foreground mb-6">{t('careers.form.successMessage')}</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                  {t('careers.form.submitAnother')}
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card p-6 md:p-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careers.form.fullName')} *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t('careers.form.fullNamePlaceholder')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careers.form.email')} *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder={t('careers.form.emailPlaceholder')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careers.form.phone')}</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" placeholder={t('careers.form.phonePlaceholder')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careers.form.role')} *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('careers.form.rolePlaceholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobRoles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {t(role.titleKey)}
                                </SelectItem>
                              ))}
                              <SelectItem value="other">{t('careers.form.otherRole')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('careers.form.linkedin')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t('careers.form.linkedinPlaceholder')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('careers.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={t('careers.form.messagePlaceholder')}
                            className="min-h-[100px]"
                            maxLength={500}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground text-right">
                          {field.value?.length || 0}/500
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('careers.form.cv')} *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <Upload className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {cvFile ? cvFile.name : t('careers.form.cvPlaceholder')}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('careers.form.cvHint')}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            {t('careers.form.consent')} *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="luxury-button w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isUploading ? t('careers.form.uploading') : t('careers.form.submitting')}
                      </>
                    ) : (
                      t('careers.form.submit')
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {t('careers.form.privacyNote')}{' '}
                    <a href="/contact" className="text-primary hover:underline">
                      {t('careers.form.contactLink')}
                    </a>
                  </p>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="animate-fade-up max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              {t('careers.faq.title')}
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="spontaneous" className="glass-card px-6 border-none">
                <AccordionTrigger className="hover:no-underline">
                  {t('careers.faq.spontaneous.q')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('careers.faq.spontaneous.a')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="remote" className="glass-card px-6 border-none">
                <AccordionTrigger className="hover:no-underline">
                  {t('careers.faq.remote.q')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('careers.faq.remote.a')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="response" className="glass-card px-6 border-none">
                <AccordionTrigger className="hover:no-underline">
                  {t('careers.faq.response.q')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('careers.faq.response.a')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cv" className="glass-card px-6 border-none">
                <AccordionTrigger className="hover:no-underline">
                  {t('careers.faq.cv.q')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('careers.faq.cv.a')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
