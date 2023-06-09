import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import hljs from "highlight.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import prettier from "prettier";
import babelParser from "prettier/parser-html";

// @ts-ignore
@customElement("code-preview")
export class CodePreview extends LitElement {
  // @ts-ignore
  @property({ type: String })
  private formattedHTML: any;

  constructor() {
    super();
    this.formattedHTML = "";
    this.handleSlotchange = this.handleSlotchange.bind(this);
  }

  static styles = [
    css`
      pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
      }
      code.hljs {
        padding: 3px 5px;
      }
      .hljs {
        color: #abb2bf;
        background: #282c34;
      }
      .hljs-comment,
      .hljs-quote {
        color: #5c6370;
        font-style: italic;
      }
      .hljs-doctag,
      .hljs-formula,
      .hljs-keyword {
        color: #c678dd;
      }
      .hljs-deletion,
      .hljs-name,
      .hljs-section,
      .hljs-selector-tag,
      .hljs-subst {
        color: #e06c75;
      }
      .hljs-literal {
        color: #56b6c2;
      }
      .hljs-addition,
      .hljs-attribute,
      .hljs-meta .hljs-string,
      .hljs-regexp,
      .hljs-string {
        color: #98c379;
      }
      .hljs-attr,
      .hljs-number,
      .hljs-selector-attr,
      .hljs-selector-class,
      .hljs-selector-pseudo,
      .hljs-template-variable,
      .hljs-type,
      .hljs-variable {
        color: #d19a66;
      }
      .hljs-bullet,
      .hljs-link,
      .hljs-meta,
      .hljs-selector-id,
      .hljs-symbol,
      .hljs-title {
        color: #61aeee;
      }
      .hljs-built_in,
      .hljs-class .hljs-title,
      .hljs-title.class_ {
        color: #e6c07b;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: 700;
      }
      .hljs-link {
        text-decoration: underline;
      }

      .container {
        display: flex;
        flex-direction: row;
        gap: 1em;
        border: 1px solid #444;
        position: relative;
      }
      pre.html {
        width: 0;
        flex: 1;
        font-size: 0.5em;
        text-align: left;
        margin: 0;
      }
      pre.html::before {
        content: "HTML";
        font-size: 0.75rem;
        font-weight: bold;
        padding: 0.25em;
        border: 1px solid #444;
        position: absolute;
        border: 1px solid #444;
        top: 0;
        left: 0;
        color: #777;
      }
      .preview {
        width: 0;
        flex: 1;
        font-size: 0.6em;
        position: relative;
        border-left: 1px solid #444;
        padding: 1rem;
      }
      .preview::before {
        content: "Preview";
        font-size: 0.75rem;
        font-weight: bold;
        padding: 0.25em;
        border: 1px solid #444;
        color: #777;
        position: absolute;
        top: 0;
        left: 0;
      }
    `,
  ];

  render() {
    return html`
      <div class="container">
        <pre class="html">
          <code class="hljs" id="code-block">${unsafeHTML(
          this.formattedHTML
        )}</code>
        </pre>

        <div class="preview">
          <slot @slotchange=${this.handleSlotchange}></slot>
        </div>
      </div>
    `;
  }

  handleSlotchange(e: any) {
    const childNodes = e.target.assignedNodes();
    this.formattedHTML = childNodes
      .map((node: any) => node.outerHTML)
      .filter((outerHtml: string) => {
        console.log(outerHtml);
        return !!outerHtml && outerHtml !== "/n";
      })
      .join("\n");

    this.formattedHTML = prettier.format(this.formattedHTML, {
      parser: "html",
      plugins: [babelParser],
    });

    this.formattedHTML = hljs
      .highlight("html", this.formattedHTML)
      .value.trim();
  }
}
