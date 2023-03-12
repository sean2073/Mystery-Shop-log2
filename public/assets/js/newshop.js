var submitEl = document.getElementById("submitShop");
var companyEl = document.getElementById("inputCompany");
var optionEl = document.getElementById("exampleSelect1").lastElementChild;
var datePerformedEl = document.getElementById("inputDate");
var feeEl = document.getElementById("fee");
var reimbursementEl = document.getElementById("reimbursement");
var totalEl = document.getElementById("total");
var checkEl = document.getElementById("inputCheckNo");
var checkDateEl = document.getElementById("inputCheckDate");
var errCompany = document.getElementById("errCompany");

var errLocation = document.getElementById("errLocation");
var errDatePerformed = document.getElementById("errDatePerformed");
var errFee = document.getElementById("errFee");





const getCompanies = async function(event) {
    // event.preventDefault()
    // Get all companies to populate the company name option element.
    $.ajax({
        url: '/dashboard/company',
        method: "GET"
    }).done(function(response) {
        console.log(response);
        for (i = 0; i < response.length; i++) {
            const node = document.createElement("option");
            const textnode = document.createTextNode(response[i].id + ". " + response[i].company_name);
            node.appendChild(textnode);
            // document.getElementById("myList").appendChild(node);
            document.getElementById("exampleSelect1").appendChild(node);
            console.log(document.getElementById("exampleSelect1").appendChild(node));




        }

    });
};

const newShop = async function(event) {
    event.preventDefault();
    var paidValue = document.querySelector('.form-check-input:checked').value;
    var company = document.getElementById('exampleSelect1');
    //company.options[company.selectedIndex].value;  //3
    company.options[company.selectedIndex].text;
    console.log(company.options[company.selectedIndex].text);
    var locationEl = document.getElementById("inputLocation");
    console.log(locationEl.value);

    //company looks like "12. Intellishop".  I want the number only (12)
    var companyId = company.options[company.selectedIndex].text;
    const company_id = companyId.split(".");
    console.log(company_id[0]);



    console.log(reimbursementEl.value);
    if (company_id == "") {
        console.log(errCompany);
        errCompany.style.color = "red";
        errCompany.innerHTML = "* PLEASE CHOOSE THE COMPANY YOU PERFORMED THE SHOP FOR";
    }
    if (!locationEl.value) {

        console.log(errLocation);
        errLocation.style.color = "red";
        errLocation.innerHTML = "* PLEASE ENTER A LOCATION";

    }
    if (!datePerformedEl.value) {
        errDatePerformed.style.color = "red";
        errDatePerformed.innerHTML = '* PLEASE ENTER A DATE'
    }
    if (!feeEl.value) {
        errFee.style.color = "red";
        errFee.innerHTML = '* PLEASE ENTER FEE AMOUNT'
    }
    if (paidValue == "yes") {
        paidValue = true;
    } else if (paidValue == "no") {

        paidValue = false;
    }
    // console.log(companyEl.value);
    // console.log(paymentDateEl.value);
    console.log(paidValue);

    if (!reimbursementEl.value) {
        reimbursementEl.value = 0;
    }
    if (!totalEl.value) {
        totalEl.value = 0;
    }
    if (!checkEl.value) {
        checkEl.value = 0;
    }
    if (!checkDateEl.value) {
        checkDateEl.value = 0;
    } else {
        console.log("you've go another problem");
    }
    console.log("The check date is :", checkDateEl.value);
    var shopObj = {
        companyId: company_id[0],
        location: locationEl.value,
        date_performed: datePerformedEl.value,
        fee: feeEl.value,
        reimbursement_due: reimbursementEl.value,
        total: totalEl.value,
        paid: paidValue,
        check_no: checkEl.value,
        check_date: checkDateEl.value


    }
    console.log(shopObj);

    const response = await fetch('/api/shops', {
        method: 'POST',
        body: JSON.stringify({
            companyId: company_id[0],
            location: locationEl.value,
            date_performed: datePerformedEl.value,
            fee: feeEl.value,
            reimbursement_due: reimbursementEl.value,
            total: totalEl.value,
            paid: paidValue,
            check_no: checkEl.value,
            check_date: checkDateEl.value

            // payment_date: paymentDateEl.value,
            // paypal: paidValue
            // userId: 1,
            // userId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("Mystery Shop Saved!")
        document.location.replace('/dashboard');

    } else {
        alert('Failed to save the shop');
        // document.location.replace('/dashboard');

    }

};



getCompanies();
submitEl.addEventListener("click", newShop);