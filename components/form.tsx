"use client";

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";

import Link from 'next/link';

import { useState, ReactNode } from "react";

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

    // console.log(data)

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
    <section id="contact" className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: CONTACT FORM */}
        <div className="lg:col-span-2 h-fit border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Send Me a Message
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField name="name" label="Name *" type="text" placeholder="Your full name" />
              <InputField name="email" label="Email *" type="email" placeholder="your.email@example.com" />
            </div>

            <InputField name="subject" label="Subject *" type="text" placeholder="What's this about?" />

            <div>
              <label className="block text-sm font-medium mb-1">
                Message *
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project..."
                className="w-full rounded-md border text-sm border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none resize-none"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center text-sm justify-center gap-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success !== null && (
              <p
                className={`text-sm mt-2 p-2 rounded-md text-center ${
                  success
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {success
                  ? "Message sent successfully!"
                  : "Failed to send message."}
              </p>
            )}
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card title="Get In Touch">
            <InfoItem icon={<Mail />} title="Email" value="suleimansani62@gmail.com" link="mailto:suleimansani62@gmail.com" />
            <InfoItem icon={<Phone />} title="Phone" value="07061386294" link="tel:07061386294" />
            <InfoItem icon={<MapPin />} title="Location" value="Kaduna, Nigeria" link="https://maps.google.com/?q=Kaduna,Nigeria" />
          </Card>

          <Card title="Quick Actions">
            <ActionItem link="tel:07061386294" icon={<Calendar />} title="Schedule a Call" desc="Book a 30-minute design consultation" button="Schedule Now" />
            <ActionItem link="https://wa.me/2347061386294" icon={<MessageCircle />} title="Quick Chat" desc="Send me a direct message" button="Start Chat" />
            <ActionItem link="mailto:suleimansani62@gmail.com" icon={<Clock />} title="Project Inquiry" desc="Discuss your design project needs" button="Get Quote" />
          </Card>

          <Card title="Connect With Me">
            <div className="flex gap-3">
              <SocialIcon link="https://x.com/Suleiymern1?t=05oKIaMuGDF7Jx3H5SrAhQ&s=09" icon={<Twitter />} />
              <SocialIcon link="https://www.instagram.com/official_suleiymern?igsh=MWt1aDBrdDB2dGowbA==" icon={<Instagram />} />
              <SocialIcon link="https://www.linkedin.com/in/suleiman-sani-63a351297?trk=contact-info" icon={<Linkedin />} />
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-20 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Suleiman Sani. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900">Terms of Service</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function InputField({
  name,
  label,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-md text-sm border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
      />
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4 text-sm">{children}</div>
    </div>
  );
}

function InfoItem({icon, title, value, link }: { icon: ReactNode; title: string; value: string, link: string }) {
  return (
    <Link href={link} className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-md text-gray-700">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </Link>
  );
}

function ActionItem({
  icon,
  title,
  desc,
  button,
  link,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  button: string;
  link: string;
}) {
  return (
    <Link href={link} className="flex gap-3">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-md h-fit">
        {icon}
      </div>
      <div>
        <p className="font-medium text-[18px]">{title}</p>
        <p className="text-sm text-gray-600 mb-2">{desc}</p>
        <button className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50">
          {button}
        </button>
      </div>
    </Link>
  );
}

function SocialIcon({ link, icon }: { link:string, icon: ReactNode }) {
  return (
    <Link href={link} className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition">
      {icon}
    </Link>
  );
}