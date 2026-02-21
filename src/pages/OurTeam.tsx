import { motion } from 'framer-motion';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';
import { ArrowRight, Target, Rocket, TrendingUp, Users } from 'lucide-react';

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
import lucasImg from '@/assets/team/lucas-vermeer.png';
import sofiaImg from '@/assets/team/sofia-laurent.png';

// Office photos
import meeting1 from '@/assets/office/meeting-1.png';
import meeting2 from '@/assets/office/meeting-2.png';
import meeting3 from '@/assets/office/meeting-3.png';

/* ─── Data ─── */

interface Person {
  name: string;
  role: string;
  tagline: string;
  image?: string;
}

const founders: Person[] = [
  { name: 'Koen Van Grop', role: 'Founder & Chief Executive Officer', tagline: 'Vision-driven leadership shaping the future of performance marketing.' },
  { name: 'Totti Franco', role: 'Co-Founder & Chief Strategy Officer', tagline: 'Strategic growth architect behind scalable brand expansion.' },
];

const execOps: Person = {
  name: 'Mohamed Salah', role: 'Head of Global Operations',
  tagline: 'Aligning teams, performance, and execution across global markets.', image: mohamedImg,
};

const directors: Person[] = [
  { name: 'Lucas Vermeer', role: 'Director of Performance', tagline: 'Driving measurable results through data-led execution.', image: lucasImg },
  { name: 'Sofia Laurent', role: 'Director of Creative & Brand', tagline: 'Transforming strategy into powerful brand experiences.', image: sofiaImg },
];

