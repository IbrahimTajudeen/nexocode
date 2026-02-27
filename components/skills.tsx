import PageHeader from "./page-header";
import Bar from './progress-bar'

export default function Skills() {
  return (
    <section className="max-w-full px-5">
      <PageHeader 
        title="Skills"
        content="The skills that makes me, me!."
       />
      <div className="grid md:grid-cols-2 gap-12 mx-10">
        <div className="space-y-4 py-8 px-10 bg-gray-500/10 rounded-2xl">
          <h3 className="font-semibold">
            <span className="border-b-2 border-white pb-2">Front</span>-end Development</h3>
          <Bar label="HTML/CSS" value={95} />
          <Bar label="JavaScript" value={85} />
          <Bar label="React" value={80} />
          <Bar label="TypeScript" value={75} />
          <Bar label="Next.js" value={70} />
          <Bar label="Tailwind CSS" value={95} />
          <Bar label="Bootstrap" value={95} />
          <Bar label="jQuery" value={95} />
          <Bar label="EJS, Handlebars, Pug" value={95} />
        </div>
        <div className="space-y-4 py-8 px-10 bg-gray-500/10 rounded-2xl">
          <h3 className="font-semibold">
            <span className="border-b-2 border-white pb-2">Back</span>-end</h3>
          <Bar label="Node.js" value={75} />
          <Bar label="Express.js" value={70} />
          <Bar label="Nest.js" value={75} />
          <Bar label="Python" value={70} />
          <Bar label="Django" value={75} />
          <Bar label="C#" value={75} />
          <Bar label="ASP.NET Core" value={75} />
          <Bar label="SQL" value={60} />
        </div>
        <div className="space-y-4 py-8 px-10 bg-gray-500/10 rounded-2xl">
          <h3 className="font-semibold"><span className="border-b-2 border-white pb-2">Mobile</span> Development</h3>
          <Bar label="React Native" value={70} />
          <Bar label="Flutter" value={65} />
          <Bar label="Xamarin Forms" value={60} />
          <Bar label=".Net MAUI" value={75} />
        </div>
        <div className="space-y-4 py-8 px-10 bg-gray-500/10 rounded-2xl">
          <h3 className="font-semibold"><span className="border-b-2 border-white pb-2">Baas</span> and Database Management</h3>
          <Bar label="Supabase" value={75} />
          <Bar label="Firebase" value={70} />
          <Bar label="SQL Server" value={70} />
          <Bar label="MongoDB" value={75} />
          <Bar label="PostgreSQL" value={75} />
          <Bar label="MySQL" value={75} />
        </div>
      </div>
    </section>
  );
}
