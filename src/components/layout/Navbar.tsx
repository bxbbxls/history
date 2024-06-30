export default function Navbar() {
  return (
    <nav className="flex bg-full text-foreground min-w-screen items-center justify-between p-3 border-b drop-shadow-sm">
      <div>
        <p className="px-3 py-1 border rounded-full select-none">Historia</p>
      </div>
      <div>
        <p className="hidden px-3 py-1 border rounded-full">Historia</p>
      </div>
    </nav>
  );
}
