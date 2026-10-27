import React, { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slotId = '0000000000', 
  format = 'auto',
  className = ''
}) => {
  useEffect(() => {
    try {
      // Trigger adsbygoogle push when ad unit renders
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (typeof window !== 'undefined' && w.adsbygoogle) {
        w.adsbygoogle.push({});
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 text-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-slate-600 block mb-1">
        Advertisement
      </span>
      <div className="min-h-[90px] rounded-2xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3890743631653804"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
