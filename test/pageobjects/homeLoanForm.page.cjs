class HomeLoanFormPage {
    get nameField() {
        return $('#fullName');
    }

    get mobileField() {
        return $('#mobile_id');
    }

    get salariedRdoBtn() {
        return $("#salaried");
    }

    get homeLoanDropdown() {
        return $("#typeOfLoanId");
    }

    get nextMonthlyIncomeField() {
        return $("#netMonthlySal");
    }

    get pinCodeIdField() {
        return $("#pincodeId");
    }

    get reqLoanAmountId() {
        return $("#requiredLoanAmountId");
    }

    get generateOTPButton() {
        return $("#generateBAsicOtp");
    }

    async open() {
        await browser.url('https://corpuat.bajajhousingfinance.in/home-loan-application-form');
    }

    get errorMsgs() {
        return $$(".error");
    }

    async fillForm(name, mobile, homeLoanDropdown) {
        await this.nameField.waitForDisplayed();
        await this.nameField.setValue(name);
        await this.mobileField.setValue(mobile);
        await this.salariedRdoBtn.click();
        await this.homeLoanDropdown.selectByVisibleText(homeLoanDropdown);
        await this.nextMonthlyIncomeField.setValue(mobile);
        await this.pinCodeIdField.setValue(mobile);
        await this.reqLoanAmountId.setValue(mobile);
        await this.generateOTPButton.click();
    }
}

module.exports = new HomeLoanFormPage();

