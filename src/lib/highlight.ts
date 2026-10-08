import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { bundledLanguages } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';

export type CodeLanguage = 'bash' | 'markdown' | 'text';

let highlighterPromise: ReturnType<typeof createHighlighterCore> | undefined;

const getHighlighter = () => {
  highlighterPromise ??= createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [bundledThemes['github-light'], bundledThemes['github-dark']],
    langs: [bundledLanguages.bash, bundledLanguages.markdown],
  });
  return highlighterPromise;
};

export const highlightCode = async (code: string, language: CodeLanguage) => {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: 'light',
  });
};
