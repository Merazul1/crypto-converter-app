Add-Type -AssemblyName System.Drawing

# 1. GENERATE 512x512 PRODUCT HUNT LOGO
$logoPath = "D:\Merazul\Code\gemini\antigravity\crypto-converter-app\public\producthunt-logo.png"
$bmp = New-Object System.Drawing.Bitmap 512, 512
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Dark Background
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#090D16"))
$g.FillRectangle($bgBrush, 0, 0, 512, 512)

# Glowing Background Circle
$glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 99, 102, 241))
$g.FillEllipse($glowBrush, 40, 40, 432, 432)

# Outer Ring
$pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#6366F1")), 8
$g.DrawEllipse($pen, 56, 56, 400, 400)

# Dashed Accent Ring
$innerPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#10B981")), 5
$innerPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$g.DrawEllipse($innerPen, 80, 80, 352, 352)

# Conversion Arrow 1 (Cyan, Top -> Right)
$cyanPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#38BDF8")), 20
$cyanPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$cyanPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($cyanPen, 180, 205, 330, 205)
$g.DrawLine($cyanPen, 290, 165, 330, 205)
$g.DrawLine($cyanPen, 290, 245, 330, 205)

# Conversion Arrow 2 (Emerald, Bottom -> Left)
$emeraldPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#10B981")), 20
$emeraldPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$emeraldPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($emeraldPen, 332, 307, 182, 307)
$g.DrawLine($emeraldPen, 222, 267, 182, 307)
$g.DrawLine($emeraldPen, 222, 347, 182, 307)

# Center Pulse Dot
$dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#10B981"))
$g.FillEllipse($dotBrush, 241, 241, 30, 30)

$bmp.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()


# 2. GENERATE 1270x760 PRODUCT HUNT GALLERY BANNER 1
$banner1Path = "D:\Merazul\Code\gemini\antigravity\crypto-converter-app\public\producthunt-gallery-1.png"
$bmpBanner = New-Object System.Drawing.Bitmap 1270, 760
$gb = [System.Drawing.Graphics]::FromImage($bmpBanner)
$gb.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gb.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Dark Background
$gb.FillRectangle($bgBrush, 0, 0, 1270, 760)

# Gradient background glow
$glow1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(45, 99, 102, 241))
$gb.FillEllipse($glow1, 800, -100, 600, 600)
$glow2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(35, 16, 185, 129))
$gb.FillEllipse($glow2, -100, 300, 600, 600)

# Fonts
$fontFamily = [System.Drawing.FontFamily]::GenericSansSerif
$titleFont = New-Object System.Drawing.Font ($fontFamily, 36, [System.Drawing.FontStyle]::Bold)
$subFont = New-Object System.Drawing.Font ($fontFamily, 18, [System.Drawing.FontStyle]::Regular)
$cardFont = New-Object System.Drawing.Font ($fontFamily, 14, [System.Drawing.FontStyle]::Bold)
$numberFont = New-Object System.Drawing.Font ($fontFamily, 30, [System.Drawing.FontStyle]::Bold)
$labelFont = New-Object System.Drawing.Font ($fontFamily, 11, [System.Drawing.FontStyle]::Regular)

# Text Brushes
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$slateBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#94A3B8"))
$emeraldText = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#34D399"))
$indigoText = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#818CF8"))

# Header Titles
$gb.DrawString('CoinRates.live', $titleFont, $whiteBrush, 60, 50)
$gb.DrawString('.live', $titleFont, $emeraldText, 410, 50)
$gb.DrawString('Free Real-Time Cryptocurrency Converter and Exchange Rates', $subFont, $slateBrush, 60, 115)

# Main Converter Mockup Card
$cardBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 15, 23, 42))
$cardPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#334155")), 2
$cardRect = New-Object System.Drawing.Rectangle 60, 175, 700, 520
$gb.FillRectangle($cardBrush, $cardRect)
$gb.DrawRectangle($cardPen, $cardRect)

