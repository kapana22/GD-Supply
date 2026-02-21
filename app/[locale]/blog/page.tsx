import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <main className="relative">
      <section className="py-[60px] md:py-[100px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
            ბლოგი
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            ბლოგი
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gd-muted">
            ჰიდროიზოლაციის პრაქტიკული რჩევები, სისტემების შედარება, ხშირი შეცდომები და დეტალები.
          </p>
        </div>
      </section>

      <section className="pb-[60px] md:pb-[100px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`./${p.slug}`}
                className="group overflow-hidden rounded-xl border border-white/10 bg-gd-panel shadow-elevated transition hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image src={p.cover} alt={p.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur">
                    {p.tag}
                  </div>
                </div>
                <div className="space-y-2 px-6 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                    {p.date}
                  </p>
                  <h2 className="text-lg font-extrabold text-white">{p.title}</h2>
                  <p className="text-sm leading-relaxed text-gd-muted">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-green group-hover:text-white">
                    წაიკითხე <span className="transition group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
