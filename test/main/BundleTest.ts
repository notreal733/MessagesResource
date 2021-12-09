


import { Bundle } from '../../src/Bundle'

import { assertEquals, assertTrue, assertFalse, test } from './JUnit';
//import Debug from 'debug';
//const log = Debug("Test::Bundle : ");

async function testBundle() {
	let filePath = 'resources/Calendar/Calendar.bundle.json';

	let aBundle: Bundle;
	console.log('-------------------------------------------------1')

	aBundle = await Bundle.CreateBundle(filePath);
	console.log('-------------------------------------------------3')

	assertTrue("Should have a Calendar bundle ", undefined !== aBundle);
	assertEquals("Should have a bundle name ", 'Calendar', aBundle.getName());
	assertTrue("Should have a bunUpdateTimedle ", undefined !== aBundle.getUpdateTime());
	assertTrue("Should have a AvailableLocales ", undefined !== aBundle.getAvailableLocales());
	assertTrue("Should have a LoadedLocales ", undefined !== aBundle.getLoadedLocales());
	console.log('-------------------------------------------------13' + aBundle.getAvailableLocales())

	console.log('-------------------------------------------------13' )
	assertEquals("Should load valid Calendar loacale ar A", 0, await aBundle.loadLocale("ar"));
	assertEquals("Should load valid Calendar loacale ar A",'ar' ,   aBundle.getLoadedLocales());
	assertEquals("Hijri.moth.12: --> ", 'ذو الحجة' , await aBundle.getMessage("ar", 'Hijri.moth.12'));


	assertEquals("Should load valid Calendar loacale ar B", 2, await aBundle.loadLocale("ar"));
	assertEquals("Should load valid Calendar loacale en", 0, await aBundle.loadLocale("en"));
	assertEquals("Should load valid Calendar loacale en", -2, await aBundle.loadLocale("InvalidLocale"));
	assertEquals("Should not load valid Calendar loacale ar, already loaded X ", 2, await aBundle.loadLocale("ar"));
	assertEquals("Should not load invalid loacale  ", -2, await aBundle.loadLocale("InvalidLanguage"));
	assertFalse("Should not remove invalid loacale  ", aBundle.removeLocale("InvalidLanguage"));
	assertTrue("Should  remove  valid loacale ar ", aBundle.removeLocale("ar"));
	assertTrue("Should  remove  valid loacale en ", aBundle.removeLocale("en"));
	assertTrue("Hijri.moth.11 fa: --> ", undefined !== aBundle.getMessage("fa", 'Hijri.moth.11'));
  
	assertTrue("aBundle.getMessage full.Hijri.Gregorian fa: --> ", undefined !== aBundle.getMessage("fa", 'Hijri.moth.11'));

	assertTrue("Hijri.moth.11 xxxfa: --> ", undefined !== aBundle.getMessage("xxxfa", 'Hijri.moth.11'));

	filePath = 'resources/BundleWithErrors/BundleWithErrors.bundle.json';

	aBundle = await Bundle.CreateBundle(filePath);

	assertTrue("Should have a BundleWithErrors bundle ", undefined !== aBundle);
	assertEquals("Should have a bundle name for BundleWithErrors", 'BundleWithErrors', aBundle.getName());
	assertTrue("Should have a  UpdateTimedle BundleWithErrors", undefined !== aBundle.getUpdateTime());
	assertTrue("Should have a AvailableLocales BundleWithErrors", undefined !== aBundle.getAvailableLocales());
	assertTrue("Should have a LoadedLocales BundleWithErrors", undefined !== aBundle.getLoadedLocales());


	assertEquals("BundleWithErrors valid loacale but invalid file, ar 1", -1, await aBundle.loadLocale("ar"));
	assertEquals("BundleWithErrors valid loacale but invalid file, en 2", -1, await aBundle.loadLocale("en"));
	assertEquals("BundleWithErrors valid loacale but invalid file, en 3", -1, await aBundle.loadLocale("xy"));

	assertEquals("Should not load invalid loacale  ", -2, await aBundle.loadLocale("InvalidLanguage"));
	assertFalse("Should not remove invalid loacale  ", aBundle.removeLocale("InvalidLanguage"));
	assertFalse("Should not remove  invalid loacale ar ", aBundle.removeLocale("ar"));
	assertFalse("Should not remove invalid loacale en ", aBundle.removeLocale("en"));
	assertFalse("Should not remove invalid loacale en ", aBundle.removeLocale("xy"));

	filePath = 'resources/BundleWithErrors/BundleWithErrors.bundle.json';
	filePath = filePath.replace('/', '\\');
	filePath = filePath.replace('/', '\\');
	aBundle = await Bundle.CreateBundle(filePath);
	console.log("Filoe : " + filePath)
	assertEquals("Should have a bundle name for BundleWithErrors x", 'BundleWithErrors', aBundle.getName());
	assertTrue("Should have a  UpdateTimedle BundleWithErrors ", undefined !== aBundle.getUpdateTime());
	assertTrue("Should have a AvailableLocales BundleWithErrors x", undefined !== aBundle.getAvailableLocales());
	assertTrue("Should have a LoadedLocales BundleWithErrors x ", undefined !== aBundle.getLoadedLocales());
}

test('testBundle', testBundle, 22222);

