
            var form = document.querySelector('form');
            var showText = document.querySelector('.show');
            var showText2 = document.querySelector('h2.show2');
            var inputText = document.querySelector('input.text');
            var remember = document.querySelector('div.remember');
            var submitBt = document.querySelector('input.bt');
            var forget = document.querySelector('.forget');
            var forgetBt = document.querySelector('input.Fbt');

            forget.style.display= 'none';
            
            form.addEventListener('submit', function(e) {
             e.preventDefault();
            });
            
            submitBt.addEventListener('click',function(){
                localStorage.setItem('name',inputText.value);
                nameDisplayCheck();
            })
            forgetBt.addEventListener('click',function(){
                localStorage.removeItem('name');
                nameDisplayCheck();
            })
            function nameDisplayCheck(){
                if(localStorage.getItem('name')){
                   
                    let name = localStorage.getItem('name');
                    console.log(" have name  = "+ name );
                    showText.textContent = "你好"+name;
                    showText2.textContent = "欢迎来到我们的网站，" +  name +" 希望你在此有所学习进步!";
                    remember.style.display ='none';
                    forget.style.display= 'block';
                }else{
                    console.log("else");
                    remember.style.display ='block';
                    forget.style.display= 'none';
                    showText.textContent= " 在此恭候多时了！！";
                    showText2.textContent = " 欢迎来到我们的网站，希望你在此有所学习进步!";
                }
            }
            document.onload = nameDisplayCheck();
     