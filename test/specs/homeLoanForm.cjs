const HomeLoanFormPage = require('../pageobjects/homeLoanForm.page.cjs');
const Constants = require('../constants/constants.cjs');
 
describe('Home Loan Application Form Tests', () => {
    beforeEach(async () => {
        await HomeLoanFormPage.open();
        await browser.maximizeWindow();
    });
 
    it('should navigate to OTP page once all form details are correctly filled', async () => {
        await HomeLoanFormPage.generateOTPButton.waitForDisplayed({ timeout: 40000 });
        await HomeLoanFormPage.fillForm(Constants.fullName, Constants.mobNo, Constants.homeLoanDropdown, Constants.montlyIncome, Constants.pincode, Constants.loanAmount);
        await expect(HomeLoanFormPage.generateOtpImage).toBeDisplayed();
     });
});
 
 