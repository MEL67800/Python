import Link from "next/link";

const sidebarLinks = [
  { href: "/admin", label: "仪表盘" },
  { href: "/admin/products", label: "产品管理" },
  { href: "/admin/news", label: "资讯管理" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-neutral-200 bg-neutral-50 p-6 space-y-6">
        <Link href="/admin" className="text-lg font-bold">AI Hub 管理</Link>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-neutral-200">
          <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-600">
            ← 返回前台
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
