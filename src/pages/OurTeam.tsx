import { useTranslation } from 'react-i18next';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';
import { ArrowRight, Target, Rocket, TrendingUp, Users } from 'lucide-react';

// Team photos — WebP at 85% quality (~80-90% smaller than source PNG)
import mohamedImg    from '@/assets/team/mohamed-salah.png?format=webp&quality=85';
import alexanderImg  from '@/assets/team/alexander-roth.png?format=webp&quality=85';
import thomasImg     from '@/assets/team/thomas-de-wilde.png?format=webp&quality=85';
import eliseImg      from '@/assets/team/elise-verhaegen.png?format=webp&quality=85';
import lukasImg      from '@/assets/team/lukas-meyer.png?format=webp&quality=85';
import camilleImg    from '@/assets/team/camille-laurent.png?format=webp&quality=85';
import sophieImg     from '@/assets/team/sophie-van-dijk.png?format=webp&quality=85';
import claireImg     from '@/assets/team/claire-dumont.png?format=webp&quality=85';
import juliaImg      from '@/assets/team/julia-van-aertselaer.png?format=webp&quality=85';
import marcoImg      from '@/assets/team/marco-bianchi.png?format=webp&quality=85';
import arjunImg      from '@/assets/team/arjun-mehta.png?format=webp&quality=85';
import bilalImg      from '@/assets/team/bilal-khan.png?format=webp&quality=85';
import rohanImg      from '@/assets/team/rohan-iyer.png?format=webp&quality=85';
import lucasImg      from '@/assets/team/lucas-vermeer.png?format=webp&quality=85';
import sofiaImg      from '@/assets/team/sofia-laurent.png?format=webp&quality=85';
import koenImg       from '@/assets/team/koen-van-grop.png?format=webp&quality=85';
import tottiImg      from '@/assets/team/totti-franco.png?format=webp&quality=85';

// Office photos — WebP at 85% quality
import meeting1 from '@/assets/office/meeting-1.png?format=webp&quality=85';
import meeting2 from '@/assets/office/meeting-2.png?format=webp&quality=85';
import meeting3 from '@/assets/office/meeting-3.png?format=webp&quality=85';

/* ─── Data ─── */

interface Person { name: string; roleKey: string; taglineKey: string; image?: string; }

const founders: Person[] = [
  { name: 'Koen Van Gorp',  roleKey: 'team.roles.ceo',  taglineKey: 'team.taglines.koen', image: koenImg  },
  { name: 'Totti Franco',   roleKey: 'team.roles.cso',  taglineKey: 'team.taglines.totti', image: tottiImg },
];

const execOps: Person = {
  name: 'Mohamed Salah', roleKey: 'team.roles.headOps',
  taglineKey: 'team.taglines.mohamed', image: mohamedImg,
};

const directors: Person[] = [
  { name: 'Lucas Vermeer', roleKey: 'team.roles.dirPerformance', taglineKey: 'team.taglines.lucas', image: lucasImg },
  { name: 'Sofia Laurent',  roleKey: 'team.roles.dirCreative',   taglineKey: 'team.taglines.sofia', image: sofiaImg },
];

const teamMembers: Person[] = [
  { name: 'Alexander Roth',          roleKey: 'team.roles.md',             taglineKey: 'team.taglines.alexander', image: alexanderImg },
  { name: 'Thomas De Wilde',         roleKey: 'team.roles.coo',            taglineKey: 'team.taglines.thomas',    image: thomasImg    },
  { name: 'Elise Verhaegen',         roleKey: 'team.roles.headBrand',      taglineKey: 'team.taglines.elise',     image: eliseImg     },
  { name: 'Lukas Meyer',             roleKey: 'team.roles.perfMarketing',  taglineKey: 'team.taglines.lukas',     image: lukasImg     },
  { name: 'Camille Laurent',         roleKey: 'team.roles.dataLead',       taglineKey: 'team.taglines.camille',   image: camilleImg   },
  { name: 'Sophie Van Dijk',         roleKey: 'team.roles.creativeDir',    taglineKey: 'team.taglines.sophie',    image: sophieImg    },
  { name: 'Claire Dumont',           roleKey: 'team.roles.clientSuccess',  taglineKey: 'team.taglines.claire',    image: claireImg    },
  { name: 'Julia Van Aertselaer',    roleKey: 'team.roles.bdManager',      taglineKey: 'team.taglines.julia',     image: juliaImg     },
  { name: 'Marco Bianchi',           roleKey: 'team.roles.contentMedia',   taglineKey: 'team.taglines.marco',     image: marcoImg     },
  { name: 'Arjun Mehta',             roleKey: 'team.roles.frontendDev',    taglineKey: 'team.taglines.arjun',     image: arjunImg     },
  { name: 'Bilal Khan',              roleKey: 'team.roles.techConsultant', taglineKey: 'team.taglines.bilal',     image: bilalImg     },
  { name: 'Rohan Iyer',              roleKey: 'team.roles.backendDev',     taglineKey: 'team.taglines.rohan',     image: rohanImg     },
];

