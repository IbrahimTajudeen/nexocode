"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { personalInfo as defaultPersonalInfo } from "@/lib/resume-data"
import { useAddContactMessageMutation, useGetPersonalInfoQuery } from "@/lib/redux/api/portfolioApi"
import { Mail, MapPin, Github, Linkedin, Globe, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
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
      setStatus({ type: "success", text: res.message || "Thank you! Your message has been sent to my email and database." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      const errorMsg = typeof err?.data === "string" ? err.data : err?.data?.error || "Failed to submit message. Please try again."
      setStatus({ type: "error", text: errorMsg })
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-background/50 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Open for technical contracts, engineering leadership roles, backend architecture, and consulting inquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Links */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {contactLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank">
                  <Card className="hover:border-primary/40 border border-border/80 bg-card/70 backdrop-blur-md transition-all duration-200 group shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">{link.label}</h3>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{link.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md flex items-center gap-3 shadow-sm">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Location & Mode</h4>
                <p className="text-xs text-muted-foreground">{personalInfo.location} • Remote & Onsite</p>
              </div>
            </div>
          </div>

          {/* Interactive Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <Card className="border border-border/80 bg-card/80 backdrop-blur-md shadow-md p-6 sm:p-7">
              <h3 className="text-lg font-bold mb-1 text-foreground">Send a Direct Message</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Dispatches a live notification email via Resend to my inbox and records the inquiry in Supabase.
              </p>

              {status && (
                <div
                  className={`p-4 mb-6 rounded-xl border flex items-center gap-3 text-xs ${
                    status.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />}
                  <span>{status.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/60 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/60 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Role Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/60 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Ibrahim, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/60 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold py-2.5 flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
