const HomeLoanFormPage = require('../pageobjects/homeLoanForm.page.cjs');
const Constants = require('../constants/constants.cjs');
 
describe('Home Loan Application Form Tests', () => {
 
    beforeEach(async () => {
        await HomeLoanFormPage.open();
        await browser.maximizeWindow();
    });
 
    it('should not accept numeric value in full name field', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        await HomeLoanFormPage.nameField.setValue("1234");
        const value = await HomeLoanFormPage.nameField.getValue();
        await expect(value).toBe("", { wait: 20000 });
    });
 
    it('should not accept alphabetical value in numeric fields', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        await HomeLoanFormPage.mobileField.setValue("abc");
        await HomeLoanFormPage.nextMonthlyIncomeField.setValue("abc");
        await HomeLoanFormPage.pinCodeIdField.setValue("abc");
        await HomeLoanFormPage.reqLoanAmountId.setValue("abc");
        const reqLoanAmountIdValue = await HomeLoanFormPage.reqLoanAmountId.getValue();
        const mobileFieldValue = await HomeLoanFormPage.mobileField.getValue();
        const pinCodeIdFieldValue = await HomeLoanFormPage.pinCodeIdField.getValue();
        const nextMonthlyIncomeFieldValue = await HomeLoanFormPage.nextMonthlyIncomeField.getValue();
 
        await expect(reqLoanAmountIdValue).toBe('', { wait: 20000 });
        await expect(mobileFieldValue).toBe('');
        await expect(pinCodeIdFieldValue).toBe('');
        await expect(nextMonthlyIncomeFieldValue).toBe('');
    });
 
    it('mobile field validation', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        await HomeLoanFormPage.mobileField.setValue("1234567890");
        await HomeLoanFormPage.nameField.click();
        await expect(HomeLoanFormPage.errorMsgs[1]).toHaveText("Mobile number should start with 9 or 8 or 7 or 6", { containing: true });
    });
 
    it('pincode field validation', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        const randomPin = Math.floor(100000 + Math.random() * 900000);
        console.log(randomPin);
        await HomeLoanFormPage.pinCodeIdField.setValue(randomPin);
        await HomeLoanFormPage.nameField.click();
        await expect(HomeLoanFormPage.errorMsgs[0]).toHaveText("Service is not available on this PIN code", { containing: true });
        await HomeLoanFormPage.pinCodeIdField.setValue(Constants.pincode);
        await HomeLoanFormPage.nameField.click();
        await expect(HomeLoanFormPage.errorMsgs[0]).not.toHaveText("Service is not available on this PIN code", { containing: true });
    });
 
    it('required loan amount field validation', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        const incorrectLoanAmount = Math.floor(Math.random() * 100000); // loan amount less than 100000
        console.log(incorrectLoanAmount);
        await HomeLoanFormPage.reqLoanAmountId.setValue(incorrectLoanAmount);
        await HomeLoanFormPage.nameField.click();
        await expect(HomeLoanFormPage.errorMsgs[4]).toHaveText("The loan amount must be higher than Rs.1,00,000", { containing: true });
        const correctLoanAmount = Math.floor(100000 + Math.random() * 900000);
        console.log(correctLoanAmount);
        await HomeLoanFormPage.reqLoanAmountId.setValue(correctLoanAmount);
        await HomeLoanFormPage.nameField.click();
        await expect(HomeLoanFormPage.errorMsgs[4]).not.toHaveText("The loan amount must be higher than Rs.1,00,000", { containing: true });
    });
 
 
    it('should show error when all fields are empty', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        await HomeLoanFormPage.generateOTPButton.click();
 
        await expect(HomeLoanFormPage.errorMsgs[0]).toHaveText("Please enter your full name", { containing: true, wait: 30000 });
        await expect(HomeLoanFormPage.errorMsgs[1]).toHaveText("Please enter your 10-digit phone number", { containing: true });
        await expect(HomeLoanFormPage.errorMsgs[2]).toHaveText("Please select the type of loan you would like to apply for", { containing: true });
        await expect(HomeLoanFormPage.errorMsgs[3]).toHaveText("Please enter your net monthly income in Rupees", { containing: true });
        await expect(HomeLoanFormPage.errorMsgs[4]).toHaveText("Please enter your six-digit residential PIN code", { containing: true });
        await expect(HomeLoanFormPage.errorMsgs[5]).toHaveText("Please enter the loan amount you would like to apply for", { containing: true });
    });
 
});