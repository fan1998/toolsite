"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../app/play/play.module.css";

const DAY_MS = 86400000;
const STORAGE_KEY = "fanjian-arcade-stats-v1";

const games = [
  {
    id: "color-hunt",
    code: "CHROMA-01",
    title: "颜色猎手",
    short: "找出唯一不同的色块",
    description: "色差会逐轮收窄。观察、判断、落指，一次犹豫就可能错过连击。",
    icon: "◉",
    tone: "coral",
    time: "30 秒",
    skill: "视觉 / 反应",
  },
  {
    id: "number-trail",
    code: "TRACE-25",
    title: "数字轨迹",
    short: "按顺序点亮 1 到 25",
    description: "数字散落在盘面上。保持视线领先手指，失误会吞掉宝贵时间。",
    icon: "↗",
    tone: "blue",
    time: "45 秒",
    skill: "搜索 / 手速",
  },
  {
    id: "emoji-math",
    code: "GLYPH-05",
    title: "Emoji 算式",
    short: "解开五道图形方程",
    description: "先算出每个图形的值，再留意乘法优先级。越快答对，得分越高。",
    icon: "✦",
    tone: "mint",
    time: "60 秒",
    skill: "逻辑 / 心算",
  },
];

const emojiPuzzles = [
  { rows: ["🍓 + 🍓 + 🍓 = 18", "🍓 + 🥝 + 🥝 = 14", "🥝 + 🍋 + 🍋 = 10"], question: "🍓 + 🥝 × 🍋", answer: 18, choices: [18, 30, 16, 22] },
  { rows: ["🐳 + 🐳 + 🐳 = 24", "🐳 + ⭐ + ⭐ = 18", "⭐ + 🌙 + 🌙 = 11"], question: "🐳 − ⭐ + 🌙 × 2", answer: 9, choices: [9, 12, 6, 14] },
  { rows: ["🍒 + 🍒 + 🍒 = 21", "🍒 + 🥥 + 🥥 = 17", "🥥 + 🍍 + 🍍 = 13"], question: "🍒 × 🍍 − 🥥", answer: 28, choices: [28, 24, 32, 18] },
  { rows: ["🚀 + 🚀 + 🚀 = 27", "🚀 + 🪐 + 🪐 = 19", "🪐 + 👾 + 👾 = 9"], question: "🚀 + 🪐 × 👾", answer: 21, choices: [21, 33, 18, 17] },
  { rows: ["🐙 + 🐙 + 🐙 = 18", "🐙 + 🐚 + 🐚 = 12", "🐚 + 🐠 + 🐠 = 14"], question: "🐠 × 🐙 − 🐚", answer: 27, choices: [27, 21, 33, 18] },
  { rows: ["☕ + ☕ + ☕ = 15", "☕ + 🥐 + 🥐 = 13", "🥐 + 🍩 + 🍩 = 12"], question: "🍩 + ☕ × 🥐", answer: 27, choices: [27, 36, 24, 19] },
  { rows: ["🦊 + 🦊 + 🦊 = 21", "🦊 + 🐸 + 🐸 = 15", "🐸 + 🐝 + 🐝 = 11"], question: "🦊 × 🐝 − 🐸", answer: 25, choices: [25, 29, 20, 35] },
  { rows: ["🎈 + 🎈 + 🎈 = 12", "🎈 + 🎁 + 🎁 = 16", "🎁 + 🎂 + 🎂 = 18"], question: "🎂 × 🎈 + 🎁", answer: 26, choices: [26, 42, 24, 30] },
];

