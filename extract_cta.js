const fs = require('fs');
const lines = fs.readFileSync('C:/Users/dell/.gemini/antigravity-cli/brain/a799eaba-99a8-4cba-8057-bdb28b976b6b/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');
const messages = lines.filter(l => l.includes('USER_INPUT') && l.includes('CtaSection3')).map(l => JSON.parse(l));
const content = messages[1].content;
let match = content.split('// --- Component ---')[1];
if (match) {
  match = match.split('</USER_REQUEST>')[0].trim();
  fs.writeFileSync('src/components/CtaSection.tsx', match);
  console.log('Saved CTA to src/components/CtaSection.tsx');
} else {
  console.log('Not found');
}
