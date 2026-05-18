"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Church,
  Crown,
  Cross,
  Eye,
  Home as HomeIcon,
  Landmark,
  Map,
  Palette,
  Sparkles,
  X,
} from "lucide-react";
import gsap from "gsap";

const rooms = [
  {
    id: "vestibulo",
    icon: HomeIcon,
    label: "Vestibulo",
    title: "Retablo Mayor de la Cartuja de Miraflores",
    subtitle: "Arte, fe y poder regio en el gotico hispanoflamenco",
    body:
      "Entramos a Burgos, al fondo del presbiterio de la Cartuja. El retablo, realizado entre 1496 y 1499 por Gil de Siloe con policromia y dorado de Diego de la Cruz, funciona como centro visual, espiritual y simbolico del espacio.",
    tag: "1496-1499",
    image: "/images/retablo-hero.png",
  },
  {
    id: "monasterio",
    icon: Landmark,
    label: "Monasterio",
    title: "Un lugar de oracion y memoria real",
    subtitle: "La Cartuja como escenario espiritual y politico",
    body:
      "La Cartuja de Miraflores fue concebida para la vida contemplativa, pero tambien como memoria dinastica. Alli se encuentran los sepulcros de Juan II de Castilla e Isabel de Portugal, padres de Isabel I.",
    tag: "Oracion + linaje",
    image: "/images/gothic-gallery-entrance.png",
  },
  {
    id: "isabel",
    icon: Crown,
    label: "Mecenazgo",
    title: "Isabel I convierte el arte en poder",
    subtitle: "Mecenazgo, legitimidad y piedad regia",
    body:
      "La intervencion de Isabel la Catolica no fue solo economica. Fue una decision politica y espiritual: escudos, figuras orantes y simbolos de Castilla y Portugal integran la monarquia dentro del relato cristiano.",
    tag: "Poder regio",
    image: "/images/retablo-hero.png",
  },
  {
    id: "estilo",
    icon: Palette,
    label: "Estilo",
    title: "Gotico hispanoflamenco",
    subtitle: "Riqueza ornamental, talla fina y policromia",
    body:
      "El retablo concentra el gusto hispanoflamenco: detalle escultorico, dorado, color intenso, expresividad y una composicion que no se limita a calles y cuerpos tradicionales.",
    tag: "Virtuosismo tecnico",
    image: "/images/retablo-symbols.png",
  },
  {
    id: "centro",
    icon: Cross,
    label: "Centro",
    title: "La Redencion y la Eucaristia",
    subtitle: "La cruz como nucleo del recorrido",
    body:
      "Cristo crucificado ocupa el centro. La obra presenta la salvacion mediante el sacrificio de Cristo y la relaciona directamente con la Eucaristia, sacramento que actualiza ese sacrificio.",
    tag: "Sacrificio y salvacion",
    image: "/images/retablo-symbols.png",
  },
  {
    id: "rueda",
    icon: Sparkles,
    label: "Rueda",
    title: "La rueda angelical",
    subtitle: "Un cielo circular alrededor de Cristo",
    body:
      "La gran estructura circular ordena la composicion y concentra la mirada. Los angeles indican que la Crucifixion no pertenece solo al mundo humano: involucra a toda la creacion espiritual.",
    tag: "Dimension celestial",
    image: "/images/retablo-symbols.png",
  },
  {
    id: "simbolos",
    icon: Eye,
    label: "Simbolos",
    title: "Iconografia: ver para comprender",
    subtitle: "Virgen, San Juan, Trinidad y pelicano eucaristico",
    body:
      "A los pies de la cruz aparecen la Virgen y San Juan. A ambos lados, Dios Padre y el Espiritu Santo completan la lectura trinitaria. El pelicano eucaristico refuerza el sacrificio de Cristo.",
    tag: "Libro visual",
    image: "/images/retablo-symbols.png",
  },
  {
    id: "cierre",
    icon: BookOpen,
    label: "Lectura",
    title: "Arte, fe y poder en una sola imagen",
    subtitle: "Interpretacion critica",
    body:
      "La obra une tres dimensiones: virtuosismo artistico, misterio religioso y memoria monarquica. Cruz, angeles, pelicano, santos, reyes orantes, escudos y dorado forman un discurso visual coherente.",
    tag: "Sintesis final",
    image: "/images/retablo-hero.png",
  },
];

