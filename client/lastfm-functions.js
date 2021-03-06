
const LASTFM_API_KEY = '01e78b004a5c9c29701cc616093352ea';

/**
 *
 * @returns top 50 tracks from Last FM
 */
export async function getTopTracks() {
    const topTracksJSON = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json`);
    const result = (await topTracksJSON.json()).tracks.track.slice(0, 50);
    return result;
}

/**
 *
 * @param {string} query
 * @returns search results for albums
 */
export async function searchAlbums(query) {
    const searchJSON = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query.title}&api_key=${LASTFM_API_KEY}&format=json`);
    const result = (await searchJSON.json()).results.albummatches.album;
    return result;
}
