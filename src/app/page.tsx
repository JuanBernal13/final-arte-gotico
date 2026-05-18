"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Church,
  Clock3,
  Crown,
  Cross,
  Eye,
  Home as HomeIcon,
  Info,
  Landmark,
  Layers3,
  Map,
  Palette,
  Play,
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
    idea: "Una obra total donde escultura, dorado, liturgia y poder politico hablan a la vez.",
    keys: ["Centro visual del presbiterio", "Programa religioso y dinastico", "Obra total del tardogotico"],
    analysis:
      "El retablo dirige la mirada hacia la salvacion cristiana, pero tambien hacia la memoria regia. Su grandeza no esta solo en la ornamentacion, sino en convertir el espacio religioso en una imagen de autoridad, contemplacion y legitimidad.",
    focus: "Tesis del recorrido: el retablo une arte, fe y poder regio en una imagen monumental.",
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
    idea: "El monasterio es simultaneamente lugar de silencio cartujo y memoria de la monarquia.",
    keys: ["Vida contemplativa", "Sepulcros reales", "Afirmacion dinastica"],
    analysis:
      "La Cartuja no es solo un recinto de oracion. Al alojar la memoria de Juan II e Isabel de Portugal, convierte la espiritualidad cartuja en escenario politico: rezar, recordar y legitimar ocurren en el mismo espacio.",
    focus: "El monasterio es una sala de oracion y un escenario de memoria dinastica.",
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
    idea: "Isabel I usa el arte como memoria familiar, piedad publica y lenguaje de autoridad.",
    keys: ["Mecenazgo regio", "Escudos y orantes", "Legitimidad cristiana"],
    analysis:
      "La monarquia aparece integrada en el relato sagrado. No se impone sobre lo religioso: se presenta protegida por el orden cristiano. Asi, la devocion se vuelve imagen politica y la memoria familiar adquiere autoridad publica.",
    focus: "La piedad de Isabel tambien es una forma de representacion politica.",
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
    idea: "El exceso ornamental no distrae: intensifica la contemplacion.",
    keys: ["Detalle flamenco", "Dorado y policromia", "Arquitectura visual"],
    analysis:
      "Gil de Siloe organiza talla, relieve, color y arquitectura como una sola maquina visual. La riqueza material guia la mirada hacia el misterio religioso. El esplendor no es adorno, es estrategia de contemplacion.",
    focus: "El exceso ornamental esta al servicio de la contemplacion.",
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
    idea: "La Crucifixion es el centro teologico, visual y emocional del conjunto.",
    keys: ["Redencion", "Eucaristia", "Sacrificio actualizado"],
    analysis:
      "La imagen no solo recuerda la muerte de Cristo: la vincula con la liturgia del altar. Por eso, mirar la cruz equivale a entrar en el sentido de la Eucaristia: sacrificio, salvacion y presencia sagrada.",
    focus: "La cruz no es solo tema: es centro teologico, liturgico y emocional.",
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
    idea: "El circulo convierte el sacrificio en centro del universo espiritual.",
    keys: ["Composicion concentrica", "Jerarquia sagrada", "Angeles testigos"],
    analysis:
      "La rueda angelical sustituye una lectura lineal por una lectura concentrica. Todo gira alrededor de Cristo, y los angeles transforman la Crucifixion en acontecimiento universal, contemplado por cielo y tierra.",
    focus: "La composicion circular convierte la mirada en acto de contemplacion.",
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
    idea: "Cada figura funciona como una pista para leer el misterio cristiano.",
    keys: ["Virgen y San Juan", "Lectura trinitaria", "Pelicano eucaristico"],
    analysis:
      "La iconografia educa la mirada. La Virgen y San Juan modelan el dolor devoto. Padre y Espiritu Santo elevan la escena a misterio trinitario. El pelicano resume la entrega de Cristo en clave eucaristica.",
    focus: "Cada simbolo guia una lectura doctrinal y afectiva.",
    tag: "Libro visual",
    image: "/images/retablo-symbols.png",
  },
  {
    id: "capas",
    icon: Layers3,
    label: "Capas",
    title: "Antes y despues de interpretar",
    subtitle: "De la impresion visual a la lectura historica",
    body:
      "Primero vemos una obra deslumbrante. Despues, al activar sus capas, aparecen los sistemas que la organizan: Redencion, Eucaristia, monarquia, rueda angelical y tecnica hispanoflamenca.",
    idea: "Interpretar es aprender a ver relaciones, no solo detalles.",
    keys: ["Primera mirada", "Capas simbolicas", "Lectura critica"],
    analysis:
      "El retablo impacta por brillo y complejidad, pero su inteligencia esta en la red de significados: lo visual conduce a lo teologico, lo teologico sostiene lo politico y la tecnica hace visible esa union.",
    focus: "La obra cambia cuando se mira por capas.",
    tag: "Comparacion visual",
    image: "/images/retablo-symbols.png",
    special: "layers",
  },
  {
    id: "tiempo",
    icon: Clock3,
    label: "Tiempo",
    title: "Linea de tiempo del proyecto",
    subtitle: "Memoria, encargo, ejecucion y restauracion",
    body:
      "La obra pertenece a un proceso mas amplio: traslado de memorias reales, encargo artistico, ejecucion del retablo y restauracion contemporanea del conjunto.",
    idea: "El retablo es un objeto medieval con una historia activa hasta hoy.",
    keys: ["1492 memoria real", "1496-1499 ejecucion", "2007 restauracion"],
    analysis:
      "La cronologia muestra que el retablo no nace como pieza aislada. Forma parte de una politica de memoria impulsada por Isabel I y de una vida material que continua con los estudios y restauraciones modernas.",
    focus: "La historia del retablo tambien es la historia de su conservacion.",
    tag: "Cronologia",
    image: "/images/gothic-gallery-entrance.png",
    special: "timeline",
  },
  {
    id: "pasion",
    icon: Church,
    label: "Pasion",
    title: "Escenas de la Pasion: un relato alrededor del centro",
    subtitle: "Del huerto al Calvario",
    body:
      "Alrededor del eje central se desarrollan episodios como la oracion en el huerto, la flagelacion, el camino al Calvario y la Piedad. No son escenas independientes: preparan la comprension de la Redencion.",
    idea: "Las escenas secundarias son un camino narrativo hacia el centro.",
    keys: ["Huerto", "Flagelacion", "Calvario y Piedad"],
    analysis:
      "El espectador no observa una escena aislada, sino una secuencia. El relato de la Pasion conduce emocionalmente hasta la Crucifixion y convierte el retablo en una narracion visual de la Redencion.",
    focus: "Las escenas secundarias conducen al significado central: Cristo redime.",
    tag: "Narracion devocional",
    image: "/images/retablo-symbols.png",
  },
  {
    id: "experiencia",
    icon: Eye,
    label: "Experiencia",
    title: "La experiencia del espectador",
    subtitle: "Enseñar, conmover y favorecer la devocion",
    body:
      "El retablo fue concebido para activar la contemplacion. Para los monjes cartujos, ofrecía un punto de meditacion. Para los fieles, una imagen capaz de enseñar los misterios centrales de la fe.",
    idea: "La belleza es una herramienta de meditacion, no un simple lujo.",
    keys: ["Enseñar", "Conmover", "Contemplar"],
    analysis:
      "El brillo del dorado atrae. La talla retiene. Los simbolos enseñan. La experiencia va de la impresion sensible a la comprension espiritual, como una visita guiada medieval construida con luz, color y relieve.",
    focus: "La obra no solo se contempla: organiza una experiencia espiritual.",
    tag: "Devocion visual",
    image: "/images/retablo-hero.png",
  },
  {
    id: "cierre",
    icon: BookOpen,
    label: "Lectura",
    title: "Arte, fe y poder en una sola imagen",
    subtitle: "Interpretacion critica",
    body:
      "La obra une tres dimensiones: virtuosismo artistico, misterio religioso y memoria monarquica. Cruz, angeles, pelicano, santos, reyes orantes, escudos y dorado forman un discurso visual coherente.",
    idea: "Nada es puramente decorativo: todo participa de un mismo discurso.",
    keys: ["Virtuosismo artistico", "Misterio religioso", "Memoria politica"],
    analysis:
      "La fuerza del retablo esta en su coherencia. Cruz, angeles, pelicano, santos, escudos y reyes orantes articulan una sola lectura: la salvacion cristiana se une a la espiritualidad cartuja y a la legitimacion de la monarquia castellana.",
    focus: "Interpretacion final: una obra compleja donde nada es puramente decorativo.",
    tag: "Sintesis final",
    image: "/images/retablo-hero.png",
  },
];

