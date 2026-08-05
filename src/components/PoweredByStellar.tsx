"use client"

import type React from "react"
import { Warp } from "@paper-design/shaders-react"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

const features: Feature[] = [
  {
    title: "Instant Settlement",
    description:
      "Stellar processes and settles transactions in 3-5 seconds, ensuring merchants receive funds almost instantly.",
    link: "https://stellar.org/learn/intro-to-stellar",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Negligible Fees",
    description: "Transaction fees on the Stellar network are fractions of a cent, eliminating the standard 3% credit card tax.",
    link: "https://stellar.org/learn/intro-to-stellar",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
  },
  {
    title: "SEP-0007 Native",
    description: "Full compliance with Stellar's delegated signing and QR payment protocol for seamless wallet integration.",
    link: "https://stellar.org/protocol/sep-7",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
  {
    title: "USDC Treasury",
    description: "Native support for Circle's USDC, providing price stability and global liquidity for local merchants.",
    link: "https://www.circle.com/en/usdc",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Institutional Security",
    description: "Decentralized architecture with robust consensus mechanisms, securing billions of dollars in daily volume.",
    link: "https://stellar.org/learn/the-power-of-stellar",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zM7 18V6h10v12H7z" />
      </svg>
    ),
  },
  {
    title: "Offline Resilient",
    description: "Cryptographically signed QR requests that operate completely offline, bridging the connectivity gap.",
    link: "https://developers.stellar.org/docs/encyclopedia/signatures",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
]

export default function PoweredByStellar() {
  const getShaderConfig = (index: number) => {
    const configs = [
      {
        proportion: 0.3,
        softness: 0.8,
        distortion: 0.15,
        swirl: 0.6,
        swirlIterations: 8,
        shape: "checks" as const,
        shapeScale: 0.08,
        colors: ["hsl(210, 100%, 30%)", "hsl(220, 100%, 60%)", "hsl(230, 90%, 40%)", "hsl(200, 100%, 70%)"], // Blue-ish for Stellar
      },
      {
        proportion: 0.4,
        softness: 1.2,
        distortion: 0.2,
        swirl: 0.9,
        swirlIterations: 12,
        shape: "edge" as const,
        shapeScale: 0.12,
        colors: ["hsl(200, 100%, 25%)", "hsl(180, 100%, 65%)", "hsl(160, 90%, 35%)", "hsl(190, 100%, 75%)"],
      },
      {
        proportion: 0.35,
        softness: 0.9,
        distortion: 0.18,
        swirl: 0.7,
        swirlIterations: 10,
        shape: "checks" as const,
        shapeScale: 0.1,
        colors: ["hsl(220, 100%, 25%)", "hsl(240, 100%, 60%)", "hsl(210, 90%, 30%)", "hsl(230, 100%, 70%)"],
      },
      {
        proportion: 0.45,
        softness: 1.1,
        distortion: 0.22,
        swirl: 0.8,
        swirlIterations: 15,
        shape: "edge" as const,
        shapeScale: 0.09,
        colors: ["hsl(215, 100%, 35%)", "hsl(205, 100%, 65%)", "hsl(225, 90%, 40%)", "hsl(195, 100%, 75%)"],
      },
      {
        proportion: 0.38,
        softness: 0.95,
        distortion: 0.16,
        swirl: 0.85,
        swirlIterations: 11,
        shape: "checks" as const,
        shapeScale: 0.11,
        colors: ["hsl(250, 100%, 30%)", "hsl(210, 100%, 65%)", "hsl(230, 90%, 35%)", "hsl(220, 100%, 70%)"],
      },
      {
        proportion: 0.42,
        softness: 1.0,
        distortion: 0.19,
        swirl: 0.75,
        swirlIterations: 9,
        shape: "edge" as const,
        shapeScale: 0.13,
        colors: ["hsl(200, 100%, 30%)", "hsl(220, 100%, 60%)", "hsl(240, 90%, 35%)", "hsl(210, 100%, 75%)"],
      },
    ]
    return configs[index % configs.length]
  }

  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Powered by Stellar</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Built entirely on the Stellar network to deliver institutional-grade performance to local merchants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const shaderConfig = getShaderConfig(index)
            return (
              <div key={index} className="relative h-80 group">

                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={shaderConfig.proportion}
                    softness={shaderConfig.softness}
                    distortion={shaderConfig.distortion}
                    swirl={shaderConfig.swirl}
                    swirlIterations={shaderConfig.swirlIterations}
                    shape={shaderConfig.shape}
                    shapeScale={shaderConfig.shapeScale}
                    scale={1}
                    rotation={0}
                    speed={0.8}
                    colors={shaderConfig.colors}
                  />
                </div>

                <div className="relative z-10 p-8 rounded-[2.5rem] h-full flex flex-col bg-black/60 hover:bg-black/40 transition-colors duration-300 border border-white/20 shadow-xl backdrop-blur-[2px]">
                  <div className="mb-6 filter drop-shadow-lg">{feature.icon}</div>

                  <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>

                  <p className="leading-relaxed flex-grow text-gray-100 font-medium text-sm lg:text-base">{feature.description}</p>

                  <a 
                    href={feature.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-6 flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform duration-300 w-max"
                  >
                    <span className="mr-2">Explore tech</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
