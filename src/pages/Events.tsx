import { Calendar, MapPin, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Events = () => {
  const events = [
    {
      title: "Robotika Takmičenje 2026",
      type: "Takmičenje",
      date: "15. Mart 2026",
      location: "CNT Centar",
      participants: "30",
      description:
        "Godišnje robotika takmičenje za sve uzraste. Timovi će graditi i programirati robote za različite izazove.",
    },
    {
      title: "AI Hackathon",
      type: "Hackathon",
      date: "22. April 2026",
      location: "Online",
      participants: "50",
      description: "48-satni hackathon fokusiran na primjenu umjetne inteligencije u rješavanju stvarnih problema.",
    },
    {
      title: "Otvoreni Dan za Roditelje",
      type: "Otvoreni Dan",
      date: "10. Maj 2026",
      location: "CNT Centar",
      participants: "Unlimited",
      description: "Posjeta prostorijama, upoznavanje sa programima i demonstracije projekata naših članova.",
    },
    {
      title: "Ljetnji STEM Kamp",
      type: "Kamp",
      date: "15-30. Juli 2026",
      location: "CNT Centar",
      participants: "40",
      description: "Dvosedmični intenzivni kamp sa radionicama robotike, programiranja, dronova i elektronike.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neon-cyan">Događaji i Projekti</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kalendar naših aktivnosti, takmičenja i posebnih događaja
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="space-y-8">
            {events.map((event, idx) => (
              <div key={idx} className="bg-card p-8 rounded-lg border border-border hover:border-neon transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {event.type}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    <p className="text-muted-foreground mb-6">{event.description}</p>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{event.participants} učesnika</span>
                      </div>
                    </div>
                  </div>

                  <Button>Prijavi Se</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
