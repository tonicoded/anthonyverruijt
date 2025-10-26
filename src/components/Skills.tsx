export function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 80 },
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 82 },
        { name: 'PostgreSQL', level: 78 },
        { name: 'MongoDB', level: 80 },
        { name: 'API Design', level: 88 },
      ]
    },
    {
      title: 'Tools & Workflow',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 85 },
        { name: 'AWS', level: 70 },
      ]
    }
  ]

  return (
    <section id="vaardigheden" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            Vaardigheden
          </h2>
          <div className="w-24 h-1 bg-stone-900 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Een overzicht van de technologieën en tools waarmee ik dagelijks werk 
            om fantastische digitale ervaringen te creëren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-stone-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-stone-900">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-stone-800">{skill.name}</span>
                      <span className="text-sm text-stone-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-stone-900 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-stone-900 mb-8">Ook ervaring met</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'GraphQL', 'Redux', 'Jest', 'Cypress', 'Webpack', 'Vite',
              'Firebase', 'Supabase', 'Vercel', 'Netlify', 'Stripe', 'Prisma'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}