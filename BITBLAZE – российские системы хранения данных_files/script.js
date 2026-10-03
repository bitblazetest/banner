(function () {
  function initBitblazeHero() {
    var oldHero = document.getElementById('rev_slider_20_1_forcefullwidth');
    if (!oldHero || document.querySelector('.bb-hero')) return;

    var assetRoot = './BITBLAZE – российские системы хранения данных_files/';
    var hero = document.createElement('section');
    hero.className = 'bb-hero';
    hero.setAttribute('aria-roledescription', 'carousel');
    hero.setAttribute('aria-label', 'Главные предложения BITBLAZE');
    hero.innerHTML =
      '<div class="bb-slide bb-slide-brand is-active" data-slide="0">' +
        '<img class="bb-brand-bg" src="' + assetRoot + 'banner-1.png" alt="">' +
        '<img class="bb-brand-text-image" src="' + assetRoot + 'banner-text.png" alt="BITBLAZE — Свое железо. Свое ПО">' +
        '<div class="bb-brand-copy"><b>BITBLAZE</b><p>BITBLAZE &ndash; &#1077;&#1076;&#1080;&#1085;&#1099;&#1081; &#1087;&#1088;&#1086;&#1080;&#1079;&#1074;&#1086;&#1076;&#1080;&#1090;&#1077;&#1083;&#1100; &#1089;&#1080;&#1089;&#1090;&#1077;&#1084; &#1093;&#1088;&#1072;&#1085;&#1077;&#1085;&#1080;&#1103; &#1076;&#1072;&#1085;&#1085;&#1099;&#1093;:<br>&#1072;&#1087;&#1087;&#1072;&#1088;&#1072;&#1090;&#1085;&#1099;&#1077; &#1087;&#1083;&#1072;&#1090;&#1092;&#1086;&#1088;&#1084;&#1099; &#1080; &#1087;&#1088;&#1086;&#1075;&#1088;&#1072;&#1084;&#1084;&#1085;&#1086;&#1077; &#1086;&#1073;&#1077;&#1089;&#1087;&#1077;&#1095;&#1077;&#1085;&#1080;&#1077; &#1089;&#1086;&#1073;&#1089;&#1090;&#1074;&#1077;&#1085;&#1085;&#1086;&#1081; &#1088;&#1072;&#1079;&#1088;&#1072;&#1073;&#1086;&#1090;&#1082;&#1080;</p><h2>&#1057;&#1074;&#1086;&#1077; &laquo;&#1078;&#1077;&#1083;&#1077;&#1079;&#1086;&raquo;. &#1057;&#1074;&#1086;&#1077; &#1055;&#1054;</h2></div>' +
        '<div class="bb-binary-inline" aria-hidden="true"><canvas></canvas></div>' +
        '<iframe class="bb-binary-animation" src="' + assetRoot + 'binary-hero.html" title="Анимированный сервер BITBLAZE" tabindex="-1" aria-hidden="true"></iframe>' +
      '</div>' +
      '<div class="bb-slide bb-slide-sirius" data-slide="1">' +
        '<img class="bb-fast-lines" src="' + assetRoot + 'fast_lines.png" alt="">' +
        '<div class="bb-sirius-copy"><h2>Sirius 4100</h2><p>All-Flash NVMe система хранения данных</p><img src="' + assetRoot + 'works_faster.svg" alt="Работает быстрее"></div>' +
        '<img class="bb-server" src="' + assetRoot + '4100_1.png" alt="Система хранения данных Sirius 4100">' +
        '<a class="bb-hero-button" href="#">Узнать подробнее</a>' +
      '</div>' +
      '<div class="bb-slide bb-slide-power" data-slide="2">' +
        '<img class="bb-power-title" src="' + assetRoot + 'power_title.svg" alt="BITBLAZE Power">' +
        '<img class="bb-power-hand" src="' + assetRoot + 'power_hand.svg" alt="Российские модули питания BITBLAZE Power">' +
        '<a class="bb-hero-button" href="#">Подробнее</a>' +
      '</div>' +
      '<button class="bb-arrow bb-prev" type="button" aria-label="Предыдущий баннер">‹</button>' +
      '<button class="bb-arrow bb-next" type="button" aria-label="Следующий баннер">›</button>' +
      '<div class="bb-dots" role="tablist" aria-label="Выбор баннера">' +
        '<button class="is-active" type="button" data-to="0" aria-label="Баннер 1"></button>' +
        '<button type="button" data-to="1" aria-label="Баннер 2"></button>' +
        '<button type="button" data-to="2" aria-label="Баннер 3"></button>' +
      '</div>';

    oldHero.parentNode.insertBefore(hero, oldHero);
    var placeholder = document.getElementById('bb-hero-placeholder');
    oldHero.style.display = 'none';
    initBinaryAnimation(hero.querySelector('.bb-binary-inline canvas'));
    if (placeholder) requestAnimationFrame(function () {
      if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
    });
    var slides = Array.prototype.slice.call(hero.querySelectorAll('.bb-slide'));
    var dots = Array.prototype.slice.call(hero.querySelectorAll('.bb-dots button'));
    var current = 0;
    var timer;

    function show(index) {
      current = 0;
      slides.forEach(function (slide, i) { slide.classList.toggle('is-active', i === current); });
      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === current); });
    }
    function restart() {
      clearInterval(timer);
    }
    hero.querySelector('.bb-prev').addEventListener('click', function () { show(current - 1); restart(); });
    hero.querySelector('.bb-next').addEventListener('click', function () { show(current + 1); restart(); });
    dots.forEach(function (dot) { dot.addEventListener('click', function () { show(Number(dot.dataset.to)); restart(); }); });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);
    restart();

    var cookieButton = document.getElementById('laika-accept-cookies');
    if (cookieButton) cookieButton.addEventListener('click', function () {
      var notice = document.getElementById('laika-cookie-notice');
      if (notice) notice.style.display = 'none';
    });
  }
  function initBinaryAnimation(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d'), glyphs = 'BITBLAZE'.split('');
    var cells = [], width = 0, height = 0, lastFrame = -40;
    function hash(n) { n = Math.imul(n ^ (n >>> 16), 0x45d9f3b); n = Math.imul(n ^ (n >>> 16), 0x45d9f3b); return (n ^ (n >>> 16)) >>> 0; }
    function build() {
      var rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
      var size = Math.max(5, Math.min(8, width / 178)), sx = size * .66, sy = size * .72; cells = [];
      for (var y=sy*.5,row=0;y<height;y+=sy,row++) for(var x=sx*.5,col=0;x<width;x+=sx,col++) {
        var seed=hash(row*4099+col*131),dx=(x/width-.5)/.19,dy=(y/height-.685)/.27;
        cells.push({x:x,y:y,seed:seed,logo:Math.exp(-(dx*dx+dy*dy)*1.15),depth:.28+((seed>>>15)%720)/1000,phase:(seed%628)/100,glyph:(col+row*3)%glyphs.length});
      }
    }
    function render(time) {
      time=time||0; if(time-lastFrame<33){requestAnimationFrame(render);return;} lastFrame=time; ctx.clearRect(0,0,width,height);
      var size=Math.max(5,Math.min(8,width/178)),angle=(time%10000)/10000*Math.PI*2;
      ctx.font='500 '+size+'px ui-monospace,Consolas,monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
      cells.forEach(function(c){
        var motion=1-c.logo*.82,de=1-c.logo,parallax=.55+c.depth*.65;
        var px=(c.depth-.55)*1.1*de+Math.sin(angle+c.phase*1.7)*.58*motion*parallax;
        var py=(c.depth-.55)*-.7*de+Math.cos(angle*2+c.phase)*.74*motion*parallax;
        var mix=Math.pow(Math.max(0,Math.min(1,(c.y/height-.2)/.8)),2),r=Math.round(255+(66-255)*mix),g=Math.round(255+(179-255)*mix),b=Math.round(255+(80-255)*mix);
        var a=Math.max(.32,Math.min(1,.75+c.depth*.25+Math.sin(angle*3+c.phase*2.3)*.075*motion));
        var shift=Math.floor((Math.sin(angle*2+c.phase)+1)*1.5);
        ctx.fillStyle='rgba('+r+','+g+','+b+','+a+')'; ctx.fillText(glyphs[(c.glyph+shift)%glyphs.length],c.x+px,c.y+py);
      }); requestAnimationFrame(render);
    }
    build(); render(0);
    requestAnimationFrame(function () { requestAnimationFrame(function () { canvas.classList.add('is-ready'); }); });
    if(window.ResizeObserver)new ResizeObserver(build).observe(canvas.parentNode);else window.addEventListener('resize',build);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBitblazeHero);
  else initBitblazeHero();
})();
