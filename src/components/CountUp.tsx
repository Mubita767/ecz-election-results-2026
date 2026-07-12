import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface CountUpProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export default function CountUp({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  delay = 0,
}: CountUpProps) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        const raw = obj.val;
        let formatted: string;
        if (decimals > 0) {
          formatted = raw.toFixed(decimals);
        } else {
          formatted = Math.floor(raw).toLocaleString('en-US');
        }
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => { tween.kill(); };
  }, [target, duration, prefix, suffix, decimals, delay]);

  return (
    <span className={`font-mono ${className}`}>
      {display}
    </span>
  );
}
