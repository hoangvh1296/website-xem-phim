class Validator {
  constructor(obj) {
    this.obj = obj;
    this.formElement = document.querySelector(obj.formId);
  }
  getElementFather(elementChill,selector) {
    while(elementChill) {
      if(elementChill.parentElement.matches(selector))
      return elementChill.parentElement;
      else elementChill = elementChill.parentElement;
    }
  }
  invalid(elementInput,switches) {
    if(this.obj.classInvalid) {
      switch(switches) {
        case 0: {
          elementInput.style.border= 'none';
          elementInput.style.backgroundColor = 'white';
          break;
        }
        case 1: {
          elementInput.style.border= '1px solid red';
          elementInput.style.backgroundColor = 'rgba(255, 0, 0, 0.274)';
          break
        }
        default: {

        }
      }
    } else {
      switch(switches) {
        case 0: {
          elementInput.classList.remove('invalid');
          break;
        }
        case 1: {
          elementInput.classList.add('invalid');
          break
        }
        default: {

        }
      }
    }
  }
  static isRequired(ErrorMessage) {
    return (values)=> { 
      return values ? undefined : ErrorMessage;
    };
  };
  static notSpecialChar(ErrorMessage) {
    return (values)=> {
      var format =  /[-!@#$% ^&*_+=()<>,.\[\]{}\\|]/g;
      return !values.match(format) ? undefined : ErrorMessage;
    }
  }
  static checkRePass(ErrorMessage,valueInputPass) {
    return (values)=> { 
      return (values == valueInputPass().value) ? undefined : ErrorMessage;
    }
  }
  static checked(ErrorMessage) {
    return (values)=> {
      return (values) ? undefined : ErrorMessage;
    }
  }
  run() {
    this.obj.elementInputs.forEach((input)=> {
      var elementInput = this.formElement.querySelector(input.selectorInput);
      var elementFather = this.getElementFather(elementInput,this.obj.formGroupSelector);
      switch(input.type) {
        case 'input': {
          elementInput.onblur = (e)=> {
            e.stopPropagation();
            var ErrorMessage; 
            var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage);
            var rulesLength = input.rules.length;
            for(var i = 0;i < rulesLength; i++) {    
              ErrorMessage = input.rules[i](e.target.value);
              if(ErrorMessage) {
                elementMessage.innerText = ErrorMessage;
                this.invalid(elementInput,1);
                break;
              } else {
                elementMessage.innerText = '';
                this.invalid(elementInput,0);
              }
            }
          };break;
        }
        case 'checkbox': {
          elementInput.onclick = (e)=> {
            e.stopPropagation();
            var ErrorMessage;
            var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage);
            var rulesLength = input.rules.length;
            for(var i = 0;i < rulesLength; i++) {    
              ErrorMessage = input.rules[i](elementInput.checked);
              if(ErrorMessage) {
                elementMessage.innerText = ErrorMessage;
                break;
              } else {
                elementMessage.innerText = '';
              }
            }
          };break;
        }
        default : {
          console.error(`Bạn Chưa Định Kiểu Cho Input có iD: ${input.selectorInput}`);
        }
      }
    })
    this.formElement.onsubmit = (e)=> {
      var flag = false;
      this.obj.elementInputs.forEach((input)=> {
        var elementInput = this.formElement.querySelector(input.selectorInput);
        var elementFather = this.getElementFather(elementInput,this.obj.formGroupSelector);
        switch(input.type) {
          case 'input': {
              var ErrorMessage; 
              var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage)
              var rulesLength = input.rules.length;
              for(var i = 0;i < rulesLength; i++) {    
                ErrorMessage = input.rules[i](elementInput.value);
                if(ErrorMessage) {
                  elementMessage.innerText = ErrorMessage;
                  this.invalid(elementInput,1);  
                  flag = true;
                  break;
                } else {
                  elementMessage.innerText = '';
                  this.invalid(elementInput,0);
                }
              };break;
          }
          case 'checkbox': {
            var ErrorMessage;
            var elementMessage = elementFather.querySelector(this.obj.selectorElementMessage);
            var rulesLength = input.rules.length;
            for(var i = 0;i < rulesLength; i++) {    
              ErrorMessage = input.rules[i](elementInput.checked);
              if(ErrorMessage) {
                elementMessage.innerText = ErrorMessage;
                flag = true;
                break;
              } else {
                elementMessage.innerText = '';
              }
            };break;
          }
          default: {

          }
        }
      })
      if(flag) {
        e.preventDefault()
      } else {
        return true
      }
    }
  }
}
// hien nav btn tren tablet va phone
var checkNavBtn = document.querySelector('.header__navbar-btn-icon');
var checkInput = document.querySelector('#nav-btn');
var navbarTablet = document.querySelector('.header__navbar-list-directional');
checkNavBtn.onclick = (e)=> {
  checkInput.checked ? checkInput.checked = false : checkInput.checked = true; 
  if(checkInput.checked){
      checkNavBtn.style.color = '#f1b722';
      navbarTablet.style.transform=`translateX(0%)`;
  } else {
    navbarTablet.style.transform=`translateX(100%)`;
    checkNavBtn.style.color = 'white';

  }
}
//  =======   ACTION WITH MODAL =========
const elementModal = document.getElementById('modal');  
const elementModalBody =  elementModal.querySelector('.modal__body');
// Form login and register
const objBoxForms = {
  btnRegister:document.querySelectorAll('.register'),
  btnLogin:document.querySelectorAll('.login'),
  formBody:document.querySelector('.form-body'),
  btnClose:document.querySelectorAll('.btn-close-form'),
  btnDirectionalLogin:document.querySelector('.form-body .login-directional'),
  btnDirectionalRegister:document.querySelector('.form-body .register-directional'),
  resetForm:function() {
    this.formBody.querySelectorAll('.input-message').forEach(e=> {
      e.innerText = '';
    })
    this.formBody.querySelectorAll('.input-value').forEach(e=> {
      e.style.border = 'none';
      e.style.backgroundColor = 'white';
      e.value = '';
    })
  },
  render:function() {
    const rulesFromRegister  = new Validator({
      formId:'#form-1',
      formGroupSelector:'.form-group',
      selectorElementMessage:'.input-message',
      classInvalid: '.invalid', 
      elementInputs:[
        {
          selectorInput:'#register-name',
          rules:[
            Validator.isRequired('Ban phai dien truong nay'),
            Validator.notSpecialChar('khong duoc nhap cac ki tu dac biet')
          ],
          type: 'input'
        },
        {
          selectorInput:'#register-pass',
          rules:[
            Validator.isRequired('Ban phai dien truong nay'),
            Validator.notSpecialChar('khong duoc nhap cac ki tu dac biet')
          ],
          type: 'input'
        },
        {
          selectorInput:'#register-rePass',
          rules:[
            Validator.isRequired('Ban phai dien truong nay'),
            Validator.checkRePass('Mat Khau NhapLai Khong dung',()=>{
              return document.querySelector('#form-1 #register-pass')
            })
          ],
          type: 'input'
        },
      ],
    });
    const rulesFormLogin = new Validator({
      formId:'#form-2',
      formGroupSelector:'.form-group',
      selectorElementMessage:'.input-message',
      classInvalid: '.invalid',
      elementInputs:[
        {
          selectorInput:'#login-name',
          rules:[
            Validator.isRequired('Ban phai dien truong nay'),
          ],
          type: 'input'
        },
        {
          selectorInput:'#login-pass',
          rules:[
            Validator.isRequired('Ban phai dien truong nay'),
          ],
          type: 'input'
        }
      ],
    });
    rulesFromRegister.run();
    rulesFormLogin.run();
    if(this.btnRegister) {
      this.btnRegister.forEach(e=>{
        e.onclick= e=> {
          e.stopPropagation();
          e.preventDefault();
          elementModal.style.display= 'flex';
          elementModal.style.animation = 'fadeIn .6s ease forwards';
          this.formBody.style.display = 'block'
          this.formBody.style.animation = 'scaleIn .6s ease forwards';
          document.querySelector('.box-forms').style.transform = 'translateX(0%)';
          this.btnDirectionalRegister.classList.add('btn--active');
          this.btnDirectionalLogin.classList.remove('btn--active');
        }
      })
    };
    if(this.btnLogin) {
      this.btnLogin.forEach(e=>{
        e.onclick= e=> {
          e.stopPropagation();
          e.preventDefault();
          elementModal.style.display= 'flex';
          this.formBody.style.animation = 'scaleIn .6s ease forwards';
          this.formBody.style.display = 'block';
          elementModal.style.animation = 'fadeIn .6s ease forwards';
          document.querySelector('.box-forms').style.transform = 'translateX(-50%)';
          this.btnDirectionalRegister.classList.remove('btn--active');
          this.btnDirectionalLogin.classList.add('btn--active');
        }
      })
    };
    if(this.btnDirectionalLogin) {
      this.btnDirectionalLogin.onclick = e=> {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector('.box-forms').style.transform = 'translateX(-50%)';
        this.btnDirectionalRegister.classList.remove('btn--active');
        this.btnDirectionalLogin.classList.add('btn--active');
        this.resetForm();
      }
    };
    if(this.btnDirectionalRegister) {
      this.btnDirectionalRegister.onclick = e=> {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector('.box-forms').style.transform = 'translateX(0%)';
        this.btnDirectionalRegister.classList.add('btn--active');
        this.btnDirectionalLogin.classList.remove('btn--active');
        this.resetForm()
      }
    };
    if(this.btnClose) {
      this.btnClose.forEach(e=> {
        e.onclick = e=> {
          e.stopPropagation();
          e.preventDefault();
          elementModal.style.animation = 'fadeOut .6s ease forwards';
          setTimeout(()=> {
            elementModal.style.display= 'none';
            this.formBody.style.display = 'none';
          },700);
          this.resetForm()
          this.formBody.style.animation = 'scaleOut .6s ease forwards';
        }       
      }) 
    }
  },
  run:function() {
    this.render();
  }
};
objBoxForms.run();
// xem trainer phim
const objectBtnTrailer = {
  video: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/zb1WyTKYoME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
  </iframe>`,
    // video: `<video src="../vodeos/trailers/y2mate.com - Evangelion 3010  Theme Song FullOne Last Kissby Hikaru Utada_1080pFHR (1).mp4" controls>
    // </video>`,
  createElementVideo: function() {
    if(elementModalBody.querySelector('.trailer-box'))
    elementModalBody.removeChild(elementModalBody.querySelector('.trailer-box'));
    const elementVideo = document.createElement('div');
    elementVideo.classList.add('trailer-box');
    elementVideo.innerHTML = this.video;
    elementModalBody.appendChild(elementVideo);
    if(elementVideo.querySelector('iframe')){
      elementVideo.querySelector('iframe').onclick =(e)=> {
        e.stopPropagation();
      }
    };
    if(elementVideo.querySelector('video')){
      elementVideo.querySelector('video').classList.add('video');
      elementVideo.querySelector('video').onclick =(e)=> {
        e.stopPropagation();
      }
    };
    elementModal.style.animation ='fadeIn .6s ease forwards';
    elementModal.style.display = 'flex';
  },
  deleteElementVideo: function() {
    setTimeout(()=> {
      elementModalBody.removeChild(elementModalBody.querySelector('.trailer-box'));
      elementModal.style.display = 'none';
    },700);
    elementModal.style.animation = 'fadeOut .6s ease forwards';
  },
  action: function() {
    if(document.querySelector('.film-review__btn--trainer')){
      document.querySelector('.film-review__btn--trainer').onclick = (e)=> {
        e.stopPropagation();
        e.preventDefault();
        this.createElementVideo();
        elementModal.onclick = (e)=> {
          e.stopPropagation();
          if(elementModalBody.querySelector('.trailer-box')) {
            this.deleteElementVideo();
          }
        }
      } 
    }
  },
  run: function() {
    this.action();
  }
};
objectBtnTrailer.run();

const obj = {
  value:'chua co',
  set Value(pragram) {
    this.value = pragram
  },
  get Value() {
    console.log(this.value)
  }
}


