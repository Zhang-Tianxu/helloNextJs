"use client"

import { useCallback, useMemo, useRef, useState } from "react"

const clampRatio = (value) => Math.min(1, Math.max(0, value))

export default function ImageCompare({
  leftSrc,
  rightSrc,
  leftAlt,
  rightAlt,
  initialRatio = 0.5,
  height = 420,
  handleLabel = "拖动分割线调整对比",
  ariaLabel = "图片对比组件",
}) {
  const containerRef = useRef(null)
  const [ratio, setRatio] = useState(() => clampRatio(initialRatio))
  const [isDragging, setIsDragging] = useState(false)

  const updateRatioFromEvent = useCallback(
    (event) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const position = (event.clientX - rect.left) / rect.width
      setRatio(clampRatio(position))
    },
    []
  )

  const handlePointerDown = useCallback(
    (event) => {
      if (event.pointerType === "pen" || event.pointerType === "touch" || event.pointerType === "mouse") {
        event.preventDefault()
      }
      const container = containerRef.current
      if (!container) return

      container.setPointerCapture(event.pointerId)
      setIsDragging(true)
      updateRatioFromEvent(event)
    },
    [updateRatioFromEvent]
  )

  const handlePointerMove = useCallback(
    (event) => {
      const buttons = typeof event.buttons === "number" ? event.buttons : 0
      const hasPrimaryPress = (buttons & 1) === 1 || event.pointerType === "touch"
      if (!isDragging && !hasPrimaryPress) return
      updateRatioFromEvent(event)
    },
    [isDragging, updateRatioFromEvent]
  )

  const endDrag = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handlePointerUp = useCallback(
    (event) => {
      const container = containerRef.current
      if (container) {
        try {
          container.releasePointerCapture(event.pointerId)
        } catch (error) {
          // Ignore if capture already released
        }
      }
      endDrag()
    },
    [endDrag]
  )

  const handleKeyInput = (event) => {
    const step = event.shiftKey ? 0.1 : 0.02
    if (event.key === "ArrowLeft") {
      setRatio((prev) => clampRatio(prev - step))
    } else if (event.key === "ArrowRight") {
      setRatio((prev) => clampRatio(prev + step))
    }
  }

  const ratioPercent = useMemo(() => ratio * 100, [ratio])

  return (
    <section
      ref={containerRef}
      style={{
        ...styles.container,
        height,
        cursor: isDragging ? "col-resize" : "default", // 拖动时全区域显示双向箭头，否则为默认鼠标样式
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="group"
      aria-label={ariaLabel}
    >
      <img
        src={rightSrc}
        alt={rightAlt}
        style={styles.baseImage}
        draggable={false}
      />
      <img
        src={leftSrc}
        alt={leftAlt}
        style={{
          ...styles.compareImage,
          clipPath: `polygon(0 0, ${ratioPercent}% 0, ${ratioPercent}% 100%, 0 100%)`,
        }}
        draggable={false}
      />
      <div
        style={{
          ...styles.divider,
          left: `${ratioPercent}%`,
          cursor: "col-resize", // 始终保持双向箭头光标，无论是否拖动
        }}
        aria-hidden="true"
        onPointerDown={handlePointerDown}
      >
        <span style={styles.handle} />
        <div style={styles.circle} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(ratioPercent)}
        aria-label={handleLabel}
        onInput={(event) => setRatio(Number(event.target.value) / 100)}
        onChange={(event) => setRatio(Number(event.target.value) / 100)}
        onKeyDown={handleKeyInput}
        style={styles.range}
        tabIndex={0} // 确保可以通过Tab键聚焦
      />
    </section>
  )
}

const styles = {
  container: {
    position: "relative",
    width: "min(90vw, 960px)",
    overflow: "hidden",
    borderRadius: "1.25rem",
    boxShadow: "0 24px 60px -25px rgba(15, 23, 42, 0.45)",
    touchAction: "none",
    backgroundColor: "#0f172a",
  },
  baseImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
    pointerEvents: "none",
  },
  compareImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
    pointerEvents: "none",
    // 移除过渡动画以确保实时更新
    willChange: "clip-path",
  },
  divider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "20px", // 增加可点击区域的宽度，但保持视觉上的细线效果
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "auto", // 保持这里的pointer事件以支持交互
    cursor: "col-resize", // 确保分割线区域显示双向箭头
    background: "transparent", // 改为透明背景
  },
  handle: {
    width: "2px", 
    height: "100%", // 改为100%高度，与图片相同
    borderRadius: "999px",
    background: "#ffffff", // 白线视觉效果
    pointerEvents: "none",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
  },
  circle: {
    position: "absolute",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#ffffff",
    boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
    pointerEvents: "none", // 圆形不需要单独的pointer事件，由divider处理
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  range: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    pointerEvents: "none", // 改为 none，让鼠标事件传递到下层元素
    touchAction: "none",
  },
}
