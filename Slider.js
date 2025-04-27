import { useState, useEffect } from "react";

const images = [
  "https://iqq6kf0xmf.gjirafa.net/images/786fc182-d25c-4880-a71f-dcfdf8a866cf/786fc182-d25c-4880-a71f-dcfdf8a866cf.jpeg?w=1046",
  "https://iqq6kf0xmf.gjirafa.net/images/0e9e10d3-8158-4973-aec4-e5a672592754/0e9e10d3-8158-4973-aec4-e5a672592754.jpeg?w=1046",
  "https://iqq6kf0xmf.gjirafa.net/images/11ce0cd0-b5fd-4016-8474-62df42dc1b54/11ce0cd0-b5fd-4016-8474-62df42dc1b54.jpeg?w=1046"
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden  shadow-lg">
    <div className="flex w-full h-full transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${index * 100}%)` }}>
      {images.map((src, i) => (
        <img key={i} src={src} className="w-full h-full object-cover flex-shrink-0" alt="Slider" />
      ))}
    </div>
  </div>
);
}