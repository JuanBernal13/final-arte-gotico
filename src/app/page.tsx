"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  BookOpen,
  Crown,
  Cross,
  Eye,
  Landmark,
  Palette,
  Sparkles,
  Triangle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tourStops = [
  {
    id: "contexto",
    icon: Landmark,
    eyebrow: "Estacion I",
    title: "Contexto historico y funcion del monasterio",
    summary:
      "La Cartuja de Miraflores fue un espacio de vida contemplativa y, al mismo tiempo, un lugar de memoria real.",
    details:
      "En ella se encuentran los sepulcros de Juan II de Castilla e Isabel de Portugal, padres de Isabel I. Por eso, el monasterio une espiritualidad cartuja, silencio, oracion y representacion politica de la monarquia castellana.",
    highlight: "Oracion + memoria dinastica",
  },
  {
    id: "mecenazgo",
    icon: Crown,
    eyebrow: "Estacion II",
    title: "El mecenazgo de Isabel I de Castilla",
    summary:
      "Isabel la Catolica convierte el monasterio en un escenario de poder regio, piedad y legitimidad.",
    details:
      "Su intervencion no fue solo economica: fue politica y espiritual. Escudos, figuras orantes y simbolos de Castilla y Portugal integran a la monarquia dentro del relato sagrado.",
    highlight: "Arte como autoridad",
  },
  {
    id: "estilo",
    icon: Palette,
    eyebrow: "Estacion III",
    title: "Gotico hispanoflamenco",
    summary:
      "El retablo pertenece al gotico hispanoflamenco: riqueza decorativa, talla minuciosa, dorado y policromia intensa.",
    details:
      "Gil de Siloe integra arquitectura, escultura y decoracion en una composicion global. La obra no ordena la mirada de forma simple; la conduce por una experiencia visual compleja y devocional.",
    highlight: "Virtuosismo y esplendor",
  },
  {
    id: "redencion",
    icon: Cross,
    eyebrow: "Estacion IV",
    title: "Redencion y Eucaristia",
    summary:
      "El centro teologico del retablo es la salvacion mediante el sacrificio de Cristo, vinculada a la Eucaristia.",
    details:
      "Cristo crucificado ocupa el eje de la composicion. La tension del cuerpo, las heridas y la expresividad buscan conmover y orientar la oracion.",
    highlight: "La cruz como centro visual",
  },
  {
    id: "rueda",
    icon: Sparkles,
    eyebrow: "Estacion V",
    title: "La rueda angelical",
    summary:
      "Una gran estructura circular rodea a Cristo y concentra la mirada del espectador.",
    details:
      "Los angeles no son decoracion secundaria: indican que el sacrificio de la cruz posee una dimension celestial y universal.",
    highlight: "El cielo rodea el sacrificio",
  },
  {
    id: "iconografia",
    icon: Triangle,
    eyebrow: "Estacion VI",
    title: "Simbolos iconograficos",
    summary:
      "Cristo, la Virgen, San Juan, Dios Padre, el Espiritu Santo y el pelicano eucaristico componen una lectura trinitaria y sacrificial.",
    details:
      "El pelicano medieval, que alimenta a sus crias con su propia sangre, refuerza la relacion entre Crucifixion, sacrificio y Eucaristia.",
    highlight: "Simbolo, fe y doctrina",
  },
  {
    id: "experiencia",
    icon: Eye,
    eyebrow: "Estacion VII",
    title: "Funcion religiosa y experiencia",
    summary:
      "El retablo ensena, conmueve y favorece la devocion como un libro visual para monjes y fieles.",
    details:
      "La belleza material no es mero adorno: funciona como camino hacia la meditacion religiosa dentro de una vida marcada por silencio y contemplacion.",
    highlight: "La imagen como meditacion",
  },
  {
    id: "interpretacion",
    icon: BookOpen,
    eyebrow: "Estacion VIII",
    title: "Interpretacion critica",
    summary:
      "La grandeza de la obra surge de la union entre arte, fe y poder regio.",
    details:
      "Cruz, angeles, pelicano, santos, reyes orantes, escudos y dorado forman un discurso coherente: la salvacion cristiana aparece unida a la memoria monarquica.",
    highlight: "Arte, fe y poder",
  },
];

