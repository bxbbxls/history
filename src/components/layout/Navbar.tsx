import Search from "./Search";
import NavLogo from "./NavLogo";
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex bg-full text-foreground min-w-screen items-center justify-between p-3 border-b drop-shadow-sm">
      <div>
        <NavLogo />
      </div>
      <Search />
    </nav>
  );
}
