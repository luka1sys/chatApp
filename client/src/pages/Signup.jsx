import { useAuth } from "../context/authContext";
import { Link } from "react-router";

const Signup = () => {
  const { signup } = useAuth();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userData = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    signup(userData);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-2xl backdrop-blur-md">
        <div className="border-b border-neutral-800 bg-neutral-900/50 p-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
          <p className="mt-2 text-sm text-neutral-400">Get started with your free account today</p>
        </div>

        <div className="p-8">
          <form onSubmit={handlesubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-neutral-500" htmlFor="fullname">
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="John Doe"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-neutral-500" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-neutral-500" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-900/40 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-emerald-500 hover:text-emerald-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;