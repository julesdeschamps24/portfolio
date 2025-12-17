import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur py-8 mt-20">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-zinc-500 text-sm">
          © {currentYear} Jules Deschamps. Tous droits réservés.
        </div>
        <div className="flex gap-6 text-sm">
          <Link 
            href="/mentions-legales" 
            className="text-zinc-500 hover:text-white transition"
          >
            Mentions Légales
          </Link>
          <Link 
            href="/politique-confidentialite" 
            className="text-zinc-500 hover:text-white transition"
          >
            Politique de Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}