# From Box
$innerBoxBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#090D16"))
$fromRect = New-Object System.Drawing.Rectangle 90, 215, 640, 115
$gb.FillRectangle($innerBoxBrush, $fromRect)
$gb.DrawRectangle($cardPen, $fromRect)
$gb.DrawString('YOU CONVERT (FROM)', $labelFont, $slateBrush, 110, 230)
$gb.DrawString('1.00', $numberFont, $whiteBrush, 110, 255)
$gb.DrawString('BTC (Bitcoin) - $68,450.00', $cardFont, $indigoText, 460, 270)

# Swap Line
$gb.DrawLine($cardPen, 90, 360, 730, 360)
$swapBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#6366F1"))
$gb.FillEllipse($swapBrush, 390, 342, 36, 36)
$gb.DrawString('SWAP', $labelFont, $whiteBrush, 392, 352)

# To Box
$toRect = New-Object System.Drawing.Rectangle 90, 405, 640, 115
$gb.FillRectangle($innerBoxBrush, $toRect)
$gb.DrawRectangle($cardPen, $toRect)
$gb.DrawString('YOU RECEIVE (TO) - ZERO FEES', $labelFont, $slateBrush, 110, 420)
$gb.DrawString('68,450.00', $numberFont, $emeraldText, 110, 445)
$gb.DrawString('USD (US Dollar)', $cardFont, $emeraldText, 520, 460)

# Rate Formula
$rateRect = New-Object System.Drawing.Rectangle 90, 545, 640, 55
$gb.FillRectangle($innerBoxBrush, $rateRect)
$gb.DrawRectangle($cardPen, $rateRect)
$gb.DrawString('1 BTC = 68,450.00 USD  |  1 USD = 0.0000146 BTC  |  Live Binance Stream', $labelFont, $slateBrush, 115, 563)

# Quick Presets
$gb.DrawString('Quick Multipliers:  +0.5   +1   +5   +10   +100   Reset', $labelFont, $slateBrush, 90, 625)

# Right Side Feature Cards
$sideRect1 = New-Object System.Drawing.Rectangle 800, 175, 410, 155
$gb.FillRectangle($cardBrush, $sideRect1)
$gb.DrawRectangle($cardPen, $sideRect1)
$gb.DrawString('Interactive Sparkline Charts', $cardFont, $whiteBrush, 825, 200)
$gb.DrawString('Toggle 24H, 7D, 30D, and 1Y price history with live high/low indicators and volume stats.', $labelFont, $slateBrush, 825, 235)

$sideRect2 = New-Object System.Drawing.Rectangle 800, 355, 410, 155
$gb.FillRectangle($cardBrush, $sideRect2)
$gb.DrawRectangle($cardPen, $sideRect2)
$gb.DrawString('Live Gas and Fear/Greed Index', $cardFont, $whiteBrush, 825, 380)
$gb.DrawString('Real-time Ethereum Gwei speeds (Slow, Standard, Fast) + Crypto Sentiment tracker.', $labelFont, $slateBrush, 825, 415)

$sideRect3 = New-Object System.Drawing.Rectangle 800, 535, 410, 155
$gb.FillRectangle($cardBrush, $sideRect3)
$gb.DrawRectangle($cardPen, $sideRect3)
$gb.DrawString('50+ Global Fiat and Crypto Pairs', $cardFont, $whiteBrush, 825, 560)
$gb.DrawString('USD, EUR, GBP, INR, JPY, CAD, AUD + Bitcoin, Solana, Ethereum, XRP, Dogecoin.', $labelFont, $slateBrush, 825, 595)

$bmpBanner.Save($banner1Path, [System.Drawing.Imaging.ImageFormat]::Png)
$gb.Dispose()
$bmpBanner.Dispose()

Write-Output 'Product Hunt Assets Generated Successfully!'
