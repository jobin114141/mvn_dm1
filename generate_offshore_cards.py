import os

jurisdictions = [
    {
        'id': 'jafza',
        'image': 'assets/newimgs/pexels-tima-miroshnichenko-5717314.jpg',
        'overlay': 'Direct Dubai Real Estate Property Ownership Permitted',
        'pill': 'DUBAI | JAFZA OFFSHORE',
        'title_prefix': 'JAFZA Offshore ',
        'title_em': 'Company Formation.',
        'desc': 'Established through the Jebel Ali Free Zone Authority (JAFZA), this jurisdiction offers high-prestige international holding status and is the primary offshore vehicle permitted to hold real estate property directly in Dubai.',
        'stats': [('AUTHORITY', 'JAFZA (Est. 2003)'), ('TIMELINE', '3-5 Working Days'), ('PROPERTY', 'Dubai Direct')],
        'bullets': ["Direct Dubai Real Estate Property Ownership Rights", "Access to UAE's 40+ Double Taxation Avoidance Agreements (DTAs)", "UAE Multicurrency Corporate Banking Infrastructure", "100% Tax Neutrality & Full Profit Repatriation"],
        'link': 'jafza-offshore.html',
        'btn_text': 'VIEW DEDICATED JAFZA PAGE ↗'
    },
    {
        'id': 'rakez',
        'image': 'assets/newimgs/pexels-sevenstormphotography-431538.jpg',
        'overlay': 'Premium Corporate Asset Protection & Confidentiality',
        'pill': 'RAS AL KHAIMAH | RAKEZ OFFSHORE',
        'title_prefix': 'RAKEZ Offshore ',
        'title_em': 'Company Formation.',
        'desc': 'Ras Al Khaimah Economic Zone (RAKEZ) provides a highly cost-effective and legally robust framework for international business operations, consultancy, and global trade structuring.',
        'stats': [('AUTHORITY', 'RAKEZ'), ('TIMELINE', '2-3 Working Days'), ('COST', 'Cost-Effective')],
        'bullets': ['Ideal for International Commercial Trading & Consulting', 'High degree of corporate confidentiality and privacy', 'No paid-up share capital requirement for incorporation', 'Permission to hold shares in local & global companies'],
        'link': 'rak-offshore.html',
        'btn_text': 'VIEW DEDICATED RAKEZ PAGE ↗'
    },
    {
        'id': 'ajman',
        'image': 'assets/newimgs/pexels-maxavans-5075087.jpg',
        'overlay': 'Fast-Track Offshore Registration Under AFZA Regulations',
        'pill': 'AJMAN | AJMAN OFFSHORE',
        'title_prefix': 'Ajman Offshore ',
        'title_em': 'Company Formation.',
        'desc': 'Regulated by the Ajman Free Zone Authority (AFZA), this jurisdiction is renowned for its rapid setup times, making it an excellent choice for holding companies, IP ownership, and joint ventures.',
        'stats': [('AUTHORITY', 'AFZA (Est. 2014)'), ('TIMELINE', '1-2 Working Days'), ('SETUP', 'Rapid Process')],
        'bullets': ['Fastest offshore company registration timeline in the UAE', 'Complete intellectual property (IP) and trademark ownership', 'Highly simplified compliance and maintenance procedures', 'Zero requirement for physical presence during incorporation'],
        'link': 'ajman-offshore.html',
        'btn_text': 'VIEW DEDICATED AJMAN PAGE ↗'
    },
    {
        'id': 'mauritius',
        'image': 'assets/newimgs/pexels-tommaso-10549886.jpg',
        'overlay': 'Global Business Company (GBC) With Extensive Tax Treaties',
        'pill': 'INDIAN OCEAN | MAURITIUS OFFSHORE',
        'title_prefix': 'Mauritius Offshore ',
        'title_em': 'Company Formation.',
        'desc': 'Mauritius is a globally recognized financial center offering the Global Business Company (GBC) structure, favored by international investors for its extensive network of Double Taxation Avoidance Agreements.',
        'stats': [('AUTHORITY', 'FSC Mauritius'), ('TREATIES', '45+ Active DTAs'), ('REPUTATION', 'Tier-1 Hub')],
        'bullets': ['Extensive Double Taxation Avoidance Agreements worldwide', 'Regulated and white-listed international financial center', 'Perfect for routing investments into African and Asian markets', 'Strong legal framework based on English & French civil law'],
        'link': 'mauritius-offshore.html',
        'btn_text': 'VIEW DEDICATED PAGE ↗'
    },
    {
        'id': 'seychelles',
        'image': 'assets/newimgs/pexels-nextvoyage-5679302.jpg',
        'overlay': 'International Business Company (IBC) For Maximum Privacy',
        'pill': 'INDIAN OCEAN | SEYCHELLES OFFSHORE',
        'title_prefix': 'Seychelles Offshore ',
        'title_em': 'Company Formation.',
        'desc': 'The Seychelles International Business Company (IBC) is one of the most popular and versatile offshore vehicles globally, providing total tax exemption and robust confidentiality for corporate stakeholders.',
        'stats': [('AUTHORITY', 'FSA Seychelles'), ('TAX RATE', '0% Tax Neutral'), ('PRIVACY', 'High Security')],
        'bullets': ['Complete privacy with closed registries for shareholders/directors', 'Fast-track IBC formation with no minimum capital required', '100% tax exemption on all foreign-sourced income', 'No mandatory requirement to file annual audited accounts'],
        'link': 'seychelles-offshore.html',
        'btn_text': 'VIEW DEDICATED PAGE ↗'
    },
    {
        'id': 'bvi',
        'image': 'assets/newimgs/pexels-image-hunter-281453274-13012241.jpg',
        'overlay': 'The Gold Standard in International Corporate Structuring',
        'pill': 'CARIBBEAN | BVI OFFSHORE',
        'title_prefix': 'BVI Offshore ',
        'title_em': 'Company Formation.',
        'desc': 'The British Virgin Islands (BVI) represents the gold standard in offshore company formation. Operating under English Common Law, it provides unmatched flexibility for international holding and asset management.',
        'stats': [('AUTHORITY', 'BVI FSC'), ('LEGAL', 'English Common Law'), ('ADOPTION', 'Most Popular Globally')],
        'bullets': ['Most widely recognized offshore corporate structure globally', 'Maximum flexibility for corporate governance and restructuring', 'Excellent for cross-border investments and mutual funds', 'No capital gains, corporate, or withholding taxes applied'],
        'link': 'bvi-offshore.html',
        'btn_text': 'VIEW DEDICATED PAGE ↗'
    },
    {
        'id': 'stlouis',
        'image': 'assets/newimgs/pexels-george-tsai-17214-12349901.jpg',
        'overlay': 'Emerging Caribbean Hub For Confidential Asset Holding',
        'pill': 'CARIBBEAN | ST. LOUIS ISLAND',
        'title_prefix': 'St. Louis Island ',
        'title_em': 'Company Formation.',
        'desc': 'St. Louis Island provides a modern and flexible offshore incorporation framework. It is an emerging jurisdiction tailored for private asset holding, wealth management, and discreet international structuring.',
        'stats': [('AUTHORITY', 'Local Registrar'), ('FOCUS', 'Wealth Management'), ('BENEFITS', 'High Flexibility')],
        'bullets': ['Flexible offshore company legislation for global investors', 'Strong emphasis on private asset holding and wealth management', 'Highly confidential corporate structuring environment', 'Zero local taxation on international business activities'],
        'link': 'st-louis-island-offshore.html',
        'btn_text': 'VIEW DEDICATED PAGE ↗'
    }
]

