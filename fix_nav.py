import os, glob
files = glob.glob('*.html') + glob.glob('licensing/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    target1 = '<a href="ajman-free-zone.html">'
    target2 = '<a href="../ajman-free-zone.html">'
    new_line1 = '                  <li><a href="dubai-mainland.html"><span class="bullet">+</span> Dubai Mainland</a></li>\n'
    new_line2 = '                  <li><a href="../dubai-mainland.html"><span class="bullet">+</span> Dubai Mainland</a></li>\n'
    content = ''.join(lines)
    if 'Dubai Mainland' in content:
        continue
    new_lines = []
    for line in lines:
        new_lines.append(line)
        if target1 in line:
            new_lines.append(new_line1)
        elif target2 in line:
            new_lines.append(new_line2)
    if len(new_lines) != len(lines):
        with open(f, 'w', encoding='utf-8') as file:
            file.writelines(new_lines)
        print('Updated ' + f)
