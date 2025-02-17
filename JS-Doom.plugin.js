/**
 * @name JS-Doom
 * @description Opens JS-Doom in an iframe inside Discord.
 * @version 1.0.0
 * @author Aurora
 * @source https://danihre.github.io/jsdoom/
 */

module.exports = class DoomIframe {
    constructor() {
        this.iframe = null;
    }

    start() {
        this.createButton();
    }

    stop() {
        this.removeIframe();
        this.removeButton();
    }

    createButton() {
        this.button = document.createElement("button");
        this.button.innerText = "Open Doom";
        this.button.style.position = "fixed";
        this.button.style.bottom = "10px";
        this.button.style.right = "10px";
        this.button.style.zIndex = "10000";
        this.button.style.padding = "10px";
        this.button.style.backgroundColor = "#5865F2";
        this.button.style.color = "white";
        this.button.style.border = "none";
        this.button.style.borderRadius = "5px";
        this.button.style.cursor = "pointer";
        this.button.onclick = () => this.toggleIframe();
        document.body.appendChild(this.button);
    }

    removeButton() {
        if (this.button) {
            this.button.remove();
            this.button = null;
        }
    }

    createIframe() {
        this.iframe = document.createElement("iframe");
        this.iframe.src = "https://danihre.github.io/jsdoom/";
        this.iframe.style = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80vw;
            height: 80vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            border: 2px solid red;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        document.body.appendChild(this.iframe);
        this.button.innerText = "Close Doom";
        this.button.style.backgroundColor = "#b32a31";
        
        this.iframe.onload = () => {
            const iframeWindow = this.iframe.contentWindow;
            const iframeDocument = iframeWindow.document;
            iframeDocument.body.innerHTML = "";
            const overlay = iframeDocument.querySelector(".dosbox-overlay");
            if (overlay) {
                overlay.style.position = "absolute";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.transform = "scale(2)";
                
                setTimeout(() => {
                    overlay.dispatchEvent(new Event("click", { bubbles: true }));
                }, 1000);
            }
        };
    }

    removeIframe() {
        if (this.iframe) {
            this.iframe.remove();
            this.iframe = null;
            this.button.innerText = "Open Doom";
            this.button.style.backgroundColor = "#5865F2";
        }
    }

    toggleIframe() {
        if (this.iframe) {
            this.removeIframe();
        } else {
            this.createIframe();
        }
    }
};
