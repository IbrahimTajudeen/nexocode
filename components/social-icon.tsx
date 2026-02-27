export default function Social({ icon }: any) {
  return (
    <a
      href="#"
      className="flex h-10 w-10 p-3 items-center justify-center rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
    >
      {icon}
    </a>
  );
}