import { useState } from 'react';

import Image from 'next/image';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

function BlurImage({ src, alt, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);
  const [isFirstLoad, setFirstLoad] = useState(true);

  if (!isFirstLoad) {
    return (
      <Image
        alt={alt}
        {...props}
        src={src}
        width={props.width}
        height={props.height}
        className={`duration-1000 ease-in ${props.className}`}
      />
    );
  }
  return (
    <Image
      alt={alt}
      {...props}
      src={src}
      width={isLoading ? 10 : props.width}
      height={isLoading ? 10 : props.height}
      onLoadingComplete={() => {
        setLoading(false);
        setFirstLoad(false);
      }}
      // className={`duration-1000 ease-in ${props.className}`}
      className={`${cn('duration-700 ease-linear', isLoading ? 'w-full blur-2xl' : 'w-full blur-0')} ${
        props.className
      }`}
    />
  );
}

export default BlurImage;
