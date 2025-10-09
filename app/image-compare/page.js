import Link from "next/link"
import ImageCompare from "../components/ImageCompare"
import Navigation from "../components/Navigation"
import LanguageSwitcher from "../components/LanguageSwitcher"

const ORIGINAL_IMAGE = "/helloNextJs/images/compare-original.svg"
const ENHANCED_IMAGE = "/helloNextJs/images/compare-enhanced.svg"

export default function ImageComparePage() {
  return (
    <main style={styles.main}>
        <Navigation />
      <LanguageSwitcher />
      <header style={styles.header}>
        <h1 style={styles.heading}>图片对比预览</h1>
        <p style={styles.body}>
          拖动中间的白色分割线即可实时调整原图与新图的占比，快速观察调色或后期处理的差异。
        </p>
      </header>
      <ImageCompare
        leftSrc={ORIGINAL_IMAGE}
       rightSrc={ENHANCED_IMAGE}
        leftAlt="原始山景插画"
      rightAlt="增强色调后的山景插画"
        height={480}
      />
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "3rem 1.5rem 4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
      background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
    color: "#0f172a",
  },
  header: {
    maxWidth: "760px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  heading: {
    margin: 0,
    fontSize: "clamp(2.4rem, 4vw + 1rem, 3.4rem)",
  },
  body: {
    margin: 0,
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#334155",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  link: {
    padding: "0.75rem 1.8rem",
    borderRadius: "999px",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    boxShadow: "0 18px 30px -18px rgba(29, 78, 216, 0.8)",
  },
  secondaryLink: {
    padding: "0.75rem 1.8rem",
    borderRadius: "999px",
    border: "1px solid rgba(15, 23, 42, 0.18)",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 600,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(6px)",
  },
  tips: {
    width: "min(90vw, 760px)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "1.25rem",
    padding: "1.5rem 2rem",
    boxShadow: "0 20px 45px -25px rgba(15, 23, 42, 0.3)",
  },
  tipsHeading: {
    margin: "0 0 1rem",
    fontSize: "1.4rem",
  },
  list: {
    margin: 0,
    paddingLeft: "1.2rem",
    lineHeight: 1.8,
    color: "#475569",
  },
}
