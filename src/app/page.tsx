'use client';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

export default function ChatlyHome() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const MIN_LENGTH = 1;
  const isURL = input.trim().startsWith('http://') || input.trim().startsWith('https://');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error finding answer:', error);
      setSummary('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="relative min-h-screen bg-white text-black dark:bg-[#0D0D0D] dark:text-white flex items-center justify-center px-4 py-10 transition-all duration-500 ease-in-out">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md transition-colors duration-300 bg-white/80 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 backdrop-blur-sm cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-500" />
            )}
          </Button>
        </div>

        <div className="max-w-2xl w-full text-center space-y-10 z-10 px-2 sm:px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-text-glow">
            Cha<span className="text-cyan-400">tly</span>
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">Your AI assistant for quick answers and blog summaries.</p>

          {/* Chatbox Form */}
          <form
            onSubmit={handleSubmit}
            className="glow-box flex flex-col gap-4 bg-gradient-to-br from-[#0ea5e9] via-[#3b82f6] to-[#6366f1] bg-opacity-90 p-6 rounded-2xl border border-blue-400 relative z-10 backdrop-blur-lg transition-all duration-500 ease-in-out"
          >
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              rows={5}
              placeholder="Ask away!"
              className="bg-white/10 text-white border border-white/40 placeholder:text-white/90 focus:ring-2 focus:ring-white focus:outline-none p-3 rounded-md transition-all duration-300"
            />

            {error && (
              <p className="text-sm text-red-200 text-left px-1">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || (!isURL && input.trim().length < MIN_LENGTH)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition-all duration-300 disabled:opacity-60 shadow-md"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  loading...
                </div>
              ) : 'Done'}
            </Button>
          </form>

          {/* Output Summary */}
          {summary && (
            <Card className="bg-neutral-100 dark:bg-neutral-900 text-left border border-neutral-300 dark:border-neutral-700 shadow-lg transition-all duration-500">
              <CardContent className="p-6 space-y-2">
                <h2 className="text-cyan-400 text-xl font-bold">Answer:</h2>
                <p className="whitespace-pre-line">{summary}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes text-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }

        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite;
        }

        .glow-box {
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.7);
          }
        }
      `}</style>
    </main>
  );
}
