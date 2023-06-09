import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

let deck = new Reveal({
  plugins: [Markdown, RevealHighlight],
});
deck.initialize({
  hash: true,
});

import "./code-preview";
import "./element-heading";
