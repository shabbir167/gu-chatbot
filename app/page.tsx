// "use client";

// import { useRef, useState } from "react";

// type Face = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   confidence: number;
// };

// export default function FaceDetectionUI() {
//   const [image, setImage] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [faces, setFaces] = useState<Face[]>([]);
//   const [loading, setLoading] = useState(false);

//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     setFile(selected);
//     setFaces([]);

//     const reader = new FileReader();
//     reader.onload = () => setImage(reader.result as string);
//     reader.readAsDataURL(selected);
//   };

//   const detectFaces = async () => {
//     if (!file) return;

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("http://localhost:8000/detect-faces", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.success) {
//         setFaces(data.faces || []);
//         drawBoxes(data.faces || []);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const drawBoxes = (faces: Face[]) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !image) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const img = new Image();
//     img.src = image;

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;

//       ctx.drawImage(img, 0, 0);

//       ctx.strokeStyle = "#00ff88";
//       ctx.lineWidth = 3;
//       ctx.font = "16px Arial";
//       ctx.fillStyle = "#00ff88";

//       faces.forEach((face) => {
//         ctx.strokeRect(face.x, face.y, face.width, face.height);
//         ctx.fillText(
//           `${(face.confidence * 100).toFixed(1)}%`,
//           face.x,
//           face.y - 5,
//         );
//       });
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-black text-white p-6">
//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold">AI Face Detection System</h1>
//         <p className="text-gray-300 mt-2">
//           Upload an image and detect faces using YOLOv8
//         </p>
//       </div>

//       {/* UPLOAD BOX */}
//       <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImage}
//           className="w-full text-white"
//         />

//         <button
//           onClick={detectFaces}
//           disabled={!file || loading}
//           className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 py-3 rounded-xl transition"
//         >
//           {loading ? "Detecting..." : "Detect Faces"}
//         </button>
//       </div>

//       {/* RESULT AREA */}
//       <div className="grid md:grid-cols-2 gap-8 mt-10">
//         {/* IMAGE PREVIEW */}
//         <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
//           <h2 className="mb-3 font-semibold">Preview</h2>

//           {image ? (
//             <canvas ref={canvasRef} className="w-full rounded-xl" />
//           ) : (
//             <p className="text-gray-400">No image selected</p>
//           )}
//         </div>

//         {/* RESULT PANEL */}
//         <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
//           <h2 className="mb-3 font-semibold">
//             Results ({faces.length} faces detected)
//           </h2>

//           {faces.length === 0 ? (
//             <p className="text-gray-400">No detection yet</p>
//           ) : (
//             <ul className="space-y-2">
//               {faces.map((f, i) => (
//                 <li
//                   key={i}
//                   className="bg-black/30 p-3 rounded-lg border border-white/10"
//                 >
//                   <p>Face #{i + 1}</p>
//                   <p className="text-sm text-gray-300">
//                     Confidence: {(f.confidence * 100).toFixed(2)}%
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     X:{f.x}, Y:{f.y}, W:{f.width}, H:{f.height}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// Live Capturing

"use client";

import { useEffect, useRef, useState } from "react";

export default function MobileCameraStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );

  const [error, setError] = useState<string | null>(null);

  let streamRef = useRef<MediaStream | null>(null);

  // 🎥 START CAMERA FUNCTION
  const startCamera = async (mode: "user" | "environment") => {
    try {
      setError(null);

      // stop previous stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.error(err);
      setError("Camera access failed");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const init = async () => {
      // 🔌 WebSocket
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
      wsRef.current = ws;

      ws.onerror = () => setError("WebSocket failed");

      await startCamera(facingMode);

      const ctx = canvasRef.current?.getContext("2d");

      // 📤 SEND FRAMES
      interval = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ws = wsRef.current;

        if (!video || !canvas || !ctx) return;
        if (!ws || ws.readyState !== 1) return;

        if (video.videoWidth === 0 || video.videoHeight === 0) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob && ws.readyState === 1) {
              ws.send(blob);
            }
          },
          "image/jpeg",
          0.7,
        );
      }, 120);
    };

    init();

    return () => {
      if (interval) clearInterval(interval);
      wsRef.current?.close();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 🔄 SWITCH CAMERA
  const switchCamera = async () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newMode);
    await startCamera(newMode);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-3">📱 AI Camera Stream</h1>

      {error && <div className="bg-red-600 p-2 rounded mb-3">{error}</div>}

      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[320px] border rounded"
      />

      {/* CANVAS */}
      <canvas ref={canvasRef} className="hidden" />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={switchCamera}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          🔄 Switch Camera
        </button>
      </div>
    </div>
  );
}