const hotspots = [
  {
    x: "50%",
    y: "36%",
    category: "Fe",
    title: "Crucifixion",
    text: "Centro visual y teologico del retablo: la Redencion cristiana se concentra en el sacrificio de Cristo.",
  },
  {
    x: "50%",
    y: "18%",
    category: "Simbolo",
    title: "Pelicano eucaristico",
    text: "Simbolo medieval de Cristo que entrega su sangre por los creyentes, vinculando Cruz y Eucaristia.",
  },
  {
    x: "29%",
    y: "48%",
    category: "Poder",
    title: "Reyes orantes",
    text: "La memoria dinastica aparece integrada al discurso sagrado y legitima el poder regio castellano.",
  },
  {
    x: "70%",
    y: "48%",
    category: "Tecnica",
    title: "Rueda angelical",
    text: "El circulo de angeles separa y exalta el espacio sagrado alrededor de Cristo.",
  },
];

const guideLines = [
  "Comienza mirando el retablo como una arquitectura de significado: todo apunta al centro.",
  "Aqui el silencio cartujo se cruza con la memoria de una dinastia.",
  "Observa como la piedad de Isabel tambien construye legitimidad politica.",
  "No leas el dorado como lujo: es una tecnologia visual para intensificar la fe.",
  "La cruz concentra el programa: imagen, altar y Eucaristia trabajan juntos.",
  "El circulo angelical convierte la escena en un acontecimiento cosmico.",
  "Cada simbolo funciona como una llave para entender el misterio representado.",
  "Activa las capas: veras como cambia la obra cuando sabes que buscar.",
  "Ubica la obra en el tiempo: encargo, ejecucion y conservacion.",
  "Sigue el relato de la Pasion como camino hacia la Redencion.",
  "Piensa en el espectador medieval: aprender, conmoverse y meditar eran una misma experiencia.",
  "Cierra el recorrido uniendo las tres dimensiones: arte, fe y poder regio.",
];

