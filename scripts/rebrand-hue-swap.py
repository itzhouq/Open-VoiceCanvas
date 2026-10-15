#!/usr/bin/env python3
"""VoiceWove rebrand hue swap: purple/pink family -> teal/cyan/emerald family."""
import re, os

ROOT = '/Users/itzhouq/my-sites/Open-VoiceCanvas'
files = os.popen(
    "cd %s && grep -rlE 'purple-|pink-|fuchsia-|violet-' app components --include='*.tsx' --include='*.ts'" % ROOT
).read().split()

print(f'待替换文件: {len(files)}')
repl = [('purple-', 'teal-'), ('pink-', 'cyan-'), ('fuchsia-', 'emerald-'), ('violet-', 'emerald-')]
changed = 0
for rel in files:
    path = os.path.join(ROOT, rel)
    with open(path, 'r', encoding='utf-8') as fh:
        src = fh.read()
    new = src
    for a, b in repl:
        new = re.sub(a, b, new)
    new = re.sub(r'\bblue-(200|300|400|500|600|700)\b', lambda m: f'cyan-{m.group(1)}', new)
    if new != src:
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(new)
        changed += 1

print(f'实际写入: {changed} 个文件')
