import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-xs text-muted lg:px-8">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
