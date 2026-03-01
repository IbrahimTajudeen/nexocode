import { motion } from "framer-motion";

export default function Bar({ label, value, variant = "Normal" }: { label: string; value: number; variant?: "Normal" | "Side" }) {
  switch (variant) {
    case "Normal":
      return (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
          <div className="h-2 bg-[#2a2a2a] rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ width: `${value}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      );

    case "Side":
      return (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
          <div className="h-2 bg-[#454444] rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ width: `${value}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      );
  }
}