const interpretationLayers = [
  {
    name: "Primera mirada",
    color: "#f1cb74",
    text: "El primer impacto es material: oro, color, profundidad y acumulacion ornamental.",
  },
  {
    name: "Fe",
    color: "#7fb6c8",
    text: "La lectura teologica ordena la imagen: Cruz, Eucaristia, Redencion y Trinidad.",
  },
  {
    name: "Poder",
    color: "#c96b77",
    text: "La memoria dinastica entra al relato sagrado mediante escudos, orantes y patrocinio regio.",
  },
  {
    name: "Tecnica",
    color: "#d8ad60",
    text: "La talla, policromia y dorado producen una experiencia visual que enseña y conmueve.",
  },
];

const timeline = [
  ["1492", "Isabel impulsa la memoria familiar en Miraflores y traslada restos vinculados a su linaje."],
  ["1496", "Comienza la ejecucion del Retablo Mayor con Gil de Siloe como responsable de la talla."],
  ["1499", "Se culmina la obra con policromia y dorado asociados a Diego de la Cruz."],
  ["2007", "Restauraciones y estudios modernos reactivan la lectura historico-artistica del conjunto."],
];

const technicalSheet = [
  ["Obra", "Retablo Mayor de la Cartuja de Miraflores"],
  ["Ubicacion", "Presbiterio de la iglesia de la Cartuja, Burgos"],
  ["Cronologia", "1496-1499"],
  ["Talla", "Gil de Siloe"],
  ["Policromia y dorado", "Diego de la Cruz"],
  ["Estilo", "Gotico hispanoflamenco"],
  ["Funcion", "Devocion cartuja, memoria dinastica y legitimacion regia"],
  ["Tema central", "Redencion cristiana y exaltacion eucaristica"],
];

