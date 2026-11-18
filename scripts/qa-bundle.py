"""Bundle dist/portfolio/browser into ONE self-contained HTML file for visual QA.
Not used for deployment. Usage: python3 scripts/qa-bundle.py /tmp/qa/preview.html
"""
import base64, glob, re, subprocess, sys, os

out = sys.argv[1]
d = 'dist/portfolio/browser/'
tmp = os.path.dirname(out) or '.'
os.makedirs(tmp, exist_ok=True)
main = glob.glob(d + 'main-*.js')[0]
poly = glob.glob(d + 'polyfills-*.js')[0]
for src, dst in [(poly, 'poly.js'), (main, 'app.js')]:
    subprocess.run(['npx', 'esbuild', src, '--bundle', '--format=esm', '--minify', f'--outfile={tmp}/{dst}', '--log-level=warning'], check=True)

html = open(d + 'index.html').read()
css = open(glob.glob(d + 'styles-*.css')[0]).read().replace('@charset "UTF-8";', '')
app = open(f'{tmp}/app.js').read()
poly_js = open(f'{tmp}/poly.js').read()

def uri(p):
    mime = {'jpg': 'image/jpeg', 'svg': 'image/svg+xml', 'pdf': 'application/pdf'}[p.rsplit('.', 1)[-1]]
    return f'data:{mime};base64,' + base64.b64encode(open(p, 'rb').read()).decode()

for p in glob.glob(d + 'images/*.jpg'):
    name = 'images/' + os.path.basename(p)
    if 'og.jpg' in name:
        continue
    app = app.replace(name, uri(p))

html = re.sub(r'<link rel="stylesheet" href="styles-[^"]+" media="print" onload="[^"]*">', '<style>' + css + '</style>', html)
html = re.sub(r'<noscript><link rel="stylesheet" href="styles-[^"]+"></noscript>', '', html)
html = re.sub(r'<script src="(polyfills|main)-[^"]+" type="module"></script>', '', html)
html = html.replace('<base href="/">', '<script>document.write(\'<base href="\' + location.pathname + \'">\')</script>')
html = html.replace('href="favicon.svg"', 'href="' + uri(d + 'favicon.svg') + '"')
html = html.replace('content="/images/og.jpg"', 'content=""')
html = html.replace('</body>', '<script type="module">' + poly_js + '</script><script type="module">' + app + '</script></body>')
open(out, 'w').write(html)
print('wrote', out, len(html), 'bytes')
