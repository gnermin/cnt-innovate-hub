import { ArrowRight, Cpu, Brain, Plane, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Cpu,
      title: "Robotika",
      description: "Praktičan rad sa robotima, od Microbit do Arduino projekata",
    },
    {
      icon: Brain,
      title: "Umjetna Inteligencija",
      description: "Naučite osnove AI i mašinskog učenja kroz projekte",
    },
    {
      icon: Plane,
      title: "Dronovi",
      description: "Programiranje, upravljanje i gradnja dronova",
    },
    {
      icon: Zap,
      title: "Elektronika",
      description: "Od osnovnih kola do kompleksnih IoT uređaja",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="animate-float">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-neon-cyan">CENTAR ZA</span>
              <br />
              <span className="text-neon-purple">NAPREDNE TEHNOLOGIJE</span>
              <br />
              <span className="text-neon-cyan">DrONE1</span>
              <br />
            </h1>
          </div>

          <p className="text-2xl md:text-3xl mb-8 text-muted-foreground">Inspiracija. Inovacija. Napredak.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 animate-glow" onClick={() => navigate("/membership")}>
              Postani Član
              <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate("/contact")}>
              Doniraj
            </Button>
          </div>
        </div>
      </section>

      {/* About CNT */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Šta je CNT?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Centar za napredne tehnologije je neprofitna organizacija posvećena edukaciji i razvoju mladih kroz
              robotiku, elektroniku, dronove, umjetnu inteligenciju i STEM projekte. Pružamo praktično iskustvo koje
              priprema djecu i mlade za tehnološku budućnost.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Naši Programi</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card p-8 rounded-lg border border-border hover:border-neon transition-all group cursor-pointer"
                onClick={() => navigate("/programs")}
              >
                <feature.icon className="w-16 h-16 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CNT */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Zašto CNT?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Iskusni Instruktori", desc: "Tim stručnjaka sa praksom u industriji" },
              { title: "Savremena Oprema", desc: "Najnovija tehnologija dostupna za učenje" },
              { title: "Praktičan Pristup", desc: "Učenje kroz rad na stvarnim projektima" },
              { title: "Takmičenja", desc: "Učešće na nacionalnim i međunarodnim takmičenjima" },
              { title: "Certifikati", desc: "Priznati certifikati za završene programe" },
              { title: "Zajednica", desc: "Dio globalne tehnološke zajednice" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-12 md:p-20 rounded-lg border-2 border-neon text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Spreman za Budućnost?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pridruži se našoj zajednici i otključaj svoj potencijal u svijetu tehnologije
            </p>
            <Button size="lg" className="text-lg px-8 animate-glow" onClick={() => navigate("/membership")}>
              Postani Član Danas
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
