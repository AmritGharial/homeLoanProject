const ReadCSV = require('../utils/readCSV.cjs');

describe('Home Loan Application Form Tests', () => {
    let errorMsgs;
    let testData;
    let locators;
    before(async () => {
        testData = await ReadCSV.readKeyValueCSV('../CSVs/testData.csv');
        errorMsgs = await ReadCSV.readKeyValueCSV('../CSVs/fieldErrorMessages.csv');
        locators = await ReadCSV.readKeyValueCSV('../CSVs/locators.csv');
        console.log("File Reading Done..");
    });

    beforeEach(async () => {
        await browser.url(locators.url);
        await browser.maximizeWindow();
    });

    it('should not accept numeric value in full name field', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        await $(locators.nameField).setValue("1234");
        const value = await $(locators.nameField).getValue();
        await expect(value).toBe("", { wait: 20000 });
    });

    it('should not accept alphabetical value in numeric fields', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        await $(locators.mobileField).setValue("abc");
        await $(locators.nextMonthlyIncomeField).setValue("abc");
        await $(locators.pinCodeIdField).setValue("abc");
        await $(locators.reqLoanAmountId).setValue("abc");
        const reqLoanAmountIdValue = await $(locators.reqLoanAmountId).getValue();
        const mobileFieldValue = await $(locators.mobileField).getValue();
        const pinCodeIdFieldValue = await $(locators.pinCodeIdField).getValue();
        const nextMonthlyIncomeFieldValue = await $(locators.nextMonthlyIncomeField).getValue();

        await expect(reqLoanAmountIdValue).toBe('', { wait: 20000 });
        await expect(mobileFieldValue).toBe('');
        await expect(pinCodeIdFieldValue).toBe('');
        await expect(nextMonthlyIncomeFieldValue).toBe('');
    });

    it('mobile field validation', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        await $(locators.mobileField).setValue("1234567890");
        await $(locators.nameField).click();
        await expect($$(locators.errorMsgs)[1]).toHaveText(errorMsgs.MobileFieldErrorMsg, { containing: true });
    });

    it('pincode field validation', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        const randomPin = Math.floor(100000 + Math.random() * 900000);
        console.log(randomPin);
        await $(locators.pinCodeIdField).setValue(randomPin);
        await $(locators.nameField).click();
        await expect($$(locators.errorMsgs)[0]).toHaveText(errorMsgs.PincodeFieldErrorMsg, { containing: true });
        await $(locators.pinCodeIdField).setValue(testData.pincode);
        await $(locators.nameField).click();
        await expect($$(locators.errorMsgs)[0]).not.toHaveText(errorMsgs.PincodeFieldErrorMsg, { containing: true });
    });

    it('required loan amount field validation', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        const incorrectLoanAmount = Math.floor(Math.random() * 100000); // loan amount less than 100000
        console.log(incorrectLoanAmount);
        await $(locators.reqLoanAmountId).setValue(incorrectLoanAmount);
        await $(locators.nameField).click();
        await expect($$(locators.errorMsgs)[4]).toHaveText(errorMsgs.LoanAmountErrorMsg, { containing: true });
        const correctLoanAmount = Math.floor(100000 + Math.random() * 900000);
        console.log(correctLoanAmount);
        await $(locators.reqLoanAmountId).setValue(correctLoanAmount);
        await $(locators.nameField).click();
        await expect($$(locators.errorMsgs)[4]).not.toHaveText(errorMsgs.LoanAmountErrorMsg, { containing: true });
    });


    it('should show error when all fields are empty', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        await $(locators.generateOTPButton).click();

        await expect($$(locators.errorMsgs)[0]).toHaveText(errorMsgs.EmptyFieldErrorMsgName, { containing: true, wait: 30000 });
        await expect($$(locators.errorMsgs)[1]).toHaveText(errorMsgs.EmptyFieldErrorMsgMobile, { containing: true });
        await expect($$(locators.errorMsgs)[2]).toHaveText(errorMsgs.EmptyFieldErrorMsgLoanType, { containing: true });
        await expect($$(locators.errorMsgs)[3]).toHaveText(errorMsgs.EmptyFieldErrorMsgMonthlyIncome, { containing: true });
        await expect($$(locators.errorMsgs)[4]).toHaveText(errorMsgs.EmptyFieldErrorMsgPincode, { containing: true });
        await expect($$(locators.errorMsgs)[5]).toHaveText(errorMsgs.EmptyFieldErrorMsgLoanAmount, { containing: true });
    });

});