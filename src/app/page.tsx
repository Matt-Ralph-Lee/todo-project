"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex items-center h-screen p-8">
        <div className="px-8">
          <h1 className="text-7xl text-white font-bold">Task Charger</h1>
          <div
            style={{
              backgroundImage:
                "radial-gradient(farthest-corner at 10% 120%, #7140FF 0%, #6E00C3 32.98%, #E129FF 100%)",
            }}
            className="font-bold text-xl bg-clip-text text-transparent mt-12"
          >
            Organize your task and clean up
          </div>
        </div>
      </div>
    </main>
  );
}
