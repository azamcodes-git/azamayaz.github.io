/**
 * Minimal GitHub Contents API client for the admin panel. Runs entirely in the
 * owner's browser with a personal access token they provide — nothing is ever
 * sent anywhere except api.github.com.
 */

export const GH_OWNER = 'azamcodes-git';
export const GH_REPO = 'azamayaz.github.io';
export const GH_BRANCH = 'main';
export const CONTENT_PATH = 'public/content.json';
export const ACTIONS_URL = `https://github.com/${GH_OWNER}/${GH_REPO}/actions`;

const API = 'https://api.github.com';

function headers(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function fail(res: Response): Promise<never> {
  let detail = '';
  try {
    detail = ((await res.json()) as { message?: string }).message ?? '';
  } catch {
    /* non-JSON error body */
  }
  throw new Error(`GitHub API ${res.status}${detail ? `: ${detail}` : ''}`);
}

/** Verifies the token and returns the authenticated user's login. */
export async function ghUser(token: string): Promise<{ login: string }> {
  const res = await fetch(`${API}/user`, { headers: headers(token) });
  if (!res.ok) await fail(res);
  return (await res.json()) as { login: string };
}

function decodeBase64Utf8(b64: string): string {
  const bin = atob(b64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

/** Reads content.json from the repo. Returns null when the file doesn't exist yet. */
export async function ghGetContentFile(
  token: string,
): Promise<{ text: string; sha: string } | null> {
  const res = await fetch(
    `${API}/repos/${GH_OWNER}/${GH_REPO}/contents/${CONTENT_PATH}?ref=${GH_BRANCH}`,
    { headers: headers(token) },
  );
  if (res.status === 404) return null;
  if (!res.ok) await fail(res);
  const data = (await res.json()) as { content: string; sha: string };
  return { text: decodeBase64Utf8(data.content), sha: data.sha };
}

/** Creates or updates content.json — this commit triggers the auto-deploy workflow. */
export async function ghPutContentFile(
  token: string,
  jsonText: string,
  sha?: string,
): Promise<{ sha: string }> {
  const res = await fetch(`${API}/repos/${GH_OWNER}/${GH_REPO}/contents/${CONTENT_PATH}`, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'content: update via admin panel',
      content: encodeBase64Utf8(jsonText),
      branch: GH_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) await fail(res);
  const data = (await res.json()) as { content: { sha: string } };
  return { sha: data.content.sha };
}
