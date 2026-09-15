import glob, re

files = glob.glob('*.html') + glob.glob('licensing/*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove mega menu link
    new_content = re.sub(r'<li><a href="licensing/online-gambling\.html"><span class="bullet">\+</span> Online Gambling</a></li>\s*', '', content)
    new_content = re.sub(r'<li><a href="online-gambling\.html"><span class="bullet">\+</span> Online Gambling</a></li>\s*', '', new_content)

    # Remove footer link
    new_content = re.sub(r'<li><a href="licensing/online-gambling\.html"[^>]*>Online Gambling</a></li>\s*', '', new_content)
    new_content = re.sub(r'<li><a href="online-gambling\.html"[^>]*>Online Gambling</a></li>\s*', '', new_content)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print('Updated links in ' + f)

# Also remove the specific grid block in licensing.html
with open('licensing.html', 'r', encoding='utf-8') as file:
    content = file.read()

pattern_grid_block = r'<a href="licensing/online-gambling\.html"[^>]*>.*?Online Gambling &amp; iGaming.*?</a>\s*'
content = re.sub(pattern_grid_block, '', content, flags=re.DOTALL)

with open('licensing.html', 'w', encoding='utf-8') as file:
    file.write(content)
print('Removed grid block from licensing.html')
