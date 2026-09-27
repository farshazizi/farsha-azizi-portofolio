"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import {
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Server,
  Layout,
  Database,
  Wrench,
  Briefcase,
  ChevronDown,
  Send,
  Code2,
  Gauge,
  Layers,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data — edit these to update the site                               */
/* ------------------------------------------------------------------ */

const CONTACT = {
  email: "farshazizi22@gmail.com",
  linkedin: "https://www.linkedin.com/in/farsha-azizi/",
  github: "https://github.com/farshazizi",
};

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Academy", href: "#academy" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const METRICS = [
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 400, suffix: "%", label: "Data Import Performance Improvement" },
];

const EXPERIENCES = [
  {
    company: "PT E-Tirta Medical Centre · Jakarta",
    role: "Full Stack Developer — Back End Focus (Full Time)",
    period: "Dec 2022 — Present",
    points: [
      "Building internal applications (API only) and writing API specifications for the Front End team.",
      "Designing and discussing ERDs with the Tech Lead to accommodate new features.",
      "Applying SOLID principles, Service Pattern and Repository Pattern as best-practice code.",
      "Created standardized guidelines for file naming, folder organization, and function definitions.",
      "Achievement: improved the Excel data import flow by up to 400% — from ±8,000 to ±30,000 rows.",
    ],
  },
  {
    company: "PT E-Tirta Medical Centre · Jakarta",
    role: "Full Stack Developer — Front End Focus (Contract)",
    period: "Feb 2022 — Dec 2022",
    points: [
      "Built a booking application for Medical Check Up, Laboratory tests, and more.",
      "Sliced Figma designs and aligned flows and components with the UI/UX team.",
      "Coordinated with the Back End team on the APIs used for each action.",
      "Integrated the Midtrans payment gateway.",
    ],
  },
  {
    company: "PT E-Tirta Medical Centre · Jakarta",
    role: "Full Stack Developer (Contract)",
    period: "Sep 2021 — Feb 2022",
    points: [
      "Maintained internal applications and fixed bugs (datatable search, column sorting).",
      "Implemented SOLID principles, Service Pattern and Repository Pattern.",
      "Developed new user-requested features such as PDF export.",
      "Designed ERDs to ensure compliance with the existing architecture.",
    ],
  },
  {
    company: "PT Genesys Integrated Indonesia · Surabaya",
    role: "Senior Web Developer",
    period: "Aug 2019 — Sep 2021",
    points: [
      "Developed ERP application modules (Sales, Purchasing, Payment).",
      "Discussed new features and improvements with the team to match user needs.",
      "Wrote user manuals for the application.",
      "Achievement: managed two mobile application projects as Project Manager for vehicle credit submissions.",
    ],
  },
  {
    company: "PT Genesys Integrated Indonesia · Surabaya",
    role: "Web Developer",
    period: "Sep 2018 — Aug 2019",
    points: [
      "Developed ERP application modules (Sales, Purchasing, Payment).",
      "Visited client offices to ensure the application was used properly.",
      "Achievement: managed maintenance and monitored data entry operations at two branch offices.",
    ],
  },
  {
    company: "Institut Bisnis dan Informatika Stikom Surabaya",
    role: "Student Laboratory Assistant",
    period: "Jan 2016 — Dec 2017",
    points: [
      "Assisted courses: Mobile Application Programming, Database Design, and Programming Languages.",
    ],
  },
];

const ACADEMY = [
  {
    school: "Binar Academy",
    program: "Full Stack Web",
    detail: "Student Wave 8",
    period: "Feb 2021 — Sep 2021",
  },
  {
    school: "Institut Bisnis dan Informatika Stikom Surabaya",
    program: "Bachelor Degree — Information System",
    detail: "GPA 3.69 / 4.00",
  },
];

