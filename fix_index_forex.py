import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern_index = r'\s*<!-- Sector 4 -->.*?<div class="stat-grid-cell">.*?Online Gambling.*?</div>'
content = re.sub(pattern_index, '', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('licensing/forex-cfd.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern_forex = r'\s*<span class="sub-lic-related-num">04</span>\s*<span class="sub-lic-related-title">Online Gambling</span>.*?</a>'
content = re.sub(pattern_forex, '', content, flags=re.DOTALL)

with open('licensing/forex-cfd.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed remaining gambling mentions')
