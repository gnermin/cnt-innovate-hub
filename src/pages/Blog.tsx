import { Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      title: "Uvod u Robotiku za Početnike",
      excerpt:
        "Saznajte sve što trebate znati o robotici i kako započeti svoj put u ovoj uzbudljivoj oblasti tehnologije.",
      author: "Enisa Kos, dipl.ing.el",
      date: "10. Februar 2026",
      category: "Robotika",
    },
    {
      title: "Kako AI Mijenja Svijet Obrazovanja",
      excerpt: "Istraživanje načina na koje umjetna inteligencija transformiše način na koji učimo i podučavamo.",
      author: "Dr. Nermin Goran",
      date: "5. Februar 2026",
      category: "Umjetna Inteligencija",
    },
    {
      title: "Naši Učenici na Međunarodnom Takmičenju",
      excerpt: "Tim CNT-a osvaja treće mjesto na prestižnom robotika takmičenju u Beču.",
      author: "prof. Smajo Mekić",
      date: "1. Februar 2026",
      category: "Vijesti",
    },
    {
      title: "Osnove Elektronike: Od Nule do Heroja",
      excerpt: "Kompletni vodič kroz osnovne elektronske komponente i kako ih koristiti u projektima.",
      author: "Dr. Nermin Goran",
      date: "28. Januar 2026",
      category: "Elektronika",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neon-cyan">Blog i Vijesti</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Najnovije vijesti, tutorijali i priče iz svijeta tehnologije
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <article
                key={idx}
                className="bg-card rounded-lg border border-border hover:border-neon transition-all overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="p-6">
                  <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {post.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <Button variant="outline">Pročitaj Više</Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
