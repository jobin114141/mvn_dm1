import glob

# For licensing subdirectory files with ../blog.html pattern
old_blog_sub = '        <a href="../blog.html" class="nav-link">BLOG</a>\n      </nav>'
new_blog_sub = '        <a href="../blog.html" class="nav-link">BLOG</a>\n        <a href="../contact.html" class="nav-center-mobile-cta">BOOK CONSULTATION &#8599;</a>\n      </nav>'

html_files = glob.glob('licensing/*.html', recursive=False)
count = 0
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if 'nav-center-mobile-cta' in content:
        print(f'Already has CTA: {fpath}')
        continue

    if old_blog_sub in content:
        content = content.replace(old_blog_sub, new_blog_sub)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {fpath}')
        count += 1
    else:
        print(f'Pattern not found in: {fpath}')

# Also handle blog.html and jurisdiction-comparison.html separately
special_files = ['blog.html', 'jurisdiction-comparison.html']
for fpath in special_files:
    try:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        if 'nav-center-mobile-cta' not in content and 'CONTACT' in content.upper():
            print(f'Needs manual check: {fpath}')
    except:
        pass

print(f'\nTotal updated: {count}')
