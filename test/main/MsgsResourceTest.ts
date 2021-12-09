import { MsgsResource } from '../../src/MsgsResource';
import { MessageResourceTag } from '../../src/MessageResourceTag';

//import * as NodePath from 'path';




import { assertEquals, assertTrue, assertFalse, test } from './JUnit';
import Debug from 'debug';
const log = Debug("Test::MsgsResource : ");
async function testMsgsResource() {

	let aMsgsResource: MsgsResource = MsgsResource.getInstance();

	assertEquals("Nothing should be loaded we just removed every thing, length", 0, aMsgsResource.getLoadedBundles().length);
	assertEquals("Nothing should be loaded we just removed every thing, Calendar, name", '', aMsgsResource.getLoadedBundles());


	assertTrue("Should get an instance ", undefined !== aMsgsResource);

//	let filePath = NodePath.resolve(__dirname + '/resources/Calendar/Calendar.bundle.json');
	let filePath =  'resources/Calendar/Calendar.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));

	assertEquals("A Only one loaded bundle should be present, Calendar, length", 1, aMsgsResource.getLoadedBundles().length)
	assertEquals("Only one loaded bundle should be present, Calendar, name", 'Calendar', aMsgsResource.getLoadedBundles())
	//	log("MsgsResource  LoadedBundles: " + aMsgsResource.getLoadedBundles());

	let listAR = [];
	listAR[0] = 451432;
	listAR[1] = "الثلثلاء";
	listAR[2] = 14;
	listAR[3] = "محرم";
	listAR[4] = 1431;
	listAR[5] = "الاربعاء";
	listAR[6] = "مارس";
	listAR[7] = 2021;
	listAR[8] = 2;
	listAR[9] = 54;
	listAR[10] = 18;

	let listEN = [];
	listEN[0] = 451432;
	listEN[1] = "Tuesday";
	listEN[2] = 14;
	listEN[3] = "Muharam";
	listEN[4] = 1431;
	listEN[5] = "Yuesday";
	listEN[6] = "March";
	listEN[7] = 2021;
	listEN[8] = 2;
	listEN[9] = 54;
	listEN[10] = 18;


	assertTrue("format.time.seconds.pm--> : " + aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 43), undefined !== aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 43));
	assertTrue("Hijri.moth.11--> : ", undefined !== aMsgsResource.getMessage('Calendar', "en", 'Hijri.moth.11'));
	assertTrue("full.Hijri.Gregorian EN--> : ", undefined !== aMsgsResource.getMessage('Calendar', "en", 'full.Hijri.Gregorian', listEN));

	assertTrue("format.time.seconds.pm AR--> : ", undefined !== aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1, 50, 43));
	assertTrue("Hijri.moth.11 AR--> : ", undefined !== aMsgsResource.getMessage('Calendar', "ar", 'Hijri.moth.11'));
	assertTrue("full.Hijri.Gregorian AR--> : ", undefined !== aMsgsResource.getMessage('Calendar', "ar", 'full.Hijri.Gregorian', listAR));


	assertTrue("format.time.seconds.pm es--> : ", undefined !== aMsgsResource.getMessage('Calendar', "es", 'days.since.Hijra', 1, 50, 43));
	assertTrue("Hijri.moth.11 es--> : ", undefined !== aMsgsResource.getMessage('Calendar', "es", 'Hijri.moth.11'));
	assertTrue("full.Hijri.Gregorian es--> : ", undefined !== aMsgsResource.getMessage('Calendar', "es", 'full.Hijri.Gregorian', listEN));

	assertTrue("format.time.seconds.pm fa--> : ", undefined !== aMsgsResource.getMessage('Calendar', "fa", 'format.time.seconds.pm', 1, 50, 43));
	assertTrue("format.time.seconds.pm fa--> : ", undefined !== aMsgsResource.getMessage('Calendar', "fa", 'format.time.seconds.pm', 2, 10, 43));
	assertTrue("Hijri.moth.11 fa: --> ", undefined !== aMsgsResource.getMessage('Calendar', "fa", 'Hijri.moth.11'));
	assertTrue("aBundle.getMessage full.Hijri.Gregorian fa: --> ", undefined !== aMsgsResource.getMessage('Calendar', "fa", 'full.Hijri.Gregorian', listAR));

	aMsgsResource.removeAllBundles();

	assertEquals("Nothing should be loaded we just removed every thing, length", 0, aMsgsResource.getLoadedBundles().length);
	assertEquals("Nothing should be loaded we just removed every thing", '', aMsgsResource.getLoadedBundles());
}

