import { SiLeetcode, SiGeeksforgeeks, SiHackerrank } from "react-icons/si";
import { LuBraces } from "react-icons/lu";
import type { IconType } from "react-icons";
import Reveal from "@/components/Reveal";
import { codingStats } from "@/data/portfolio";

function RadialRing({
  value,
  max,
  size = 96,
  strokeWidth = 8,
  centerLabel,
  centerSublabel,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  centerLabel: string;
  centerSublabel: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, value / max);
  const offset = circumference * (1 - pct);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold text-foreground">
          {centerLabel}
        </span>
        <span className="text-[10px] uppercase tracking-wide text-muted">
          {centerSublabel}
        </span>
      </div>
    </div>
  );
}

function Bar({
  label,
  solved,
  total,
  color,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
}) {
  const pct = Math.min(100, (solved / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className="font-mono text-[11px] text-muted">
          {solved} / {total}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function Sparkline({
  data,
  start,
  end,
}: {
  data: number[];
  start: string;
  end: string;
}) {
  const w = 260;
  const h = 56;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
        <span>{start}</span>
        <span>{end}</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="font-display text-lg font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}

function Stars({ count, max }: { count: number; max: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-accent" : "text-border"}
          style={{ fontSize: "0.7rem" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CardShell({
  link,
  children,
}: {
  link: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
    >
      {children}
    </a>
  );
}

function CardHeader({
  title,
  icon: Icon,
  color,
}: {
  title: string;
  icon: IconType;
  color: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background/40"
          style={{ color }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground">
          {title}
        </h3>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </div>
  );
}

function CardFooter() {
  return (
    <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
      View Profile
    </span>
  );
}

function LeetCodeCard() {
  const s = codingStats.leetcode;
  const totalQuestions = s.easy.total + s.medium.total + s.hard.total;
  return (
    <CardShell link={s.link}>
      <CardHeader title={s.platform} icon={SiLeetcode} color="#FFA116" />
      <div className="flex items-center gap-5">
        <RadialRing
          value={s.totalSolved}
          max={totalQuestions}
          centerLabel={String(s.totalSolved)}
          centerSublabel="Solved"
        />
        <div className="flex-1 space-y-2.5">
          <Bar label="Easy" solved={s.easy.solved} total={s.easy.total} color="#4ade80" />
          <Bar label="Medium" solved={s.medium.solved} total={s.medium.total} color="var(--accent)" />
          <Bar label="Hard" solved={s.hard.solved} total={s.hard.total} color="#f87171" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
        <Stat label="Contest Rating" value={s.contestRating} />
        <Stat label="Highest Rating" value={s.highestRating} />
        <Stat label={`${s.contestsAttended} Contests`} value={`Top ${s.topPercentage}%`} />
      </div>

      <div className="mt-4 flex-1">
        <Sparkline data={s.ratingHistory} start={s.historyStart} end={s.historyEnd} />
      </div>

      <CardFooter />
    </CardShell>
  );
}

function SkillRackCard() {
  const s = codingStats.skillrack;
  const topLanguages = s.languages.slice(0, 3);
  const maxLangCount = Math.max(...s.languages.map((l) => l.count));
  return (
    <CardShell link={s.link}>
      <CardHeader title={s.platform} icon={LuBraces} color="var(--accent)" />
      <div className="flex items-center gap-5">
        <RadialRing
          value={s.programsSolved}
          max={2000}
          centerLabel={String(s.programsSolved)}
          centerSublabel="Programs"
        />
        <Stat label="Rank" value={`#${s.rank.toLocaleString()}`} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
        <Stat label="Certificates" value={s.certificates} />
        <Stat label="Bronze Medals" value={s.bronze} />
        <Stat label="Code Track" value={s.codeTrack} />
      </div>

      <div className="mt-5 flex-1 space-y-2.5">
        {topLanguages.map((l) => (
          <Bar key={l.name} label={l.name} solved={l.count} total={maxLangCount} color="var(--accent)" />
        ))}
      </div>

      <CardFooter />
    </CardShell>
  );
}

function GeeksforGeeksCard() {
  const s = codingStats.geeksforgeeks;
  return (
    <CardShell link={s.link}>
      <CardHeader title={s.platform} icon={SiGeeksforgeeks} color="#2F8D46" />
      <div className="flex items-center gap-5">
        <RadialRing
          value={s.codingScore}
          max={1000}
          centerLabel={String(s.codingScore)}
          centerSublabel="Score"
        />
        <div className="grid flex-1 grid-cols-1 gap-3">
          <Stat label="Problems Solved" value={s.problemsSolved} />
          <Stat label="Institute Rank" value={`#${s.instituteRank}`} />
        </div>
      </div>
      <div className="flex-1" />
      <CardFooter />
    </CardShell>
  );
}

function HackerRankCard() {
  const s = codingStats.hackerrank;
  return (
    <CardShell link={s.link}>
      <CardHeader title={s.platform} icon={SiHackerrank} color="#00EA64" />
      <div className="flex-1 space-y-4">
        {s.badges.map((b) => (
          <div key={b.skill}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground">{b.skill}</span>
              <Stars count={b.stars} max={b.maxStars} />
            </div>
            <div className="mt-1.5">
              <Bar label="Solved" solved={b.solved} total={b.total} color="var(--accent)" />
            </div>
          </div>
        ))}
      </div>
      <CardFooter />
    </CardShell>
  );
}

export default function CodingStatCards() {
  const cards = [LeetCodeCard, SkillRackCard, GeeksforGeeksCard, HackerRankCard];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((Card, i) => (
        <Reveal key={Card.name} delay={i * 90} className="h-full">
          <Card />
        </Reveal>
      ))}
    </div>
  );
}
