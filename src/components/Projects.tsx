import { ExternalLink, Github } from 'lucide-react'

export function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Een moderne webshop gebouwd met Next.js en Stripe integratie. Complete checkout flow, inventory management en admin dashboard.',
      image: '/project1.jpg',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool met real-time updates, team collaboration en advanced filtering opties.',
      image: '/project2.jpg',
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      title: 'Portfolio Website',
      description: 'Clean en responsive portfolio website voor een creative agency. Focus op performance en visual storytelling.',
      image: '/project3.jpg',
      tags: ['Next.js', 'Tailwind', 'Framer Motion'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard voor SaaS platform met data visualisatie, gebruikersmanagement en billing integratie.',
      image: '/project4.jpg',
      tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
    {
      title: 'Mobile Banking App',
      description: 'React Native app voor mobile banking met biometric authentication en real-time transacties.',
      image: '/project5.jpg',
      tags: ['React Native', 'TypeScript', 'Firebase'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content creation tool met OpenAI integratie voor marketing teams en content creators.',
      image: '/project6.jpg',
      tags: ['Next.js', 'OpenAI API', 'Supabase'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
  ]

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <section id="projecten" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            Projecten
          </h2>
          <div className="w-24 h-1 bg-stone-900 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Een selectie van projecten waar ik trots op ben. Van complexe web-applicaties 
            tot elegante websites - elk project vertelt zijn eigen verhaal.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-stone-900 mb-8">Uitgelichte Projecten</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-stone-200 to-stone-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl text-stone-500">🚀</div>
                  </div>
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-stone-900 mb-3">
                    {project.title}
                  </h4>
                  <p className="text-stone-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-bold text-stone-900 mb-8">Andere Projecten</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-stone-900">
                    {project.title}
                  </h4>
                  <div className="flex space-x-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>

                <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-stone-600 mb-6">
            Wil je meer van mijn werk zien?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors duration-200"
          >
            <Github size={20} />
            <span>Bekijk GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}