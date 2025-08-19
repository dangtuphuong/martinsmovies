import Link from "next/link";
import { usePathname } from "next/navigation";
import { Squares2X2Icon, Bars3Icon } from "@heroicons/react/24/solid";

export default function ViewSwitcher() {
  const pathname = usePathname();

  const buttons = [
    { name: "Grid", href: "/", icon: Squares2X2Icon },
    { name: "List", href: "/#", icon: Bars3Icon },
  ];

  return (
    <div className="flex mb-4 gap-2">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        const isActive = pathname === btn.href;

        return (
          <Link
            key={btn.name}
            href={btn.href}
            className={`flex items-center justify-center w-10 h-10 shadow-sm rounded transition text-gray-400 opacity-90 ${
              isActive
                ? "bg-[#9352b3] text-white"
                : "hover:bg-[#9352b3] hover:text-white"
            }`}
            title={btn.name}
          >
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </div>
  );
}
