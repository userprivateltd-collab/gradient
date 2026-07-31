import React from 'react';
import { Globe, Smartphone, Wrench, Code2, Users, DollarSign, Mail, Hash, Tag } from 'lucide-react';
import { CategorizedEntities } from '../types/video';

interface EntitiesGridProps {
  entities: CategorizedEntities;
}

export const EntitiesGrid: React.FC<EntitiesGridProps> = ({ entities }) => {
  const sections = [
    {
      title: 'Websites Mentioned',
      icon: Globe,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan/10',
      borderColor: 'border-neon-cyan/20',
      items: entities.websites,
    },
    {
      title: 'Apps & Software',
      icon: Smartphone,
      color: 'text-neon-purple',
      bgColor: 'bg-neon-purple/10',
      borderColor: 'border-neon-purple/20',
      items: entities.apps,
    },
    {
      title: 'Tools & Utilities',
      icon: Wrench,
      color: 'text-brand-400',
      bgColor: 'bg-brand-500/10',
      borderColor: 'border-brand-500/20',
      items: entities.tools,
    },
    {
      title: 'Programming Languages',
      icon: Code2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      items: entities.programmingLanguages,
    },
    {
      title: 'Products & Brands',
      icon: Tag,
      color: 'text-neon-amber',
      bgColor: 'bg-neon-amber/10',
      borderColor: 'border-neon-amber/20',
      items: entities.products,
    },
    {
      title: 'People & Companies',
      icon: Users,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      items: [...entities.people, ...entities.companies],
    },
    {
      title: 'Money & Pricing',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      items: entities.moneyMentioned,
    },
    {
      title: 'Contact Links & Emails',
      icon: Mail,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20',
      items: [...entities.links, ...entities.emails, ...entities.phoneNumbers],
    },
    {
      title: 'Hashtags & Usernames',
      icon: Hash,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      items: [...entities.hashtags, ...entities.usernames],
    },
  ];

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl mb-10">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-brand-500 rounded-full"></span>
        <span>Categorized Entity Extraction</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-5 border border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`p-2 rounded-xl ${sec.bgColor} ${sec.color} border ${sec.borderColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">{sec.title}</h4>
                </div>

                {sec.items.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {sec.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">None detected in video audio</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
