// Lists every remaining TODO in the content files so none ship by accident.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'src', 'app', 'content');
const hits = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.ts') && !p.endsWith('models.ts')) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        if (line.includes('TODO')) hits.push(`${p.replace(process.cwd() + '/', '')}:${i + 1}  ${line.trim()}`);
      });
    }
  }
};
walk(root);
if (hits.length) {
  console.log(`${hits.length} TODO(s) remaining in content:\n`);
  hits.forEach((h) => console.log('  ' + h));
  process.exitCode = 1;
} else {
  console.log('No TODOs left in content. Ready to ship.');
}
