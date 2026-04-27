import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('href="/me/logo.jpeg"', 'href="./assets/me/logo.jpeg"')
content = content.replace('src="/assets/reviews/David.jpg"', 'src="./assets/reviews/david.jpg"')
content = content.replace('src="/assets/reviews/Kemi.jpg"', 'src="./assets/reviews/kemi.jpg"')
content = content.replace('src="/assets/reviews/Chinedu.jpg"', 'src="./assets/reviews/chinedu.jpg"')
content = content.replace('src="/assets/', 'src="./assets/')
content = content.replace('href="/assets/', 'href="./assets/')

if 'color-scheme' not in content:
    content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="color-scheme" content="dark" />')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('background: #ffffff;', 'background: var(--ivory);')

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Done')