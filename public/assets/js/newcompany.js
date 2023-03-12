var submitEl = document.getElementById("submitCompany");
var companyEl = document.getElementById("inputCompany");
var paymentDateEl = document.getElementById("inputPaymentDate");


const newCompany = async function(event) {
    event.preventDefault();
    var paypalValue = document.querySelector('.form-check-input:checked').value;


    console.log(paypalValue);

    if (paypalValue == "yes") {
        paypalValue = true;
    } else if (paypalValue == "no") {

        paypalValue = false;
    }
    console.log(companyEl.value);
    console.log(paymentDateEl.value);
    console.log(paypalValue);
    // console.log(userId);

    const response = await fetch('/api/company', {
        method: 'POST',
        body: JSON.stringify({
            company_name: companyEl.value,
            payment_date: paymentDateEl.value,
            paypal: paypalValue
                // userId: 1,
                // userId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("Company Saved!")
        document.location.replace('/dashboard');

    } else {
        alert('Failed to save Company');
    }

};



submitEl.addEventListener("click", newCompany);