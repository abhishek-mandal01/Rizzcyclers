import Link from 'next/link';

// The Header now accepts a 'variant' prop to show/hide different buttons
export default function Header({ variant = 'default' }: { variant?: 'default' | 'report' | 'login' }) {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          RizzCyclers
        </Link>
        <div className="space-x-4">
          {/* Only show "Live Map" if NOT on the login page */}
          {variant !== 'login' && (
            <Link href="/map" className="text-gray-600 hover:text-green-600">
              Live Map
            </Link>
          )}

          {/* Only show "Report Waste" and "Login" on the default (homepage) view */}
          {variant === 'default' && (
            <>
              <Link href="/report" className="text-gray-600 hover:text-green-600">
                Report Waste
              </Link>
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                Login / Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}