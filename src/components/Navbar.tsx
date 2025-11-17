import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check auth status
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Odjavljeni ste",
      description: "Uspješno ste se odjavili",
    });
    navigate('/');
  };

  const navLinks = [
    { name: "Početna", path: "/" },
    { name: "O Nama", path: "/about" },
    { name: "Programi", path: "/programs" },
    { name: "Članstvo", path: "/membership" },
    { name: "Događaji", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Kontakt", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">CNT</span>
            </div>
            <span className="text-xl font-bold hidden md:block">
              Centar za Napredne Tehnologije
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                Odjavi Se
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')}>
                Prijavi Se
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Odjavi Se
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                >
                  Prijavi Se
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;