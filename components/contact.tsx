import { ReactNode } from "react";
import PageHeader from "./page-header";
import Link from "next/link";
import { LocateIcon, MailIcon, Phone, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const contactData = [
  {
    icon: LocateIcon,
    title: "Location",
    info: [
      {
        link: "#",
        text: "remotely",
      },
    ],
  },
  {
    icon: Phone,
    title: "Phone Number",
    info: [
      {
        link: "tel:2348132166576",
        text: "+234 813 216 6576",
      },
      {
        link: "tel:2347083064737",
        text: "+234 708 306 4737",
      },
    ],
  },
  {
    icon: MailIcon,
    title: "Email",
    info: [
      {
        link: "mailto:donslice6@gmail.com",
        text: "donslice6@gmail.com",
      },
    ],
  },
];

interface ContactFormData {
  name: string;
  subject: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: ContactFormData = {
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <PageHeader title="Contact" content="Content content" />

      <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        <motion.div
          className="col-span-1 md:col-span-5"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-5 rounded-2xl h-full flex-1 space-y-5">
            <h1 className="font-bold text-3xl" id="contact">
              Contact Info
            </h1>
            <p className="mb-6">Other ways to get in touch with me.</p>
            {contactData.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ContactItem title={v.title} infos={v.info}>
                  <v.icon size={32} />
                </ContactItem>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="col-span-1 md:col-span-7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gray-500/10 p-5 rounded-2xl flex-1 space-y-2 w-full gap-5"
          >
            <h1 className="font-bold text-3xl">Get In Touch</h1>
            <p className="mb-6">
              The start of your new project is just a message away. Lets pined
              down with a message.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="col-span-2 lg:col-span-1 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75"
              />
              <input
                type="text"
                placeholder="Your Email"
                name="email"
                required
                className="col-span-2 lg:col-span-1 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75"
              />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                required
                className="col-span-2 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75"
              />
              <textarea
                rows={5}
                placeholder="Message"
                name="message"
                required
                className="col-span-2 text-lg px-4 py-3 rounded-lg border border-white/20 outline-0 focus:outline-4 focus:outline-white/30 transition-all duration-75"
              ></textarea>
            </div>
            <div className="text-center p-3 space-y-2">
              <motion.button
                disabled={loading}
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 rounded-lg text-white w-full border border-white/10 bg-black/30 hover:scale-105 duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Message"}
              </motion.button>

              {success !== null && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm mt-2 p-2 rounded-md text-center ${
                    success
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {success
                    ? "Message sent successfully!"
                    : "Failed to send message."}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

interface Info {
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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="flex space-x-2 items-center px-5 py-3 bg-white/10 backdrop-blur-xs rounded-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
    >
      <div className="rounded-full p-4 bg-white/20 border border-white/30">
        {children}
      </div>
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        <ul>
          {infos.map((v) => (
            <li key={v.link}>
              <Link href={v.link}>{v.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}