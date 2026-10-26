(function(){
  var cats=window.LUXENEST_CATEGORIES||[], items=window.LUXENEST_PROJECTS||[];
  var catLabel={}; cats.forEach(function(c){catLabel[c.id]=c.label});
  var grid=document.getElementById('pfGrid'), filters=document.getElementById('pfFilters'), empty=document.getElementById('pfEmpty');
  var current='all';
  var FS='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}

  function media(p,big){
    var wrap=document.createElement('div');
    if(p.type==='compare'){
      wrap.className='pf-media ba';wrap.tabIndex=0;wrap.setAttribute('role','slider');
      wrap.setAttribute('aria-label','Before and after comparison: '+p.title);
      wrap.setAttribute('aria-valuemin','0');wrap.setAttribute('aria-valuemax','100');wrap.setAttribute('aria-valuenow','50');
      wrap.innerHTML='<img src="'+p.after+'" alt="After: '+esc(p.title)+'" width="1536" height="1024" '+(big?'':'loading="lazy" ')+'decoding="async">'+
        '<div class="ba-before"><img src="'+p.before+'" alt="Before: '+esc(p.title)+'" width="1536" height="1024" '+(big?'':'loading="lazy" ')+'decoding="async"></div>'+
        '<div class="ba-handle"></div><span class="ba-tag b">Before</span><span class="ba-tag a">After</span><span class="ba-hint">Drag to compare</span>';
      initSlider(wrap);
    }else{
      wrap.className='pf-media';
      wrap.innerHTML='<img src="'+p.after+'" alt="'+esc(p.title)+'" width="1536" height="1024" '+(big?'':'loading="lazy" ')+'decoding="async"><span class="tag-single">After</span>';
    }
    return wrap;
  }
  function initSlider(el){
    var drag=false;
    function set(pct){pct=Math.max(0,Math.min(100,pct));el.style.setProperty('--pos',pct+'%');el.setAttribute('aria-valuenow',Math.round(pct))}
    function fromEvent(e){var r=el.getBoundingClientRect();set((e.clientX-r.left)/r.width*100)}
    el.addEventListener('pointerdown',function(e){if(e.target.closest('.pf-fs'))return;drag=true;el.classList.add('touched');el.setPointerCapture(e.pointerId);fromEvent(e)});
    el.addEventListener('pointermove',function(e){if(drag)fromEvent(e)});
    ['pointerup','pointercancel'].forEach(function(t){el.addEventListener(t,function(){drag=false})});
    el.addEventListener('keydown',function(e){
      var v=parseFloat(el.getAttribute('aria-valuenow'));
      if(e.key==='ArrowLeft'||e.key==='ArrowDown'){set(v-5);e.preventDefault()}
      if(e.key==='ArrowRight'||e.key==='ArrowUp'){set(v+5);e.preventDefault()}
      if(e.key==='Home'){set(0);e.preventDefault()}if(e.key==='End'){set(100);e.preventDefault()}
      el.classList.add('touched');
    });
  }

  function render(){
    grid.innerHTML='';
    items.forEach(function(p,i){
      var c=document.createElement('article');c.className='pf-card reveal';c.dataset.cat=p.category;c.dataset.i=i;
      var m=media(p,false);
      var fs=document.createElement('button');fs.className='pf-fs';fs.type='button';fs.setAttribute('aria-label','View full screen: '+p.title);fs.innerHTML=FS;
      fs.addEventListener('click',function(){openLb(i)});m.appendChild(fs);
      c.appendChild(m);
      var b=document.createElement('div');b.className='pf-body';
      b.innerHTML='<div class="pf-cat">'+esc(catLabel[p.category]||'')+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.description)+'</p>';
      c.appendChild(b);grid.appendChild(c);
    });
    cats.forEach(function(c){
      var b=document.createElement('button');b.type='button';b.className='pf-chip'+(c.id==='all'?' on':'');b.textContent=c.label;b.dataset.id=c.id;
      b.addEventListener('click',function(){filter(c.id)});filters.appendChild(b);
    });
    if('IntersectionObserver' in window){
      var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}})},{threshold:.08});
      grid.querySelectorAll('.reveal').forEach(function(el){o.observe(el)});
    }else grid.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible')});
  }
  function filter(id){
    current=id;var n=0;
    filters.querySelectorAll('.pf-chip').forEach(function(b){b.classList.toggle('on',b.dataset.id===id)});
    grid.querySelectorAll('.pf-card').forEach(function(c){var show=id==='all'||c.dataset.cat===id;c.classList.toggle('hide',!show);if(show){n++;c.classList.add('visible')}});
    empty.classList.toggle('show',n===0);
  }

  /* lightbox */
  var lb=document.getElementById('lb'),stage=document.getElementById('lbStage'),cap=document.getElementById('lbCap'),idx=0;
  function visibleIdx(){return Array.prototype.map.call(grid.querySelectorAll('.pf-card:not(.hide)'),function(c){return +c.dataset.i})}
  function openLb(i){idx=i;showLb();lb.classList.add('open');document.body.classList.add('lb-lock');lb.querySelector('.lb-x').focus()}
  function showLb(){
    var p=items[idx];stage.innerHTML='';stage.appendChild(media(p,true));
    cap.innerHTML='<b>'+esc(p.title)+'</b>'+esc(p.description);
  }
  function step(d){var v=visibleIdx();if(!v.length)return;var k=(v.indexOf(idx)+d+v.length)%v.length;idx=v[k];showLb()}
  function closeLb(){lb.classList.remove('open');document.body.classList.remove('lb-lock');stage.innerHTML=''}
  lb.querySelector('.lb-x').addEventListener('click',closeLb);
  lb.querySelector('.lb-p').addEventListener('click',function(){step(-1)});
  lb.querySelector('.lb-n').addEventListener('click',function(){step(1)});
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')closeLb();
    if(e.key==='PageUp')step(-1);if(e.key==='PageDown')step(1);
  });
  render();
})();
