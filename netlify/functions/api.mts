import type { Config } from '@netlify/functions';
import { getDatabase } from '@netlify/database';
import engine from '../../lib/game.cjs';

export default async (request: Request) => {
  const url = new URL(request.url);
  const headers = { 'Cache-Control': 'no-store' };
  if (!['GET', 'POST'].includes(request.method)) {
    return Response.json({ error: 'Méthode non autorisée' }, { status: 405, headers });
  }
  let payload = {};
  if (request.method === 'POST') {
    const raw = await request.text();
    if (raw.length > 10000) return Response.json({ error: 'Requête trop volumineuse' }, { status: 413, headers });
    try {
      payload = raw ? JSON.parse(raw) : {};
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error();
    } catch {
      return Response.json({ error: 'Requête invalide' }, { status: 400, headers });
    }
  }
  let client;
  try {
    client = await getDatabase().pool.connect();
    await client.query('BEGIN');
    await client.query('INSERT INTO emotion_game (id, state) VALUES (1, $1::jsonb) ON CONFLICT (id) DO NOTHING', [JSON.stringify(engine.initialGame())]);
    // Serialize updates so simultaneous votes and presenter actions cannot overwrite each other.
    const { rows } = await client.query('SELECT state FROM emotion_game WHERE id = 1 FOR UPDATE');
    const before = JSON.stringify(rows[0].state);
    const result = await engine.dispatch(rows[0].state, request.method, url.pathname, payload, url.origin);
    const after = JSON.stringify(result.game);
    if (after !== before) await client.query('UPDATE emotion_game SET state = $1::jsonb WHERE id = 1', [after]);
    await client.query('COMMIT');
    return Response.json(result.data, { status: result.status, headers });
  } catch {
    if (client) await client.query('ROLLBACK').catch(() => {});
    return Response.json({ error: 'Connexion au jeu indisponible. Réessayez dans quelques instants.' }, { status: 503, headers });
  } finally {
    client?.release();
  }
};

export const config: Config = { path: '/api/*' };
