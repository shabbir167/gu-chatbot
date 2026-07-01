
// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function MobileCameraStream() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wsRef = useRef<WebSocket | null>(null);

//   const [facingMode, setFacingMode] = useState<"user" | "environment">(
//     "environment",
//   );

//   const [error, setError] = useState<string | null>(null);

//   let streamRef = useRef<MediaStream | null>(null);

//   // 🎥 START CAMERA FUNCTION
//   const startCamera = async (mode: "user" | "environment") => {
//     try {
//       setError(null);

//       // stop previous stream
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((t) => t.stop());
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: mode,
//         },
//         audio: false,
//       });

//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError("Camera access failed");
//     }
//   };

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     const init = async () => {
//       // 🔌 WebSocket
//       const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
//       wsRef.current = ws;

//       ws.onerror = () => setError("WebSocket failed");

//       await startCamera(facingMode);

//       const ctx = canvasRef.current?.getContext("2d");

//       // 📤 SEND FRAMES
//       interval = setInterval(() => {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const ws = wsRef.current;

//         if (!video || !canvas || !ctx) return;
//         if (!ws || ws.readyState !== 1) return;

//         if (video.videoWidth === 0 || video.videoHeight === 0) return;

//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         canvas.toBlob(
//           (blob) => {
//             if (blob && ws.readyState === 1) {
//               ws.send(blob);
//             }
//           },
//           "image/jpeg",
//           0.7,
//         );
//       }, 120);
//     };

//     init();

//     return () => {
//       if (interval) clearInterval(interval);
//       wsRef.current?.close();
//       streamRef.current?.getTracks().forEach((t) => t.stop());
//     };
//   }, []);

//   // 🔄 SWITCH CAMERA
//   const switchCamera = async () => {
//     const newMode = facingMode === "user" ? "environment" : "user";
//     setFacingMode(newMode);
//     await startCamera(newMode);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
//       <h1 className="text-xl font-bold mb-3">📱 AI Camera Stream</h1>

//       {error && <div className="bg-red-600 p-2 rounded mb-3">{error}</div>}

//       {/* VIDEO */}
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         className="w-[320px] border rounded"
//       />

//       {/* CANVAS */}
//       <canvas ref={canvasRef} className="hidden" />

//       {/* BUTTONS */}
//       <div className="flex gap-3 mt-4">
//         <button
//           onClick={switchCamera}
//           className="bg-blue-600 px-4 py-2 rounded"
//         >
//           🔄 Switch Camera
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    // Create Zapier chatbot element
    const chatbot = document.createElement("zapier-interfaces-chatbot-embed");

    chatbot.setAttribute("chatbot-id", "cmqf0vvaz001j14o6a39p20wi");
    chatbot.setAttribute("is-popup", "true");

    document.body.appendChild(chatbot);

    return () => {
      chatbot.remove();
    };
  }, []);

  const openChat = () => {
    const chatbot = document.querySelector(
      "zapier-interfaces-chatbot-embed",
    ) as any;

    if (!chatbot) return;

    // Wait until the web component is ready
    setTimeout(() => {
      try {
        const shadow = chatbot.shadowRoot;

        if (shadow) {
          const button = shadow.querySelector("button") as HTMLButtonElement;

          if (button) {
            button.click();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, 300);
  };

  return (
    <>
      {/* Load Zapier Web Component */}
      <Script
        src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
        strategy="afterInteractive"
        type="module"
      />

      <main className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-800 text-white">
        {/* Hero */}
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <span className="rounded-full bg-white/20 px-5 py-2 text-sm backdrop-blur-md">
              🤖 AI Assistant Available 24/7
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
              Welcome to
              <br />
              <span className="text-yellow-300">AI Chat Assistant</span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-200 md:text-xl">
              Get instant answers about admissions, eligibility, scholarships,
              fee structures, merit lists, and more. Chat with our AI assistant
              anytime.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              {/* <button
                onClick={openChat}
                className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-xl transition duration-300 hover:scale-105"
              >
                💬 Start Chat
              </button> */}

              <button className="rounded-xl border border-white px-8 py-4 text-lg transition hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-20 text-black">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-14 text-center text-4xl font-bold">
              Why Choose Our AI Assistant?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border bg-white p-8 shadow-xl transition hover:-translate-y-2">
                <div className="text-5xl">🎓</div>

                <h3 className="mt-5 text-2xl font-bold">Admission Guidance</h3>

                <p className="mt-4 text-gray-600">
                  Ask anything related to admissions, eligibility, departments,
                  required documents, and application procedures.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-8 shadow-xl transition hover:-translate-y-2">
                <div className="text-5xl">⚡</div>

                <h3 className="mt-5 text-2xl font-bold">Instant Replies</h3>

                <p className="mt-4 text-gray-600">
                  Get answers within seconds without waiting for office hours.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-8 shadow-xl transition hover:-translate-y-2">
                <div className="text-5xl">🤖</div>

                <h3 className="mt-5 text-2xl font-bold">Available 24/7</h3>

                <p className="mt-4 text-gray-600">
                  Our AI assistant is available every day to help students
                  whenever they need assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-purple-700 py-24">
          <div className="mx-auto max-w-4xl text-center px-6">
            <h2 className="text-4xl font-bold">Ready to Ask Your Questions?</h2>

            <p className="mt-5 text-lg text-gray-200">
              Click the button below and start chatting with our AI Assistant
              instantly.
            </p>

            {/* <button
              onClick={openChat}
              className="mt-10 rounded-xl bg-white px-10 py-5 text-xl font-bold text-blue-700 shadow-xl transition hover:scale-105"
            >
              🚀 Start Chatting
            </button> */}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/20 py-8 text-center text-gray-300">
          © 2026 AI Chat Assistant • Powered by Zapier Interfaces
        </footer>
      </main>
    </>
  );
}
