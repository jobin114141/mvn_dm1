import re
with open('offshore-company-formation.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update widths
content = content.replace('width: 28%;', 'min-width: 250px;')
content = content.replace('width: 24%;', 'min-width: 200px;')

# 2. Add columns to Header
content = content.replace(
    '                <th style="padding: 16px 20px; color: var(--text-dark); font-family: var(--font-serif); font-size: 1.05rem; min-width: 200px; font-weight: 600;">AJMAN FREE ZONE</th>\n\n              </tr>',
    '                <th style="padding: 16px 20px; color: var(--text-dark); font-family: var(--font-serif); font-size: 1.05rem; min-width: 200px; font-weight: 600;">AJMAN FREE ZONE</th>\n' + 
    '                <th style="padding: 16px 20px; color: var(--text-dark); font-family: var(--font-serif); font-size: 1.05rem; min-width: 200px; font-weight: 600;">MAURITIUS</th>\n' + 
    '                <th style="padding: 16px 20px; color: var(--text-dark); font-family: var(--font-serif); font-size: 1.05rem; min-width: 200px; font-weight: 600;">SEYCHELLES</th>\n' + 
    '                <th style="padding: 16px 20px; color: var(--text-dark); font-family: var(--font-serif); font-size: 1.05rem; min-width: 200px; font-weight: 600;">BVI</th>\n' + 
    '                <th style="padding: 16px 20px; color: var(--text-dark); font-family: var(--font-serif); font-size: 1.05rem; min-width: 200px; font-weight: 600;">ST. LOUIS ISLAND</th>\n\n              </tr>'
)

# 3. Add columns to rows
rows = [
    (
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Flexible Commercial & Investment</td>\n\n              </tr>',
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Flexible Commercial & Investment</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Global Business & Tax Treaties</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Zero-Tax IBC & Privacy</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Gold Standard Holding</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Emerging Wealth Management</td>\n\n              </tr>'
    ),
    (
        '                <td style="padding: 18px 20px; color: var(--text-muted);"><i class="fa-solid fa-circle-info" style="color: var(--brand-gold);"></i> Restricted / NOC Required</td>\n\n              </tr>',
        '                <td style="padding: 18px 20px; color: var(--text-muted);"><i class="fa-solid fa-circle-info" style="color: var(--brand-gold);"></i> Restricted / NOC Required</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Not Applicable</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Not Applicable</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Not Applicable</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-muted);">Not Applicable</td>\n\n              </tr>'
    ),
    (
        '                <td style="padding: 18px 20px; color: var(--text-dark);">3 to 4 Working Days</td>\n\n              </tr>',
        '                <td style="padding: 18px 20px; color: var(--text-dark);">3 to 4 Working Days</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">7 to 10 Working Days</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">2 to 3 Working Days</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">3 to 5 Working Days</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">3 to 5 Working Days</td>\n\n              </tr>'
    ),
    (
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mandatory Registered Agent</td>\n\n              </tr>',
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mandatory Registered Agent</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mandatory Registered Agent</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mandatory Registered Agent</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mandatory Registered Agent</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mandatory Registered Agent</td>\n\n              </tr>'
    ),
    (
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Standard Banking Support</td>\n\n              </tr>',
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Standard Banking Support</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">International Banking Hub</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Requires Due Diligence</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Tier-1 Banking Support</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Emerging Acceptance</td>\n\n              </tr>'
    ),
    (
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Commercial Value Tier</td>\n\n              </tr>',
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Commercial Value Tier</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Mid-Tier Value Structure</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Cost-Effective Value Tier</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Premium Prestige Tier</td>\n' + 
        '                <td style="padding: 18px 20px; color: var(--text-dark);">Cost-Effective Value Tier</td>\n\n              </tr>'
    )
]

for target, replacement in rows:
    content = content.replace(target, replacement)

with open('offshore-company-formation.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Table updated successfully.')
