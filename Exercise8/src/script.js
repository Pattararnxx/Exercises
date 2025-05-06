if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const currentScreenTextElement = document.querySelector('[data-operand-current]');
const previousScreenTextElement = document.querySelector('[data-operand-previous]');

class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement) {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    }

    appendNumber (number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    flashOperator(operation) {
      if(this.currentOperand === '') return;
      if (this.previousOperand !== '') {
          this.compute();
        }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '×':
                computation = previous * current;
                break;
            case '/':
                computation = previous / current;
                break;

            default:
                    return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentScreenTextElement.innerText = this.currentOperand;
        if(this.operation !== null){
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }else {
            this.previousScreenTextElement.innerText = '';
        }
    }
}

const calculator = new Calculator(
    currentScreenTextElement,
    previousScreenTextElement
);

numberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        }
    );
});

operationButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.flashOperator(button.innerText);
        calculator.updateDisplay();
        }
    );
});

equalsButton.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
    }
);

clearButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
    }
);

