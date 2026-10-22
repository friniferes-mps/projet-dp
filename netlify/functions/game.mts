import type { Config } from '@netlify/functions';
import { getDatabase } from '@netlify/database';
import { drizzle } from 'drizzle-orm/netlify-db';
import { eq } from 'drizzle-orm';
import { gameSessions } from '../../db/schema.js';
import { createEngine } from '../../lib/game.cjs';

export default async (request: Request) => {
  const url = new URL(request.url);
  const headers = { 'Cache-Control': 'no-store' };
  if (url.pathname === '/health') return Response.json({ ok: true }, { headers });
  if (!['GET', 'POST'].includes(request.method)) {
    return Response.json({ error: 'Méthode non autorisée' }, { status: 405, headers });
  }
  let data = {};
  if (request.method === 'POST') {
    const raw = await request.text();
    if (raw.length > 10000) return Response.json({ error: 'Requête trop volumineuse' }, { status: 413, headers });
    try {
      data = JSON.parse(raw || '{}');
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    } catch {
      return Response.json({ error: 'Requête invalide' }, { status: 400, headers });
    }
  }
  try {
    const db = drizzle({ client: getDatabase() });
    const result = await db.transaction(async (tx) => {
      await tx.insert(gameSessions).values({ id: 'live', state: null }).onConflictDoNothing();
      const [row] = await tx.select().from(gameSessions).where(eq(gameSessions.id, 'live')).for('update');
      const engine = createEngine(row.state, url.origin);
      const result = await engine.handle(request.method, url.pathname, data);
      const state = engine.getGame();
      if (JSON.stringify(state) !== JSON.stringify(row.state)) {
        await tx.update(gameSessions).set({ state }).where(eq(gameSessions.id, 'live'));
      }
      return result;
    });
    return Response.json(result.payload, { status: result.status, headers });
  } catch {
    return Response.json({ error: 'Connexion au jeu indisponible. Réessayez dans quelques instants.' }, { status: 503, headers });
  }
};

export const config: Config = { path: ['/api/*', '/health'] };
