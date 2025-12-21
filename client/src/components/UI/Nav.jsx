import { Link } from "react-router";

const Nav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/login"
          className="flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/50">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            ChatApp
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/signup"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/chats"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <span>Open Chats</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Nav;