const teamMembers: Person[] = [
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

const officePhotos = [meeting1, meeting2, meeting3];

const howWeWork = [
  { icon: Target, title: 'Strategy', description: 'Clear planning based on research and performance insight.' },
  { icon: Rocket, title: 'Execution', description: 'Cross-functional collaboration delivering measurable growth.' },
  { icon: TrendingUp, title: 'Optimization', description: 'Continuous refinement powered by data intelligence.' },
];

/* ─── Shared Components ─── */

const Initials = ({ name }: { name: string }) => (
  <span className="text-3xl md:text-4xl font-bold text-primary/50 select-none">
    {name.split(' ').map(n => n[0]).join('')}
  </span>
);

/** Founder card — large dominant portrait */
const FounderCard = ({ person, index }: { person: Person; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    className="group flex-1"
  >
    <div className="glass-card border border-primary/15 hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-600 hover:shadow-[0_0_50px_hsl(43_100%_50%/0.15)]">
      {/* Portrait area with centered premium avatar */}
      <div className="relative bg-gradient-to-b from-primary/[0.06] to-background flex items-center justify-center overflow-hidden py-10 md:py-14">
        <div
          className="founder-avatar relative flex items-center justify-center overflow-hidden transition-all duration-300"
          style={{
            width: 180,
            height: 180,
            borderRadius: 24,
            border: '2.5px solid hsl(43 76% 52% / 0.6)',
            boxShadow: '0 8px 30px hsl(0 0% 0% / 0.5), 0 0 20px hsl(43 76% 52% / 0.08)',
          }}
        >
          {person.image ? (
            <img src={person.image} alt={person.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <Initials name={person.name} />
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 relative z-10">
        <h3 className="text-xl md:text-2xl font-bold gold-gradient-text mb-1">{person.name}</h3>
        <p className="text-sm font-medium text-foreground/80 mb-3">{person.role}</p>
        <p className="text-sm text-muted-foreground italic leading-relaxed">{person.tagline}</p>
      </div>
    </div>
  </motion.div>
);

/** Executive card — medium size */
const ExecCard = ({ person, index, large }: { person: Person; index: number; large?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12, duration: 0.6 }}
    className="group"
  >
    <div className="glass-card border border-primary/10 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_hsl(43_100%_50%/0.12)]">
      <div className={`relative ${large ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-gradient-to-b from-primary/[0.04] to-background flex items-center justify-center overflow-hidden`}>
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        ) : (
          <Initials name={person.name} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="p-5 -mt-10 relative z-10">
        <h4 className="text-lg font-bold gold-gradient-text mb-1">{person.name}</h4>
        <p className="text-sm font-medium text-foreground/80 mb-2">{person.role}</p>
        <p className="text-xs text-muted-foreground italic leading-relaxed">{person.tagline}</p>
      </div>
    </div>
  </motion.div>
);

/** Regular team card */
const TeamCard = ({ person, index }: { person: Person; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    whileHover={{ y: -6 }}
    className="group"
  >
    <div className="glass-card border border-primary/10 hover:border-primary/35 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_6px_30px_hsl(43_100%_50%/0.1)]">
      <div className="relative aspect-[4/5] bg-gradient-to-b from-primary/[0.03] to-background flex items-center justify-center overflow-hidden">
        {person.image ? (
          <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        ) : (
          <Initials name={person.name} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="p-5 -mt-10 relative z-10">
        <h4 className="text-base font-bold gold-gradient-text mb-1">{person.name}</h4>
        <p className="text-sm text-foreground/80 mb-1">{person.role}</p>
        <p className="text-xs text-muted-foreground italic">{person.tagline}</p>
        {/* Gold underline on hover */}
        <div className="mt-3 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/60 to-primary/20 transition-all duration-500" />
      </div>
    </div>
  </motion.div>
);

/* ─── Page ─── */

const OurTeam = () => (
  <PageLayout>
    <PageSEO title="Our Team — GROPPI" description="Meet the founders, leadership, and global team behind every strategy, campaign, and result at GROPPI." path="/team" />
    <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Our Team', path: '/team' }]} />

    {/* ─ HERO ─ */}
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 neural-lines opacity-20" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">The People Behind GROPPI</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text leading-tight">Our Team</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">The people behind every strategy, every campaign, every result.</p>
        </motion.div>
      </div>
    </section>

    {/* ─ SECTION 1: Executive Leadership (Founders) ─ */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(43_100%_50%/0.04),transparent)]" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader subtitle="Founders" title="Executive Leadership" showSparkle />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((f, i) => <FounderCard key={f.name} person={f} index={i} />)}
        </div>

        {/* Gold divider */}
        <div className="max-w-xs mx-auto my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* Mohamed — second visual anchor */}
        <div className="max-w-sm mx-auto">
          <ExecCard person={execOps} index={0} large />
        </div>

        {/* Directors */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-12">
          {directors.map((d, i) => <ExecCard key={d.name} person={d} index={i + 1} />)}
        </div>
      </div>
    </section>

    {/* ─ SECTION 3: Inside Our Office ─ */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 neural-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader subtitle="Behind the Scenes" title="Inside Our Office" showSparkle />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
          Real discussions. Real decisions. Real execution.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {officePhotos.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-[0_8px_40px_hsl(43_100%_50%/0.1)]"
            >
              <img src={img} alt={`GROPPI office meeting ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─ SECTION 5: Senior Manager ─ */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader subtitle="Who We Are" title="Our Team" showSparkle />

        {/* Row 5 – Senior Manager (1 centered) */}
        <div className="max-w-sm mx-auto mb-12">
          <TeamCard person={teamMembers[0]} index={0} />
        </div>

        {/* Row 6 – Team Leads (2 side by side) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {teamMembers.slice(1, 3).map((m, i) => <TeamCard key={m.name} person={m} index={i} />)}
        </div>

        {/* Row 7 – Core Team First Group (4 cards) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {teamMembers.slice(3, 7).map((m, i) => <TeamCard key={m.name} person={m} index={i} />)}
        </div>

        {/* Row 8 – Core Team Second Group (3 cards) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {teamMembers.slice(7, 10).map((m, i) => <TeamCard key={m.name} person={m} index={i} />)}
        </div>

        {/* Row 9 – Core Team Final Group (2 centered) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {teamMembers.slice(10, 12).map((m, i) => <TeamCard key={m.name} person={m} index={i} />)}
        </div>
      </div>
    </section>

    {/* ─ SECTION 5: How We Work ─ */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 neural-lines opacity-15" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader subtitle="Our Process" title="How We Work" showSparkle />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howWeWork.map((item, i) => (
            <GlassCard
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl glass-card border border-primary/15 flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 gold-gradient-text">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              {/* Gold accent line */}
              <div className="mt-6 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    {/* ─ CTA ─ */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 neural-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <GlassCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
            Want to work with a team that makes real decisions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">Let's talk.</p>
          <Button asChild size="lg" variant="outline" className="border-primary/50 hover:bg-primary hover:text-primary-foreground gap-2 transition-all duration-500">
            <LangLink to="/contact">
              Contact Us <ArrowRight className="w-4 h-4" />
            </LangLink>
          </Button>
        </GlassCard>
      </div>
    </section>
  </PageLayout>
);

export default OurTeam;
