
// Validator
// class Validator {
//     constructor(obj) {
//       this.obj = obj;
//       this.formElement = document.querySelector(obj.formId);
//     }
//     getElementFather(elementChill,selector) {
//       while(elementChill) {
//         if(elementChill.parentElement.matches(selector))
//         return elementChill.parentElement;
//         else elementChill = elementChill.parentElement;
//       }
//     }
//     invalid(elementInput,switches) {
//       if(this.obj.classInvalid) {
//         switch(switches) {
//           case 0: {
//             elementInput.style.border= 'none';
//             elementInput.style.backgroundColor = 'white';
//             break;
//           }
//           case 1: {
//             elementInput.style.border= '1px solid red';
//             elementInput.style.backgroundColor = 'rgba(255, 0, 0, 0.274)';
//             break
//           }
//           default: {
  
//           }
//         }
//       } else {
//         switch(switches) {
//           case 0: {
//             elementInput.classList.remove('invalid');
//             break;
//           }
//           case 1: {
//             elementInput.classList.add('invalid');
//             break
//           }
//           default: {
  
//           }
//         }
//       }
//     }
//     static isRequired(ErrorMessage) {
//       return (values)=> { 
//         return values ? undefined : ErrorMessage;
//       };
//     };
//     static notSpecialChar(ErrorMessage) {
//       return (values)=> {
//         var format =  /[-!@#$% ^&*_+=()<>,.\[\]{}\\|]/g;
//         return !values.match(format) ? undefined : ErrorMessage;
//       }
//     }
//     static checkRePass(ErrorMessage,valueInputPass) {
//       return (values)=> { 
//         return (values == valueInputPass().value) ? undefined : ErrorMessage;
//       }
//     }
//     static checked(ErrorMessage) {
//       return (values)=> {
//         return (values) ? undefined : ErrorMessage;
//       }
//     }
//     run() {
//       this.obj.elementInputs.forEach((input)=> {
//         var elementInput = this.formElement.querySelector(input.selectorInput);
//         var elementFather = this.getElementFather(elementInput,this.obj.formGroupSelector);
//         switch(input.type) {
//           case 'input': {
//             elementInput.onblur = (e)=> {
//               e.stopPropagation();
//               var ErrorMessage; 
//               var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage);
//               var rulesLength = input.rules.length;
//               for(var i = 0;i < rulesLength; i++) {    
//                 ErrorMessage = input.rules[i](e.target.value);
//                 if(ErrorMessage) {
//                   elementMessage.innerText = ErrorMessage;
//                   this.invalid(elementInput,1);
//                   break;
//                 } else {
//                   elementMessage.innerText = '';
//                   this.invalid(elementInput,0);
//                 }
//               }
//             };break;
//           }
//           case 'checkbox': {
//             elementInput.onclick = (e)=> {
//               e.stopPropagation();
//               var ErrorMessage;
//               var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage);
//               var rulesLength = input.rules.length;
//               for(var i = 0;i < rulesLength; i++) {    
//                 ErrorMessage = input.rules[i](elementInput.checked);
//                 if(ErrorMessage) {
//                   elementMessage.innerText = ErrorMessage;
//                   break;
//                 } else {
//                   elementMessage.innerText = '';
//                 }
//               }
//             };break;
//           }
//           default : {
//             console.error(`Bạn Chưa Định Kiểu Cho Input có iD: ${input.selectorInput}`);
//           }
//         }
//       })
//       this.formElement.onsubmit = (e)=> {
//         var flag = false;
//         this.obj.elementInputs.forEach((input)=> {
//           var elementInput = this.formElement.querySelector(input.selectorInput);
//           var elementFather = this.getElementFather(elementInput,this.obj.formGroupSelector);
//           switch(input.type) {
//             case 'input': {
//                 var ErrorMessage; 
//                 var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage)
//                 var rulesLength = input.rules.length;
//                 for(var i = 0;i < rulesLength; i++) {    
//                   ErrorMessage = input.rules[i](elementInput.value);
//                   if(ErrorMessage) {
//                     elementMessage.innerText = ErrorMessage;
//                     this.invalid(elementInput,1);  
//                     flag = true;
//                     break;
//                   } else {
//                     elementMessage.innerText = '';
//                     this.invalid(elementInput,0);
//                   }
//                 };break;
//             }
//             case 'checkbox': {
//               var ErrorMessage;
//               var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage);
//               var rulesLength = input.rules.length;
//               for(var i = 0;i < rulesLength; i++) {    
//                 ErrorMessage = input.rules[i](elementInput.checked);
//                 if(ErrorMessage) {
//                   elementMessage.innerText = ErrorMessage;
//                   flag = true;
//                   break;
//                 } else {
//                   elementMessage.innerText = '';
//                 }
//               };break;
//             }
//             default: {
  
//             }
//           }
//         })
//         if(flag) {
//           e.preventDefault()
//         } else {
//           return true
//         }
//       }
//     }
//   }
//   export default Validator;