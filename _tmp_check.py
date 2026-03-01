import re, pathlib, json
bad = []
for path in pathlib.Path('.').rglob('*.tsx'):
    text = path.read_text(encoding='utf-8')
    for i, line in enumerate(text.splitlines(), 1):
        for tag in re.finditer(r'<(h[1-6])[^>]*className="([^"]*)"', line):
            cls = tag.group(2)
            if 'tt-' not in cls:
                bad.append((str(path), i, cls.strip()))
if bad:
    print('\n'.join(f"{p}:{i} {c}" for p,i,c in bad))
else:
    print('OK')
