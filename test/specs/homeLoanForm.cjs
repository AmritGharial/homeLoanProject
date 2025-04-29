const ReadCSV = require('../utils/readCSV.cjs');

describe('Home Loan Application Form Tests', () => {
    let testData;
    let locators;
    before(async () => {
        testData = await ReadCSV.readKeyValueCSV('../CSVs/testData.csv');
        locators = await ReadCSV.readKeyValueCSV('../CSVs/locators.csv');
        console.log("File Reading Done..");
    });

    beforeEach(async () => {
        await browser.url(locators.url);
        await browser.maximizeWindow();
    });

    it('should navigate to OTP page once all form details are correctly filled', async () => {
        await $(locators.generateOTPButton).waitForDisplayed({ timeout: 40000 });
        await $(locators.nameField).waitForDisplayed();
        await $(locators.nameField).setValue(testData.fullName);
        await $(locators.mobileField).setValue(testData.mobNo);
        await $(locators.salariedRdoBtn).click();
        await $(locators.homeLoanDropdown).selectByVisibleText(testData.homeLoanDropdown);
        await $(locators.nextMonthlyIncomeField).setValue(testData.montlyIncome);
        await $(locators.pinCodeIdField).setValue(testData.pincode);
        await $(locators.reqLoanAmountId).setValue(testData.loanAmount);
        await $(locators.generateOTPButton).click();
        await expect($(locators.generateOtpImage)).toBeDisplayed();
    });
});

