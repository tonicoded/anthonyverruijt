import { 
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaNodeJs, 
  FaPython, 
  FaSwift, 
  FaWordpress 
} from 'react-icons/fa'
import { 
  SiTypescript,
  SiNextdotjs
} from 'react-icons/si'

export function TechStack() {
  const techs = [
    { icon: FaHtml5, name: 'HTML5', experience: '12 jaar' },
    { icon: FaCss3Alt, name: 'CSS3', experience: '12 jaar' },
    { icon: FaJs, name: 'JavaScript', experience: '8 jaar' },
    { icon: SiTypescript, name: 'TypeScript', experience: '5 jaar' },
    { icon: FaReact, name: 'React', experience: '6 jaar' },
    { icon: SiNextdotjs, name: 'Next.js', experience: '4 jaar' },
    { icon: FaSwift, name: 'Swift', experience: '8 jaar' },
    { icon: FaPython, name: 'Python', experience: '10 jaar' },
    { icon: FaNodeJs, name: 'Node.js', experience: '4 jaar' },
    { icon: FaWordpress, name: 'WordPress', experience: '6 jaar' },
  ]

  return (
    <div className="relative mb-8">
      {/* Tech icons in compact grid */}
      <div className="relative grid grid-cols-5 gap-3 max-w-md mx-auto p-4">
        {techs.map((tech) => {
          const IconComponent = tech.icon
          
          return (
            <div 
              key={tech.name}
              className="group relative flex justify-center"
            >
              {/* Main icon container */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="relative p-2 rounded-full backdrop-blur-sm border border-gray-600 transition-all duration-300 group-hover:border-gray-500 bg-gray-700/50 group-hover:bg-gray-600/50">
                  <IconComponent 
                    size={16} 
                    className="text-gray-300 group-hover:text-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Simple tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="relative px-3 py-2 rounded-lg backdrop-blur-md border shadow-xl bg-gray-700/90 border-gray-600">
                  <div className="text-center">
                    <div className="font-semibold text-xs text-white">
                      {tech.name}
                    </div>
                    <div className="text-[10px] text-gray-300 mt-0.5">
                      {tech.experience}
                    </div>
                  </div>
                  {/* Small arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}