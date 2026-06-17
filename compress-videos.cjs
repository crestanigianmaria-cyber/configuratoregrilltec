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
        '-c:v libx264',
        '-crf 28',            // good quality, very small size
        '-preset fast',       // fast compression
        '-an',                // strip audio completely (videos are muted anyway)
        '-movflags +faststart', // enables browser streaming immediately (CRITICAL for Netlify speed!)
        '-vf scale=-2:1080'   // scale down to max 1080p, keeps aspect ratio
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
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.mp4'));
  for (const file of files) {
    if (file === 'fiamma.mp4') continue; // Skip the old unused flame
    await compressVideo(path.join(publicDir, file));
  }
  console.log('All videos compressed successfully!');
}

run();
