const PALETTE = ["58A6FF","A78BFA","5EEAD4","F472B6","FBBF24","34D399","FB7185"];

function esc(s: string) {
  return s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c] || c));
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const text = url.searchParams.get("text") || "ZAIN.EXE";
  const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const width = Math.min(1200, Math.max(320, Number(url.searchParams.get("width")) || 900));
  const size = Math.min(64, Math.max(18, Number(url.searchParams.get("size")) || 38));
  const chars = [...text];
  const duration = Math.max(2.5, chars.length * 0.09);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="76" viewBox="0 0 ${width} 76">
<style>
text{font-family:monospace;font-size:${size}px;fill:#${color}}
.t{stroke:#${color};stroke-width:1.5;animation:reveal ${duration}s steps(${Math.max(1,chars.length)}) forwards}
@keyframes reveal{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
</style>
<defs><clipPath id="r"><rect x="0" y="0" width="0" height="76"><animate attributeName="width" from="0" to="${width}" dur="${duration}s" fill="freeze"/></rect></clipPath></defs>
<text x="8" y="51" clip-path="url(#r)">${esc(text)}</text>
</svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type":"image/svg+xml; charset=utf-8",
      "Cache-Control":"no-store, no-cache, must-revalidate, max-age=0",
      "Pragma":"no-cache"
    }
  });
};

export const config = { path: "/typing.svg" };
