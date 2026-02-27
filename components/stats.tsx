import {
  Heading,
  HeadphonesIcon,
  LucideBookText,
  Smile
} from 'lucide-react'
import React from 'react';

export default function Stats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 max-w-screen h-fit gap-5 p-5 mx-5 bg-red-200">
      {[
        {
          color: 'text-blue-500',
          bg: 'bg-blue-500/10',
          icon: Smile,
          label: "Happy Clients",
          value: 232
        },
        {
          color: 'text-orange-500',
          bg: 'bg-orange-500/10',
          icon: LucideBookText,
          label: "Projects",
          value: 521
        },
        {
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          icon: HeadphonesIcon,
          label: "Hours of Support",
          value: 1463
        },
        {
          color: 'text-slate-500',
          bg: 'bg-slate-500/10',
          icon: Heading,
          label: "Hard Workers",
          value: 15
        },
      ].map((stats) => (
        <div key={stats.label} className="bg-[#242424] h-full rounded-2xl m-5 p-3 text-center">
          <div className={`mt-4 mb-4 inline-block p-3 ${stats.bg} rounded-full`}>
            <stats.icon size={48} className={`${stats.color}`} />
          </div>
            <p className="xl:text-3xl text-2xl font-bold">{stats.value}</p>
            <span className="text-gray-400">{stats.label}</span>          
        </div>
      ))}
    </section>
  );
}
