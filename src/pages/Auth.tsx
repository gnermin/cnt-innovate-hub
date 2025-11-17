import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Neispravan email format");
const passwordSchema = z.string().min(6, "Lozinka mora imati najmanje 6 karaktera");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email
      emailSchema.parse(email);
      // Validate password
      passwordSchema.parse(password);

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Dobrodošli nazad!",
          description: "Uspješno ste se prijavili",
        });
      } else {
        // Sign up
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Registracija uspješna!",
          description: "Provjerite email za potvrdu naloga",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Greška validacije",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Greška",
          description: error.message || "Došlo je do greške",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-card p-8 rounded-lg border-2 border-neon">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">CNT</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Prijava" : "Registracija"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Dobrodošli nazad!" : "Kreirajte novi nalog"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Ime i Prezime</label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Vaše ime"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vas@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lozinka</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimum 6 karaktera"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Učitavanje..." : isLogin ? "Prijavi Se" : "Registruj Se"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? "Nemate nalog? Registrujte se" : "Već imate nalog? Prijavite se"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;