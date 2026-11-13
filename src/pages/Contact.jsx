
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BriefcaseBusiness,
    Code2,
    Github,
    Linkedin,
    MessageSquareText,
    ExternalLink,
    GraduationCap,
} from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Contact = () => {
    const skills = [
        "Java",
        "Spring Boot",
        "REST APIs",
        "React",
        "JavaScript",
        "MySQL",
        "Spring Data JPA",
        "Git & GitHub",
    ];

    const contactLinks = [
        {
            icon: Linkedin,
            title: "LinkedIn",
            description: "Connect with me professionally and discuss opportunities.",
            action: "View LinkedIn profile",
            href: "https://www.linkedin.com/in/anish-devan/",
            color: "text-sky-300",
            border: "border-sky-400/20",
            background: "bg-sky-400/[0.07]",
        },
        {
            icon: Github,
            title: "GitHub",
            description: "Explore my repositories and follow my development journey.",
            action: "Explore GitHub",
            href: "https://github.com/Anish-D1",
            color: "text-violet-300",
            border: "border-violet-400/20",
            background: "bg-violet-400/[0.07]",
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-[#080B16] font-sans text-white">
            <Header />

            <main>
                {/* Hero */}
                <section className="relative isolate overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10"
                    >
                        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
                        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
                    </div>

                    <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-sm text-cyan-200">
                            <BriefcaseBusiness className="h-4 w-4" />
                            Open to entry-level opportunities
                        </span>

                        <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                            Let&apos;s connect and
                            <span className="mt-2 block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                                build something great.
                            </span>
                        </h1>

                        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                            I&apos;m a Java Full-Stack developer fresher interested
                            in software development opportunities where I can
                            apply my skills, learn from experienced developers,
                            and contribute to real-world projects.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="https://www.linkedin.com/in/anish-devan/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500"
                            >
                                <Linkedin className="h-5 w-5" />
                                Connect on LinkedIn
                                <ExternalLink className="h-4 w-4" />
                            </a>

                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.08]"
                            >
                                View my project
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Profile and skills */}
                <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20">
                    <article className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.10] to-white/[0.02] p-7 backdrop-blur-xl sm:p-9">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20">
                            <GraduationCap className="h-7 w-7" />
                        </div>

                        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
                            A little about me
                        </p>

                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                            An aspiring Java Full-Stack Developer
                        </h2>

                        <p className="mt-5 leading-8 text-slate-400">
                            I&apos;m a BCA graduate building practical software
                            development skills through hands-on projects.
                            Money Manager is one way I&apos;ve been applying what
                            I&apos;ve learned across frontend development, backend
                            APIs, database integration, and deployment.
                        </p>

                        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                                <Code2 className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">
                                    Practical project experience
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Learning by building and troubleshooting.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#12182A]/95 to-[#0D1220]/95 p-7 backdrop-blur-xl sm:p-9">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                            Technical skills
                        </p>

                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                            Technologies I&apos;m working with
                        </h2>

                        <p className="mt-4 leading-7 text-slate-400">
                            My current focus is Java full-stack development,
                            building a stronger foundation through practical
                            implementation and continuous learning.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-400/[0.06]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 border-t border-white/[0.08] pt-6">
                            <p className="text-sm leading-7 text-slate-400">
                                Interested in discussing my project, technical
                                skills, or suitability for an entry-level
                                developer role? I&apos;d be glad to connect.
                            </p>
                        </div>
                    </article>
                </section>

                {/* Contact links */}
                <section className="border-y border-white/[0.06] bg-white/[0.015]">
                    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                                Find me online
                            </p>

                            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                                Let&apos;s stay connected.
                            </h2>

                            <p className="mt-4 leading-7 text-slate-400">
                                You can learn more about my background and
                                projects through my professional and coding profiles.
                            </p>
                        </div>

                        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
                            {contactLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`group rounded-2xl border ${item.border} ${item.background} p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] sm:p-8`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#101629] ${item.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <ExternalLink className="h-5 w-5 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-400">
                                            {item.description}
                                        </p>

                                        <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${item.color}`}>
                                            {item.action}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
                    <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-violet-500/[0.10] via-indigo-500/[0.07] to-cyan-500/[0.10] p-8 text-center sm:p-12">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-cyan-300 ring-1 ring-white/10">
                            <MessageSquareText className="h-7 w-7" />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                            Thank you for visiting my project.
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                            I&apos;m looking forward to growing as a developer,
                            learning from a team, and contributing to meaningful
                            software projects.
                        </p>

                        <a
                            href="https://www.linkedin.com/in/anish-devan/"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold text-white transition hover:from-violet-500 hover:to-indigo-500"
                        >
                            Let&apos;s connect
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
