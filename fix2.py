import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src="./assets/reviews/Tayo.jpg"', 'src="./assets/reviews/tayo.jpg"')
content = content.replace('src="./assets/reviews/Felix.jpg"', 'src="./assets/reviews/felix.jpg"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
