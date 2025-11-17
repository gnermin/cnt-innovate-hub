import { Cpu, Plane, Zap, Printer, Brain, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Programs = () => {
  const navigate = useNavigate();
  
  const programs = [
    {
      icon: Cpu,
      title: "Robotika",
      subtitle: "Lego, Arduino, ESP32",
      description: "Naučite osnove programiranja i elektronike kroz gradnju i programiranje robota. Od osnovnih Lego robota do naprednih Arduino i ESP32 projekata.",
      age: "8-16 godina",
      duration: "3 mjeseca",
      color: "primary"
    },
    {
      icon: Brain,
      title: "Umjetna Inteligencija",
      subtitle: "Machine Learning za Mlade",
      description: "Otkrijte svijet AI i mašinskog učenja. Naučite kako računari uče i kako kreirati pametne aplikacije.",
      age: "14-18 godina",
      duration: "4 mjeseca",
      color: "secondary"
    },
    {
      icon: Plane,
      title: "Dronovi",
      subtitle: "Letenje i Programiranje",
      description: "Naučite kako upravljati, programirati i graditi dronove. Uključuje teoriju leta i praktične vježbe.",
      age: "12-18 godina",
      duration: "2 mjeseca",
      color: "accent"
    },
    {
      icon: Zap,
      title: "Elektronika",
      subtitle: "Od Osnova do IoT",
      description: "Savladajte elektroniku kroz praktične projekte. Soldering, dizajniranje kola i IoT projekti.",
      age: "10-16 godina",
      duration: "3 mjeseca",
      color: "primary"
    },
    {
      icon: Printer,
      title: "3D Printanje",
      subtitle: "Dizajn i Fabrikacija",
      description: "Naučite 3D modeliranje i printanje. Kreirajte vlastite dizajne i dovedite ih u stvarnost.",
      age: "10-18 godina",
      duration: "2 mjeseca",
      color: "secondary"
    },
    {
      icon: Code,
      title: "Programiranje",
      subtitle: "Python, JavaScript, C++",
      description: "Osnove programiranja kroz popularne jezike. Interaktivne aplikacije, igre i web razvoj.",
      age: "10-18 godina",
      duration: "4 mjeseca",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neon-cyan">
              Programi i Radionice
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Praktični programi koji spajaju teoriju i praksu
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <div 
                key={idx} 
                className="bg-card p-8 rounded-lg border border-border hover:border-neon transition-all group"
              >
                <program.icon className={`w-16 h-16 mb-4 text-${program.color}`} />
                <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                <p className="text-primary mb-4">{program.subtitle}</p>
                <p className="text-muted-foreground mb-6">{program.description}</p>
                
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uzrast:</span>
                    <span className="font-semibold">{program.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trajanje:</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => navigate('/membership')}
                >
                  Prijavi Se
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-12 rounded-lg border border-neon text-center">
            <h2 className="text-3xl font-bold mb-4">STEM Škola za Djecu</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sveobuhvatan program koji kombinuje sve naše radionice u jedinstveno obrazovno iskustvo
            </p>
            <Button size="lg" onClick={() => navigate('/membership')}>
              Saznaj Više
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;