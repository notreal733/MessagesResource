import { Component, OnChanges, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';



import { MsgsResource } from 'messages-resource/src/MsgsResource';
// Note: Assuming you have a preference manger, or a global class that holds current locale
import { PreferenceManagerService } from '../../../../your_services/Preference/YOUR_Preference-manager.service';


@Component({
	selector: 'message-resource',
	templateUrl: './message-resource.component.html',
	styleUrls: ['./message-resource.component.css']
})
export class MessageResourceComponent implements OnChanges, OnInit {
	private oDebug: boolean = true;
	private oMsgsResource: MsgsResource;
	private oPreferencesService: PreferenceManagerService;
	@Output()
	public oMessage: EventEmitter<string>;

	@Input()
	public oBundle: string;
	@Input()
	public oName: string;
	@Input()
	public oLocale: string;
	@Input()
	public oArguments: any[];
	constructor(private varPreferencesService: PreferenceManagerService) {
		this.oMsgsResource = MsgsResource.getInstance();
		this.oPreferencesService = varPreferencesService;
		this.oMessage = new EventEmitter<string>();
	}

	ngOnInit(): void {
		// Subscribe to the globale locale change emmiter
		this.oPreferencesService.oLocaleEmmiter.subscribe((varLocale: string) => {
			if (this.oLocale !== varLocale) {
				this.oLocale = varLocale;
				this.setMessage();
			}
		});
		if (this.oArguments && typeof this.oArguments === 'string')
			this.setArguments(this.oArguments);
		this.setMessage();
	}

	// We need this to update message on page when the locale changes elsewhere
	ngOnChanges(varChanges: SimpleChanges) {
		let tmpChanges: boolean = false;
		for (const propName in varChanges) {
			if (varChanges.hasOwnProperty(propName)) {

				if (propName === 'oBundle' && varChanges[propName].currentValue !== this.oBundle) {
					tmpChanges = true;
					this.oBundle = varChanges[propName].currentValue;
				}
				else if (propName === 'oName' && varChanges[propName].currentValue !== this.oName) {
					tmpChanges = true;
					this.oName = varChanges[propName].currentValue;
				}
				else if (propName === 'oLocale' && varChanges[propName].currentValue !== this.oLocale) {
					tmpChanges = true;
					this.oLocale = varChanges[propName].currentValue;
				}
				else if (propName === 'oArguments' && varChanges[propName].currentValue !== this.oArguments) {
					tmpChanges = true;
					this.setArguments(varChanges[propName].currentValue);
				}
			}
		}
		if (tmpChanges)
			this.setMessage();
	}

	private setArguments(varValue: string) {
		if (varValue.indexOf(',') != -1) {
			this.oArguments = varValue.split(/ ,|, |,/);
		}
		else
			this.oArguments = [varValue];
	}
	private async setMessage() {
		if (this.oLocale == null)
			this.oLocale = this.oPreferencesService.getLocale();
		await this.oMsgsResource.getMessage(this.oBundle, this.oLocale, this.oName, this.oArguments).//
			then(varText => { //
				if (varText === undefined && this.oDebug)
					this.oMessage.emit("Error: resource not found for Bundle " + this.oBundle + " : " + this.oLocale + " : " + this.oName + " : " + this.oArguments);
				else {
					this.oMessage.emit(varText); 
				}
			}).catch((error) => {
				if (this.oDebug) this.oMessage.emit("Error: resource not found");
				console.log("MessageResourceComponent::setMessage error : " + error);
			});
	}
}
