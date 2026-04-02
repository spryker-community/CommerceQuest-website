import { writeFileSync } from 'node:fs';
import ytdl from 'youtube-dl-exec';

const PLAYLIST_ID = 'PLJooqCSo73SiPKM3mlZzc7lGq5zEFQkRS';

async function main() {
  console.log('Fetching YouTube playlist...');

  const result = await ytdl(`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`, {
    flatPlaylist: true,
    dumpSingleJson: true,
    playlistEnd: 500,
  });

  const entries = (result.entries || []).map((item) => ({
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnails?.[item.thumbnails.length - 1]?.url || `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
  })).filter((v) => v.id && v.title);

  const groups = {
    'Hackathons': [],
    'User Groups': [],
    'AI & Development': [],
    'Community & Other': []
  };

  for (const video of entries) {
    const t = video.title.toLowerCase();
    if (t.includes('hackathon')) {
      groups['Hackathons'].push(video);
    } else if (t.includes('user group')) {
      groups['User Groups'].push(video);
    } else if (t.includes('ai') || t.includes('vibe coding')) {
      groups['AI & Development'].push(video);
    } else {
      groups['Community & Other'].push(video);
    }
  }

  const categories = Object.entries(groups)
    .filter(([, vids]) => vids.length > 0)
    .map(([name, videos]) => ({ name, videos }));

  writeFileSync('src/data/videos.json', JSON.stringify(categories, null, 2));
  console.log(`Wrote ${entries.length} videos to src/data/videos.json`);
}

main().catch((err) => {
  console.error('Failed to fetch videos:', err.message);
  process.exit(1);
});