function shanghaiDay() {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function random(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, seed) {
  const result = [...items];
  const next = random(seed);
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function formatDay(day) {
  const [, month, date] = day.split("-");
  return `${month} / ${date}`;
}

function rankFor(score) {
  if (score >= 2200) return { label: "超频状态", grade: "S" };
  if (score >= 1500) return { label: "手感正热", grade: "A" };
  if (score >= 850) return { label: "稳定发挥", grade: "B" };
  return { label: "继续热身", grade: "C" };
}

function ReadyPanel({ game, onStart }) {
  return (
    <div className={styles.readyPanel}>
      <span className={styles.readyIcon}>{game.icon}</span>
      <div>
        <span className={styles.microLabel}>READY / {game.code}</span>
        <h3>{game.short}</h3>
        <p>{game.description}</p>
      </div>
      <button className={styles.primaryButton} type="button" onClick={onStart}>
        开始游戏 <span>→</span>
      </button>
    </div>
  );
}

function ColorHunt({ seed, onFinish, tone }) {
  const [phase, setPhase] = useState("ready");
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [flash, setFlash] = useState("");
  const scoreRef = useRef(score);
  const finishedRef = useRef(false);

  scoreRef.current = score;

  const board = useMemo(() => {
    const size = round < 3 ? 3 : round < 6 ? 4 : round < 9 ? 5 : 6;
    const rng = random(seed + round * 997);
    const hue = Math.floor(rng() * 360);
    const saturation = 62 + Math.floor(rng() * 13);
    const light = 52 + Math.floor(rng() * 10);
    const delta = Math.max(3.2, 12 - round * 0.85);
    const targetIndex = Math.floor(rng() * size * size);
    const direction = rng() > 0.5 ? 1 : -1;
    return {
      size,
      targetIndex,
      normal: `hsl(${hue} ${saturation}% ${light}%)`,
      target: `hsl(${hue} ${saturation}% ${Math.max(28, Math.min(76, light + delta * direction))}%)`,
    };
  }, [round, seed]);

  const finish = useCallback((completed = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("finished");
    onFinish({ score: scoreRef.current, detail: `完成 ${completed ? 10 : round - 1} / 10 轮 · ${mistakes} 次误触` });
  }, [mistakes, onFinish, round]);

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          window.setTimeout(finish, 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finish, phase]);

  function start() {
    tone("start");
    setPhase("playing");
  }

  function choose(index) {
    if (phase !== "playing") return;
    if (index === board.targetIndex) {
      const gained = 115 + timeLeft * 3 + round * 22;
      const nextScore = score + gained;
      scoreRef.current = nextScore;
      setScore(nextScore);
      setFlash("good");
      tone("good");
      if (round >= 10) {
        window.setTimeout(() => finish(true), 180);
      } else {
        setRound((value) => value + 1);
      }
    } else {
      setMistakes((value) => value + 1);
      setTimeLeft((value) => Math.max(0, value - 2));
      setFlash("bad");
      tone("bad");
    }
    window.setTimeout(() => setFlash(""), 180);
  }

  if (phase === "ready") return <ReadyPanel game={games[0]} onStart={start} />;

  return (
    <div className={`${styles.gameStage} ${flash ? styles[flash] : ""}`}>
      <div className={styles.hud}>
        <div><span>ROUND</span><strong>{String(round).padStart(2, "0")} / 10</strong></div>
        <div><span>SCORE</span><strong>{score}</strong></div>
        <div><span>TIME</span><strong>{timeLeft}s</strong></div>
      </div>
      <p className={styles.gamePrompt}>找出唯一不同的颜色</p>
      <div className={styles.colorGrid} style={{ "--grid-size": board.size }}>
        {Array.from({ length: board.size * board.size }, (_, index) => (
          <button
            aria-label={`色块 ${index + 1}`}
            className={styles.colorCell}
            disabled={phase !== "playing"}
            key={`${round}-${index}`}
            onClick={() => choose(index)}
            style={{ background: index === board.targetIndex ? board.target : board.normal }}
            type="button"
          />
        ))}
      </div>
      <div className={styles.progressTrack}><span style={{ width: `${round * 10}%` }} /></div>
    </div>
  );
}

function NumberTrail({ seed, onFinish, tone }) {
  const [phase, setPhase] = useState("ready");
  const [nextNumber, setNextNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [flash, setFlash] = useState("");
  const scoreRef = useRef(score);
  const nextRef = useRef(nextNumber);
  const finishedRef = useRef(false);
  const numbers = useMemo(() => shuffle(Array.from({ length: 25 }, (_, index) => index + 1), seed + 2501), [seed]);

  scoreRef.current = score;
  nextRef.current = nextNumber;

  const finish = useCallback((completed = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const bonus = completed ? timeLeft * 30 : 0;
    const finalScore = scoreRef.current + bonus;
    setScore(finalScore);
    setPhase("finished");
    onFinish({ score: finalScore, detail: completed ? `全数点亮 · ${mistakes} 次误触` : `点亮 ${nextRef.current - 1} / 25 · ${mistakes} 次误触` });
  }, [mistakes, onFinish, timeLeft]);

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          window.setTimeout(() => finish(false), 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finish, phase]);

  function start() {
    tone("start");
    setPhase("playing");
  }

  function choose(number) {
    if (phase !== "playing") return;
    if (number === nextNumber) {
      const nextScore = score + 70 + nextNumber * 3;
      scoreRef.current = nextScore;
      setScore(nextScore);
      setFlash("good");
      tone(nextNumber === 25 ? "win" : "tick");
      if (nextNumber === 25) {
        window.setTimeout(() => finish(true), 160);
      } else {
        setNextNumber((value) => value + 1);
      }
    } else if (number >= nextNumber) {
      setMistakes((value) => value + 1);
      setTimeLeft((value) => Math.max(0, value - 2));
      setFlash("bad");
      tone("bad");
    }
    window.setTimeout(() => setFlash(""), 160);
  }

  if (phase === "ready") return <ReadyPanel game={games[1]} onStart={start} />;

  return (
    <div className={`${styles.gameStage} ${flash ? styles[flash] : ""}`}>
      <div className={styles.hud}>
        <div><span>NEXT</span><strong>{Math.min(nextNumber, 25)}</strong></div>
        <div><span>SCORE</span><strong>{score}</strong></div>
        <div><span>TIME</span><strong>{timeLeft}s</strong></div>
      </div>
      <p className={styles.gamePrompt}>按顺序点击，下一个是 <b>{Math.min(nextNumber, 25)}</b></p>
      <div className={styles.numberGrid}>
        {numbers.map((number) => {
          const cleared = number < nextNumber;
          return (
            <button
              aria-label={`数字 ${number}${cleared ? "，已点亮" : ""}`}
              className={`${styles.numberCell} ${cleared ? styles.cleared : ""}`}
              disabled={cleared || phase !== "playing"}
              key={number}
              onClick={() => choose(number)}
              type="button"
            >
              {cleared ? "·" : number}
            </button>
          );
        })}
      </div>
      <div className={styles.progressTrack}><span style={{ width: `${((nextNumber - 1) / 25) * 100}%` }} /></div>
    </div>
  );
}

function EmojiMath({ seed, onFinish, tone }) {
  const puzzles = useMemo(() => shuffle(emojiPuzzles, seed + 505).slice(0, 5), [seed]);
  const [phase, setPhase] = useState("ready");
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const scoreRef = useRef(score);
  const finishedRef = useRef(false);

  scoreRef.current = score;

  const finish = useCallback((completed = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const bonus = completed ? timeLeft * 18 : 0;
    const finalScore = scoreRef.current + bonus;
    setScore(finalScore);
    setPhase("finished");
    onFinish({ score: finalScore, detail: `答对 ${completed ? 5 : index} / 5 · ${mistakes} 次误答` });
  }, [index, mistakes, onFinish, timeLeft]);

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          window.setTimeout(() => finish(false), 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finish, phase]);

  function start() {
    tone("start");
    setPhase("playing");
  }

  function choose(choice) {
    if (phase !== "playing" || feedback === "good") return;
    if (choice === puzzles[index].answer) {
      const nextScore = score + 220 + timeLeft * 2;
      scoreRef.current = nextScore;
      setScore(nextScore);
      setFeedback("good");
      tone(index === 4 ? "win" : "good");
      if (index === 4) {
        window.setTimeout(() => finish(true), 420);
      } else {
        window.setTimeout(() => {
          setIndex((value) => value + 1);
          setFeedback(null);
        }, 420);
      }
    } else {
      setMistakes((value) => value + 1);
      setTimeLeft((value) => Math.max(0, value - 4));
      setFeedback("bad");
      tone("bad");
      window.setTimeout(() => setFeedback(null), 260);
    }
  }

  if (phase === "ready") return <ReadyPanel game={games[2]} onStart={start} />;

  const puzzle = puzzles[index];
  return (
    <div className={`${styles.gameStage} ${feedback ? styles[feedback] : ""}`}>
      <div className={styles.hud}>
        <div><span>PUZZLE</span><strong>{index + 1} / 5</strong></div>
        <div><span>SCORE</span><strong>{score}</strong></div>
        <div><span>TIME</span><strong>{timeLeft}s</strong></div>
      </div>
      <div className={styles.equationCard}>
        {puzzle.rows.map((row) => <p key={row}>{row}</p>)}
        <div className={styles.equationQuestion}>{puzzle.question} = ?</div>
      </div>
      <div className={styles.answerGrid}>
        {puzzle.choices.map((choice) => (
          <button disabled={phase !== "playing"} key={choice} onClick={() => choose(choice)} type="button">{choice}</button>
        ))}
      </div>
      <div className={styles.progressTrack}><span style={{ width: `${((index + 1) / 5) * 100}%` }} /></div>
    </div>
  );
}

