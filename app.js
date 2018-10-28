var uiController = (function(){

console.log("UI Controller");

	var domString = {
		selectOperator: "#selectOperator",
		itemDesc: "#itemDesc",
		itemVal: "#itemValue",
		inputForm: "#inputSubmit",
		incomeGrid: "div#incomeGrid",
		expenseGrid: "div#expenseGrid",
		selectOperator: "#selectOperator",
		grandTotal: "#grandTotalSpan",
		incomeTicker: "#incomeDollar",
		expenseTicker: "#expenseDollar"
	}
				var selectOperator= document.querySelector(domString.selectOperator);
				var itemDesc=  document.querySelector(domString.itemDesc);
				var itemVal=  document.querySelector(domString.itemVal);
				var inputForm=  document.querySelector(domString.inputForm);
				var incomeGrid= document.querySelector(domString.incomeGrid);
				var expenseGrid= document.querySelector(domString.expenseGrid);
				var selectOperator= document.querySelector(domString.selectOperator);
				var grandTotal=  document.querySelector(domString.grandTotal);
				var incomeTicker=  document.querySelector(domString.incomeTicker);
				var expenseTicker=  document.querySelector(domString.expenseTicker);

	return {
		getInput: function(){
				return{
				 operatorValue: selectOperator.options[selectOperator.selectedIndex].value,
				 desc: itemDesc.value,
				 value: itemVal.value,
				 selectOperator: selectOperator,
				 itemDesc: itemDesc,
				 itemVal:itemVal,
				 inputForm: inputForm,
				 incomeGrid: incomeGrid,
				 expenseGrid: expenseGrid,
				 selectOperator: selectOperator,
				 grandTotal: grandTotal,
				 incomeTicker: incomeTicker,
				 expenseTicker: expenseTicker
				};
		}
	};
})();


var budgetController = (function(){

console.log("Budget controller");
	/*uiController.getInput().incomeTicker.textContent;
	uiController.getInput().expenseTicker.textContent;
	uiController.getInput().grandTotal.textContent;
*/
})();


var appController = (function(){

	console.log("App controller");

	uiController.getInput().inputForm.addEventListener("submit", function(event){

	//Add to UI
	if(uiController.getInput().operatorValue==="+"){
		createLedgerColumn(uiController.getInput().incomeGrid, uiController.getInput().desc, uiController.getInput().value);
	}else{
		createLedgerColumn(uiController.getInput().expenseGrid, uiController.getInput().desc, uiController.getInput().value);
	}

	var incomeArray = document.querySelectorAll("div#incomeGrid span#dollarVal");
	var expenseArray = document.querySelectorAll("div#expenseGrid span#dollarVal");

	console.log(incomeArray);

	//Calculate and add tobudget
	uiController.getInput().incomeTicker.textContent=calcAll(incomeArray);
	uiController.getInput().expenseTicker.textContent=calcAll(expenseArray);

	uiController.getInput().grandTotal.textContent = (uiController.getInput().incomeTicker.textContent - uiController.getInput().expenseTicker.textContent);

	function createLedgerColumn(divElement, desc, value){
		console.log("came here");
		var h4Elem = document.createElement("h4");
		h4Elem.textContent = desc;
		var spanElem = document.createElement("span");
		spanElem.id="dollarVal";
		spanElem.textContent = value;
		h4Elem.appendChild(spanElem);
		divElement.appendChild(h4Elem);
}

function calcAll(obj){
	console.log(obj);
	var sum=0;
	obj.forEach(function(item){
		sum = sum+Number(item.textContent);
	});
	return sum;
}


});

})();
