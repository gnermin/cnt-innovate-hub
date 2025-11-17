import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";

const membershipSchema = z.object({
  full_name: z.string()
    .trim()
    .min(2, { message: "Ime mora imati najmanje 2 znaka" })
    .max(100, { message: "Ime ne smije biti duže od 100 znakova" })
    .regex(/^[a-zA-ZčćžšđČĆŽŠĐ\s]+$/, { message: "Ime može sadržavati samo slova i razmake" }),
  phone: z.string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Unesite važeći broj telefona (npr. +38761234567)" })
    .optional()
    .or(z.literal("")),
  date_of_birth: z.string()
    .refine((date) => {
      if (!date) return true; // Optional field
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    }, { message: "Starost mora biti između 13 i 120 godina" })
    .optional()
    .or(z.literal("")),
  address: z.string()
    .trim()
    .max(200, { message: "Adresa ne smije biti duža od 200 znakova" })
    .optional()
    .or(z.literal("")),
});

const MembershipCheckout = () => {
  const [user, setUser] = useState<any>(null);
  const [existingMember, setExistingMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [checkingMember, setCheckingMember] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    date_of_birth: "",
    address: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        toast({
          title: "Prijava potrebna",
          description: "Molimo prijavite se da nastavite",
          variant: "destructive",
        });
        navigate('/auth');
      } else {
        setUser(user);
        setFormData(prev => ({
          ...prev,
          full_name: user.user_metadata?.full_name || "",
        }));

        // Check if member already exists
        const { data: member } = await supabase
          .from('members')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setExistingMember(member);
        setCheckingMember(false);

        if (member) {
          setFormData({
            full_name: member.full_name || "",
            phone: member.phone || "",
            date_of_birth: member.date_of_birth || "",
            address: member.address || "",
          });
        }
      }
    });
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validatedData = membershipSchema.parse(formData);

      // Update or create member record
      if (existingMember) {
        const { error: memberError } = await supabase
          .from('members')
          .update({
            full_name: validatedData.full_name,
            phone: validatedData.phone || null,
            date_of_birth: validatedData.date_of_birth || null,
            address: validatedData.address || null,
          })
          .eq('user_id', user.id);

        if (memberError) throw memberError;
      } else {
        const { error: memberError } = await supabase
          .from('members')
          .insert({
            user_id: user.id,
            email: user.email,
            full_name: validatedData.full_name,
            phone: validatedData.phone || null,
            date_of_birth: validatedData.date_of_birth || null,
            address: validatedData.address || null,
            membership_type: 'monthly',
            membership_status: 'pending',
          });

        if (memberError) throw memberError;
      }

      // Call Stripe checkout function
      const { data, error } = await supabase.functions.invoke('create-checkout');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Checkout kreiran",
          description: "Otvorena je stranica za plaćanje",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Greška validacije",
          description: firstError.message,
          variant: "destructive",
        });
      } else if (error.message?.includes('duplicate key value violates unique constraint')) {
        toast({
          title: "Članstvo već postoji",
          description: "Već imate aktivno članstvo",
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

  if (!user || checkingMember) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                {existingMember ? 'Upravljaj Članstvom' : 'Postani Član'}
              </h1>
              <p className="text-muted-foreground">
                {existingMember 
                  ? 'Pregledajte status članarine i ažurirajte svoje podatke'
                  : 'Popunite formu i nastavite na plaćanje'}
              </p>
            </div>

            {existingMember && (
              <div className="mb-8">
                <SubscriptionStatus />
              </div>
            )}

            <div className="bg-card p-8 rounded-lg border border-neon">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ime i Prezime *</label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Datum Rođenja</label>
                  <Input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Adresa</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Mjesečna Članarina:</span>
                    <span className="text-2xl font-bold">20 EUR</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pristup svim programima i radionicama • Automatsko obnavljanje
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kreiranje...
                    </>
                  ) : existingMember ? (
                    "Obnovi Članarinu"
                  ) : (
                    "Nastavi na Plaćanje"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MembershipCheckout;