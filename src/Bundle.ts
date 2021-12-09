//import * as NodeFS from 'fs';
//import * as NodePath from 'path';

//import { IBundle, IResource  } from './IResource'
import { IBundle, IResource, IResourcesRefereance } from './IResource'


export class Bundle implements IBundle {
	oBundle!: string;
	oRootPath!: string;
	oUpdateOn!: Date;
	oResourceRefereance!: IResourcesRefereance[]
	oAvailableLocales: string[] | undefined;
	oResources!: Map<string, IResource> | undefined;

	private constructor() {
	}

	public static CreateBundle = async (varJSONFilePath: string) => {
		const tmpNewObject = new Bundle();
		await tmpNewObject.readBundleFile(varJSONFilePath);
		return tmpNewObject;
	};
	async readBundleFile(varJSONFilePath: string): Promise<boolean> {
		try {
			await import('../assets/' + varJSONFilePath).then(module => {
				this.oBundle = module.oBundle;
				if (varJSONFilePath.lastIndexOf('/') != -1)
					this.oRootPath = varJSONFilePath.substr(0, varJSONFilePath.lastIndexOf('/'));
				else
					this.oRootPath = varJSONFilePath.substr(0, varJSONFilePath.lastIndexOf('\\'));
				this.oUpdateOn = module.oUpdateOn;
				this.oResourceRefereance = module.oResourceRefereance;
				this.oResources = new Map();
				this.oAvailableLocales = [];
				for (let aLanguage in this.oResourceRefereance)
					this.oAvailableLocales.push(aLanguage);
				return (true);

			});
		}
		catch (error) {
			console.log("Bundle:: readBundle an error occured while reading " + error)
			console.log("Bundle:: readBundle an error occured while reading " + varJSONFilePath)
		}
		return (false);
	}

	async readLocaleResource(varJSONFilePath: string, varLocale: string): Promise<number> {
		try {
			let aIResource: IResource = await import('../assets/' + varJSONFilePath); // IT has to see ../assets, otherwise coorect code will not be generated
			this.oResources!.set(varLocale, aIResource);
			return (Promise.resolve(0));
		}
		catch (error) {
			console.log("Bundle:: readLocaleResource an error occured while reading " + varJSONFilePath + " for locale : " + varLocale);
		}
		return (Promise.resolve(-1));

	}

	public async loadLocale(varLocale: string): Promise<number> {
		if (this.oResources!.get(varLocale) !== undefined)
			return (Promise.resolve(2));
		if (this.oAvailableLocales!.indexOf(varLocale) === -1)
			return (Promise.resolve(-2));
		let filePath: string | undefined = this.getLocaleFileName(varLocale);

		return (await this.readLocaleResource(this.oRootPath + '/' + filePath, varLocale)); //this doesnt work
	}
	public removeLocale(varLocale: string): boolean {
		let tmpResource = this.oResources!.get(varLocale);
		if (tmpResource !== undefined) {
			this.oResources!.delete(varLocale);
			return (true);
		}
		return (false);
	}
	private getLocaleFileName(varLocale: string): any {
		let tmpFileName = undefined;
		for (let aLanguage in this.oResourceRefereance) {
			if (aLanguage == varLocale) {
				tmpFileName = this.oResourceRefereance[aLanguage];
				break; // for coverage sake
			}
		}
		return (tmpFileName);
	}

	public async getMessage(varLocale: string, varKey: string): Promise<string | undefined> {
		let resource: IResource | undefined = await this.getResource(varLocale);

		if (resource === undefined) {
			console.log("Error: Resource message not found for " + varLocale + ": " + varKey);
		}
		else {
			return (resource.oResource[varKey]);
		}
		return (undefined)
	}
	private async getResource(varLocale: string): Promise<IResource | undefined> {
		let tmpIResource = this.oResources!.get(varLocale);
		if (tmpIResource != undefined)
			return (tmpIResource);
		if (await this.loadLocale(varLocale) >= 0)
			return (this.oResources!.get(varLocale));
		return (undefined);

	}
	public getLoadedLocales(): string[] {
		let tmpList: string[] = [];
		if (this.oResources !== undefined) {
			for (let language of this.oResources.keys()) {
				tmpList.push(language);
			}
		}
		return (tmpList);
	}

	public getAvailableLocales(): string[] {
		return (this.oAvailableLocales!);
	}

	public getName(): string {
		return (this.oBundle);
	}

	public getUpdateTime(): Date {
		return (this.oUpdateOn);
	}
}