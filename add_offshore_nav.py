import os, glob
files = glob.glob('*.html') + glob.glob('licensing/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    target1 = '<a href="ajman-offshore.html">'
    target2 = '<a href="../ajman-offshore.html">'
    new_lines_1 = [
        '                  <li><a href="mauritius-offshore.html"><span class="bullet">+</span> Mauritius</a></li>\n',
        '                  <li><a href="seychelles-offshore.html"><span class="bullet">+</span> Seychelles</a></li>\n',
        '                  <li><a href="bvi-offshore.html"><span class="bullet">+</span> BVI</a></li>\n',
        '                  <li><a href="st-louis-island-offshore.html"><span class="bullet">+</span> St Louis Island</a></li>\n'
    ]
    new_lines_2 = [
        '                  <li><a href="../mauritius-offshore.html"><span class="bullet">+</span> Mauritius</a></li>\n',
        '                  <li><a href="../seychelles-offshore.html"><span class="bullet">+</span> Seychelles</a></li>\n',
        '                  <li><a href="../bvi-offshore.html"><span class="bullet">+</span> BVI</a></li>\n',
        '                  <li><a href="../st-louis-island-offshore.html"><span class="bullet">+</span> St Louis Island</a></li>\n'
    ]
    content = ''.join(lines)
    if '<li><a href="mauritius-offshore.html">' in content or '<li><a href="../mauritius-offshore.html">' in content:
        continue
    new_lines_out = []
    for line in lines:
        new_lines_out.append(line)
        if target1 in line:
            new_lines_out.extend(new_lines_1)
        elif target2 in line:
            new_lines_out.extend(new_lines_2)
    if len(new_lines_out) != len(lines):
        with open(f, 'w', encoding='utf-8') as file:
            file.writelines(new_lines_out)
        print('Updated ' + f)
