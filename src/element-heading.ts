import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

// @ts-ignores
@customElement("element-heading")
export class ElementHeading extends LitElement {
  @property({ type: String })
  private count: String | undefined;

  @property({ type: String })
  private element: string | undefined;

  static styles = [
    css`
      .counter {
        margin-left: 1rem;
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 40%;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 10rem;
        border: 3px solid #e83e8c;
        color: #fff;
      }
      .element-heading {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  render() {
    return html`<section>
      <h3 class="element-heading">
        &lt;${this.element} &gt;<span class="counter"
          >${this.count} of 122</span
        >
      </h3>
      <slot></slot>
    </section>`;
  }
}
