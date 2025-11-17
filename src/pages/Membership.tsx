import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Membership = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinClick = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Prijava potrebna",
        description: "Molimo prijavite se ili kreirajte nalog da biste nastavili",
      });
      navigate('/auth');
      return;
    }
    
    navigate('/membership/checkout');
  };

  const benefits = [
    "Pristup svim radionicama",
    "Besplatni materijali i oprema",
    "Mentorstvo instruktora",
    "Učešće na takmičenjima",
    "Sertifikati za završene programe",
    "Popusti na događaje",
    "Pristup online resursima",
    "Članovi klubova i timova"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neon-cyan">
              Članstvo
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Postani dio naše zajednice i oslobodi svoj potencijal
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-12 rounded-lg border-2 border-neon relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-6 py-2 text-sm font-bold">
                POPULARAN IZBOR
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Standardno Članstvo</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-6xl font-bold text-neon-cyan">20</span>
                  <div className="text-left">
                    <div className="text-2xl font-bold">KM</div>
                    <div className="text-muted-foreground">mjesečno</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Pristup svim programima i radionicama
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg"
                onClick={handleJoinClick}
              >
                Postani Član
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card/50 p-8 rounded-lg border border-border">
            <h3 className="text-2xl font-bold mb-6 text-center">Proces Učlanjenja</h3>
            <div className="space-y-6">
              {[
                { step: "1", title: "Popuni Formu", desc: "Unesi osnovne podatke o sebi" },
                { step: "2", title: "Plaćanje", desc: "Sigurno online plaćanje članarine" },
                { step: "3", title: "Potvrda", desc: "Dobij email potvrdu i račun" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Membership;