html_output = []
html_output.append('      <!-- New Stacked Cards Framework Section -->\n')
html_output.append('      <div class="hero-reveal" id="jurisdictions" style="width: 100%; max-width: 1140px; margin: 90px auto 40px auto; padding: 32px 0;">\n')
html_output.append('        <!-- Header Banner Row -->\n')
html_output.append('        <div style="text-align: center; margin-bottom: 52px; max-width: 820px; margin-left: auto; margin-right: auto;">\n')
html_output.append('            <span class="label-pill" style="margin-bottom: 12px;">✦ AVAILABLE JURISDICTIONS</span>\n')
html_output.append('            <h3 style="font-family: var(--font-serif); font-size: clamp(2rem, 3.4vw, 2.7rem); font-weight: 400; color: var(--text-dark); margin: 0 0 16px 0;">Choose the Jurisdiction That <em style="font-style: italic; font-family: \'Cormorant Garamond\', serif; color: var(--brand-gold);">Fits Your Structure</em></h3>\n')
html_output.append('            <p style="font-size: 15px; color: var(--text-muted); line-height: 1.7;">The right jurisdiction depends on your business activity, objectives, ownership structure and requirements. Maven Consults helps you evaluate available options and identify a suitable path forward.</p>\n')
html_output.append('        </div>\n\n')
html_output.append('        <div style="display: flex; flex-direction: column; gap: 48px;">\n')

