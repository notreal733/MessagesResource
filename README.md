

# MessagesResource (typeScript)
Message Resource is a TypeScript library to support Internationalization (i18n)

Message Resource combines the functionality of Java ResourceBundle and MessageFormat to provide Localization, or locale based message resources in a language-neutral way. It allows defining locale based messages and then retrieves a message that matches the user locale. 
 
 
For each resource bundle define a bundle defilation .

##Example configuration
	Bundle name: CommonMessages 
	
Define bundle configuration like so: 

	File : CommonMessages.bundle.json
	{
	   "oRootPath": "",
	   "oResourceRefereance": {
	    "ar": "CommonMessages_ar.json",
	    "en": "CommonMessages.json",
	    "en_US": "CommonMessages_en_US.json"
	    "xy": "CommonMessages_xy.json"
	   },
	   "oBundle": "CommonMessages",
	   "oUpdateOn": "Sun Apr 11 03:38:25 EDT 2018"
	  }
	  
Define the resources like so:  

File : CommonMessages_en_US.json

	{	
	   "oBundle": "CommonMessages",
	   "oLocale": "en",
	   "oUpdateOn": "Sun Apr 11 03:38:25 EDT 2018",
	   "oResource": {
			"error.common.http.setUp": "The request has been set up",
			"error.common.http.serverError": "Error : System error can not process the requested operation",
			"error.common.http.timeOut": "Error : HTTP request timed out",
			"error.common.http.notIinitialized": "The request is not initialized",
			"error.common.cookies.acceptcokies": "Warning: Some  features on this site may not be available to you since your browser doesn&apos;t accept cookies. Please enable cookies to enjoy the full features of this site.",
			"error.common.http.process": "The request is in process",
			"error.common.invalidReques": "invalid request",
			"error.common.http.sent": "The request has been sent",
			"label.common.cancel": "Cancel",
			"label.common.submit": "Submit",
			"label.common.close": "Close",
			"label.common.additionalLanguages": "Primary language :",
	…
	}

File : CommonMessages_ar.json

	{	
	   "oBundle": "CommonMessages",
	   "oLocale": "en",
	   "oUpdateOn": "Sun Apr 11 03:38:25 EDT 2018",
	   "oResource": {
			"error.common.http.setUp": "لقد تم تشكيل الطلب",
			"error.common.http.serverError": "خطأ : خطأ في النظام لا يمكن معالجة العملية المطلوبة",
			"error.common.http.timeOut": "خطأ : تنفيذ الطلب استغرق وقتا أكثر مما ينبغي",
			"error.common.http.notIinitialized": "لم يتم تهيئة الطلب",
			"error.common.cookies.acceptcokies": "تحذير : بعض الوظائف على هذا الموقع قد لا تكون متاحة لكم ، لأن برنامجك للتصفح لا يقبل ملفات تعريف الارتباط۔ يرجى تمكين ملفات تعريف الارتباط (الكعكات) للتمتع الكامل من ميزات هذا الموقعل۔",
			"error.common.http.process": "الطلب قيد المعالجة",
			"error.common.invalidReques": "طلب غير صالح",
			"error.common.http.sent": "قد تم إرسال الطلب",
			"label.common.cancel": "الغاء الطلب",
			"label.common.submit": "قدم الطلب",
			"label.common.close": "إغلاق",
			"label.common.primaryLanguage": "اللغة الاساسيه",
	 …
	}

## Usage

Somewhere early in the application code initialize and load the resources like so:

	import { MsgsResource } from 'messages-resource/src/MsgsResource';
	...
	...
	init() :Promise<boolean>
	{ 
			return new Promise<boolean>(async function(resolve) {
				let aMsgsResource = MsgsResource.getInstance();
				await aMsgsResource.registerBundle('resources/CommonMessages/CommonMessages.bundle.json');
				await aMsgsResource.registerBundle('resources/Converter/ScondBundle.bundle.json');
				await aMsgsResource.registerBundle('resources/Converter/ThirdBundle.bundle.json');
				...
				resolve(true);
			});
	}

Or if working on backend

		let aMsgsResource: MsgsResource = MsgsResource.getInstance();
		let filePath = NodePath.resolve(__dirname + '/resources/Calendar/Calendar.bundle.json');
		aMsgsResource.registerBundle(filePath)
		
Then any time, execute

		let aMsgsResource: MsgsResource = MsgsResource.getInstance();
		
		let message1 : string = aMsgsResource.getMessage('CommonMessages', 'ar', 'common.besmiAllay')
		
		let message2 : string = aMsgsResource.getMessage('Calendar', "ar", 'Hijri.moth.11')
		let message3 : string = aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 43));
		
To pass an array as an argument to getMessage()

		let listAR = [];
		listAR[0] = 451432;
		listAR[1] = "الثلثلاء";
		listAR[2] = 14;
		...
	
		aMsgsResource.getMessage('Calendar', "ar", 'full.Hijri.Gregorian', listAR);

OR
		
		aMsgsResource.getMessage('Calendar', "ar", 'full.Hijri.Gregorian', 451432, "الثلثلاء", 14 );

		
## Developing



### Tools

 