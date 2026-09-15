import re

with open('licensing.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Title and Description
content = content.replace('Gambling, ', '')
content = content.replace('Online Gambling, ', '')

# 2. Remove the list item near 1300
pattern_list_item = r'<div class="lic-service-pill">.*?Online Gambling &amp; iGaming.*?</div>'
content = re.sub(pattern_list_item, '', content, flags=re.DOTALL)

# 3. Remove Service 04
pattern_service = r'<!-- SERVICE 04: Online Gambling -->.*?<!-- SERVICE 05'
# replace with just <!-- SERVICE 05
content = re.sub(pattern_service, '<!-- SERVICE 05', content, flags=re.DOTALL)

# 4. Remove Link Card near 2600
pattern_card = r'<a href="licensing/online-gambling\.html" class="lic-link-card">.*?</a>'
content = re.sub(pattern_card, '', content, flags=re.DOTALL)

with open('licensing.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Safely removed gambling sections from licensing.html")
