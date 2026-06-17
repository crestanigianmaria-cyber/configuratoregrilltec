const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

const publicDir = path.join(__dirname, 'public');

function compressVideo(inputPath) {
  return new Promise((resolve, reject) => {
    const tempPath = inputPath.replace('.mp4', '_temp.mp4');
    console.log(`Compressing ${path.basename(inputPath)}...`);
    
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v copy',          // DO NOT re-encode the video (100% original quality)
        '-an',                // strip audio completely (videos are muted anyway)
        '-movflags +faststart' // enables browser streaming immediately
      ])
      .save(tempPath)
      .on('end', () => {
        fs.renameSync(tempPath, inputPath);
        console.log(`Finished ${path.basename(inputPath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error compressing ${path.basename(inputPath)}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        resolve(); // Continue with next
      });
  });
}

async function run() {
  const dirs = [publicDir, path.join(publicDir, 'yellowstone')];
  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
      for (const file of files) {
        if (file === 'fiamma.mp4') continue;
        await compressVideo(path.join(dir, file));
      }
    }
  }
  console.log('All videos compressed successfully!');
}

run();
