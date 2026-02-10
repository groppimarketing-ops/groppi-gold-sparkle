import { memo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

const TESTIMONIALS = [
  { key: '1', initials: 'MV', rating: 5 },
  { key: '2', initials: 'SB', rating: 5 },
  { key: '3', initials: 'KD', rating: 5 },
  { key: '4', initials: 'JH', rating: 5 },
  { key: '5', initials: 'LP', rating: 5 },
  { key: '6', initials: 'AD', rating: 5 },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

const HomeTestimonials = memo(forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();
  const { container, item } = useRevealAnimation() as any;

  return (
    <section ref={ref} className="py-20 md:py-28 relative" dir="ltr">
      <div className="container mx-auto px-4">
        <SectionHeader
          subtitle={t('home.testimonials.subtitle')}
          title={t('home.testimonials.title')}
          description={t('home.testimonials.description')}
          showSparkle
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.key} variants={item}>
              <GlassCard hover3D glowOnHover className="h-full flex flex-col gap-4">
                {/* Header: Avatar + Name + Google badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/30">
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t(`home.testimonials.reviews.${testimonial.key}.name`))}&background=1a1a1a&color=D4AF37&bold=true&size=96`}
                        alt={t(`home.testimonials.reviews.${testimonial.key}.name`)}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {t(`home.testimonials.reviews.${testimonial.key}.name`)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {t(`home.testimonials.reviews.${testimonial.key}.role`)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs shrink-0 mt-1">
                    <GoogleIcon />
                  </div>
                </div>

                {/* Stars */}
                <StarRating count={testimonial.rating} />

                {/* Quote */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  "{t(`home.testimonials.reviews.${testimonial.key}.quote`)}"
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}));

HomeTestimonials.displayName = 'HomeTestimonials';

export default HomeTestimonials;
