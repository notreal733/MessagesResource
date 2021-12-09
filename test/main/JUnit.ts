import { assert } from 'chai';
//import { mocha } from 'mocha';

//import Debug from 'debug';
//const log = Debug("Test::JUnitTest : ");


export function assertEquals(varMessage: string, varObjectA: any, varObjectB: any) {

	assert.equal(varObjectA, varObjectB, varMessage);

}
export function assertTrue(varMessage: string, varObjectA: any) {
	assert.isTrue(varObjectA, varMessage);
}

export function assertFalse(varMessage: string, varObjectA: any) {
	assert.isFalse(varObjectA, varMessage);
}



export  function  test(varDescribeTest: string, varTestmethod: any, varTimeout: number) {
	describe(varDescribeTest, function() {
		it(varDescribeTest, async function() {
			this.timeout(varTimeout);
			await varTestmethod();
		})
	});
}

