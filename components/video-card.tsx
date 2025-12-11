"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type VideoCardProps = {
  title: string;
  description?: string;
  src: string;
  className?: string;
};

export function VideoCard({
  title,
  description,
  src,
  className,
}: VideoCardProps) {
  const sendDebugLog = (payload: {
    runId: string;
    hypothesisId: string;
    location: string;
    message: string;
    data?: Record<string, unknown>;
  }) => {
    const body = JSON.stringify({
      sessionId: "debug-session",
      timestamp: Date.now(),
      ...payload,
    });
    // #region agent log sender
    const endpoint =
      "http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b";
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        mode: "no-cors",
      }).catch(() => {});
    }
    // local fallback to ensure log file is written
    fetch("/api/debug-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(() => {});
    // #endregion
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoveringEnlarge, setIsHoveringEnlarge] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlay = (ref: React.RefObject<HTMLVideoElement | null>) => {
    const el = ref.current;
    if (!el) return;
    // #region agent log
    sendDebugLog({
      runId: "run4",
      hypothesisId: "H2",
      location: "components/video-card.tsx:handlePlay",
      message: "handlePlay called",
      data: { src: el.src, currentTime: el.currentTime, paused: el.paused },
    });
    // #endregion
    void el.play().then(() => {
      // #region agent log
      sendDebugLog({
        runId: "run4",
        hypothesisId: "H2",
        location: "components/video-card.tsx:handlePlay:then",
        message: "video play resolved",
        data: { src: el.src, paused: el.paused },
      });
      // #endregion
    }).catch((err) => {
      // #region agent log
      sendDebugLog({
        runId: "run4",
        hypothesisId: "H2",
        location: "components/video-card.tsx:handlePlay:catch",
        message: "video play rejected",
        data: { src: el.src, error: String(err) },
      });
      // #endregion
    });
  };

  const handlePause = (ref: React.RefObject<HTMLVideoElement | null>) => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const handleShowFirstFrame = (
    ref: React.RefObject<HTMLVideoElement | null>,
  ) => {
    const el = ref.current;
    if (!el) return;
    // #region agent log
    sendDebugLog({
      runId: "run4",
      hypothesisId: "H4",
      location: "components/video-card.tsx:handleShowFirstFrame",
      message: "show first frame called",
      data: { src: el.src, paused: el.paused },
    });
    // #endregion
    el.currentTime = 0.001; // force render of first frame
    el.pause();
  };

  useEffect(() => {
    sendDebugLog({
      runId: "run3",
      hypothesisId: "H3",
      location: "components/video-card.tsx:mount",
      message: "component mounted",
      data: { title },
    });
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [title]);

  useEffect(() => {
    sendDebugLog({
      runId: "run3",
      hypothesisId: "H2",
      location: "components/video-card.tsx:isHoveringEnlarge",
      message: "hover state change",
      data: { isHoveringEnlarge },
    });
  }, [isHoveringEnlarge]);

  useEffect(() => {
    if (!isExpanded) return;
    // #region agent log
    sendDebugLog({
      runId: "run4",
      hypothesisId: "H2",
      location: "components/video-card.tsx:isExpanded:true",
      message: "modal opened",
      data: { src },
    });
    // #endregion
    // Démarrer la vidéo automatiquement quand le modal s'ouvre
    setTimeout(() => {
      if (modalVideoRef.current) {
        // #region agent log
        sendDebugLog({
          runId: "run4",
          hypothesisId: "H2",
          location: "components/video-card.tsx:modal:auto-play",
          message: "attempting auto-play in modal",
          data: { src: modalVideoRef.current.src, paused: modalVideoRef.current.paused },
        });
        // #endregion
        handlePlay(modalVideoRef);
      }
    }, 100);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePause(modalVideoRef);
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isExpanded]);

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur",
          "transition hover:border-white/30",
          className,
        )}
      >
        <video
          ref={videoRef}
          className="h-64 w-full object-cover transition duration-500 cursor-pointer"
          src={src}
          muted
          playsInline
          loop
          preload="metadata"
          onMouseEnter={() => handlePlay(videoRef)}
          onMouseLeave={() => handlePause(videoRef)}
          onLoadedData={() => handleShowFirstFrame(videoRef)}
          onClick={(e) => {
            // #region agent log
            sendDebugLog({
              runId: "run4",
              hypothesisId: "H5",
              location: "components/video-card.tsx:video:onClick",
              message: "video clicked",
              data: { src, clientX: e.clientX, clientY: e.clientY },
            });
            // #endregion
            setIsExpanded(true);
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70" />

        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 pointer-events-none"
          onClick={(e) => {
            // #region agent log
            sendDebugLog({
              runId: "run4",
              hypothesisId: "H1",
              location: "components/video-card.tsx:text-container:onClick",
              message: "text container clicked (should not happen)",
              data: { title },
            });
            // #endregion
            e.stopPropagation();
          }}
        >
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-sm text-zinc-300 leading-5">{description}</p>
          )}
        </div>

        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onMouseEnter={() => {
              sendDebugLog({
                runId: "run3",
                hypothesisId: "H1",
                location: "components/video-card.tsx:onMouseEnter",
                message: "hover enter on enlarge button",
                data: { isHoveringEnlarge },
              });
              setIsHoveringEnlarge(true);
              // Ouvrir le modal après un court délai pour éviter les ouvertures accidentelles
              hoverTimeoutRef.current = setTimeout(() => {
                setIsExpanded(true);
              }, 300);
            }}
            onMouseLeave={() => {
              sendDebugLog({
                runId: "run3",
                hypothesisId: "H1",
                location: "components/video-card.tsx:onMouseLeave",
                message: "hover leave on enlarge button",
                data: { isHoveringEnlarge },
              });
              setIsHoveringEnlarge(false);
              // Annuler l'ouverture si la souris quitte avant le délai
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
            }}
            onClick={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
              setIsHoveringEnlarge(false);
              setIsExpanded(true);
            }}
            className="pointer-events-auto rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            Agrandir
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="relative w-[92vw] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1, transition: { duration: 0.25 } }}
              exit={{ scale: 0.95, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
              onMouseLeave={() => {
                handlePause(modalVideoRef);
                setIsExpanded(false);
              }}
            >
              <video
                ref={modalVideoRef}
                className="h-full w-full max-h-[80vh] object-contain bg-black"
                src={src}
                muted
                playsInline
                loop
                controls={false}
                onMouseEnter={() => handlePlay(modalVideoRef)}
                onMouseLeave={() => handlePause(modalVideoRef)}
                onLoadedData={() => {
                  // #region agent log
                  sendDebugLog({
                    runId: "run4",
                    hypothesisId: "H2",
                    location: "components/video-card.tsx:modal-video:onLoadedData",
                    message: "modal video loaded",
                    data: { src, paused: modalVideoRef.current?.paused },
                  });
                  // #endregion
                  handleShowFirstFrame(modalVideoRef);
                }}
                onPlay={() => {
                  // #region agent log
                  sendDebugLog({
                    runId: "run4",
                    hypothesisId: "H2",
                    location: "components/video-card.tsx:modal-video:onPlay",
                    message: "modal video playing",
                    data: { src },
                  });
                  // #endregion
                }}
                onError={(e) => {
                  // #region agent log
                  sendDebugLog({
                    runId: "run4",
                    hypothesisId: "H2",
                    location: "components/video-card.tsx:modal-video:onError",
                    message: "modal video error",
                    data: { src, error: String(e) },
                  });
                  // #endregion
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

