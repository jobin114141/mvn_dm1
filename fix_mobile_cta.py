import glob

# Pattern to find the last nav link before </nav>
old_blog = '        <a href="blog.html" class="nav-link">BLOG</a>\n      </nav>'
# Pattern with mobile CTA inserted inside the overlay nav before </nav>
new_blog = '        <a href="blog.html" class="nav-link">BLOG</a>\n        <a href="contact.html" class="nav-center-mobile-cta">BOOK CONSULTATION &#8599;</a>\n      </nav>'

# Also handle licensing subdirectory pages which reference ../contact.html
old_blog_sub = '        <a href="blog.html" class="nav-link">BLOG</a>\n      </nav>'
new_blog_sub = '        <a href="blog.html" class="nav-link">BLOG</a>\n        <a href="../contact.html" class="nav-center-mobile-cta">BOOK CONSULTATION &#8599;</a>\n      </nav>'

html_files = glob.glob('**/*.html', recursive=True)
count = 0
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if 'nav-center-mobile-cta' in content:
        print(f'Already has CTA: {fpath}')
        continue

    is_sub = fpath.startswith('licensing\\') or fpath.startswith('licensing/')

    if old_blog in content:
        if is_sub:
            content = content.replace(old_blog, new_blog_sub)
        else:
            content = content.replace(old_blog, new_blog)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {fpath}')
        count += 1
    else:
        print(f'Pattern not found: {fpath}')

print(f'\nTotal updated: {count}')
