import { motion } from 'framer-motion';

const Gallery = () => {
  const artworks = [
    {
      id: 1,
      image: '/display1.jpeg',
      text: "Each brushstroke is a heartbeat, a love letter to the living world. Botany and beasts inspire me, their fleeting magic captured and held. Using watercolor's transparency, I invite you to see the vibrant pulse of life—a universe alive in pigment and light.",
      align: 'left'
    },
    {
      id: 2,
      image: '/display2.jpeg',
      text: "Art is how I translate the quiet whispers of the forest. Mixing deep, velvety gouache and textured acrylics allows me to layers the stories of creatures great and small, bringing their hidden worlds out from the shadows and into the sun.",
      align: 'right'
    },
    {
      id: 3,
      image: '/display3.jpeg',
      text: "My canvas is a sanctuary where flowers never fade and birds sing indefinitely. By blending traditional techniques, I aim to preserve the delicate, radiant details of our natural environment, grounding your space in eternal spring.",
      align: 'left'
    }
  ];

  return (
    <section id="art" className="w-full py-24">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <hr className="w-1/3 mx-auto border-t-2 border-stone-300 mb-16" />
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2621]">My Best Pieces</h2>
      </div>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4 md:gap-8">
        {artworks.map((art, index) => {
          const isLeft = art.align === 'left';

          return (
            <div key={art.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start py-10">
              {/* Image Column */}
              <motion.div
                className={`order-1 ${isLeft ? 'md:order-1 md:col-span-4' : 'md:order-2 md:col-span-4'}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-full bg-white p-2 md:p-4 shadow-md rounded-sm">
                  <img src={art.image} alt={`Artwork ${art.id}`} className="w-full h-auto object-cover rounded-sm" />
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div
                className={`order-2 ${isLeft ? 'md:order-2 md:col-span-8' : 'md:order-1 md:col-span-8'} pt-8 md:pt-20`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: isLeft ? 0.2 : 0,
                  ease: "easeOut"
                }}
              >
                <p className="text-2xl md:text-3xl leading-tight text-[#4A554A] font-hand">
                  {art.text}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
