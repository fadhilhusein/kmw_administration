import Image from "next/image";
import React from "react";

export default function GridShape() {
  return (
    <>
      <div className="absolute right-0 top-2 -z-1 w-full max-w-[250px]">
        <Image
          width={540}
          height={254}
          src="/images/elements/glass-pie-chart.png"
          alt="grid"
        />
      </div>
      <div className="absolute bottom-[-25] left-5 -z-1 w-full max-w-[250px]">
        <Image
          width={540}
          height={254}
          src="/images/elements/bubble-message.png"
          alt="grid"
        />
      </div>
    </>
  );
}