const quickFacts = [
  ["Ubicacion", "Cartuja de Miraflores, Burgos"],
  ["Cronologia", "1496-1499"],
  ["Talla", "Gil de Siloe"],
  ["Policromia", "Diego de la Cruz"],
  ["Estilo", "Gotico hispanoflamenco"],
  ["Tema", "Redencion cristiana y Eucaristia"],
];

const keywords = [
  "Redencion cristiana",
  "Eucaristia",
  "Gotico hispanoflamenco",
  "Gil de Siloe",
  "Diego de la Cruz",
  "Isabel la Catolica",
  "Mecenazgo",
  "Poder regio",
  "Memoria dinastica",
  "Rueda angelical",
  "Pelicano eucaristico",
  "Policromia",
  "Dorado",
  "Devocion",
];

const sources = [
  "Cartuja de Miraflores. Retablo Mayor.",
  "Junta de Castilla y Leon. Cartuja de Miraflores II: El retablo.",
  "Museo Nacional del Prado. Siloe, Gil de.",
  "Turismo de Castilla y Leon. Cartuja de Santa Maria de Miraflores.",
  "Yarza Luaces, J. El retablo mayor de la Cartuja de Miraflores, 2001.",
  "Fundacion Iberdrola. La Cartuja de Miraflores II: El retablo, 2007.",
];

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => ({
        id: index,
        left: `${(index * 23) % 100}%`,
        top: `${(index * 41) % 96}%`,
        delay: `${(index % 10) * 0.55}s`,
        size: `${(index % 3) + 1}px`,
      })),
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-art", { scale: 1.16, filter: "blur(12px)", duration: 2.1 })
        .from(".hero-mark", { scale: 0.35, rotate: -30, opacity: 0, duration: 1 }, 0.2)
        .from(".hero-copy > *", { y: 48, opacity: 0, stagger: 0.12, duration: 0.95 }, 0.42)
        .from(".fact-card", { y: 28, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.85);

      gsap.to(".hero-art", {
        yPercent: 11,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".tour-stop").forEach((section, index) => {
        gsap.from(section.querySelectorAll(".stop-reveal"), {
          opacity: 0,
          y: 62,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        });

        gsap.to(section.querySelector(".halo-ring"), {
          rotate: index % 2 === 0 ? 24 : -24,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.from(".keyword", {
        opacity: 0,
        y: 20,
        stagger: 0.035,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".keywords",
          start: "top 78%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-[#080706] text-[#f6ead7]">
      <section className="hero relative min-h-screen px-5 py-5 sm:px-8 lg:px-12">
        <Image
          className="hero-art absolute inset-0 h-full w-full object-cover"
          src="/images/retablo-hero.png"
          alt="Recreacion visual de un retablo gotico hispanoflamenco en una iglesia cartuja"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.92),rgba(5,4,3,0.52)_45%,rgba(5,4,3,0.82)),radial-gradient(circle_at_72%_35%,rgba(207,151,67,0.14),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#080706] to-transparent" />

        {particles.map((particle) => (
          <span
            key={particle.id}
            className="tour-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
            }}
          />
        ))}

        <nav className="relative z-10 flex items-center justify-between border-b border-[#f4d99b]/14 pb-4">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-[#d6a64f]/60 bg-black/35 text-[#e8c178]">
              <Cross size={17} />
            </span>
            <span className="font-serif text-xl tracking-[0.18em]">MIRAFLORES</span>
          </a>
          <div className="hidden gap-6 text-xs uppercase tracking-[0.22em] text-stone-300 md:flex">
            <a href="#tour">Tour</a>
            <a href="#palabras">Claves</a>
            <a href="#fuentes">Fuentes</a>
          </div>
        </nav>

        <div id="inicio" className="relative z-10 grid min-h-[calc(100vh-84px)] items-end gap-10 pb-8 pt-14 lg:grid-cols-[minmax(0,1fr)_430px]">
          <div className="hero-copy max-w-5xl">
            <div className="hero-mark mb-7 inline-grid h-20 w-20 place-items-center rounded-full border border-[#d6a64f]/45 bg-black/30 text-[#eac577] shadow-[0_0_60px_rgba(214,166,79,0.25)] backdrop-blur">
              <Crown size={28} />
            </div>
            <p className="text-xs uppercase tracking-[0.38em] text-[#d6a64f]">Arte, fe y poder regio en el gotico hispanoflamenco</p>
            <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3.1rem,9vw,8.8rem)] leading-[0.84] text-stone-50">
              Retablo Mayor de la Cartuja de Miraflores
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-200/88">
              Una visita guiada por una de las obras mas representativas del arte gotico hispano de finales del siglo XV:
              centro visual, espiritual y simbolico de la iglesia cartuja de Burgos.
            </p>
            <a
              href="#tour"
              className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#d6a64f]/70 bg-[#d6a64f] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#f1cb74]"
            >
              Iniciar tour
              <Sparkles size={17} />
            </a>
          </div>

          <aside className="grid gap-3">
            {quickFacts.map(([label, value]) => (
              <div key={label} className="fact-card border border-white/12 bg-black/38 p-4 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#d6a64f]">{label}</p>
                <p className="mt-2 text-lg text-stone-100">{value}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section id="tour" className="relative px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[#d6a64f]">Recorrido por estaciones</p>
            <h2 className="mt-4 font-serif text-5xl leading-none text-stone-50 sm:text-7xl">
              Del monasterio al simbolo
            </h2>
          </div>

          <div className="grid gap-10">
            {tourStops.map((stop, index) => {
              const Icon = stop.icon;
              const isImageStop = index === 4 || index === 5;

              return (
                <article
                  key={stop.id}
                  id={stop.id}
                  className="tour-stop relative grid min-h-[520px] overflow-hidden border border-white/12 bg-[#11100e] lg:grid-cols-[0.85fr_1.15fr]"
                >
                  <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden border-b border-white/12 bg-[#090807] p-8 lg:border-b-0 lg:border-r">
                    {isImageStop ? (
                      <Image
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                        src="/images/retablo-symbols.png"
                        alt="Detalle simbolico de rueda angelical y dorado gotico"
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(199,143,62,0.22),transparent_34%),linear-gradient(135deg,rgba(48,27,30,0.7),rgba(7,7,7,0.95))]" />
                    )}
                    <div className="halo-ring relative grid aspect-square w-64 place-items-center rounded-full border border-[#d6a64f]/40 bg-black/26 shadow-[0_0_90px_rgba(214,166,79,0.18)] backdrop-blur-sm">
                      <div className="absolute inset-8 rounded-full border border-[#d6a64f]/25" />
                      <div className="absolute inset-16 rounded-full border border-[#d6a64f]/25" />
                      <Icon className="relative text-[#f0c875]" size={58} strokeWidth={1.25} />
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-9 lg:p-12">
                    <p className="stop-reveal text-xs uppercase tracking-[0.32em] text-[#d6a64f]">{stop.eyebrow}</p>
                    <h3 className="stop-reveal mt-4 max-w-3xl font-serif text-4xl leading-tight text-stone-50 sm:text-6xl">
                      {stop.title}
                    </h3>
                    <p className="stop-reveal mt-7 max-w-3xl text-xl leading-9 text-stone-200">{stop.summary}</p>
                    <p className="stop-reveal mt-6 max-w-3xl text-base leading-8 text-stone-400">{stop.details}</p>
                    <div className="stop-reveal mt-9 inline-flex border border-[#d6a64f]/45 bg-[#d6a64f]/10 px-4 py-3 text-xs uppercase tracking-[0.22em] text-[#eac577]">
                      {stop.highlight}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="palabras" className="keywords px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl border-y border-white/12 py-14">
          <p className="text-xs uppercase tracking-[0.34em] text-[#d6a64f]">Palabras clave para la infografia</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {keywords.map((keyword) => (
              <span key={keyword} className="keyword border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-stone-200">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="fuentes" className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[360px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#d6a64f]">Fuentes recomendadas</p>
            <h2 className="mt-4 font-serif text-5xl leading-none text-stone-50">Base documental</h2>
          </div>
          <div className="grid gap-3">
            {sources.map((source, index) => (
              <p key={source} className="border border-white/10 bg-black/24 p-4 text-stone-300">
                <span className="mr-4 text-[#d6a64f]">0{index + 1}</span>
                {source}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
