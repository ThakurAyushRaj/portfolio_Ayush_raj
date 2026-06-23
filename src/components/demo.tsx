'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { LampContainer } from "@/components/ui/lamp"
import { motion } from "framer-motion"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-none rounded-2xl">
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 relative z-10 flex flex-col justify-center h-full">
          <LampContainer className="bg-transparent h-full justify-center">
            <motion.h1
              initial={{ opacity: 0.5, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="mt-4 bg-gradient-to-br from-slate-200 to-slate-400 py-2 bg-clip-text text-center text-4xl md:text-5xl font-bold tracking-tight text-transparent"
            >
              Ayush Raj
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl mt-1 font-medium text-blue-400"
            >
              Full Stack Developer
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-4 text-neutral-300 max-w-md leading-relaxed text-base"
            >
              I'm a full stack developer focusing on CRM & EMR systems. 
              Passionate about building scalable applications using the MERN stack, 
              React Native, and Flutter. Currently exploring AWS and System Design.
            </motion.p>
          </LampContainer>
        </div>

        {/* Right content */}
        <div 
          className="flex-1 relative z-10 hidden md:block"
          style={{ transform: 'translate3d(0,0,0)', isolation: 'isolate' }}
        >
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
