import React, { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slotId = '', 
  format = 'auto',
  className = ''
}) => {
  useEffect(() => {
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (typeof window !== 'undefined') {
        w.adsbygoogle = w.adsbygoogle || [];
        w.adsbygoogle.push({});
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 text-center ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-slate-600 block mb-1 font-medium">
        Advertisement
      </span>
      <div className="min-h-[90px] rounded-2xl bg-slate-900/30 border border-slate-800/50 p-2 flex items-center justify-center relative overflow-hidden">
        {slotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px', width: '100%' }}
            data-ad-client="ca-pub-3890743631653804"
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px', width: '100%' }}
            data-ad-client="ca-pub-3890743631653804"
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
};