const officePhotos = [meeting1, meeting2, meeting3];

const howWeWorkKeys = [
  { icon: Target,     titleKey: 'team.howWeWork.strategy.title',     descKey: 'team.howWeWork.strategy.description' },
  { icon: Rocket,     titleKey: 'team.howWeWork.execution.title',    descKey: 'team.howWeWork.execution.description' },
  { icon: TrendingUp, titleKey: 'team.howWeWork.optimization.title', descKey: 'team.howWeWork.optimization.description' },
];

/* ─── Shared Components (CSS-only, no framer-motion) ─── */

const Initials = ({ name }: { name: string }) => (
  <span className="text-3xl md:text-4xl font-bold text-primary/50 select-none">
    {name.split(' ').map(n => n[0]).join('')}
  </span>
);

/** Founder card — large dominant portrait */
const FounderCard = ({ person, index, t }: { person: Person; index: number; t: any }) => (
  <div className={`animate-fade-up-${index + 1} group flex-1`}>
    <div className="glass-card border border-primary/15 hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_hsl(43_100%_50%/0.15)]">
      <div className="relative bg-gradient-to-b from-primary/[0.06] to-background flex items-center justify-center overflow-hidden py-10 md:py-14">
        <div
          className="founder-avatar relative flex items-center justify-center overflow-hidden transition-all duration-300"
          style={{
            width: 260, height: 260, borderRadius: 24,
            border: '2.5px solid hsl(43 76% 52% / 0.6)',
            boxShadow: '0 8px 30px hsl(0 0% 0% / 0.5), 0 0 20px hsl(43 76% 52% / 0.08)',
          }}
        >
          {person.image
            ? <img src={person.image} alt={person.name} className="w-full h-full object-cover" loading="lazy" decoding="async" width={260} height={260} />
            : <Initials name={person.name} />}
        </div>
      </div>
      <div className="p-6 md:p-8 relative z-10">
        <h3 className="text-xl md:text-2xl font-bold gold-gradient-text mb-1">{person.name}</h3>
        <p className="text-sm font-medium text-foreground/80 mb-3">{t(person.roleKey)}</p>
        <p className="text-sm text-muted-foreground italic leading-relaxed">{t(person.taglineKey)}</p>
      </div>
    </div>
  </div>
);

/** Executive card — medium size */
const ExecCard = ({ person, index, large, t }: { person: Person; index: number; large?: boolean; t: any }) => (
  <div className={`animate-fade-up-${Math.min(index + 1, 10)} group`}>
    <div className="glass-card border border-primary/10 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_hsl(43_100%_50%/0.12)]">
      <div className={`relative ${large ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-gradient-to-b from-primary/[0.04] to-background flex items-center justify-center overflow-hidden`}>
        {person.image
          ? <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" width={400} height={500} />
          : <Initials name={person.name} />}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="p-5 -mt-10 relative z-10">
        <h4 className="text-lg font-bold gold-gradient-text mb-1">{person.name}</h4>
        <p className="text-sm font-medium text-foreground/80 mb-2">{t(person.roleKey)}</p>
        <p className="text-xs text-muted-foreground italic leading-relaxed">{t(person.taglineKey)}</p>
      </div>
    </div>
  </div>
);

/** Regular team card — CSS hover lift, no framer-motion */
const TeamCard = ({ person, index, t }: { person: Person; index: number; t: (key: string, fallback?: string) => string }) => (
  <div className={`animate-fade-up-${Math.min(index + 1, 10)} group hover:-translate-y-1.5 transition-transform duration-300`}>
    <div className="glass-card border border-primary/10 hover:border-primary/35 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_6px_30px_hsl(43_100%_50%/0.1)]">
      <div className="relative aspect-[4/5] bg-gradient-to-b from-primary/[0.03] to-background flex items-center justify-center overflow-hidden">
        {person.image
          ? <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" width={320} height={400} />
          : <Initials name={person.name} />}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="p-5 -mt-10 relative z-10">
        <h4 className="text-base font-bold gold-gradient-text mb-1">{person.name}</h4>
        <p className="text-sm text-foreground/80 mb-1">{t(person.roleKey)}</p>
        <p className="text-xs text-muted-foreground italic">{t(person.taglineKey)}</p>
        <div className="mt-3 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/60 to-primary/20 transition-all duration-500" />
      </div>
    </div>
  </div>
);

