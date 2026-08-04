const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\dell\\.gemini\\antigravity-cli\\brain\\a799eaba-99a8-4cba-8057-bdb28b976b6b\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let pageTsxContent = null;
  let ctaSectionContent = null;
  let faqContent = null;

  for await (const line of rl) {
    const data = JSON.parse(line);
    if (data.step_index >= 503) {
      break; // Stop at user's request
    }
    
    if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'write_to_file' || call.name === 'replace_file_content') {
          const target = call.args.TargetFile;
          if (target && target.includes('page.tsx') && !target.includes('pos')) {
            pageTsxContent = call.args.CodeContent || call.args.ReplacementContent;
          }
          if (target && target.includes('CtaSection.tsx')) {
            ctaSectionContent = call.args.CodeContent || call.args.ReplacementContent;
          }
          if (target && target.includes('FAQ.tsx')) {
            faqContent = call.args.CodeContent || call.args.ReplacementContent;
          }
        }
      }
    }
  }

  if (pageTsxContent) fs.writeFileSync('page.tsx.backup', pageTsxContent);
  if (ctaSectionContent) fs.writeFileSync('CtaSection.tsx.backup', ctaSectionContent);
  if (faqContent) fs.writeFileSync('FAQ.tsx.backup', faqContent);
  
  console.log('Extraction complete.');
}

extract();
