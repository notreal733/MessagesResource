import { MsgsResource } from './MsgsResource';

export class MessageResourceTag extends HTMLElement {
	private oRendered: boolean = false;
	private oLocale!: string;
	private oBundle!: string;
	private oName!: string;
	private oArguments!: any[];
	constructor() {
		super();
		this.style.background = "#00ff00";

		//		this.style.border = "1px";
		//		this.style.borderColor = "red";
		//		this.style.borderStyle = "solid";
		//		this.innerHTML = "<div>SimpleCustomHTMLElements first child is a div <span class=\"SimpleCustomHTMLElements-SpanChild\"> <br />inside first child, a span child 12312-18220=2A<br /></span></<div>";
		console.log("Created custom element SimpleCustomHTMLElements !");
	}
	async render() {
		console.log("  SimpleCustomHTMLElements !" + await MsgsResource.getInstance().getMessage(this.oBundle, this.oLocale, this.oName, this.oArguments));

		this.innerText = await MsgsResource.getInstance().getMessage(this.oBundle, this.oLocale, this.oName, this.oArguments) as string;
		this.oRendered = true;
	}
	connectedCallback() {
		if (this.oRendered == false) {
			this.render();
		}
	}


	setAttribute(varName: string, varValue: string): void {
		if (varName == 'oBundle')
			this.oBundle = varValue;
		if (varName == 'oLocale')
			this.oLocale = varValue;
		if (varName == 'oName')
			this.oName = varValue;
		if (varName == 'oArguments') {
			if (varValue.indexOf(',') != -1) {
				this.oArguments = varValue.split(/ ,|, |,/);
			}
			else
				this.oArguments = [varValue];
		}
	}

	static get observedAttributes() { return ['oLocale']; }

	attributeChangedCallback(varName: string, varOldValue: string, varNewValue: string) {
		if (varName === 'oLocale' && varNewValue !== this.oLocale && varOldValue != varNewValue) {
			this.oRendered = false;
			this.oLocale = varNewValue;
			this.render();
		}
	}
}

window.customElements.define("message-resource", MessageResourceTag);
