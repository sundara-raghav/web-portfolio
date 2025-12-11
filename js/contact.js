document.addEventListener('DOMContentLoaded',function(){
  let form=document.getElementById('contactForm');
  let status=document.getElementById('formStatus');
  let accessKeyInput=document.getElementById('access_key');
  if(window.CONFIG&&window.CONFIG.WEB3FORMS_ACCESS_KEY){
    accessKeyInput.value=window.CONFIG.WEB3FORMS_ACCESS_KEY;
  }
  form.addEventListener('submit',function(e){
    if(form.checkValidity()===false){
      e.preventDefault();
      form.classList.add('was-validated');
      status.textContent='Please fill all required fields.';
      status.className='alert alert-danger';
      status.style.display='block';
      return;
    }
    if(document.querySelector('input[name="website"]').value!==''){
      e.preventDefault();
      status.textContent='Bot detected.';
      status.className='alert alert-danger';
      status.style.display='block';
      return;
    }
    e.preventDefault();
    let data=new FormData(form);
    fetch(form.action,{method:'POST',body:data})
      .then(res=>res.json())
      .then(result=>{
        if(result.success){
          status.textContent='Message sent! Check your email for confirmation.';
          status.className='alert alert-success';
          status.style.display='block';
          form.reset();
          form.classList.remove('was-validated');
        }else{
          status.textContent='Error: '+(result.message||'Submission failed.');
          status.className='alert alert-danger';
          status.style.display='block';
        }
      })
      .catch(()=>{
        status.textContent='Network error. Please try again.';
        status.className='alert alert-danger';
        status.style.display='block';
      });
  });
});
