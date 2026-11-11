"""Local structural checks; no network or external test dependency."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json,re
root=Path(__file__).parent/'dist';errors=[];count=0;titles=set()
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.refs=[];self.ids=[];self.h1=0;self.images=[];self.feed(text)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if t=='h1':self.h1+=1
  if t=='img':self.images.append(a)
  if t=='a' and 'href' in a:self.refs.append(a['href'])
  if t in ['script','img'] and a.get('src'):self.refs.append(a['src'])
  if t=='link' and a.get('rel') in ['stylesheet','icon']:self.refs.append(a['href'])
for f in root.rglob('*.html'):
 if f.name.startswith('_qa'):continue
 count+=1;s=f.read_text();p=Page(s)
 if p.h1!=1:errors.append(f'{f}: expected one h1')
 if len(set(p.ids))!=len(p.ids):errors.append(f'{f}: duplicate IDs')
 title=re.search('<title>(.*?)</title>',s)[1]
 if title in titles:errors.append(f'{f}: duplicate title')
 titles.add(title)
 for im in p.images:
  if not im.get('alt'):errors.append(f'{f}: missing image alt')
 for ref in p.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  target=(f.parent/unquote(u.path)).resolve() if u.path else f
  if not target.exists():errors.append(f'{f.relative_to(root)}: missing {ref}')
  elif u.fragment and target.suffix=='.html' and u.fragment not in Page(target.read_text()).ids:errors.append(f'{f.relative_to(root)}: missing anchor {ref}')
 for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s):json.loads(data)
 assert 'name="description"' in s and 'rel="canonical"' in s
c=json.loads((root/'assets/config/site-config.json').read_text());assert len(c['programs'])==5
assert not c['testimonials']['enabled'];assert not c['contact']['whatsapp'];assert not c['forms']['endpoint']
assert all((root/path).stat().st_size>1000 for path in ['assets/css/bootstrap.min.css','assets/js/bootstrap.bundle.min.js','assets/js/jquery.min.js'])
print(f'Checked {count} pages: local links, anchors, unique titles, one H1, image alt text, JSON-LD, SEO tags, dependencies and configuration.')
if errors:print('\n'.join(errors));raise SystemExit(1)
print('PASS')
