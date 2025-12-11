document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click',function(e){
      let target=document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });
  
  const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.style.opacity='1';
        entry.target.style.transform='translateY(0)';
        if(entry.target.classList.contains('progress-bar')){
          setTimeout(function(){
            entry.target.style.width=entry.target.getAttribute('data-width')||entry.target.style.width;
          },200);
        }
      }
    });
  },observerOptions);
  
  document.querySelectorAll('.card,.progress-bar').forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    el.style.transition='opacity 0.6s ease,transform 0.6s ease';
    observer.observe(el);
  });
  
  document.querySelectorAll('.progress-bar').forEach(function(bar){
    const width=bar.style.width;
    bar.setAttribute('data-width',width);
    bar.style.width='0%';
  });
});
