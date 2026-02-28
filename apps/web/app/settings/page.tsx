'use client';

import { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Copy, Check, AlertCircle } from 'lucide-react';

interface PersonalAccessToken {
  id: string;
  name: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export default function SettingsPage() {
  const [tokens, setTokens] = useState<PersonalAccessToken[]>([]);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenExpiry, setNewTokenExpiry] = useState('');
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

  const getAuthHeader = (): Record<string, string> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchTokens = async () => {
    try {
      const res = await fetch(`${apiBase}/auth/pat`, {
        headers: getAuthHeader(),
      });
      if (res.ok) {
        setTokens(await res.json());
      }
    } catch {
      // silently ignore on initial load
    }
  };

  const createToken = async () => {
    if (!newTokenName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const body: { name: string; expiresAt?: string } = { name: newTokenName.trim() };
      if (newTokenExpiry) body.expiresAt = new Date(newTokenExpiry).toISOString();

      const res = await fetch(`${apiBase}/auth/pat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to create token');

      const data = await res.json();
      setCreatedToken(data.token);
      setNewTokenName('');
      setNewTokenExpiry('');
      await fetchTokens();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const revokeToken = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`${apiBase}/auth/pat/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error('Failed to revoke token');
      setTokens((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const copyToken = async () => {
    if (!createdToken) return;
    await navigator.clipboard.writeText(createdToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load tokens on mount
  useEffect(() => {
    fetchTokens();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and personal access tokens.</p>
      </div>

      {/* PAT Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
            <Key size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal Access Tokens</h2>
            <p className="text-sm text-slate-500">Use tokens to authenticate API requests programmatically.</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* New token revealed */}
        {createdToken && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg space-y-3">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">
              Token created — copy it now. It will not be shown again.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 overflow-x-auto text-slate-800 dark:text-slate-200">
                {createdToken}
              </code>
              <button
                onClick={copyToken}
                className="shrink-0 p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                title="Copy token"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
            <button
              onClick={() => setCreatedToken(null)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Create new token form */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Create new token</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Token name (e.g. CI pipeline)"
              value={newTokenName}
              onChange={(e) => setNewTokenName(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              title="Expiration date (optional)"
              value={newTokenExpiry}
              onChange={(e) => setNewTokenExpiry(e.target.value)}
              className="sm:w-44 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={createToken}
              disabled={loading || !newTokenName.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus size={16} />
              {loading ? 'Creating…' : 'Create token'}
            </button>
          </div>
        </div>

        {/* Token list */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Active tokens</h3>
          {tokens.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              No personal access tokens yet.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              {tokens.map((token) => (
                <li
                  key={token.id}
                  className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{token.name}</p>
                    <p className="text-xs text-slate-400">
                      Created {new Date(token.createdAt).toLocaleDateString()}
                      {token.lastUsedAt && ` · Last used ${new Date(token.lastUsedAt).toLocaleDateString()}`}
                      {token.expiresAt && ` · Expires ${new Date(token.expiresAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <button
                    onClick={() => revokeToken(token.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Revoke token"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