for j in jurisdictions:
    card = f'''          <!-- CARD: {j['id']} -->
          <div style="display: flex; flex-wrap: wrap; background: #fff; border: 1px solid rgba(160,131,88,0.2); box-shadow: 0 12px 32px rgba(56,39,28,0.04);">
            <!-- Left Image Side -->
            <div style="flex: 1 1 45%; position: relative; min-height: 420px;">
              <img src="{j['image']}" alt="{j['title_prefix']} Company Formation" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              <!-- Overlay -->
              <div style="position: absolute; bottom: 24px; left: 24px; background: rgba(20,20,20,0.85); backdrop-filter: blur(10px); padding: 14px 20px; border-left: 3px solid var(--brand-gold); max-width: 85%;">
                <span style="font-size: 9px; font-weight: 700; letter-spacing: 1.8px; color: var(--brand-gold); text-transform: uppercase; display: block; margin-bottom: 4px;">KEY REGULATORY STATUS</span>
                <span style="font-size: 13px; color: #fff; font-weight: 500; line-height: 1.4;">{j['overlay']}</span>
              </div>
            </div>
            <!-- Right Content Side -->
            <div style="flex: 1 1 55%; padding: 48px 52px; display: flex; flex-direction: column; justify-content: center;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                <span style="font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--brand-gold);">{j['pill']}</span>
              </div>
              <h4 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-dark); font-weight: 400; margin-bottom: 16px;">{j['title_prefix']}<em style="font-style: italic; font-family: 'Cormorant Garamond', serif; color: var(--brand-gold);">{j['title_em']}</em></h4>
              <p style="font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 28px;">{j['desc']}</p>
              <!-- 3 Stats Boxes -->
              <div style="display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 110px; padding: 16px; background: rgba(160,131,88,0.04); border: 1px solid rgba(160,131,88,0.15); text-align: center;">
                  <span style="font-size: 9px; font-weight: 700; color: var(--brand-gold); letter-spacing: 1.5px; text-transform: uppercase; display: block; margin-bottom: 4px;">{j['stats'][0][0]}</span>
                  <span style="font-size: 12.5px; color: var(--text-dark); font-weight: 600;">{j['stats'][0][1]}</span>
                </div>
                <div style="flex: 1; min-width: 110px; padding: 16px; background: rgba(160,131,88,0.04); border: 1px solid rgba(160,131,88,0.15); text-align: center;">
                  <span style="font-size: 9px; font-weight: 700; color: var(--brand-gold); letter-spacing: 1.5px; text-transform: uppercase; display: block; margin-bottom: 4px;">{j['stats'][1][0]}</span>
                  <span style="font-size: 12.5px; color: var(--text-dark); font-weight: 600;">{j['stats'][1][1]}</span>
                </div>
                <div style="flex: 1; min-width: 110px; padding: 16px; background: rgba(160,131,88,0.04); border: 1px solid rgba(160,131,88,0.15); text-align: center;">
                  <span style="font-size: 9px; font-weight: 700; color: var(--brand-gold); letter-spacing: 1.5px; text-transform: uppercase; display: block; margin-bottom: 4px;">{j['stats'][2][0]}</span>
                  <span style="font-size: 12.5px; color: var(--text-dark); font-weight: 600;">{j['stats'][2][1]}</span>
                </div>
              </div>
              <!-- Bullets -->
              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 36px;">'''
    for bullet in j['bullets']:
        card += f'''
                <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: var(--text-muted);">
                  <i class="fa-solid fa-check" style="color: var(--brand-gold); font-size: 12px; margin-top: 4px;"></i>
                  {bullet}
                </div>'''
    card += f'''
              </div>
              <!-- Buttons Row -->
              <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <a href="{j['link']}" class="btn-ribbon gold-ribbon-btn" style="padding: 12px 28px; font-size: 10px; letter-spacing: 1.8px;">
                  {j['btn_text']}
                </a>
                <a href="contact.html" style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: var(--text-dark); text-decoration: none; border-bottom: 1.5px solid var(--brand-gold); padding-bottom: 4px;">
                  BOOK A CONSULTATION →
                </a>
              </div>
            </div>
          </div>\n'''
    html_output.append(card)

html_output.append('        </div>\n')
html_output.append('      </div>\n')

with open('offshore-company-formation.html', 'r', encoding='utf-8') as f:
    content = f.read()

insert_marker = '<!-- SECTION 2: INTRODUCTION & PURPOSE (EDITORIAL BLENDED 2x2 GRID) -->'
idx = content.find(insert_marker)

if idx != -1:
    new_content = content[:idx] + ''.join(html_output) + '\n\n  ' + content[idx:]
    with open('offshore-company-formation.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully inserted before section 2.')
else:
    print('Marker not found.')
