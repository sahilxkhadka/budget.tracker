const budgetInput = document.getElementById("total-amount")
const budgetBtn = document.getElementById("budget-btn")
const budgetAmount = document.getElementById("budget-dollar")
const expenseAmount = document.getElementById("expense-dollar")
const balanceAmount = document.getElementById("balance-dollar")
const expenseTitle = document.getElementById("expense-title")
const expenseInput = document.getElementById("expense-amount")
const expenseBtn = document.getElementById("expense-btn")
const deleteBtn = document.getElementById("delete-btn")
let displayTable = document.getElementById("table")
const fromLocalStorage = localStorage.getItem("budgetvalue", "expense value", "balance amount", "expense-list", "expense array")

let budgetValue 
let expenseList = []
let expenseArr = []
let expenseValue = 0
let expenseLocal = "000"
expenseAmount.innerText = "$000"
let tableData
let tableHeading = `
<thead>
    <tr>                     
        <td>Expense Title</td>
        <td>Amount</td>
    </tr>                       
</thead>`
displayTable.innerHTML = tableHeading


if (fromLocalStorage) {
    let budgetLocal = JSON.parse(localStorage.getItem("budgetvalue"))
    budgetAmount.innerText = `${budgetLocal}`
    expenseLocal = JSON.parse(localStorage.getItem("expense value"))
    expenseAmount.innerText = expenseLocal
    let balanceLocal = JSON.parse(localStorage.getItem("balance amount"))
    balanceAmount.innerText = balanceLocal
    expenseList = JSON.parse(localStorage.getItem("expense list"))
    expenseArr = JSON.parse(localStorage.getItem("expense array"))
    addData(expenseList, expenseArr)
}





budgetBtn.addEventListener("click", function() {
    budgetAmount.innerText = `$ ${budgetInput.value}`
    budgetValue = budgetInput.value
    let balance = eval((budgetAmount.innerText.slice(2)) - (expenseAmount.innerText.slice(2)))
    balanceAmount.innerText = `$ ${balance}`
    budgetInput.value = ""
    localStorage.setItem("budgetvalue", JSON.stringify(budgetAmount.innerText))
    localStorage.setItem("balance amount", JSON.stringify(balanceAmount.innerText))
})

expenseBtn.addEventListener("click", function() {
    expenseValue = eval(parseInt(expenseInput.value) + parseInt(expenseAmount.innerText.slice(2)))
    expenseAmount.innerText = `$ ${expenseValue}`
    let balance = eval((budgetAmount.innerText.slice(2)) - (expenseAmount.innerText.slice(2)))
    balanceAmount.innerText = `$ ${balance}`
    expenseList.push(expenseTitle.value)
    expenseArr.push(expenseInput.value)
    localStorage.setItem("expense value", JSON.stringify(expenseAmount.innerText))
    localStorage.setItem("balance amount", JSON.stringify(balanceAmount.innerText))
    localStorage.setItem("expense list", JSON.stringify(expenseList))
    localStorage.setItem("expense array", JSON.stringify(expenseArr))
    expenseInput.value = ""
    expenseTitle.value = ""
    addData(expenseList, expenseArr)
})



function addData (list, amount) {
    tableData = ""
    for (let i = 0; i < amount.length; i++) {
        tableData += `
        <tr>
            <td>${list[i]}</td>
            <td>${amount[i]}</td>
        </tr>
        `
    } 
    displayTable.innerHTML = tableHeading + tableData
}

deleteBtn.addEventListener("click", function() {
    expenseList = []
    expenseArr = []
    addData(expenseList, expenseArr)
    localStorage.setItem("expense list", JSON.stringify(expenseList))
    localStorage.setItem("expense array", JSON.stringify(expenseArr))
    expenseAmount.innerText = "$000"
    balanceAmount.innerText = budgetAmount.innerText
    localStorage.setItem("expense value", JSON.stringify(expenseAmount.innerText))
    localStorage.setItem("balance amount", JSON.stringify(balanceAmount.innerText))

})
