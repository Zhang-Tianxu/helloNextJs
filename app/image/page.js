"use client"

import Link from "next/link"
import { useCallback, useLayoutEffect, useRef, useState } from "react"

const IMAGE_PATH = "/helloNextJs/images/panorama.svg"

export default function ImagePage() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragState, setDragState] = useState(null)

  const updateViewportSize = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setViewportSize({ width: rect.width, height: rect.height })
  }, [])

  useLayoutEffect(() => {
    updateViewportSize()
    window.addEventListener("resize", updateViewportSize)
    return () => window.removeEventListener("resize", updateViewportSize)
  }, [updateViewportSize])

  const clampPosition = useCallback(
    (next) => {
      const maxOffsetX = Math.max(0, imageSize.width - viewportSize.width)
      const maxOffsetY = Math.max(0, imageSize.height - viewportSize.height)

      return {
        x: Math.min(0, Math.max(next.x, -maxOffsetX)),
        y: Math.min(0, Math.max(next.y, -maxOffsetY)),
      }
    },
    [imageSize, viewportSize]
  )

  const handlePointerDown = (event) => {
    event.preventDefault()
    const target = event.currentTarget
    target.setPointerCapture(event.pointerId)
    setDragState({
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    })
  }

  const handlePointerMove = (event) => {
    if (!dragState) return

    const deltaX = event.clientX - dragState.startX
    const deltaY = event.clientY - dragState.startY

    const nextPosition = clampPosition({
      x: dragState.originX + deltaX,
      y: dragState.originY + deltaY,
    })

    setPosition(nextPosition)
  }

  const endDrag = useCallback(() => {
    if (!dragState) return
    const target = containerRef.current
    if (target) {
      try {
        target.releasePointerCapture(dragState.id)
      } catch (error) {
        // Ignore errors if the pointer was already released.
      }
    }
    setDragState(null)
  }, [dragState])

  const handleImageLoad = () => {
    const img = imageRef.current
    if (!img) return
    const { naturalWidth, naturalHeight } = img
    setImageSize({ width: naturalWidth, height: naturalHeight })
    setPosition({ x: 0, y: 0 })
  }

  const handleReset = () => setPosition({ x: 0, y: 0 })

  const isDragging = Boolean(dragState)

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Draggable Panorama</h1>
        <p style={styles.subtitle}>
          按住图片并拖动查看细节。双击或点击“重置视图”可回到起始位置。
        </p>
        <div style={styles.actions}>
          <Link href="/" style={styles.link}>
            返回首页
          </Link>
          <Link href="/image/compare" style={styles.secondaryLink}>
            图片对比示例
          </Link>
          <button type="button" onClick={handleReset} style={styles.button}>
            重置视图
          </button>
        </div>
      </header>
      <section
        ref={containerRef}
        style={{
          ...styles.viewer,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
    onPointerCancel={endDrag}
        onDoubleClick={handleReset}
        role="region"
        aria-label="可拖动查看细节的景观图片"
      >
        <img
          ref={imageRef}
          src={IMAGE_PATH}
          alt="色彩丰富的抽象山景，可左右拖动查看更多细节"
          style={{
            ...styles.image,
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`
          }}
          draggable={false}
          onLoad={handleImageLoad}
        />
      </section>
      <footer style={styles.footer}>
        <p>提示：使用触摸板或触摸屏也可以拖拽查看。</p>
      </footer>
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "3rem 1.5rem",
    background: "linear-gradient(180deg, #f1f5f9 0%, #ffffff 40%)",
    color: "#0f172a",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  header: {
    maxWidth: "960px",
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heading: {
    fontSize: "clamp(2rem, 3vw + 1rem, 3rem)",
    margin: 0,
  },
  subtitle: {
    margin: 0,
    fontSize: "1.05rem",
    lineHeight: 1.6,
    color: "#334155",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  link: {
    padding: "0.6rem 1.4rem",
    borderRadius: "999px",
    border: "1px solid #1d4ed8",
    color: "#1d4ed8",
    textDecoration: "none",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  secondaryLink: {
    padding: "0.6rem 1.4rem",
    borderRadius: "999px",
    border: "1px solid rgba(15, 23, 42, 0.2)",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 600,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(6px)",
    transition: "all 0.2s ease",
  },
  button: {
    padding: "0.6rem 1.4rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  viewer: {
    flex: 1,
    maxWidth: "min(90vw, 1080px)",
    margin: "0 auto",
    borderRadius: "1.25rem",
    overflow: "hidden",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.15)",
    position: "relative",
    backgroundColor: "#0f172a",
    touchAction: "none",
    minHeight: "min(70vh, 600px)",
  },
  image: {
    width: "2400px",
    height: "auto",
    userSelect: "none",
    pointerEvents: "none",
    transition: "transform 0.05s ease-out",
    willChange: "transform",
  },
  footer: {
    textAlign: "center",
    color: "#475569",
    fontSize: "0.95rem",
    marginTop: "auto",
  },
}
