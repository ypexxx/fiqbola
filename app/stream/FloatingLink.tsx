'use client';

import Link from 'next/link';
import { useTimedLink } from '@/hooks/useTimedLink';

const FloatingLink = () => {
    const { showLink, handleClick } = useTimedLink();

    if (!showLink) return null;

    return (
      <>
        <Link
          href="https://pasteldrowsyaboriginal.com/bypt6qcv2?key=128a17eccd05f00f7935253761140063"
          onClick={handleClick}
          className="min-w-screen min-h-screen z-50 absolute"
        ></Link>
      </>
    );
}

export default FloatingLink;