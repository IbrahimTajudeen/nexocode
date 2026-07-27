"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { personalInfo as defaultPersonalInfo } from "@/lib/resume-data"
import { useAddContactMessageMutation, useGetPersonalInfoQuery } from "@/lib/redux/api/portfolioApi"
import { Mail, MapPin, Github, Linkedin, Globe, Send, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { data: personalInfo = defaultPersonalInfo } = useGetPersonalInfoQuery()

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@ibrahimtajudeen",
      href: personalInfo.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Ibrahim Tajudeen",
      href: personalInfo.linkedin,
    },
    {
      icon: Globe,
      label: "Portfolio",
      value: "nexocode.vercel.app",
      href: personalInfo.portfolio,
    },
  ]

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [addContactMessage, { isLoading: submitting }] = useAddContactMessageMutation()
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setStatus(null)

    try {
      const res = await addContactMessage(formData).unwrap()
      setStatus({ type: "success", text: res.message || "Thank you! Your message has been sent." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      setStatus({ type: "error", text: err?.data || "Failed to submit message. Please try again." })
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>LET&apos;S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Open to technical leadership, consulting, backend engineering, and fintech platform development opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank">
                  <Card className="hover:border-primary/60 border border-border/80 bg-card/60 backdrop-blur-md transition-all duration-300 group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">{link.label}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{link.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 text-center sm:text-left flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Location & Availability</h4>
                  <p className="text-xs text-muted-foreground">{personalInfo.location} • Open to Remote & Onsite</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="border border-border/80 bg-card/80 backdrop-blur-md shadow-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-1">Send a Message</h3>
              <p className="text-xs text-muted-foreground mb-6">Directly reaches my admin inbox via Supabase database.</p>

              {status && (
                <div
                  className={`p-4 mb-6 rounded-xl border flex items-center gap-3 text-xs ${
                    status.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{status.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Ibrahim, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold py-3 flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
