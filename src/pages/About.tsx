import { Users, Target, Heart, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neon-cyan">O Nama</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Centar za napredne tehnologije DrOne1 - Gdje se stvara budućnost
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-lg border border-neon hover:border-primary transition-all">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Misija</h2>
              <p className="text-muted-foreground leading-relaxed">
                Naša misija je obrazovati i inspirisati mlade generacije kroz praktičan rad sa naprednim tehnologijama.
                Pružamo priliku djeci i mladima da razviju tehnološke vještine koje će im biti ključne za budućnost.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-neon hover:border-secondary transition-all">
              <Heart className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Vizija</h2>
              <p className="text-muted-foreground leading-relaxed">
                Težimo stvaranju zajednice inovatora koja će voditi tehnološki napredak u regiji. Želimo biti prepoznati
                kao vodeći centar za STEM edukaciju i mjesto gdje se kreativnost susreće sa tehnologijom.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Naše Vrijednosti</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Inkluzivnost", desc: "Svi su dobrodošli bez obzira na uzrast ili predznanje" },
              { icon: Award, title: "Izvrsnost", desc: "Težimo najvišim standardima u edukaciji i praksi" },
              { icon: Target, title: "Inovacija", desc: "Podsticanje kreativnog mišljenja i rješavanja problema" },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all text-center"
              >
                <value.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Naš Tim</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "prof. Smajo Mekić", role: "Direktor", specialty: "Edukacija" },
              { name: "dr. Nermin Goran", role: "Glavni Instruktor", specialty: "Elektronika, Robotika, IoT i AI" },
              { name: "Hajro TNT", role: "Koordinator Programa", specialty: "Dronovi" },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-card p-6 rounded-lg border border-border hover:border-neon transition-all text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-3xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.specialty}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Partneri i Donatori</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-card p-6 rounded-lg border border-border flex items-center justify-center h-32 hover:border-primary transition-all"
              >
                <span className="text-muted-foreground">Partner {i}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