const glossary = [
  "Redencion cristiana",
  "Eucaristia",
  "Gotico hispanoflamenco",
  "Mecenazgo regio",
  "Memoria dinastica",
  "Rueda angelical",
  "Pelicano eucaristico",
  "Policromia",
  "Dorado",
  "Devocion cartuja",
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
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [guided, setGuided] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
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

  if (!started) {
    return (
      <main className="start-screen relative grid min-h-screen place-items-center overflow-hidden bg-[#070605] px-5 text-[#f8ecd8]">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/retablo-hero.png"
          alt="Entrada al tour del Retablo Mayor de la Cartuja de Miraflores"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(216,173,96,0.14),transparent_28%),linear-gradient(180deg,rgba(4,3,2,0.58),rgba(4,3,2,0.94))]" />
        <section className="relative z-10 max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-[#d8ad60]">Museo interactivo</p>
          <h1 className="mt-5 font-serif text-[clamp(3.4rem,10vw,9.2rem)] leading-[0.84] text-stone-50">
            Retablo Mayor de la Cartuja de Miraflores
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-200">
            Un recorrido guiado por arte, fe y poder regio en el gotico hispanoflamenco.
          </p>
          <button
            onClick={() => {
              setStarted(true);
              setGuided(true);
            }}
            className="mt-10 inline-flex min-h-14 items-center gap-3 border border-[#d8ad60] bg-[#d8ad60] px-7 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#efca79]"
          >
            <Play size={18} />
            Iniciar Tour
          </button>
        </section>
      </main>
    );
  }

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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuided((value) => !value)}
              className={`inline-flex min-h-11 items-center gap-2 border px-4 text-xs uppercase tracking-[0.18em] backdrop-blur-md transition ${
                guided
                  ? "border-[#d8ad60] bg-[#d8ad60] text-black"
                  : "border-white/14 bg-black/36 text-stone-100 hover:border-[#d8ad60]/60"
              }`}
            >
              <Play size={15} />
              {guided ? "Guiado" : "Iniciar visita"}
            </button>
            <button
              onClick={() => setSheetOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 border border-white/14 bg-black/36 px-4 text-xs uppercase tracking-[0.18em] text-stone-100 backdrop-blur-md transition hover:border-[#d8ad60]/60"
            >
              <Info size={16} />
              Ficha
            </button>
            <button
              onClick={() => setMapOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 border border-white/14 bg-black/36 px-4 text-xs uppercase tracking-[0.18em] text-stone-100 backdrop-blur-md transition hover:border-[#d8ad60]/60"
            >
              <Map size={16} />
              Mapa
            </button>
          </div>
        </header>

        <section className="relative z-10 grid min-h-[calc(100vh-92px)] items-end gap-8 px-5 pb-6 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,0.72fr)]">
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
            {guided && (
              <div className="guide-callout mt-6 max-w-3xl border border-[#d8ad60]/45 bg-black/48 p-4 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#d8ad60]">Guia de sala</p>
                <p className="mt-2 font-serif text-2xl leading-8 text-stone-50">{guideLines[current]}</p>
              </div>
            )}
            <div className="mt-7 inline-flex border border-white/16 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.22em] text-stone-200">
              {room.tag}
            </div>
          </div>

          <aside className="analysis-panel relative max-h-[74vh] overflow-hidden border border-white/12 bg-black/42 backdrop-blur-md">
            <div className="relative h-52 overflow-hidden border-b border-white/12 bg-[#0d0b09] sm:h-60">
              <Image
                className="h-full w-full object-cover opacity-82"
                src="/images/retablo-symbols.png"
                alt="Mapa visual del retablo con puntos interactivos"
                fill
                sizes="520px"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,rgba(0,0,0,0.42)_72%)]" />
              {hotspots.map((spot, index) => (
                <button
                  key={spot.title}
                  onClick={() => setActiveHotspot(index)}
                  className={`hotspot hotspot-${spot.category.toLowerCase()} absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#f5d28d] bg-[#d8ad60] text-black shadow-[0_0_34px_rgba(216,173,96,0.7)]`}
                  style={{ left: spot.x, top: spot.y }}
                  aria-label={`${spot.category}: ${spot.title}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="analysis-scroll max-h-[calc(74vh-15rem)] overflow-y-auto p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#d8ad60]">Lectura de sala</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-50 sm:text-4xl">{room.focus}</h2>

              <div className="mt-5 border-l-2 border-[#d8ad60] bg-[#d8ad60]/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#f0d39a]">Idea fuerza</p>
                <p className="mt-2 text-lg leading-7 text-stone-100">{room.idea}</p>
              </div>

              <div className="mt-5 grid gap-3">
                {room.keys.map((key, index) => (
                  <div key={key} className="key-card grid grid-cols-[42px_1fr] items-center border border-white/10 bg-white/[0.045]">
                    <span className="grid h-full min-h-14 place-items-center border-r border-white/10 font-serif text-2xl text-[#d8ad60]">
                      {index + 1}
                    </span>
                    <span className="px-4 text-sm uppercase tracking-[0.14em] text-stone-200">{key}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.26em] text-stone-500">Analisis</p>
                <p className="mt-2 text-base leading-8 text-stone-300">{room.analysis}</p>
              </div>

              {room.special === "layers" && (
                <div className="mt-6 border border-white/10 bg-black/22 p-4">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-stone-500">Comparacion visual</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {interpretationLayers.map((layer, index) => (
                      <button
                        key={layer.name}
                        onClick={() => setActiveLayer(index)}
                        className={`border px-3 py-3 text-left text-xs uppercase tracking-[0.12em] transition ${
                          activeLayer === index ? "border-[#d8ad60] bg-[#d8ad60]/12" : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        {layer.name}
                      </button>
                    ))}
                  </div>
                  <div className="layer-preview mt-4 border p-4" style={{ borderColor: interpretationLayers[activeLayer].color }}>
                    <span className="block h-2 w-24" style={{ background: interpretationLayers[activeLayer].color }} />
                    <p className="mt-3 text-sm leading-7 text-stone-300">{interpretationLayers[activeLayer].text}</p>
                  </div>
                </div>
              )}

              {room.special === "timeline" && (
                <div className="mt-6 grid gap-3">
                  {timeline.map(([year, event]) => (
                    <div key={year} className="timeline-item grid grid-cols-[72px_1fr] border border-white/10 bg-white/[0.04]">
                      <span className="grid place-items-center border-r border-white/10 font-serif text-2xl text-[#d8ad60]">{year}</span>
                      <p className="p-3 text-sm leading-6 text-stone-300">{event}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 border-t border-white/12 pt-5">
                <p className="text-[10px] uppercase tracking-[0.26em] text-stone-500">Conceptos conectados</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {glossary.slice(0, current >= 7 ? 9 : 6).map((term) => (
                    <span key={term} className="border border-white/12 bg-white/[0.05] px-3 py-2 text-xs text-stone-300">
                      {term}
                    </span>
                  ))}
                </div>
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
              <p className="text-xs uppercase tracking-[0.28em] text-[#d8ad60]">
                {hotspots[activeHotspot].category} | Punto interactivo
              </p>
              <button onClick={() => setActiveHotspot(null)} className="grid h-9 w-9 place-items-center border border-white/14">
                <X size={16} />
              </button>
            </div>
            <h2 className="mt-4 font-serif text-4xl">{hotspots[activeHotspot].title}</h2>
            <p className="mt-4 leading-8 text-stone-300">{hotspots[activeHotspot].text}</p>
          </article>
        </div>
      )}

      {sheetOpen && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/68 p-5 backdrop-blur-sm">
          <article className="modal-panel w-full max-w-3xl border border-[#d8ad60]/35 bg-[#100d0a] p-6 text-stone-100 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8ad60]">Ficha tecnica de museo</p>
                <h2 className="mt-3 font-serif text-4xl">Retablo Mayor de la Cartuja de Miraflores</h2>
              </div>
              <button onClick={() => setSheetOpen(false)} className="grid h-9 w-9 place-items-center border border-white/14">
                <X size={16} />
              </button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {technicalSheet.map(([label, value]) => (
                <div key={label} className="border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#d8ad60]">{label}</p>
                  <p className="mt-2 leading-7 text-stone-200">{value}</p>
                </div>
              ))}
            </div>
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
            <div className="floorplan relative my-6 flex-1 overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(216,173,96,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
              <div className="floor-label top-label">Presbiterio y retablo</div>
              <div className="floor-label bottom-label">Entrada del visitante</div>
              <div className="floor-spine" />
              <div className="floor-cross" />
              {rooms.map((item, index) => {
                const ItemIcon = item.icon;
                const positions = [
                  ["50%", "84%"],
                  ["30%", "70%"],
                  ["70%", "70%"],
                  ["20%", "52%"],
                  ["50%", "52%"],
                  ["80%", "52%"],
                  ["26%", "34%"],
                  ["50%", "34%"],
                  ["74%", "34%"],
                  ["30%", "18%"],
                  ["70%", "18%"],
                  ["50%", "10%"],
                ][index] ?? ["50%", "50%"];
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(index)}
                    className={`floor-node absolute w-44 -translate-x-1/2 -translate-y-1/2 border p-4 text-left transition ${
                      current === index
                        ? "border-[#d8ad60] bg-[#d8ad60]/12"
                        : "border-white/12 bg-white/[0.04] hover:border-[#d8ad60]/60"
                    }`}
                    style={{ left: positions[0], top: positions[1] }}
                  >
                    <ItemIcon className="text-[#d8ad60]" size={24} />
                    <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-stone-500">Sala {index + 1}</p>
                    <h3 className="mt-1 font-serif text-2xl text-stone-50">{item.label}</h3>
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
