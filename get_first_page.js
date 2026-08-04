const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\dell\\.gemini\\antigravity-cli\\brain\\a799eaba-99a8-4cba-8057-bdb28b976b6b\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const data = JSON.parse(line);
    
    // Look for tool response
    if (data.type === 'TOOL_RESPONSE' && data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.name === 'view_file' && call.output && call.output.includes('page.tsx')) {
          // Extract file content from the tool response output
          const output = call.output;
          const lines = output.split('\n');
          const fileLines = [];
          let started = false;
          for (const l of lines) {
            if (l.match(/^\d+:/)) {
              started = true;
              fileLines.push(l.substring(l.indexOf(':') + 2));
            } else if (started) {
              if (l.includes('The above content shows')) break;
            }
          }
          if (fileLines.length > 0) {
            fs.writeFileSync('page.tsx.original', fileLines.join('\n'));
            console.log('Original page.tsx extracted to page.tsx.original');
            return;
          }
        }
      }
    }
  }
}

extract();
