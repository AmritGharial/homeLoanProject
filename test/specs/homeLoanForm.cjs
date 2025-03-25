const HomeLoanFormPage = require('../pageobjects/homeLoanForm.page.cjs');
 
describe('Home Loan Application Form Tests', () => {
 
    beforeEach(async () => {
        await HomeLoanFormPage.open();
        await browser.maximizeWindow();
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
 
 