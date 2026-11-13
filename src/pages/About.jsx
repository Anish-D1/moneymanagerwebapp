import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Database,
  LayoutDashboard,
  Wallet,
  Receipt,
  Tags,
  ShieldCheck,
  ChartNoAxesCombined,
  GraduationCap,
  Layers3,
  Github,
} from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const About = () => {
  const technologies = [
    {
      name: "Java",
      detail: "Backend programming",
      icon: Code2,
      color: "text-orange-300",
      border: "border-orange-400/20",
    },
    {
      name: "Spring Boot",
      detail: "REST API development",
      icon: Layers3,
      color: "text-emerald-300",
      border: "border-emerald-400/20",
    },
    {
      name: "React",
      detail: "Frontend development",
      icon: LayoutDashboard,
      color: "text-cyan-300",
      border: "border-cyan-400/20",
    },
    {
      name: "MySQL",
      detail: "Relational database",
      icon: Database,
      color: "text-sky-300",
      border: "border-sky-400/20",
    },
  ];

  const features = [
    {
      icon: Wallet,
      title: "Income management",
      description:
        "Record and organize income entries for a clearer view of money coming in.",
    },
    {
      icon: Receipt,
      title: "Expense tracking",
      description: "Manage expense records and review spending activity.",
    },
    {
      icon: Tags,
      title: "Category management",
      description:
        "Organize financial entries with categories for easier tracking.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Financial dashboard",
      description:
        "View income, expenses, balance summaries, and recent transactions in one place.",
    },
    {
      icon: ShieldCheck,
      title: "Authentication",
      description:
        "Explore the registration and login flow built for user accounts.",
    },
    {
      icon: LayoutDashboard,
      title: "Responsive interface",
      description:
        "Navigate financial information through a consistent, dark-themed React interface.",
    },
  ];

  const learningPoints = [
    "Connecting a React frontend to a Spring Boot backend through REST APIs.",
    "Working with Java, Spring Data JPA, and a MySQL database.",
    "Managing application state, forms, validation, and API responses.",
    "Organizing backend and frontend code into maintainable components.",
    "Testing features and troubleshooting integration issues.",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#080B16] font-sans text-white">
      <Header />

      <main>
        {/* Introduction */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
            <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/[0.08] px-4 py-2 text-sm text-violet-200">
              <GraduationCap className="h-4 w-4" />
              Full-Stack Development Project
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Building my skills,
              <span className="mt-2 block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                one feature at a time.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              Money Manager is a personal finance management application
              developed as part of my journey into Java full-stack development.
              It brings together a React interface, a Spring Boot backend, and a
              MySQL database to manage everyday financial records.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500"
              >
                Explore the application
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.08]"
              >
                Get in touch
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              A hands-on project focused on practical full-stack skills.
            </p>
          </div>
        </section>

        {/* Project overview */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/[0.10] to-white/[0.02] p-7 backdrop-blur-xl sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <Wallet className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
                About the project
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Managing money becomes easier when financial information is
                organized. Money Manager lets users record income and expenses,
                organize categories, and review summaries through a single
                dashboard.
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                I built this project to put my programming knowledge into
                practice, understand how frontend and backend systems work
                together, and gain experience building an application beyond
                isolated coding exercises.
              </p>
            </article>

            <article className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/[0.08] to-white/[0.02] p-7 backdrop-blur-xl sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Project snapshot
              </p>

              <h2 className="mt-4 text-2xl font-bold">
                The application at a glance
              </h2>

              <div className="mt-7 space-y-5">
                {[
                  ["Project type", "Personal finance web app"],
                  ["Frontend", "React and JavaScript"],
                  ["Backend", "Java and Spring Boot"],
                  ["Database", "MySQL"],
                  ["API style", "REST APIs"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-medium text-slate-200 sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                Application features
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                What I built
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                The main areas of the application demonstrate how common
                financial workflows can be brought together in a full-stack
                project.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="rounded-2xl border border-white/[0.08] bg-[#101629]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#141B30]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technology stack */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Technology stack
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Tools I worked with
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              The technologies used to build the frontend, implement backend
              logic, expose APIs, and store data.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <article
                  key={technology.name}
                  className={`rounded-2xl border ${technology.border} bg-white/[0.025] p-5 transition hover:bg-white/[0.05]`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ${technology.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 font-semibold">{technology.name}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {technology.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="border-t border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                My learning journey
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                From concepts to a working application.
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Developing Money Manager has helped me connect individual
                programming concepts and understand how they contribute to a
                complete software application.
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Discuss this project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.06] to-white/[0.02] p-6 sm:p-8">
              <h3 className="text-lg font-semibold">Skills practised</h3>

              <ul className="mt-6 space-y-4">
                {learningPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-300"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-r from-violet-500/[0.12] via-indigo-500/[0.07] to-cyan-500/[0.10] p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-violet-300 ring-1 ring-white/10">
              <Code2 className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Interested in my work?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              I&apos;m building my skills in Java full-stack development and
              looking for opportunities to learn, contribute, and grow as a
              developer.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold transition hover:from-violet-500 hover:to-indigo-500"
              >
                Contact me
                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-slate-200 transition hover:bg-white/[0.08]"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Replace the GitHub link with your actual project repository before
              sharing this page with recruiters.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
