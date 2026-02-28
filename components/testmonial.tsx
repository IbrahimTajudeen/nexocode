import { TestimonialCard } from "./cards";

const testimonials = [
  {
    quote:
      "Implementing innovative strategies has revolutionized our approach to market challenges and competitive positioning.",
    name: "Rachel Bennett",
    role: "Strategy Director",
    avatar: "/images/testimonial-2.jpg",
  },
  {
    quote:
      "Exceptional service delivery and innovative solutions have transformed our business operations, leading to remarkable growth and enhanced customer satisfaction across all touchpoints.",
    name: "Daniel Morgan",
    role: "Chief Innovation Officer",
    avatar: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "Strategic partnership has enabled seamless digital transformation and operational excellence.",
    name: "Emma Thompson",
    role: "Digital Lead",
    avatar: "/images/testimonial-3.jpg",
  },
  {
    quote:
      "Professional expertise and attention to detail made a huge impact on our workflow and results.",
    name: "John Carter",
    role: "Product Manager",
    avatar: "/images/testimonial-4.jpg",
  },
  {
    quote:
      "Their team brought clarity and speed to our product delivery pipeline.",
    name: "Sarah Williams",
    role: "Operations Lead",
    avatar: "/images/testimonial-5.jpg",
  },
  {
    quote:
      "We achieved measurable growth within weeks of implementation.",
    name: "Michael Lee",
    role: "Growth Manager",
    avatar: "/images/testimonial-6.jpg",
  },
];

export default function TestimonialsGrid() {
  return (
    <section className="mx-auto px-10 py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Column 1 */}
        <div className="space-y-6 lg:pt-12">
          <TestimonialCard {...testimonials[0]} />
          <TestimonialCard {...testimonials[3]} />
        </div>

        {/* Column 2 (taller middle column) */}
        <div className="space-y-6">
          <TestimonialCard {...testimonials[1]} />
          <TestimonialCard {...testimonials[4]} />
        </div>

        {/* Column 3 */}
        <div className="space-y-6 lg:pt-16">
          <TestimonialCard {...testimonials[2]} />
          <TestimonialCard {...testimonials[5]} />
        </div>
      </div>
    </section>
  );
}