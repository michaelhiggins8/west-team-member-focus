"use client";

import Image from "next/image";
import { useState } from "react";
import { getInitials } from "@/lib/initials";

type MemberPhotoProps = {
  src: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function MemberPhoto({
  src,
  name,
  className,
  sizes,
  priority,
}: MemberPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-stone ${className ?? ""}`}
        aria-label={`Portrait placeholder for ${name}`}
        role="img"
      >
        <span className="font-serif text-[clamp(32px,6vw,56px)] text-pebble">
          {getInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Portrait of ${name}`}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover object-top ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
