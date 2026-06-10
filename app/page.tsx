"use client";
import { useEffect } from "react";

export default function ZapierChatbot() {
  useEffect(() => {
    const scriptId = "zapier-chatbot-script";

    // prevent duplicate script injection (important in Next.js dev mode)
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src =
        "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";

      document.head.appendChild(script);
    }

    // create chatbot once
    const chatbot = document.createElement("zapier-interfaces-chatbot-embed");
    chatbot.setAttribute("is-popup", "true");
    chatbot.setAttribute("chatbot-id", "cmq7gijpk002bvnjro61k75ic");

    document.body.appendChild(chatbot);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white flex flex-col justify-center px-20">
      <h1 className="text-5xl font-bold mb-4">Ghazi University (GU)</h1>

      <p className="text-lg max-w-xl mb-6 opacity-90">
        Welcome to the official AI Admissions Assistant. Ask anything about
        admissions, programs, eligibility, and fee structure.
      </p>

      <div className="space-y-2 text-sm opacity-90">
        <p>🎓 Admissions 2026 Open Now</p>
        <p>📍 Dera Ghazi Khan Campus</p>
        <p>💻 BS & MS Programs Available</p>
        <p>🤖 24/7 AI Admission Support</p>
      </div>
    </div>
  );
}