const PROJECTS = [
  {
    name: "Jatuh Tempo",
    tagline: "Bill & Financial Due Date Reminder",
    description:
      "Web app to manage, track, and get timely notifications for recurring bill due dates, with automated calculation and reminders to prevent late payment penalties.",
    tags: ["Full Stack", "Personal"],
    stack: ["Next.js", "GitHub", "Vercel"],
    live: "https://jatuhtempo.vercel.app",
    period: "Aug 2026",
  },
  {
    name: "Qadhaku",
    tagline: "Islamic Habit & Fasting Tracker",
    description:
      "Tracks missed fasting days (Qadha & Fidyah) with automated Fidyah calculation, daily local notifications, and a lightweight offline-first experience.",
    tags: ["Full Stack", "Personal"],
    stack: ["Next.js", "GitHub", "Vercel"],
    live: "https://qadhaku.vercel.app",
    period: "Jul 2026",
  },
  {
    name: "Esverita",
    tagline: "E-Commerce & Plant Log System",
    description:
      "Built the Plant Master Data module, a Plant Log module for tracking each plant, and an Activity Timeline for better insight and traceability.",
    tags: ["Full Stack", "Commercial"],
    stack: ["Laravel 11/12", "Filament 3", "MySQL", "GitHub"],
    period: "Dec 2024 — Jun 2025",
  },
  {
    name: "Starter Kit Laravel",
    tagline: "Laravel Application Starter Kit",
    description:
      "Reusable Laravel starter kit with pre-configured authentication, role management, and base UI structures to accelerate project setup.",
    tags: ["Backend", "Personal"],
    stack: ["Laravel", "PHP"],
    period: "2024",
  },
  {
    name: "Bolu Ketan Cisadane",
    tagline: "Point of Sales Application",
    description:
      "Gathered requirements with the client, designed the ERD and schema, and built master data, transaction processing, and sales reporting modules.",
    tags: ["Full Stack", "Commercial"],
    stack: ["Laravel 8", "Vue.js", "PostgreSQL", "HTML/CSS"],
    period: "Dec 2022 — Feb 2023",
  },
  {
    name: "E-Tirta Medical App",
    tagline: "API Optimization & Booking System",
    description:
      "Internal APIs and a consumer booking app for medical check-ups with Midtrans payments; improved the Excel import flow by up to 400%.",
    tags: ["Backend", "Commercial"],
    stack: ["Laravel", "Node.js", "Express.js", "Midtrans"],
    period: "2021 — Present",
  },
];

const PROJECT_FILTERS = ["All", "Backend", "Full Stack", "Commercial", "Personal"];

