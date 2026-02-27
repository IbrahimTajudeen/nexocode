export default function Bar({ label, value, variant = 'Normal' }: { label: string; value: number, variant?: 'Normal' | 'Side' }) {
    switch (variant)
    {
      case 'Normal':
        return (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full">
              <div
                style={{ width: `${value}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>)
      
      case 'Side':
        return (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <div className="h-2 bg-[#454444] rounded-full">
              <div
                style={{ width: `${value}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>)
    }
}