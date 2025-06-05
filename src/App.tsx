import { Settings, ClipboardCopy, Expand, Shrink } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea.tsx';
import { SnippetGroup, Snippet, parseConfig } from '@/lib/snippets';

export function App() {
  // state for snippets dialog
  const [open, setOpen] = useState(false);
  // snippet groups
  const [snippetGroups, setSnippetGroups] = useState<SnippetGroup[]>([]);
  // recent snippets
  const [recentSnippets, setRecentSnippets] = useState<Snippet[]>([]);

  // state for settings dialog
  const [openSettings, setOpenSettings] = useState(false);
  // snippet config (markdown string)
  const [config, setConfig] = useState('');
  // config saved
  const [isSaved, setIsSaved] = useState(true);
  // config saved message
  const [message, setMessage] = useState('');
  // full screen state
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    // load snippet settings from local storage
    chrome.storage.local.get(['config'], (result) => {
      const config = result.config || '';
      setConfig(config);
      setSnippetGroups(parseConfig(config));
    });
  }, []);

  useEffect(() => {
    // load recent snippets from local storage
    chrome.storage.local.get(['recentSnippets'], (result) => {
      const recentSnippets = result.recentSnippets || [];
      setRecentSnippets(recentSnippets);
    });
  }, []);

  const updateRecentSnippets = (snippet: Snippet) => {
    chrome.storage.local.get(['recentSnippets'], (result) => {
      let recentSnippets: Snippet[] = result.recentSnippets || [];
      recentSnippets = recentSnippets.filter((s) => s.name !== snippet.name); // remove snippet if already exists
      recentSnippets.unshift(snippet); // add to top of array
      if (recentSnippets.length > 3) {
        recentSnippets.pop(); // max 3 recent snippets
      }

      chrome.storage.local.set({ recentSnippets: recentSnippets }, () => {
        setRecentSnippets(recentSnippets);
      });
    });
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleSnippetSelect = (snippet: Snippet) => {
    // This div is ProseMirror editor
    const div = document.getElementById('prompt-textarea') as HTMLDivElement;
    if (div) {
      // remove placeholder p tag
      const placeholderP = div.querySelector('p[data-placeholder]');
      if (placeholderP) {
        div.removeChild(placeholderP);
      }

      // append snippet
      const lines = snippet.body.split('\n');
      lines.forEach((line) => {
        const p = document.createElement('p');
        p.textContent = line;
        div.appendChild(p);
      });

      // focus textarea
      setTimeout(() => {
        div.focus();
      }, 0);

      updateRecentSnippets(snippet);
    }
    setOpen(false);
  };

  const handleOpenSettings = () => {
    setOpenSettings(true);
    setOpen(false);
    setIsFullScreen(false);
  };

  const handleSave = () => {
    // Save snippet settings to local storage
    chrome.storage.local.set({ config: config }, () => {
      setSnippetGroups(parseConfig(config));
      setIsSaved(true);
      setMessage('Changes have been saved');

      // Clear recent snippets
      // Because the snippet settings have changed, the recent snippets may no longer be in sync with the current settings.
      chrome.storage.local.set({ recentSnippets: [] }, () => {
        setRecentSnippets([]);
      });

      setTimeout(() => {
        setMessage(''); // clear message
      }, 3000);
    });
  };

  return (
    <>
      {/* Snippets Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput className="cps-border-none" style={{ boxShadow: 'none' }} placeholder="Type to search prompt snippets..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {recentSnippets.length > 0 && (
            <CommandGroup heading="Recently Used">
              {recentSnippets.map((snippet, sIndex) => {
                return (
                  <CommandItem key={`recent-snippet-${sIndex}`} value={`Recent/${snippet.name}/${snippet.description}`} onSelect={() => handleSnippetSelect(snippet)}>
                    <div className="cps-flex cps-items-center cps-gap-x-3">
                      <ClipboardCopy className="cps-h-4 cps-w-4 cps-text-slate-500" />
                      <div className="cps-flex cps-flex-col cps-gap-y-1">
                        <div className="cps-text-sm cps-text-slate-900 cps-dark:text-slate-50">{snippet.name}</div>
                        {snippet.description !== '' && <div className="cps-text-xs cps-text-slate-500 cps-dark:text-slate-400">{snippet.description}</div>}
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          {snippetGroups.map((snippetGroup, gIndex) => {
            return (
              <CommandGroup key={`group-${gIndex}`} heading={snippetGroup.name}>
                {snippetGroup.snippets.map((snippet, sIndex) => {
                  return (
                    <CommandItem key={`snippet-${gIndex}-${sIndex}`} value={`${snippetGroup.name}/${snippet.name}/${snippet.description}`} onSelect={() => handleSnippetSelect(snippet)}>
                      <div className="cps-flex cps-items-center cps-gap-x-3">
                        <ClipboardCopy className="cps-h-4 cps-w-4 cps-text-slate-500" />
                        <div className="cps-flex cps-flex-col cps-gap-y-1">
                          <div className="cps-text-sm cps-text-slate-900 cps-dark:text-slate-50">{snippet.name}</div>
                          {snippet.description !== '' && <div className="cps-text-xs cps-text-slate-500 cps-dark:text-slate-400">{snippet.description}</div>}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
        <div className="cps-flex cps-justify-end cps-items-center cps-py-1 cps-px-2 cps-border-t cps-border-gray-200 cps-dark:border-gray-700">
          {snippetGroups.length === 0 && <div className="cps-flex-1 cps-text-right cps-text-amber-500 cps-mr-1">There are no valid snippets. Check the configuration →</div>}
          <Button variant="ghost" className="cps-text-xs cps-px-2 cps-h-8" onClick={handleOpenSettings}>
            <Settings className="cps-mr-2 cps-h-4 cps-w-4" /> Settings
          </Button>
        </div>
      </CommandDialog>

      {/* Settings Dialog */}
      <Dialog open={openSettings} onOpenChange={setOpenSettings}>
        <DialogContent className={`cps-flex cps-flex-col cps-justify-start ${isFullScreen ? 'cps-h-screen cps-w-screen cps-max-w-full cps-sm:rounded-none cps-sm:border-none cps-sm:shadow-none' : ''}`}>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="cps-w-full cps-flex-1 cps-flex cps-flex-col cps-gap-y-2">
            <p>
              Enter your prompt snippets in the box below. The format is Markdown. For more details, see the{' '}
              <a href="https://github.com/kohkimakimoto/chatgpt-prompt-snippets-chrome-extension#configuration" target="_blank" className="cps-text-blue-500">
                Configuration document
              </a>
              .
            </p>
            <div className={`cps-relative ${isFullScreen ? 'cps-h-full' : ''}`}>
              <Textarea
                className={`cps-min-h-[240px] ${isFullScreen ? 'cps-h-full' : ''}`}
                value={config}
                onChange={(e) => {
                  setConfig(e.target.value);
                  setIsSaved(false);
                }}
              />
              <Button variant="ghost" size="icon" className="cps-absolute cps-top-0 cps-right-0 cps-hover:bg-transparent" onClick={handleFullScreenToggle}>
                {isFullScreen ? <Shrink className="cps-h-4 cps-w-4" /> : <Expand className="cps-h-4 cps-w-4" />}
              </Button>
            </div>
            {!isSaved && <p className="cps-text-red-500">You have unsaved changes.</p>}
            {isSaved && message && <p className="cps-text-green-500">{message}</p>}
          </div>
          <DialogFooter>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}