const SKILLS = [
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "NestJS", "PHP", "Laravel", "Filament"],
  },
  {
    category: "Frontend",
    icon: Layout,
    items: ["JavaScript", "React", "Next.js", "Redux", "Redux Thunk", "HTML5", "CSS3", "Bootstrap", "jQuery", "AJAX"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQL"],
  },
  {
    category: "Tools & VCS",
    icon: Wrench,
    items: ["Git", "GitHub", "GitLab", "Bitbucket", "Postman", "Apidog", "DBeaver", "PuTTY", "WinSCP"],
  },
  {
    category: "Management",
    icon: Briefcase,
    items: ["Jira", "Asana", "Trello", "Basecamp", "Lark"],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function SectionHeading({ eyebrow, title, dark = false }) {
  return (
    <motion.div {...fadeUp} className="mb-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-600">
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-red-600" />
    </motion.div>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

/* ------------------------------------------------------------------ */
/* Sections                                                           */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#" aria-label="Home">
          <Image src="/logo.png" alt="FA" width={40} height={40} className="rounded-lg" priority />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-red-600"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-red-600/30 transition hover:bg-red-700 md:inline-block"
        >
          Hire Me
        </a>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-slate-900 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-screen w-72 flex-col bg-white p-6 shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Image src="/logo.png" alt="FA" width={40} height={40} className="rounded-lg" priority />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-red-50 hover:text-red-600"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-red-600 px-5 py-3 text-center font-semibold text-white hover:bg-red-700"
              >
                Hire Me
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const highlights = ["Node.js", "Express", "Laravel", "Next.js"];
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-red-100 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
            Available for new opportunities
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Hi, I&apos;m Farsha Azizi.
            <br />
            <span className="text-red-600">Back End & Full Stack</span> Developer.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            7+ years building scalable APIs, robust databases, and modern web applications —
            with a focus on clean architecture and performance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span
                key={h}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
            >
              Explore Work
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 px-7 py-3 font-semibold text-slate-900 transition hover:border-red-600 hover:text-red-600"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-4xl font-extrabold text-red-600">
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const pillars = [
    { icon: Layers, title: "Software Architecture", text: "Scalable, maintainable systems designed for growth." },
    { icon: Code2, title: "Clean Code", text: "SOLID principles, readable and well-tested code." },
    { icon: Gauge, title: "Backend Optimization", text: "Query tuning and API performance that scales." },
  ];
  return (
    <section id="about" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="About Me" title="Building reliable software, end to end." />
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp} className="space-y-4 text-lg leading-relaxed text-slate-600">
            <p>
              I&apos;m a Back End Developer with over 7 years of experience building
              applications with Laravel, Node.js, and Express.js — from ERD and API
              specifications to full stack delivery.
            </p>
            <p>
              I apply SOLID principles, Service Pattern and Repository Pattern to keep code
              clean and maintainable, and I enjoy optimizing slow processes into fast ones. Strong
              communication skills help me work closely with tech leads, UI/UX, and front end
              teams, and I&apos;m always motivated to learn and grow.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section id="experience" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading eyebrow="Experience" title="Career milestones." />
        <ol className="relative border-l-2 border-slate-200 pl-8">
          {EXPERIENCES.map((exp, i) => {
            const isOpen = active === i;
            return (
              <motion.li key={exp.role + exp.period} {...fadeUp} className="relative mb-6 last:mb-0">
                <span
                  className={`absolute -left-[41px] top-5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white ring-2 transition ${
                    isOpen ? "bg-red-600 ring-red-600" : "bg-slate-300 ring-slate-300"
                  }`}
                />
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    isOpen
                      ? "border-red-200 bg-red-50/50 shadow-sm"
                      : "border-slate-200 hover:border-red-200"
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-red-600">{exp.period}</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">{exp.role}</h3>
                      <p className="flex items-center gap-1.5 text-slate-600">
                        <Briefcase className="h-4 w-4" /> {exp.company}
                      </p>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {exp.points.map((pt) => (
                          <li key={pt} className="mt-3 flex gap-2 text-slate-600">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                            {pt}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Academy() {
  return (
    <section id="academy" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Academy" title="Education & training." />
        <div className="grid gap-6 md:grid-cols-2">
          {ACADEMY.map((a, i) => (
            <motion.div
              key={a.school}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-red-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                {a.period && <p className="text-sm font-medium text-red-600">{a.period}</p>}
                <h3 className="text-lg font-bold text-slate-900">{a.program}</h3>
                <p className="text-slate-600">{a.school}</p>
                <p className="mt-1 text-sm text-slate-500">{a.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Featured Projects" title="Selected work." />
        <div className="mb-10 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.article
                layout
                key={p.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-xl hover:shadow-red-600/5"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600">
                  {p.name}
                </h3>
                <p className="text-sm font-medium text-slate-500">{p.tagline} · {p.period}</p>
                <p className="mt-3 flex-1 text-slate-600">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Visit Live Site <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Tech Stack" title="Skills & tools." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.category}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-red-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-slate-900">{s.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-slate-200 bg-gray-50 px-2.5 py-1 text-sm text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const { copied, copy } = useCopy();

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email.";
    if (f.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  };

  const onChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    if (errors[e.target.name]) setErrors(validate(next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    // Simulated submit — replace with a real API route or email service.
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  const channels = [
    { key: "email", label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail, copyable: true },
    { key: "linkedin", label: "LinkedIn", value: "Connect on LinkedIn", href: CONTACT.linkedin, icon: LinkedinIcon },
    { key: "github", label: "GitHub", value: "See my code", href: CONTACT.github, icon: GithubIcon },
  ];

  const inputClass = (field) =>
    `w-full rounded-xl border bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500/40"
        : "border-slate-700 focus:border-red-500 focus:ring-red-500/30"
    }`;

  return (
    <section id="contact" className="bg-slate-900 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Contact" title="Let's build something great." dark />
        <div className="grid gap-10 lg:grid-cols-5">
          <motion.div {...fadeUp} className="space-y-4 lg:col-span-2">
            <p className="mb-6 text-slate-400">
              Have a project in mind or want to discuss an opportunity? My inbox is always open.
            </p>
            {channels.map((c) => (
              <div
                key={c.key}
                className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <c.icon className="h-5 w-5" />
                </div>
                <a
                  href={c.href}
                  target={c.key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1"
                >
                  <p className="text-xs uppercase tracking-wider text-slate-500">{c.label}</p>
                  <p className="truncate font-medium text-white hover:text-red-400">{c.value}</p>
                </a>
                {c.copyable && (
                  <button
                    onClick={() => copy(c.key, c.value)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                    aria-label={`Copy ${c.label}`}
                  >
                    {copied === c.key ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </motion.div>

          <motion.form
            {...fadeUp}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-slate-800 bg-slate-800/30 p-6 sm:p-8 lg:col-span-3"
          >
            {["name", "email"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="mb-1.5 block text-sm font-medium capitalize text-slate-300">
                  {field}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={onChange}
                  placeholder={field === "email" ? "you@example.com" : "Your name"}
                  className={inputClass(field)}
                />
                {errors[field] && <p className="mt-1.5 text-sm text-red-400">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder="Tell me about your project..."
                className={inputClass("message")}
              />
              {errors.message && <p className="mt-1.5 text-sm text-red-400">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4" />
            </button>
            {status === "sent" && (
              <p className="flex items-center justify-center gap-2 text-sm text-green-400">
                <Check className="h-4 w-4" /> Thanks! Your message has been sent.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <a href="#" aria-label="Home">
          <Image src="/logo.png" alt="FA" width={36} height={36} className="rounded-lg" />
        </a>
        <ul className="flex flex-wrap justify-center gap-5">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-slate-400 hover:text-red-400">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Farsha Azizi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function PortfolioApp() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Academy />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
