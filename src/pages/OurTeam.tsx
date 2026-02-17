import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';
import { Sparkles, Target, Rocket, TrendingUp, ArrowRight, Users } from 'lucide-react';

// Team photos
import mohamedImg from '@/assets/team/mohamed-salah.png';
import alexanderImg from '@/assets/team/alexander-roth.png';
import thomasImg from '@/assets/team/thomas-de-wilde.png';
import eliseImg from '@/assets/team/elise-verhaegen.png';
import lukasImg from '@/assets/team/lukas-meyer.png';
import camilleImg from '@/assets/team/camille-laurent.png';
import sophieImg from '@/assets/team/sophie-van-dijk.png';
import claireImg from '@/assets/team/claire-dumont.png';
import juliaImg from '@/assets/team/julia-van-aertselaer.png';
import marcoImg from '@/assets/team/marco-bianchi.png';
import arjunImg from '@/assets/team/arjun-mehta.png';
import bilalImg from '@/assets/team/bilal-khan.png';
import rohanImg from '@/assets/team/rohan-iyer.png';

interface TeamMember {
  name: string;
  role: string;
  tagline: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Mohamed Salah', role: 'Head of Global Operations', tagline: 'Connecting markets, building empires.', image: mohamedImg },
  { name: 'Alexander Roth', role: 'Managing Director', tagline: 'Turning vision into revenue.', image: alexanderImg },
  { name: 'Thomas De Wilde', role: 'Chief Operating Officer', tagline: 'Precision in every process.', image: thomasImg },
  { name: 'Elise Verhaegen', role: 'Head of Brand & Strategy', tagline: 'Crafting stories that convert.', image: eliseImg },
  { name: 'Lukas Meyer', role: 'Performance Marketing Manager', tagline: 'Data-driven, results-obsessed.', image: lukasImg },
  { name: 'Camille Laurent', role: 'Data & Analytics Lead', tagline: 'Numbers tell the real story.', image: camilleImg },
  { name: 'Sophie Van Dijk', role: 'Creative Director', tagline: 'Where bold ideas take shape.', image: sophieImg },
  { name: 'Claire Dumont', role: 'Client Success Director', tagline: 'Your growth is our mission.', image: claireImg },
  { name: 'Julia Van Aertselaer', role: 'Business Development Manager', tagline: 'Opening doors, sealing deals.', image: juliaImg },
  { name: 'Marco Bianchi', role: 'Content & Media Producer', tagline: 'Visuals that move people.', image: marcoImg },
  { name: 'Arjun Mehta', role: 'External Frontend Developer', tagline: 'Pixel-perfect, every time.', image: arjunImg },
  { name: 'Bilal Khan', role: 'Technical Performance Consultant', tagline: 'Speed and scale, optimized.', image: bilalImg },
  { name: 'Rohan Iyer', role: 'External Backend Developer', tagline: 'Building the engine underneath.', image: rohanImg },
];

const howWeWork = [
  {
    icon: Target,
    title: 'Strategy',
    description: 'Every project starts with deep research, clear goals, and a roadmap built for measurable impact.',
  },
  {
    icon: Rocket,
    title: 'Execution',
    description: 'We move fast without cutting corners — launching campaigns, building assets, and shipping results.',
  },
  {
    icon: TrendingUp,
    title: 'Optimization',
    description: 'Continuous testing, data analysis, and iteration to push performance beyond expectations.',
  },
];

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    className="group"
  >
    <div className="glass-card border border-primary/10 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_hsl(43_100%_50%/0.12)]">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <div className="p-5 -mt-12 relative z-10">
        <h4 className="text-lg font-bold gold-gradient-text mb-1">{member.name}</h4>
        <p className="text-sm font-medium text-foreground/80 mb-2">{member.role}</p>
        <p className="text-xs text-muted-foreground italic leading-relaxed">{member.tagline}</p>
      </div>
    </div>
  </motion.div>
);

const OurTeam = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <PageSEO
        title="Our Team — GROPPI"
        description="Meet the people behind every strategy, every campaign, every result at GROPPI."
        path="/team"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Our Team', path: '/team' }]} />

      {/* Hero Section */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, hsl(43 100% 50% / 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 60%, hsl(43 100% 50% / 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 40%, hsl(43 100% 50% / 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="neural-lines opacity-20" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">The People Behind GROPPI</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text leading-tight">
              Our Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              The people behind every strategy, every campaign, every result.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Inside Our Team — Gallery / Slider */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle="Behind the Scenes"
            title="Inside Our Team"
            showSparkle
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <GlassCard className="p-8 md:p-12 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[mohamedImg, sophieImg, lukasImg, claireImg].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-xl overflow-hidden border border-primary/15"
                  >
                    <img
                      src={img}
                      alt="Team meeting"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-semibold gold-gradient-text">
                Real meetings. Real ideas. Real execution.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Our People Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Who We Are"
            title="Our People"
            showSparkle
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {teamMembers.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle="Our Process"
            title="How We Work"
            showSparkle
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howWeWork.map((item, index) => (
              <GlassCard
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 text-center group"
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-6"
                  animate={{
                    boxShadow: [
                      '0 0 15px hsl(43 100% 50% / 0.15)',
                      '0 0 30px hsl(43 100% 50% / 0.3)',
                      '0 0 15px hsl(43 100% 50% / 0.15)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 gold-gradient-text">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        <div className="container mx-auto px-4 relative z-10">
          <GlassCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 md:p-12 text-center"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px hsl(43 100% 50% / 0.1)',
                  '0 0 60px hsl(43 100% 50% / 0.2)',
                  '0 0 30px hsl(43 100% 50% / 0.1)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
            />

            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
              Want to work with a real team?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">Let's talk.</p>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <LangLink to="/contact">
                Contact Us <ArrowRight className="w-4 h-4" />
              </LangLink>
            </Button>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default OurTeam;
