import { SplineSceneBasic } from '@/components/demo'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, ExternalLink, Code2, Smartphone, Monitor, Database } from 'lucide-react'
import { InteractiveBg } from '@/components/ui/interactive-bg'

const projects = [
  {
    title: "ERP Website",
    description: "Enterprise Resource Planning system bringing together Finance, HR, Inventory Control, and Sales Operations into a unified platform.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["TypeScript", "MERN", "Dashboard"],
    link: "https://github.com/ThakurAyushRaj/ERP-Website"
  },
  {
    title: "Slack Attendance Bot",
    description: "A Node.js and Express powered bot for entry/exit tracking, working hours calculation, and Google Sheets integration.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    tags: ["Node.js", "Express", "Slack API"],
    link: "https://github.com/ThakurAyushRaj/SLACK-ATTENDANCE"
  },
  {
    title: "Attendance Tracker App",
    description: "React Native app with Google Auth, FCM Notifications, Admin Dashboard, and push alerts.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80",
    tags: ["React Native", "Firebase", "TypeScript"],
    link: "https://github.com/ThakurAyushRaj/Google-Auth_FCM-Notification_Admin-Pannel_Attendence-Tracker_App-React-Native-"
  },
  {
    title: "Blog Website",
    description: "Modern animated blog built with React, TypeScript, Tailwind CSS, and Framer Motion.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    tags: ["React", "Tailwind", "Framer Motion"],
    link: "https://github.com/ThakurAyushRaj/Blog-Website"
  }
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-950 text-zinc-50 font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      <InteractiveBg />
      <main className="container mx-auto px-4 py-8 md:py-16 max-w-6xl space-y-24 relative z-10">
        
        {/* Spline 3D Scene Section */}
        <section>
          <SplineSceneBasic />
        </section>

        {/* Skills Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Tech Stack & Expertise
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              I specialize in creating robust web and mobile applications using modern technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-zinc-950/30 backdrop-blur-md border-zinc-800/40 hover:border-blue-500/50 hover:bg-zinc-950/50 transition-all duration-300">
              <CardHeader className="items-center text-center pb-2">
                <Monitor className="w-8 h-8 text-blue-400 mb-2" />
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-zinc-400">
                React, Tailwind CSS, Next.js, Framer Motion
              </CardContent>
            </Card>
            <Card className="bg-zinc-950/30 backdrop-blur-md border-zinc-800/40 hover:border-emerald-500/50 hover:bg-zinc-950/50 transition-all duration-300">
              <CardHeader className="items-center text-center pb-2">
                <Database className="w-8 h-8 text-emerald-400 mb-2" />
                <CardTitle className="text-lg">Backend</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-zinc-400">
                Node.js, Express, MongoDB, AWS
              </CardContent>
            </Card>
            <Card className="bg-zinc-950/30 backdrop-blur-md border-zinc-800/40 hover:border-purple-500/50 hover:bg-zinc-950/50 transition-all duration-300">
              <CardHeader className="items-center text-center pb-2">
                <Smartphone className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-lg">Mobile</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-zinc-400">
                React Native, Flutter, Firebase
              </CardContent>
            </Card>
            <Card className="bg-zinc-950/30 backdrop-blur-md border-zinc-800/40 hover:border-amber-500/50 hover:bg-zinc-950/50 transition-all duration-300">
              <CardHeader className="items-center text-center pb-2">
                <Code2 className="w-8 h-8 text-amber-400 mb-2" />
                <CardTitle className="text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-zinc-400">
                TypeScript, JavaScript, HTML, CSS
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Featured Projects
              </h2>
              <p className="text-zinc-400 mt-2">Some of my recent open source work.</p>
            </div>
            <a 
              href="https://github.com/ThakurAyushRaj" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800 text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              View all on GitHub
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <Card key={idx} className="bg-zinc-950/30 backdrop-blur-md border-zinc-800/40 overflow-hidden flex flex-col group hover:border-zinc-700/60 hover:bg-zinc-950/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>
                <CardHeader className="relative z-10 -mt-12">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base text-zinc-400">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-zinc-800/50">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="md:hidden flex justify-center pt-4">
            <a 
              href="https://github.com/ThakurAyushRaj" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800 text-sm font-medium"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 pt-8 pb-4 text-center text-zinc-500 text-sm flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Ayush Raj. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="https://github.com/ThakurAyushRaj" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default App
