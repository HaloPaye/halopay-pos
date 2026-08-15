"use client";

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: ReactNode;
  scrollHint?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  childrenMedia?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  childrenMedia,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const holeRef = useRef<SVGRectElement | null>(null);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>(
    {} as Required<Pick<ScrollExpandProps, ConfigKey>>
  );
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  };

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (102 - c.startWidth) * e;
    const h = c.startHeight + (102 - c.startHeight) * e;
    const ix = (100 - w) / 2;
    const iy = (100 - h) / 2;
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    
    if (holeRef.current) {
      holeRef.current.setAttribute('x', `${ix}%`);
      holeRef.current.setAttribute('y', `${iy}%`);
      holeRef.current.setAttribute('width', `${w}%`);
      holeRef.current.setAttribute('height', `${h}%`);
      holeRef.current.setAttribute('rx', `${r}`);
    }

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;
    let lastWidth = 0;

    const measure = () => {
      const c = propsRef.current;
      const w = root.clientWidth || window.innerWidth;
      
      // On mobile, ignore height-only resizes (address bar collapse) to prevent jitter
      if (w < 768 && lastWidth === w && stageH > 0) return;
      lastWidth = w;

      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : src ? (
      <img
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        alt={alt}
        draggable={false}
      />
    ) : (
      <div 
        ref={mediaRef as any}
        className="absolute inset-0 w-full h-full origin-center select-none [will-change:transform]"
      >
        {/* We can place Strands inside the media component if no src is provided, allowing it to expand */}
        {childrenMedia}
      </div>
    );

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full ${useWindowScroll ? '' : 'overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full">
        <div ref={stageRef} className="sticky top-0 w-full overflow-hidden [--se-title-size:4rem]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[-1]">
            <defs>
              <mask id="hole-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect ref={holeRef} x="29%" y="21%" width="42%" height="58%" rx="24" fill="black" />
              </mask>
            </defs>
          </svg>

          <div
            ref={frameRef}
            className="absolute inset-0 z-0"
            style={{ WebkitMask: 'url(#hole-mask)', mask: 'url(#hole-mask)' }}
          >
            {media}
          </div>
          <div
            ref={scrimRef}
            className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(255,255,255,0.75),rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.35))] z-10"
          />
          {children ? (
            <div
              ref={overlayRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-[6%] opacity-0 [will-change:opacity,transform] z-20 pointer-events-auto"
            >
              {children}
            </div>
          ) : null}
          {title ? (
            <div
              ref={titleRef}
              className="absolute inset-0 flex flex-col items-center justify-center m-0 px-[6%] text-center font-bold leading-none tracking-[-0.03em] text-gray-900 pointer-events-none [will-change:opacity,transform] z-10"
            >
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="absolute inset-x-0 bottom-5 text-center text-[0.8125rem] tracking-[0.02em] text-gray-400 pointer-events-none [will-change:opacity,transform] z-10"
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
