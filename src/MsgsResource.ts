import { Bundle } from './Bundle'

export class MsgsResource {

	private static oInstance: MsgsResource;
	private oBundles: Map<string, Bundle>;

	private constructor() {
		this.oBundles = new Map();
	}

	public static getInstance(): MsgsResource {
		if (!MsgsResource.oInstance) {
			MsgsResource.oInstance = new MsgsResource();
		}
		return MsgsResource.oInstance;
	}


	public async registerBundle(varSourceFile: string): Promise<boolean> {
		let tmpBundle = await Bundle.CreateBundle(varSourceFile);
		if (tmpBundle.getName() !== undefined && this.oBundles.get(tmpBundle.getName()) === undefined) {
			this.oBundles.set(tmpBundle.getName(), tmpBundle);
			return (true);
		}
		return false;
	}

	public removeBundle(varBundleName: string): boolean {
		let tmpBundle = this.oBundles.get(varBundleName);
		if (tmpBundle === undefined)
			return (false);
		this.oBundles.delete(varBundleName)
		return (true);
	}

	public removeAllBundles(): boolean {
		if (this.oBundles.size > 0) {
			this.oBundles.clear();
			return (true);
		}
		return (false);
	}
	public removeLocale(varLocalName: string): boolean {
		if (this.oBundles.size > 0) {
			let tmpBundle;
			let removedCount: number = 0;
			for (let aBundle of this.oBundles.keys()) {
				tmpBundle = this.oBundles.get(aBundle);
				if (tmpBundle!.removeLocale(varLocalName))
					removedCount++;
			}
			return (removedCount > 0);
		}
		return (false);
	}
	public getBundleLoadedLocales(varBundleName: string): string[] | undefined {
		let tmpBundle = this.oBundles.get(varBundleName);
		if (tmpBundle === undefined)
			return (undefined);
		return (tmpBundle.getLoadedLocales());
	}

	public getAvailableLocales(varBundleName: string): string[] | undefined {
		let tmpBundle = this.oBundles.get(varBundleName);
		if (tmpBundle === undefined)
			return (undefined);
		return (tmpBundle.getAvailableLocales());
	}


	public getUpdateTime(varBundleName: string): Date | undefined {
		let tmpBundle = this.oBundles.get(varBundleName);
		if (tmpBundle === undefined)
			return (undefined);
		return (tmpBundle.getUpdateTime());
	}


	public getLoadedBundles(): string[] {
		let tmpList: string[] = [];

		for (let aBundle of this.oBundles.keys())
			tmpList.push(aBundle);

		return (tmpList);
	}

	public async getMessage(varBundle: string, varLocale: string, varKey: string, ...varArguments: any[]): Promise<string | undefined> {
		let theBundle = this.oBundles.get(varBundle);
		if (theBundle === undefined)
			return (undefined);
		let theMessage = await theBundle.getMessage(varLocale, varKey);
		if (theMessage !== undefined) {
			if (varArguments == null || varArguments === undefined || varArguments[0] === undefined || varArguments.length == 0) //
				return (theMessage);

				
			let tmpVariables: any[];
			if (varArguments.length == 1 && varArguments[0].length !== undefined)
				tmpVariables = varArguments[0];
			else
				tmpVariables = varArguments;
			let tmpFormatedMessage = theMessage.replace(/{(\d+)}/g, function(varMatched: string, varIndex: number) {
				if (varMatched && typeof tmpVariables[varIndex] === 'undefined') {
					return ("");
				}
				else {
					return tmpVariables[varIndex];
				}
			});
			return (tmpFormatedMessage);
		}
		return (undefined);

	}

}