async function testAddRemoveBundles() {

	let aMsgsResource: MsgsResource = MsgsResource.getInstance();
	assertTrue("Should get an instance ", undefined !== aMsgsResource);


	let filePath = 'resources/Calendar/Calendar.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));

	assertEquals("B Only one loaded bundle should be present, Calendar, length", 1, aMsgsResource.getLoadedBundles().length);
	assertEquals("Only one loaded bundle should be present, Calendar, name A", 'Calendar', aMsgsResource.getLoadedBundles());

	  filePath = 'resources/ZekerMenu/ZekerMenu.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));

	assertEquals("C Only one loaded bundle should be present, Calendar, length", 2, aMsgsResource.getLoadedBundles().length);
	assertEquals("Only one loaded bundle should be present, Calendar, name A", 'Calendar,ZekerMenu' , aMsgsResource.getLoadedBundles());

	filePath = 'resources/UnitName/UnitName.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));

	assertEquals("A Only one loaded bundle should be present, Calendar, UnitName, length", 3, aMsgsResource.getLoadedBundles().length);
	assertEquals("Two loaded bundle should be present, 'Calendar', 'UnitName', name A", 'Calendar,ZekerMenu,UnitName', aMsgsResource.getLoadedBundles().toString());


	assertTrue("Should be able to remove bundle", aMsgsResource.removeBundle('Calendar'));
	assertFalse("Should fail, its is already remove ", aMsgsResource.removeBundle('Calendar'));

	assertEquals("Nothing should be loaded we just removed Calendar, length", 2, aMsgsResource.getLoadedBundles().length);
	assertEquals("Nothing should be loaded we just removed Calendar, UnitName, name", 'ZekerMenu,UnitName', aMsgsResource.getLoadedBundles());


	assertTrue("Should be able to remove bundle", aMsgsResource.removeBundle('UnitName'));
	assertFalse("Should fail, its is already remove ", aMsgsResource.removeBundle('UnitName'));

	assertEquals("Nothing should be loaded we just removed Calendar, length", 1, aMsgsResource.getLoadedBundles().length);
	assertEquals("Nothing should be loaded we just removed Calendar, Calendar, name", 'ZekerMenu', aMsgsResource.getLoadedBundles());
	
	

	assertTrue("Should be able to remove bundle", aMsgsResource.removeBundle('ZekerMenu'));
	assertFalse("Should fail, its is already remove ", aMsgsResource.removeBundle('ZekerMenu'));
	
	assertEquals("Nothing should be loaded we just removed Calendar, length", 0, aMsgsResource.getLoadedBundles().length);
	assertEquals("Nothing should be loaded we just removed Calendar, Calendar, name", '', aMsgsResource.getLoadedBundles());

	assertTrue("Should be able to RE-register bundle ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));

	assertEquals("D Only one loaded bundle should be present, Calendar, length", 1, aMsgsResource.getLoadedBundles().length);
	assertEquals("Only one loaded bundle should be present, UnitName, name" + aMsgsResource.getLoadedBundles(), 'UnitName', aMsgsResource.getLoadedBundles());


	assertFalse("Should fail  invalid file path ", await aMsgsResource.registerBundle(filePath + 'InvalidPath'));
}


async function testGetMessage() {

	let aMsgsResource: MsgsResource = MsgsResource.getInstance();

	let filePath = 'resources/Calendar/Calendar.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));

	assertEquals("Should get a message, with full obect parameter", "1:50:11 pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter", "1:50: pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", "1:: pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1))

	assertEquals("Should get a message, with with valid bundel name and language", "1:50:11 pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 11))

	assertEquals("Should get undefined, call with invalid bundel name and valid language", undefined, await aMsgsResource.getMessage('InvalidBundleName', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get undefined, call with invalid bundel name and invalid language", undefined, await aMsgsResource.getMessage('InvalidBundleName', "InvalidLanguage", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get undefined, call with invalid bundel name and invalid language", undefined, await aMsgsResource.getMessage('Calendar', "InvalidLanguage", 'format.time.seconds.pm', 1, 50, 11))

	assertEquals("Should get undefined, call with invalid resource key", undefined, await aMsgsResource.getMessage('Calendar', "en", 'INVALID.reource.key', 1, 50, 11))
	assertEquals("Should get undefined, call with invalid resource key, with no arguments ", undefined, await aMsgsResource.getMessage('Calendar', "en", 'INVALID.reource.key'))

	assertEquals("Should get a message, no obect parameter", "Thul-Qiaadah", await aMsgsResource.getMessage('Calendar', "en", 'Hijri.moth.11'))
	assertEquals("Should get a message, no obect parameter, in Arabic ", "ذو القعدة", await aMsgsResource.getMessage('Calendar', "ar", 'Hijri.moth.11'))
	assertEquals("Should get a message, with full obect parameter, add argument, resource doesn't support arguments", "ذو القعدة", await aMsgsResource.getMessage('Calendar', "ar", 'Hijri.moth.11', 1, 50, 11))
	assertEquals("Should get a message, with full obect parameter, add argument, resource doesn't support arguments", "Thul-Qiaadah", await aMsgsResource.getMessage('Calendar', "en", 'Hijri.moth.11', 1, 50, 11))
}

async function testRemoveLanguage() {

	let aMsgsResource: MsgsResource = MsgsResource.getInstance();

	let filePath = 'resources/Calendar/Calendar.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);
	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));



	filePath = 'resources/UnitName/UnitName.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));

	assertEquals("B Only one loaded bundle should be present, Calendar, UnitName, length", 2, aMsgsResource.getLoadedBundles().length);
	assertEquals("Two loaded bundle should be present, 'Calendar', 'UnitName', name A", 'Calendar,UnitName', aMsgsResource.getLoadedBundles().toString());

	assertTrue("Should have an update time stamp for  Calendar ", undefined !== aMsgsResource.getUpdateTime('Calendar'));
	assertTrue("Should have an update time stamp for  UnitName", undefined !== aMsgsResource.getUpdateTime('UnitName'));
	assertTrue("Should not have an update time stamp for  InvalidBundle", undefined === aMsgsResource.getUpdateTime('InvalidBundle'));


	assertEquals("Should get a message, with full obect parameter", "1:50:11 pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter", "1:50: pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", "1:: pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1))



	assertEquals("Should get a message, with full obect parameter ar", "1:50:11 م", await aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter ar", "1:50: م", await aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter ar", "1:: م", await aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1))

	assertEquals("Should get a message, with full obect parameter", 'Converted : 50 "Zeptogram" is equivalent to 11 "Kilogram"', await aMsgsResource.getMessage('UnitName', "en", 'coverted', 50, 'Zeptogram', 11, 'Kilogram'))
	assertEquals("Should get a message, with missing obect parameter", 'Please select a temperature unit', await aMsgsResource.getMessage('UnitName', "en", 'unitName.Temperature.Title', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", 'Can not convert from "Nanometer" to "Kilogram" input value (1322)', await aMsgsResource.getMessage('UnitName', "en", 'error.canNotCovert', 'Nanometer', 'Kilogram', 1322))
	assertEquals("Should get a message, with missing obect parameter", "Centimeter", await aMsgsResource.getMessage('UnitName', "en", 'unitName.Distance.Centimeter'))



	assertEquals("Should get a message, with full obect parameter ar", 'تم التحويل من : ‪50‬ "‮Zeptogram‬" إلى ما يعادلا له ‪11‬ "‮Kilogram‬"', await aMsgsResource.getMessage('UnitName', "ar", 'coverted', 50, 'Zeptogram', 11, 'Kilogram'))
	assertEquals("Should get a message, with missing obect parameter ar", 'الرجاء تحديد وحدة درجة الحرارة', await aMsgsResource.getMessage('UnitName', "ar", 'unitName.Temperature.Title', 1, 50))
	assertEquals("Should get a message, with missing obect parameter ar", 'لا يمكن تحويل من "Nanometer" إلى "Kilogram" قيمة التحويل  (1322)', await aMsgsResource.getMessage('UnitName', "ar", 'error.canNotCovert', 'Nanometer', 'Kilogram', 1322))
	assertEquals("Should get a message, with missing obect parameter ar", "سنتيمتر", await aMsgsResource.getMessage('UnitName', "ar", 'unitName.Distance.Centimeter'))

	assertEquals("Calendar should have two AvailableLocales", 6, aMsgsResource.getAvailableLocales('Calendar')!.length);
	assertEquals("Calendar should have two LoadedLocales", 2, aMsgsResource.getBundleLoadedLocales('Calendar')!.length);
	assertEquals("UnitName should have two AvailableLocales", 3, aMsgsResource.getAvailableLocales('UnitName')!.length);
	assertEquals("UnitName should have two LoadedLocales", 2, aMsgsResource.getBundleLoadedLocales('UnitName')!.length);

	assertTrue("removing en from all bundles ", aMsgsResource.removeLocale("en"));


	assertEquals("Calendar should have two AvailableLocales", 6, aMsgsResource.getAvailableLocales('Calendar')!.length);
	assertEquals("Calendar should have two LoadedLocales", 1, aMsgsResource.getBundleLoadedLocales('Calendar')!.length);
	assertEquals("UnitName should have two AvailableLocales", 3, aMsgsResource.getAvailableLocales('UnitName')!.length);
	assertEquals("UnitName should have two LoadedLocales", 1, aMsgsResource.getBundleLoadedLocales('UnitName')!.length);

	assertTrue("removing ar from all bundles ", aMsgsResource.removeLocale("ar"));
	assertEquals("Calendar should have two AvailableLocales", 6, aMsgsResource.getAvailableLocales('Calendar')!.length);
	assertEquals("Calendar should have two LoadedLocales", 0, aMsgsResource.getBundleLoadedLocales('Calendar')!.length);
	assertEquals("UnitName should have two AvailableLocales", 3, aMsgsResource.getAvailableLocales('UnitName')!.length);
	assertEquals("UnitName should have two LoadedLocales", 0, aMsgsResource.getBundleLoadedLocales('UnitName')!.length);


	//NOTE: When we call getMessage() after removal, they are reloaded back automaticaly

	assertEquals("Should get a message, with full obect parameter", "1:50:11 pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter", "1:50: pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", "1:: pm", await aMsgsResource.getMessage('Calendar', "en", 'format.time.seconds.pm', 1))



	assertEquals("Should get a message, with full obect parameter ar", "1:50:11 م", await aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter ar", "1:50: م", await aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter ar", "1:: م", await aMsgsResource.getMessage('Calendar', "ar", 'format.time.seconds.pm', 1))

	assertEquals("Should get a message, with full obect parameter", 'Converted : 50 "Zeptogram" is equivalent to 11 "Kilogram"', await aMsgsResource.getMessage('UnitName', "en", 'coverted', 50, 'Zeptogram', 11, 'Kilogram'))
	assertEquals("Should get a message, with missing obect parameter", 'Please select a temperature unit', await aMsgsResource.getMessage('UnitName', "en", 'unitName.Temperature.Title', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", 'Can not convert from "Nanometer" to "Kilogram" input value (1322)', await aMsgsResource.getMessage('UnitName', "en", 'error.canNotCovert', 'Nanometer', 'Kilogram', 1322))
	assertEquals("Should get a message, with missing obect parameter", "Centimeter", await aMsgsResource.getMessage('UnitName', "en", 'unitName.Distance.Centimeter'))



	assertEquals("Should get a message, with full obect parameter ar", 'تم التحويل من : ‪50‬ "‮Zeptogram‬" إلى ما يعادلا له ‪11‬ "‮Kilogram‬"', await aMsgsResource.getMessage('UnitName', "ar", 'coverted', 50, 'Zeptogram', 11, 'Kilogram'))
	assertEquals("Should get a message, with missing obect parameter ar", 'الرجاء تحديد وحدة درجة الحرارة', await aMsgsResource.getMessage('UnitName', "ar", 'unitName.Temperature.Title', 1, 50))
	assertEquals("Should get a message, with missing obect parameter ar", 'لا يمكن تحويل من "Nanometer" إلى "Kilogram" قيمة التحويل  (1322)', await aMsgsResource.getMessage('UnitName', "ar", 'error.canNotCovert', 'Nanometer', 'Kilogram', 1322))
	assertEquals("Should get a message, with missing obect parameter ar", "سنتيمتر", await aMsgsResource.getMessage('UnitName', "ar", 'unitName.Distance.Centimeter'))


	assertEquals("Calendar should have two AvailableLocales", 6, aMsgsResource.getAvailableLocales('Calendar')!.length);
	assertEquals("Calendar should have two LoadedLocales", 2, aMsgsResource.getBundleLoadedLocales('Calendar')!.length);
	assertEquals("UnitName should have two AvailableLocales", 3, aMsgsResource.getAvailableLocales('UnitName')!.length);
	assertEquals("UnitName should have two LoadedLocales", 2, aMsgsResource.getBundleLoadedLocales('UnitName')!.length);



	assertFalse("removing InvalidLanguage from all bundles ", aMsgsResource.removeLocale("InvalidLanguage"));
	assertTrue("removing en from all bundles ", aMsgsResource.removeLocale("en"));
	assertTrue("removing ar from all bundles ", aMsgsResource.removeLocale("ar"));
	assertFalse("removing InvalidLanguage from all bundles will return false ", aMsgsResource.removeLocale("InvalidLanguage"));

	assertTrue("removing remove All Bundles ", aMsgsResource.removeAllBundles());

	assertFalse("removing InvalidLanguage from all bundles ", aMsgsResource.removeLocale("InvalidLanguage"));

	assertEquals("Calendar should have no AvailableLocales", undefined, aMsgsResource.getAvailableLocales('InvalidLanguage'));
	assertEquals("Calendar should have no LoadedLocales", undefined, aMsgsResource.getBundleLoadedLocales('InvalidLanguage'));

	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));
	assertTrue("removing remove All Bundles ", aMsgsResource.removeAllBundles());
}


async function testBundleWithErrors() {

	let aMsgsResource: MsgsResource = MsgsResource.getInstance();

	let filePath = 'resources/BundleWithErrors/BundleWithErrors.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);
	assertTrue("Should be able to register bundle A ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));
	assertTrue("Should have an update time stamp for  UnitName", undefined !== aMsgsResource.getUpdateTime('BundleWithErrors'));

	assertEquals("Only one loaded bundle should be present, BundleWithErrors , length", 1, aMsgsResource.getLoadedBundles().length);
	assertEquals("Two loaded bundle should be present, 'BundleWithErrors', name A", 'BundleWithErrors', aMsgsResource.getLoadedBundles().toString());


	assertEquals("Should get a message, with full obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrors', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrors', "en", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrors', "en", 'format.time.seconds.pm', 1))



	assertEquals("Should get a message, with full obect parameter ar", undefined, await aMsgsResource.getMessage('BundleWithErrors', "ar", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter ar", undefined, await aMsgsResource.getMessage('BundleWithErrors', "ar", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter ar", undefined, await aMsgsResource.getMessage('BundleWithErrors', "ar", 'format.time.seconds.pm', 1))



	assertEquals("BundleWithErrors should have no AvailableLocales", undefined, aMsgsResource.getAvailableLocales('en'));
	assertEquals("BundleWithErrors should have no LoadedLocales", undefined, aMsgsResource.getBundleLoadedLocales('ar'));
	assertEquals("BundleWithErrors should have no AvailableLocales", undefined, aMsgsResource.getAvailableLocales('InvalidLanguage'));
	assertEquals("BundleWithErrors should have no LoadedLocales", undefined, aMsgsResource.getBundleLoadedLocales('InvalidLanguage'));

	filePath = 'resources/BundleWithErrors/BundleWithErrors.bundle2.json';
	assertTrue("Should get a path ", undefined !== filePath);
	assertTrue("Should be able to register bundle B ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is already registered ", await aMsgsResource.registerBundle(filePath));
	assertTrue("Should have an update time stamp for  UnitName", undefined !== aMsgsResource.getUpdateTime('BundleWithErrors'));


	assertEquals("Should get a message, with full obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrors', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrors', "en", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrors', "en", 'format.time.seconds.pm', 1))

	// file doesn't exist

	filePath = 'resources/BundleWithErrors/BundleWithErrors.bundle2XXX.json';
	assertTrue("Should get a path ", undefined !== filePath);
	assertFalse("Should be able to register bundle C ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should fail, bundle is NOT registered, its invalid  ", await aMsgsResource.registerBundle(filePath));
	assertFalse("Should have an update time stamp for  UnitName", undefined !== aMsgsResource.getUpdateTime('BundleWithErrorsxxxx'));

	assertEquals("Should get a message, with full obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrorsxxxx', "en", 'format.time.seconds.pm', 1, 50, 11))
	assertEquals("Should get a message, with missing obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrorsxxxx', "en", 'format.time.seconds.pm', 1, 50))
	assertEquals("Should get a message, with missing obect parameter", undefined, await aMsgsResource.getMessage('BundleWithErrorsxxxx', "en", 'format.time.seconds.pm', 1))
	assertFalse("Should have fail, no locale", aMsgsResource.removeLocale('InvalidLocale'));
}

async function testMessageResourceTag() {
	let aMsgsResource: MsgsResource = MsgsResource.getInstance();

	let filePath = 'resources/Calendar/Calendar.bundle.json';
	assertTrue("Should get a path ", undefined !== filePath);
	assertTrue("Should be able to register bundle ", await aMsgsResource.registerBundle(filePath));



	let aMessageResourceTag = new MessageResourceTag();
	assertTrue("Shoul get an object", undefined != aMessageResourceTag);
	aMessageResourceTag.setAttribute('oLocale', 'ar');
	aMessageResourceTag.setAttribute('oBundle', 'Calendar');
	aMessageResourceTag.setAttribute('oName', 'format.time.seconds.pm');
	aMessageResourceTag.setAttribute('oArguments', '1, 50, 11');

	aMessageResourceTag.connectedCallback();
	await aMessageResourceTag.render();
	assertEquals("Should  message text [" + aMessageResourceTag.innerText +']', "1:50:11 م", aMessageResourceTag.innerText)


	aMessageResourceTag.attributeChangedCallback('oLocale', 'ar', 'en');
	await aMessageResourceTag.render();
	assertEquals("Should  message text ", "1:50:11 pm", aMessageResourceTag.innerText)
	aMessageResourceTag.connectedCallback();
	await aMessageResourceTag.render();

	aMessageResourceTag.attributeChangedCallback('oLocale', 'ar', 'ar');

	aMessageResourceTag.connectedCallback();
	aMessageResourceTag.setAttribute('oArguments', '1');
	await aMessageResourceTag.render();

	assertEquals("Should  message text 1:: pm ", "1:: pm", aMessageResourceTag.innerText)



}
beforeEach(() => {
	MsgsResource.getInstance().removeAllBundles();
});

test('testMsgsResource', testMsgsResource, 22000);
test('testAddRemoveBundles', testAddRemoveBundles, 22000);
test('testGetMessage', testGetMessage, 22000);
test('testRemoveLanguage', testRemoveLanguage, 22000);
test('testBundleWithErrors', testBundleWithErrors, 22000);

test('testMessageResourceTag', testMessageResourceTag, 22000);
