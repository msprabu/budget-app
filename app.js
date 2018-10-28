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
		},
		createLedgerColumn: 	function (divElement, desc, value){
			console.log("came here");
			var h4Elem = document.createElement("h4");
			h4Elem.textContent = desc;
			var spanElem = document.createElement("span");
			spanElem.id="dollarVal";
			spanElem.textContent = value;
			h4Elem.appendChild(spanElem);
			divElement.appendChild(h4Elem);
	}
	};
})();


var budgetController = (function(){

console.log("Budget controller");
	var Income = function(desc, value){
		this.desc=desc;
		this.value=value;
	};

	var Expense = function(desc, value){
		this.desc=desc;
		this.value=value;
	};

	var data = {

		allItems: {
			exp: [],
			inc: []
		}
	}

	return {
		addBudgetObj: function(type, desc, value){
			var newObj;
			if(type==="+"){
				newObj = new Income(desc,value);
				data.allItems.inc.push(newObj);
			}else{
				newObj = new Expense(desc,value);
				data.allItems.exp.push(newObj);
			}
			return newObj;
		},
		displayData: function(){
			return {
				expenseData: data.allItems.exp,
				incomeData: data.allItems.inc,
			}
		}
	}

})();


var appController = (function(){

	console.log("App controller");

	uiController.getInput().inputForm.addEventListener("submit", function(event){

	//Add to the Budget controller
	budgetController.addBudgetObj(uiController.getInput().operatorValue, uiController.getInput().desc, uiController.getInput().value);

	//Add to UI
	if(uiController.getInput().operatorValue==="+"){
		uiController.createLedgerColumn(uiController.getInput().incomeGrid, uiController.getInput().desc, uiController.getInput().value);
	}else{
		uiController.createLedgerColumn(uiController.getInput().expenseGrid, uiController.getInput().desc, uiController.getInput().value);
	}

	//Calculate and add tobudget
	uiController.getInput().incomeTicker.textContent=calcAll(budgetController.displayData().incomeData);
	uiController.getInput().expenseTicker.textContent=calcAll(budgetController.displayData().expenseData);
	uiController.getInput().grandTotal.textContent = (uiController.getInput().incomeTicker.textContent - uiController.getInput().expenseTicker.textContent);

	//Function to calculate total income/expense
	function calcAll(obj){
		console.log(obj);
		var sum=0;
		obj.forEach(function(item){
			sum = sum+Number(item.value);
		});

		return sum;
}


});

})();