const hotspots = [
  {
    x: "50%",
    y: "36%",
    title: "Crucifixion",
    text: "Centro visual y teologico del retablo: la Redencion cristiana se concentra en el sacrificio de Cristo.",
  },
  {
    x: "50%",
    y: "18%",
    title: "Pelicano eucaristico",
    text: "Simbolo medieval de Cristo que entrega su sangre por los creyentes, vinculando Cruz y Eucaristia.",
  },
  {
    x: "29%",
    y: "48%",
    title: "Reyes orantes",
    text: "La memoria dinastica aparece integrada al discurso sagrado y legitima el poder regio castellano.",
  },
  {
    x: "70%",
    y: "48%",
    title: "Rueda angelical",
    text: "El circulo de angeles separa y exalta el espacio sagrado alrededor de Cristo.",
  },
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
  const [current, setCurrent] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const room = rooms[current];
  const progress = ((current + 1) / rooms.length) * 100;

  const particles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => ({
        id: index,
        left: `${(index * 31) % 100}%`,
        top: `${(index * 43) % 95}%`,
        delay: `${(index % 8) * 0.5}s`,
      })),
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".room-image", { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.05 })
        .fromTo(".museum-card > *", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.72 }, 0.12)
        .fromTo(".hotspot", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 0.55 }, 0.48)
        .fromTo(".nav-pill", { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.45 }, 0.3);
    }, stageRef);

    return () => ctx.revert();
  }, [current]);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(index, rooms.length - 1)));
    setActiveHotspot(null);
    setMapOpen(false);
  };

  const Icon = room.icon;

  return (
    <main className="museum-shell min-h-screen overflow-hidden bg-[#070605] text-[#f8ecd8]">
      <div ref={stageRef} className="relative min-h-screen">
        <Image
          key={room.image + current}
          className="room-image absolute inset-0 h-full w-full object-cover"
          src={room.image}
          alt={room.title}
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.93),rgba(5,4,3,0.54)_48%,rgba(5,4,3,0.9)),radial-gradient(circle_at_68%_36%,rgba(211,158,75,0.18),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070605] to-transparent" />

        {particles.map((particle) => (
          <span
            key={particle.id}
            className="ambient-particle"
            style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
          />
        ))}

        <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => goTo(0)}
            className="flex items-center gap-3 border border-[#d8ad60]/30 bg-black/36 px-4 py-3 text-left backdrop-blur-md"
          >
            <Church size={18} className="text-[#eac577]" />
            <span>
              <span className="block font-serif text-lg leading-none">Museo Miraflores</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-stone-400">Tour interactivo</span>
            </span>
          </button>

          <button
            onClick={() => setMapOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 border border-white/14 bg-black/36 px-4 text-xs uppercase tracking-[0.18em] text-stone-100 backdrop-blur-md transition hover:border-[#d8ad60]/60"
          >
            <Map size={16} />
            Mapa
          </button>
        </header>

        <section className="relative z-10 grid min-h-[calc(100vh-92px)] items-end gap-8 px-5 pb-6 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.55fr)]">
          <div className="museum-card max-w-4xl">
            <div className="inline-flex items-center gap-3 border border-[#d8ad60]/35 bg-black/34 px-4 py-3 backdrop-blur-md">
              <Icon size={18} className="text-[#eac577]" />
              <span className="text-xs uppercase tracking-[0.26em] text-[#eac577]">
                Sala {current + 1} de {rooms.length}
              </span>
            </div>
            <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.86] text-stone-50">{room.title}</h1>
            <p className="mt-5 max-w-2xl text-sm uppercase tracking-[0.24em] text-[#d8ad60]">{room.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200">{room.body}</p>
            <div className="mt-7 inline-flex border border-white/16 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.22em] text-stone-200">
              {room.tag}
            </div>
          </div>

          <aside className="relative min-h-[440px] overflow-hidden border border-white/12 bg-black/34 p-4 backdrop-blur-md">
            <div className="relative h-full min-h-[410px] overflow-hidden border border-[#d8ad60]/22 bg-[#0d0b09]">
              <Image
                className="h-full w-full object-cover opacity-82"
                src="/images/retablo-symbols.png"
                alt="Mapa visual del retablo con puntos interactivos"
                fill
                sizes="420px"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,rgba(0,0,0,0.42)_72%)]" />
              {hotspots.map((spot, index) => (
                <button
                  key={spot.title}
                  onClick={() => setActiveHotspot(index)}
                  className="hotspot absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#f5d28d] bg-[#d8ad60] text-black shadow-[0_0_34px_rgba(216,173,96,0.7)]"
                  style={{ left: spot.x, top: spot.y }}
                  aria-label={spot.title}
                >
                  {index + 1}
                </button>
              ))}
              <div className="absolute bottom-3 left-3 right-3 border border-white/12 bg-black/58 p-3 text-xs leading-5 text-stone-300 backdrop-blur-md">
                Toca los puntos para leer detalles del retablo como en una sala interactiva.
              </div>
            </div>
          </aside>
        </section>

        <footer className="relative z-20 px-5 pb-5 sm:px-8">
          <div className="flex flex-col gap-4 border border-white/12 bg-black/38 p-3 backdrop-blur-md lg:flex-row lg:items-center">
            <div className="h-1.5 flex-1 bg-white/10">
              <div className="h-full bg-[#d8ad60] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between gap-3 lg:justify-end">
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="inline-flex min-h-11 items-center gap-2 border border-white/14 px-4 text-sm uppercase tracking-[0.16em] text-stone-100 transition hover:border-[#d8ad60]/60 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft size={16} />
                Anterior
              </button>
              <div className="hidden gap-2 xl:flex">
                {rooms.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(index)}
                    className={`nav-pill h-3 w-9 border transition ${
                      current === index ? "border-[#d8ad60] bg-[#d8ad60]" : "border-white/18 bg-white/8 hover:border-[#d8ad60]/60"
                    }`}
                    aria-label={item.label}
                  />
                ))}
              </div>
              <button
                onClick={() => goTo(current + 1)}
                disabled={current === rooms.length - 1}
                className="inline-flex min-h-11 items-center gap-2 border border-[#d8ad60]/70 bg-[#d8ad60] px-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-[#efca79] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Siguiente
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {activeHotspot !== null && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/68 p-5 backdrop-blur-sm">
          <article className="modal-panel w-full max-w-lg border border-[#d8ad60]/35 bg-[#100d0a] p-6 text-stone-100 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[#d8ad60]">Punto interactivo</p>
              <button onClick={() => setActiveHotspot(null)} className="grid h-9 w-9 place-items-center border border-white/14">
                <X size={16} />
              </button>
            </div>
            <h2 className="mt-4 font-serif text-4xl">{hotspots[activeHotspot].title}</h2>
            <p className="mt-4 leading-8 text-stone-300">{hotspots[activeHotspot].text}</p>
          </article>
        </div>
      )}

      {mapOpen && (
        <div className="fixed inset-0 z-50 bg-[#070605]/92 p-5 backdrop-blur-md">
          <div className="mx-auto flex h-full max-w-6xl flex-col border border-white/12 bg-black/24 p-5">
            <div className="flex items-center justify-between border-b border-white/12 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d8ad60]">Mapa del museo</p>
                <h2 className="font-serif text-4xl text-stone-50">Elige una sala</h2>
              </div>
              <button onClick={() => setMapOpen(false)} className="grid h-11 w-11 place-items-center border border-white/14">
                <X size={18} />
              </button>
            </div>
            <div className="grid flex-1 content-center gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
              {rooms.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(index)}
                    className={`group min-h-48 border p-5 text-left transition ${
                      current === index
                        ? "border-[#d8ad60] bg-[#d8ad60]/12"
                        : "border-white/12 bg-white/[0.04] hover:border-[#d8ad60]/60"
                    }`}
                  >
                    <ItemIcon className="text-[#d8ad60]" size={24} />
                    <p className="mt-8 text-xs uppercase tracking-[0.22em] text-stone-500">Sala {index + 1}</p>
                    <h3 className="mt-2 font-serif text-3xl text-stone-50">{item.label}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-400">{item.subtitle}</p>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-white/12 pt-4 text-xs leading-6 text-stone-500">
              Fuentes: {sources.join(" | ")}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
