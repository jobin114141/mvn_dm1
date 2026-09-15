import os, glob
files = glob.glob('*.html') + glob.glob('licensing/*.html')
q = chr(34)
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'licensing' in f:
        target = f'<li><a href={q}../ajman-free-zone.html{q}><span class={q}bullet{q}>+</span> Ajman Free Zones</a></li>'
        rep = target + f'\n                  <li><a href={q}../dubai-mainland.html{q}><span class={q}bullet{q}>+</span> Dubai Mainland</a></li>'
    else:
        target = f'<li><a href={q}ajman-free-zone.html{q}><span class={q}bullet{q}>+</span> Ajman Free Zones</a></li>'
        rep = target + f'\n                  <li><a href={q}dubai-mainland.html{q}><span class={q}bullet{q}>+</span> Dubai Mainland</a></li>'
    if target in content and 'Dubai Mainland' not in content:
        content = content.replace(target, rep)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print('Updated ' + f)
