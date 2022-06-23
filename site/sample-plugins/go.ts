import { EditorPlugin } from "../../src";
import { escapeHTML } from "../../src/shared/utils";
import BambooJoint from "./bamboojoint";

export const goPlugin: EditorPlugin = () => ({
    codeBlockProcessors: [
        {
            lang: "*",
            callback: (content, container) => {
                return new Promise<void>((resolve) => {
                    const density = window.devicePixelRatio || 1;
                    const goBoard = BambooJoint.render(content, {
                        scale: density,
                    });
                    if (goBoard) {
                        container.appendChild(goBoard.canvas);
                    } else {
                        container.innerHTML =
                            '<pre class="s-code-block"><code class="content-dom"></code></pre>';
                        (
                            container.querySelector(
                                ".content-dom"
                            ) as HTMLElement
                        ).innerHTML = content;
                    }
                    resolve();
                });
            },
        },
    ],
});
