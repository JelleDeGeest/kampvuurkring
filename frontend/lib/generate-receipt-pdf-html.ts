

export async function generateReceiptPDFFromHTML(element: HTMLElement, fileName: string): Promise<any> {
  try {
    // 1. Clone the element
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // OPTIMIZATION: Remove fixed height to prevent whitespace below footer in PDF
    // We want the PDF to be exactly as tall as the content, not forced to A4 if content is short.
    clonedElement.classList.remove('min-h-[297mm]');

    // Also ensure proper flex behavior if it was relying on height
    // We make sure it's just a column of content
    clonedElement.style.minHeight = 'auto';
    clonedElement.style.height = 'auto';

    // 2. Gather styles
    let styles = '';

    // ... [Styles collection logic remains same] ...


    // A. Get all <style> tags (Next.js dev mostly uses these)
    const styleTags = document.querySelectorAll('style');
    for (const tag of Array.from(styleTags)) {
      styles += tag.outerHTML;
    }

    // B. Get all linked stylesheets and fetch them (to inline)
    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    for (const link of Array.from(linkTags) as HTMLLinkElement[]) {
      try {
        if (link.href) {
          const res = await fetch(link.href);
          if (res.ok) {
            const css = await res.text();
            styles += `<style>/* Inlined from ${link.href} */\n${css}</style>`;
          }
        }
      } catch (e) {
        console.warn('Failed to fetch stylesheet:', link.href, e);
      }
    }

    // Helper to compress images (Resize to max 1200px width, JPEG 0.6 quality)
    const compressImage = async (url: string): Promise<string | null> => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();

        return await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Resize if too large (max 1200px width is plenty for A4)
            const MAX_WIDTH = 1200;
            if (width > MAX_WIDTH) {
              height = Math.round(height * (MAX_WIDTH / width));
              width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Compress to JPEG at 60% quality
              resolve(canvas.toDataURL('image/jpeg', 0.6));
            } else {
              resolve(null);
            }
          };
          img.onerror = () => resolve(null);
          img.src = URL.createObjectURL(blob);
        });
      } catch (e) {
        console.warn('Image compression failed', e);
        return null;
      }
    };

    // C. Fetch Tailwind CDN script to inline it (so server doesn't need network)
    let tailwindScript = '';
    try {
      const twRes = await fetch('https://cdn.tailwindcss.com');
      if (twRes.ok) {
        const twCode = await twRes.text();
        tailwindScript = `<script>${twCode}</script>`;
      }
    } catch (e) {
      console.warn('Failed to fetch Tailwind CDN for inlining', e);
      // Fallback: still include the link, maybe server has network?
      tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';
    }

    // D. Inline Images (Convert relative URLs to compressed Base64)
    const images = clonedElement.querySelectorAll('img');
    for (const img of Array.from(images) as HTMLImageElement[]) {
      try {
        // If src is relative or not a data URL, fetch and convert
        if (img.src && !img.src.startsWith('data:')) {
          const compressedDataUrl = await compressImage(img.src);
          if (compressedDataUrl) {
            img.src = compressedDataUrl;
            img.removeAttribute('srcset');
            img.removeAttribute('loading');
          }
        }
      } catch (e) {
        console.warn('Failed to inline image:', img.src, e);
      }
    }

    // D2. Inline Background Images (for Banner)
    // Select all elements, check inline style. optimized searching might be hard, so we iterate relevant divs if possible.
    // Assuming the banner is a div, we can try querySelectorAll('div[style*="background-image"]')
    const sensitiveDivs = clonedElement.querySelectorAll('div[style*="background-image"]');
    for (const div of Array.from(sensitiveDivs) as HTMLElement[]) {
      try {
        const bgStyle = div.style.backgroundImage;
        if (bgStyle && bgStyle.includes('url(')) {
          // Extract URL: url("...") or url(...)
          const match = bgStyle.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1]) {
            const url = match[1];
            if (!url.startsWith('data:')) {
              const compressedDataUrl = await compressImage(url);
              if (compressedDataUrl) {
                div.style.backgroundImage = `url('${compressedDataUrl}')`;
              }
            }
          }
        }
      } catch (e) {
        console.warn('Failed to inline background image', e);
      }
    }

    // E. Extract Computed CSS Variables (The "Nuclear Option" for Colors)
    // This ensures that even if external CSS files fail, the theme colors (variables) are present.
    const computedStyles = getComputedStyle(document.documentElement);
    let cssVariables = '';
    for (let i = 0; i < computedStyles.length; i++) {
      const keys = computedStyles[i];
      if (keys.startsWith('--')) {
        cssVariables += `${keys}: ${computedStyles.getPropertyValue(keys)};\n`;
      }
    }
    // F. Fetch and Inline Custom Fonts (Aglet Slab)
    // Since these are local files in /public/fonts, we fetch them and embed as Base64
    // to ensure Puppeteer can render them without network/path issues.
    const fontFiles = [
      { name: 'Aglet Slab', style: 'normal', weight: 400, path: '/fonts/Aglet Slab Regular.ttf' },
      { name: 'Aglet Slab', style: 'normal', weight: 700, path: '/fonts/Aglet Slab Bold.ttf' },
      { name: 'Aglet Slab', style: 'italic', weight: 400, path: '/fonts/Aglet Slab Italic.ttf' },
      { name: 'Aglet Slab', style: 'italic', weight: 700, path: '/fonts/Aglet Slab Bold Italic.ttf' },
      { name: 'Aglet Slab', style: 'normal', weight: 300, path: '/fonts/Aglet Slab Light.ttf' },
    ];

    let fontFaces = '';
    for (const font of fontFiles) {
      try {
        const res = await fetch(font.path);
        if (res.ok) {
          const blob = await res.blob();
          const reader = new FileReader();
          await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          const base64 = reader.result as string;
          fontFaces += `
                      @font-face {
                        font-family: '${font.name}';
                        font-style: ${font.style};
                        font-weight: ${font.weight};
                        src: url('${base64}') format('truetype');
                      }
                    `;
        }
      } catch (e) {
        console.warn('Failed to fetch font:', font.path, e);
      }
    }

    // Override the font variables to point to our inlined family
    // We append this to the computed variables to ensure it takes precedence
    const fontOverrides = `
            --font-primary: 'Aglet Slab', sans-serif;
            --font-heading: 'Aglet Slab', serif;
            --font-secondary: 'Aglet Slab', sans-serif;
        `;

    const variableStyleBlock = `<style>${fontFaces} :root { ${cssVariables} ${fontOverrides} }</style>`;

    // Construct HTML payload
    // We wrap the cloned element in a container that mimics the preview page layout
    // to ensuring centering and width constraints are respected.
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Inschrijvingsbewijs</title>
          ${variableStyleBlock}
          ${styles} 
          ${tailwindScript}
          <script>
            tailwind.config = {
              theme: {
                extend: {
                    fontFamily: {
                        sans: ['Aglet Slab', 'sans-serif'],
                        heading: ['Aglet Slab', 'serif'],
                    },
                    colors: {
                        border: "hsl(var(--border))",
                        input: "hsl(var(--input))",
                        ring: "hsl(var(--ring))",
                        background: "hsl(var(--background))",
                        foreground: "hsl(var(--foreground))",
                        primary: {
                          DEFAULT: "hsl(var(--primary))",
                          foreground: "hsl(var(--primary-foreground))",
                        },
                        secondary: {
                          DEFAULT: "hsl(var(--secondary))",
                          foreground: "hsl(var(--secondary-foreground))",
                        },
                        muted: {
                          DEFAULT: "hsl(var(--muted))",
                          foreground: "hsl(var(--muted-foreground))",
                        },
                    },
                },
              },
            }
          </script>
          <style>
             /* FORCE PRINT COLORS AND SIZING */
             body { 
                margin: 0; 
                padding: 0; 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
             }
          </style>
        </head>
        <body class="bg-white min-h-screen flex flex-col items-center justify-start">
            <!-- Wrapper to ensure the content is centered in the PDF viewport -->
            <div style="width: 210mm; max-width: 100%;">
                ${clonedElement.outerHTML}
            </div>
        </body>
      </html>
    `;

    // 3. Send to API
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: fullHtml }),
    });

    if (!response.ok) {
      throw new Error(`PDF generation failed: ${response.statusText}`);
    }

    // 4. Return the blob wrapper
    const blob = await response.blob();

    return {
      output: (type: string) => {
        if (type === 'blob') return blob;
        return blob;
      },
      save: (filename: string) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}