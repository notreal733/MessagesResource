

export interface IBundle {
	readonly oBundle: string;
	readonly oUpdateOn: Date;
	readonly oResourceRefereance: IResourcesRefereance[];
}
export interface IResourcesRefereance {
	readonly oLocale: string;
	readonly oFile: string;
}



export interface IResource {
	readonly oBundle: string;
	readonly oUpdateOn: Date;
	readonly oLocale: string;
	readonly oResource: Record<string, string>;
}



