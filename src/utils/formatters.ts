export function formatNumber(val: number, maxDecimals: number = 6): string {
  if (val === undefined || val === null || isNaN(val)) return '0';
  if (val === 0) return '0';

  const abs = Math.abs(val);

  // Very small micro-cents (e.g., PEPE $0.0000104, SHIB $0.0000188)
  if (abs < 0.0001) {
    const maxDigits = Math.max(6, Math.min(maxDecimals, 8));
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDigits,
    }).format(val);
  }

  // Fractional values under 1 (e.g., XRP $0.54, ADA $0.36)
  if (abs < 1) {
    const maxDigits = Math.max(2, Math.min(maxDecimals, 6));
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDigits,
    }).format(val);
  }

  // Numbers >= 1 (e.g., BTC $67,840.50, ETH $2,645.80)
  const maxDigits = Math.max(2, Math.min(maxDecimals, 4));
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDigits,
  }).format(val);
}

export function formatCompact(val?: number): string {
  if (!val || isNaN(val)) return '$0';
  if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(2)}K`;
  return `$${val.toFixed(2)}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy error:', err);
    return false;
  }
}
