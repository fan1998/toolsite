import ArcadeCollection from "../../components/ArcadeCollection";
import { AdSlot } from "../../components/AdSlot";
import { SITE } from "../../lib/tools";
import styles from "./play.module.css";

export const metadata = {
  title: "凡间小游戏合集 - 每日挑战与免费在线小游戏",
  description: "免费在线小游戏合集：颜色猎手、数字轨迹、Emoji 算式。无需登录，浏览器直接玩，记录本地最高分与每日连续挑战。",
  keywords: ["在线小游戏", "免费小游戏", "每日挑战", "颜色游戏", "数字游戏", "Emoji 算式"],
  alternates: { canonical: `${SITE.url}/play` },
  openGraph: {
    title: "凡间小游戏合集｜把无聊按下暂停",
    description: "三款精致、无需登录、打开就玩的浏览器小游戏。",
    url: `${SITE.url}/play`,
    type: "website",
  },
};

export default function PlayPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "凡间小游戏合集",
    url: `${SITE.url}/play`,
    description: "无需注册、在浏览器中直接游玩的轻量小游戏合集。",
    hasPart: ["颜色猎手", "数字轨迹", "Emoji 算式"].map((name, position) => ({
      "@type": "Game",
      name,
      position: position + 1,
      gamePlatform: "Web Browser",
      playMode: "SinglePlayer",
      isAccessibleForFree: true,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ArcadeCollection />
      <div className={styles.adWrap}><AdSlot /></div>
    </>
  );
}
