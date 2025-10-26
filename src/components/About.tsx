export function About() {
  return (
    <section id="over-mij" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            Over Mij
          </h2>
          <div className="w-24 h-1 bg-stone-900 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-stone-700 leading-relaxed">
              Hoi! Ik ben Anthony, een gepassioneerde developer uit Nederland. 
              Met een sterke focus op clean code en gebruiksvriendelijke interfaces, 
              help ik bedrijven en individuen hun digitale dromen waar te maken.
            </p>
            
            <p className="text-lg text-stone-700 leading-relaxed">
              Of het nu gaat om een snelle landingspagina, een complexe web-applicatie, 
              of een mobile app - ik zorg ervoor dat elke pixel perfect is en elke 
              interactie intuïtief aanvoelt.
            </p>

            <p className="text-lg text-stone-700 leading-relaxed">
              Wanneer ik niet aan het coderen ben, ben je me waarschijnlijk aan het 
              experimenteren met nieuwe technologieën, het lezen van tech blogs, 
              of het genieten van een goede kop koffie terwijl ik nadenk over 
              het volgende grote project.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-900">5+</div>
                <div className="text-sm text-stone-600">Jaar Ervaring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-900">50+</div>
                <div className="text-sm text-stone-600">Projecten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-900">100%</div>
                <div className="text-sm text-stone-600">Tevreden Klanten</div>
              </div>
            </div>
          </div>

          {/* Image/Visual Element */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-stone-200 to-stone-300 p-8 shadow-lg">
              <div className="w-full h-full rounded-xl bg-stone-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-stone-400 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-xl font-bold text-stone-600">💻</span>
                  </div>
                  <p className="text-stone-600 font-medium">
                    Altijd leren,<br />
                    altijd bouwen
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center text-stone-50 font-bold shadow-lg">
              ⚡
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}