/* ─── Page ─── */

const OurTeam = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <PageSEO
        title={t('team.meta.title', 'Our Team — GROPPI')}
        description={t('team.meta.description', 'Meet the founders, leadership, and global team behind every strategy, campaign, and result at GROPPI.')}
        path="/team"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.team', 'Our Team'), path: '/team' }]} />

      {/* ─ HERO ─ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 neural-lines opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="animate-fade-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t('team.hero.badge', 'The People Behind GROPPI')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text leading-tight">
              {t('team.hero.title', 'Our Team')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('team.hero.subtitle', 'The people behind every strategy, every campaign, every result.')}
            </p>
          </div>
        </div>
      </section>

      {/* ─ SECTION 1: Executive Leadership ─ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(43_100%_50%/0.04),transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('team.sections.founders', 'Founders')}
            title={t('team.sections.executiveLeadership', 'Executive Leadership')}
            showSparkle
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f, i) => <FounderCard key={f.name} person={f} index={i} t={t} />)}
          </div>

          <div className="max-w-xs mx-auto my-16">
            <div className="section-divider" />
          </div>

          <div className="max-w-sm mx-auto">
            <ExecCard person={execOps} index={0} large t={t} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-12">
            {directors.map((d, i) => <ExecCard key={d.name} person={d} index={i + 1} t={t} />)}
          </div>
        </div>
      </section>

      {/* ─ SECTION 3: Inside Our Office ─ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('team.sections.behindScenes', 'Behind the Scenes')}
            title={t('team.sections.insideOffice', 'Inside Our Office')}
            showSparkle
          />
          <p className="animate-fade-up text-center text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            {t('team.officeSubtitle', 'Real discussions. Real decisions. Real execution.')}
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {officePhotos.map((img, i) => (
              <div
                key={i}
                className={`animate-fade-up-${i + 1} group relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-[0_8px_40px_hsl(43_100%_50%/0.1)]`}
              >
                <img
                  src={img}
                  alt={`GROPPI office meeting ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy" decoding="async" width={600} height={450}
                />
                <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ SECTION 5: Our Team ─ */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={t('team.sections.whoWeAre', 'Who We Are')}
            title={t('team.sections.ourTeam', 'Our Team')}
            showSparkle
          />

          <div className="max-w-sm mx-auto mb-12">
            <TeamCard person={teamMembers[0]} index={0} t={t} />
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {teamMembers.slice(1, 3).map((m, i) => <TeamCard key={m.name} person={m} index={i} t={t} />)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {teamMembers.slice(3, 7).map((m, i) => <TeamCard key={m.name} person={m} index={i} t={t} />)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {teamMembers.slice(7, 10).map((m, i) => <TeamCard key={m.name} person={m} index={i} t={t} />)}
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {teamMembers.slice(10, 12).map((m, i) => <TeamCard key={m.name} person={m} index={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* ─ SECTION: How We Work ─ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('team.sections.ourProcess', 'Our Process')}
            title={t('team.sections.howWeWork', 'How We Work')}
            showSparkle
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howWeWorkKeys.map((item, i) => (
              <GlassCard
                key={i}
                className={`animate-fade-up-${i + 1} p-8 text-center group`}
                hover3D={false}
                glowOnHover={false}
              >
                <div className="w-14 h-14 rounded-2xl glass-card border border-primary/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 gold-gradient-text">{t(item.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(item.descKey)}</p>
                <div className="mt-6 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─ CTA ─ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        <div className="container mx-auto px-4 relative z-10">
          <GlassCard
            className="animate-fade-up max-w-3xl mx-auto p-8 md:p-12 text-center"
            hover3D={false}
            glowOnHover={false}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
              {t('team.cta.title', 'Want to work with a team that delivers real results?')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{t('team.cta.subtitle', "Let's talk.")}</p>
            <Button asChild size="lg" className="luxury-button gap-2">
              <LangLink to="/contact">
                {t('team.cta.button', 'Contact Us')}
                <ArrowRight className="w-4 h-4" />
              </LangLink>
            </Button>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default OurTeam;
