
"use client";

import Image from "next/image";

const clients = [
  { name: "canada", alt: "Canada Direct Imports logo", logo: "images/canada logo.webp" },
  { name: "cruncy bite", alt: "Crunchy Bite Chicken logo", logo: "/images/cruncy bite chciken logo.webp" },
  { name: "Robertson Family Dentistry", alt: "Robertson Family Dentistry logo", logo: "/images/Robertson-family-dentistry-logo-300x77.png" },
  { name: "Feo", alt: "Feo Bobo Bubble Tea logo", logo: "/images/feo logo.webp" },
  { name: "Love Again", alt: "Love Again Thrift Store logo", logo: "/images/love again logo.webp" },
  { name: "Tcab", alt: "TCAOB — Tamil Cultural Association of Brampton logo", logo: "/images/tcab logo.webp" },
];

export default function PartnersSlider() {
  // Duplicate the logos to create a seamless scrolling effect.
  const items = [...clients, ...clients];

  return (
    <section
      className="clients-section"
      aria-labelledby="clients-heading"
    >
      <div className="container-shell">
        <div className="clients-heading">
          <span className="eyebrow">
            OUR CLIENTS & PARTNERS
          </span>

          <h2>
            Trusted relationships.
          
          </h2>

          <p>
            Building lasting partnerships through technology,
            thoughtful execution and measurable business value.
          </p>
        </div>

        <div
          className="clients-slider"
          aria-label="Client and partner logos"
        >
          <div className="clients-track">
            {items.map((client, index) => (
              <div
                className="client-logo-card"
                key={`${client.name}-${index}`}
                aria-hidden={index >= clients.length}
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={150}
                  height={56}
                  className="client-logo"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
