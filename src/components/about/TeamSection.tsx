import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Users, Crown, Briefcase } from 'lucide-react';

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
  image?: string;
}

interface TeamGroup {
  title: string;
  icon: typeof Users;
  members: TeamMember[];
}

const teamGroups: TeamGroup[] = [
  {
    title: 'Leadership',
    icon: Crown,
    members: [
      { name: 'Mohamed Salah', role: 'Head of Global Operations', image: mohamedImg },
      { name: 'Alexander Roth', role: 'Managing Director', image: alexanderImg },
      { name: 'Thomas De Wilde', role: 'Chief Operating Officer', image: thomasImg },
    ],
  },
  {
    title: 'Core Team',
    icon: Users,
    members: [
      { name: 'Elise Verhaegen', role: 'Head of Brand & Strategy', image: eliseImg },
      { name: 'Lukas Meyer', role: 'Performance Marketing Manager', image: lukasImg },
      { name: 'Camille Laurent', role: 'Data & Analytics Lead', image: camilleImg },
      { name: 'Sophie Van Dijk', role: 'Creative Director', image: sophieImg },
      { name: 'Claire Dumont', role: 'Client Success Director', image: claireImg },
      { name: 'Julia Van Aertselaer', role: 'Business Development Manager', image: juliaImg },
    ],
  },
  {
    title: 'External Specialists',
    icon: Briefcase,
    members: [
      { name: 'Marco Bianchi', role: 'Content & Media Producer', image: marcoImg },
      { name: 'Arjun Mehta', role: 'External Frontend Developer', image: arjunImg },
      { name: 'Bilal Khan', role: 'Technical Performance Consultant', image: bilalImg },
      { name: 'Rohan Iyer', role: 'External Backend Developer', image: rohanImg },
    ],
  },
];

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className="glass-card border border-primary/15 hover:border-primary/40 rounded-2xl p-6 md:p-8 text-center transition-all duration-500 hover:shadow-[0_0_30px_hsl(43_100%_50%/0.12)]">
        {/* Photo */}
        <div className="relative mx-auto mb-5 w-28 h-28 md:w-32 md:h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-primary/40 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-background">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={128}
                  height={128}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <span className="text-2xl font-bold text-primary/60">{initials}</span>
                </div>
              )}
            </div>
          </div>
          {/* Subtle glow behind photo on hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-primary/15" />
        </div>

        {/* Info */}
        <h4 className="text-lg font-semibold gold-gradient-text mb-1">{member.name}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{member.role}</p>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle radial background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(43_100%_50%/0.04),transparent)]" />
        <div className="absolute inset-0 neural-lines opacity-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          subtitle="The People Behind the Brand"
          title="Meet the Team"
          showSparkle
        />

        <div className="space-y-16 max-w-6xl mx-auto">
          {teamGroups.map((group) => (
            <div key={group.title}>
              {/* Group heading */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-10 rounded-xl glass-card border border-primary/20 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {group.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </motion.div>

              {/* Cards grid */}
              <div className={`grid gap-6 ${
                group.members.length <= 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {group.members.map((member, i) => (
                  <MemberCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