export default function ArcadeCollection() {
  const day = shanghaiDay();
  const daySeed = hashText(day);
  const todayGame = games[daySeed % games.length];
  const [selectedId, setSelectedId] = useState(todayGame.id);
  const [session, setSession] = useState(0);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ streak: 0, lastDay: null, playedDays: [], best: {} });
  const [sound, setSound] = useState(true);
  const [shareState, setShareState] = useState("分享成绩");
  const audioRef = useRef(null);
  const selected = games.find((game) => game.id === selectedId) || games[0];

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved === "object") setStats((value) => ({ ...value, ...saved }));
    } catch {
      // Private browsing or blocked storage should never block a game.
    }
  }, []);

  const tone = useCallback((kind) => {
    if (!sound || typeof window === "undefined") return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = audioRef.current || new AudioContext();
    audioRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const map = {
      start: [260, 0.08, "square"],
      tick: [430, 0.045, "sine"],
      good: [620, 0.08, "triangle"],
      bad: [135, 0.12, "sawtooth"],
      win: [880, 0.18, "triangle"],
    };
    const [frequency, duration, type] = map[kind] || map.tick;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gain.gain.setValueAtTime(0.055, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  }, [sound]);

  function chooseGame(id) {
    setSelectedId(id);
    setResult(null);
    setSession((value) => value + 1);
    setShareState("分享成绩");
    tone("tick");
  }

  function finish(payload) {
    const completeResult = { ...payload, game: selected, rank: rankFor(payload.score) };
    setResult(completeResult);
    tone("win");
    setStats((previous) => {
      const next = {
        ...previous,
        best: { ...previous.best, [selected.id]: Math.max(previous.best?.[selected.id] || 0, payload.score) },
      };
      if (selected.id === todayGame.id && !previous.playedDays?.includes(day)) {
        const yesterday = new Date(Date.parse(`${day}T00:00:00Z`) - DAY_MS).toISOString().slice(0, 10);
        next.streak = previous.lastDay === yesterday ? (previous.streak || 0) + 1 : 1;
        next.lastDay = day;
        next.playedDays = [...(previous.playedDays || []).slice(-29), day];
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Scores still remain for this tab when storage is unavailable.
      }
      return next;
    });
  }

  function replay() {
    setResult(null);
    setShareState("分享成绩");
    setSession((value) => value + 1);
  }

  async function share() {
    if (!result) return;
    const blocks = result.rank.grade === "S" ? "🟪🟪🟪🟪🟪" : result.rank.grade === "A" ? "🟦🟦🟦🟦⬜" : result.rank.grade === "B" ? "🟩🟩🟩⬜⬜" : "🟨🟨⬜⬜⬜";
    const text = `凡间小游戏 · ${result.game.title}\n${blocks}\n${result.score} 分 · ${result.rank.label}\nhttps://www.fanjian.org/play`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `凡间小游戏 · ${result.game.title}`, text, url: "https://www.fanjian.org/play" });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setShareState("已准备好分享");
    } catch {
      setShareState("分享未完成");
    }
  }

  const gameProps = { seed: daySeed, onFinish: finish, tone };

  return (
    <section className={styles.arcade}>
      <div className={styles.ambientOrbOne} />
      <div className={styles.ambientOrbTwo} />

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}><i /> FANJIAN POCKET ARCADE</span>
          <h1>把无聊，<em>按下暂停。</em></h1>
          <p>三款无需登录、打开就玩的浏览器小游戏。每天有一款今日精选，成绩只留在你的设备里。</p>
          <div className={styles.heroMeta}>
            <span><b>{String(games.length).padStart(2, "0")}</b> 首发游戏</span>
            <span><b>{stats.streak || 0}</b> 连续打卡</span>
            <span><b>{formatDay(day)}</b> 今日卡带</span>
          </div>
        </div>
        <div className={styles.dailyTicket}>
          <span>TODAY&apos;S PICK</span>
          <strong>{todayGame.title}</strong>
          <p>{todayGame.short}</p>
          <button type="button" onClick={() => chooseGame(todayGame.id)}>插入今日卡带 <b>→</b></button>
          <i>{stats.playedDays?.includes(day) ? "今日已通关" : "等待挑战"}</i>
        </div>
      </header>

      <div className={styles.library} aria-label="小游戏列表">
        {games.map((game, index) => (
          <button
            aria-pressed={selected.id === game.id}
            className={`${styles.cartridge} ${styles[game.tone]} ${selected.id === game.id ? styles.activeCartridge : ""}`}
            key={game.id}
            onClick={() => chooseGame(game.id)}
            type="button"
          >
            <span className={styles.cartridgeIndex}>0{index + 1}</span>
            <span className={styles.cartridgeIcon}>{game.icon}</span>
            <strong>{game.title}</strong>
            <small>{game.skill}</small>
            <i>{game.id === todayGame.id ? "今日精选" : `${game.time}一局`}</i>
            <b>BEST {stats.best?.[game.id] || "—"}</b>
          </button>
        ))}
      </div>

      <div className={styles.consoleShell} data-tone={selected.tone}>
        <div className={styles.consoleTop}>
          <div>
            <span className={styles.statusLight} />
            <b>{selected.code}</b>
            <small>{selected.skill}</small>
          </div>
          <button aria-label={sound ? "关闭音效" : "开启音效"} className={styles.soundButton} onClick={() => setSound((value) => !value)} type="button">
            {sound ? "SOUND ON" : "SOUND OFF"}
          </button>
        </div>

        <div className={styles.screenBezel}>
          <div className={styles.screenHeader}>
            <div><span>NOW PLAYING</span><h2>{selected.title}</h2></div>
            <p>{selected.short}</p>
          </div>
          <div className={styles.screen} key={`${selected.id}-${session}`}>
            {selected.id === "color-hunt" && <ColorHunt {...gameProps} />}
            {selected.id === "number-trail" && <NumberTrail {...gameProps} />}
            {selected.id === "emoji-math" && <EmojiMath {...gameProps} />}
          </div>

          {result && (
            <div className={styles.resultCard} role="status">
              <div className={styles.confetti} aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--i": index }} />)}
              </div>
              <div className={styles.grade}>{result.rank.grade}</div>
              <div className={styles.resultCopy}>
                <span>RUN COMPLETE</span>
                <h3>{result.rank.label}</h3>
                <strong>{result.score} <small>PTS</small></strong>
                <p>{result.detail}</p>
              </div>
              <div className={styles.resultActions}>
                <button type="button" onClick={replay}>再玩一次</button>
                <button type="button" onClick={share}>{shareState}</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.consoleBottom}>
          <div className={styles.speaker} aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
          <div className={styles.brandPlate}><span>凡间</span><b>POCKET / 01</b></div>
          <div className={styles.fakeControls} aria-hidden="true"><i /><span>A</span><span>B</span></div>
        </div>
      </div>

      <div className={styles.rulesGrid}>
        {games.map((game, index) => (
          <article key={game.id}>
            <span>MANUAL / 0{index + 1}</span>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <dl><div><dt>单局时间</dt><dd>{game.time}</dd></div><div><dt>训练能力</dt><dd>{game.skill}</dd></div></dl>
          </article>
        ))}
      </div>
    </section>
  );
}
