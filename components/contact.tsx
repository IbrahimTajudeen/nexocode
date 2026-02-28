import { ReactNode } from "react";
import PageHeader from "./page-header";
import Link from "next/link";
import { LocateIcon, MailIcon, Phone, Send } from "lucide-react";


const contactData = [
    {
        icon: LocateIcon,
        title: 'Location',
        info: [
            {
                link: '#',
                text: 'remotely'
            }
        ],
    },
    {
        icon: Phone,
        title: 'Phone Number',
        info: [
            {
                link: 'tel:2348132166576',
                text: '+234 813 216 6576'
            },
            {
                link: 'tel:2347083064737',
                text: '+234 708 306 4737'
            }
        ],
    },
    {
        icon: MailIcon,
        title: 'Email',
        info: [
            {
                link: 'mailto:donslice6@gmail.com',
                text: 'donslice6@gmail.com'
            },
        ],
    }
]

export default function Contact() {
  return (
    <section>
      <PageHeader title="Contact" content="Content content" />
      
      <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="col-span-1 md:col-span-5">
          <div className="p-5 rounded-2xl h-full flex-1 space-y-5">
            <h1 className="font-bold text-3xl" id="contact">Contact Info</h1>
            <p className="mb-6">Other ways to get in touch with me.</p>
            {contactData.map((v) => (
                <ContactItem key={v.title} title={v.title} infos={v.info}>
                    <v.icon size={32} />
                </ContactItem>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-7">
          <div className="bg-gray-500/10 p-5 rounded-2xl flex-1 space-y-2 w-full gap-5">
            <h1 className="font-bold text-3xl">Get In Touch</h1>
            <p className="mb-6">The start of your new project is just a message away. Lets pined down with a message.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
                <input type="text" placeholder="Your Name" className="col-span-2 lg:col-span-1 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75" />
                <input type="text" placeholder="Your Email" className="col-span-2 lg:col-span-1 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75" />
                <input type="text" placeholder="Subject" className="col-span-2 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75" />
                <textarea rows={5} placeholder="Message" className="col-span-2 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75"></textarea>
            </div>
            <div className="text-center p-3 space-y-2">
                <button className="px-4 py-3 rounded-lg text-white w-full border border-white/10 bg-black/30 hover:scale-105 duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2">Send Message <Send size={16} /></button>
                <p className="p-2 bg-green-500/10 text-green-500/80 rounded-md">Message sent successfully</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Info{
    link: string;
    text: string;
}

interface ContactInfo {
    title: string;
    infos: Info[];
    children: ReactNode;
}

function ContactItem({ title, infos, children }: ContactInfo) {
    return (
        <div className="flex space-x-2 items-center px-5 py-3 bg-white/10 backdrop-blur-xs rounded-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
            <div className="rounded-full p-5 bg-white/20 border border-white/30">
                {children}
            </div>
            <div>
                <h1 className="font-bold text-xl">{title}</h1>
                <ul>
                    {infos.map((v) => (
                        <li key={v.link}><Link href={v.link}>{v.text}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}