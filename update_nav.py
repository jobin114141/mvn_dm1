import glob, re

replacement = '''<ul class="services-mega-list">
                  <li><a href="offshore-company-formation.html"><span class="bullet">+</span> Offshore Overview</a></li>
                  <li><a href="jafza-offshore.html"><span class="bullet">+</span> JAFZA Offshore</a></li>
                  <li><a href="rak-offshore.html"><span class="bullet">+</span> RAK Offshore</a></li>
                  <li><a href="ajman-offshore.html"><span class="bullet">+</span> Ajman Offshore</a></li>
                  <li><a href="mauritius-offshore.html"><span class="bullet">+</span> Mauritius</a></li>
                  <li><a href="seychelles-offshore.html"><span class="bullet">+</span> Seychelles</a></li>
                  <li><a href="bvi-offshore.html"><span class="bullet">+</span> BVI</a></li>
                  <li><a href="st-louis-island-offshore.html"><span class="bullet">+</span> St Louis Island</a></li>
                </ul>'''

files = glob.glob('*.html') + glob.glob('licensing/*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Use regex to find the UL following OFFSHORE FORMATION title
    pattern = r'(<span class="services-mega-title">OFFSHORE FORMATION</span>\s*</div>\s*)<ul class="services-mega-list">.*?</ul>'
    
    new_content = re.sub(pattern, r'\g<1>' + replacement, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print('Updated ' + f)
