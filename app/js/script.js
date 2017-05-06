document.addEventListener('DOMContentLoaded', function() {

/*---------------- Slider on VANILLA JS ---------------------*/
  DOMTokenList.prototype.addMany = function(classes) {
    if(typeof classes === 'string') {
      var classList = classes.split(' ');
      for(var i = classList.length - 1; i >= 0; i--) {
        this.add(classList[i]);
      }
    }
  };

  DOMTokenList.prototype.removeMany = function(classes) {
    if(typeof classes === 'string') {
      var classList = classes.split(' ');
      for(var i = classList.length - 1; i >= 0; i--) {
        this.remove(classList[i]);
      }
    }
  };

  DOMTokenList.prototype.toggleMany = function(classes) {
    if(typeof classes === 'string') {
      var classList = classes.split(' ');
      for(var i = classList.length - 1; i >= 0; i--) {
        this.toggle(classList[i]);
      }
    }
  };

  
  function animateSliders(opts) {
    opts = opts || {};
    opts.slider_container = opts.slider_container || 'slider_container';
    opts.slider_galery = opts.slider_galery || 'slider_galery';
    opts.div_width = opts.div_width || 270;
    opts.div_height = opts.div_height || 115;
    opts.activeClass = opts.activeClass || 'active';
    opts.disabledClass = opts.disabledClass || 'disabled';
    opts.navClass = opts.navClass || 'nav';
    opts.elementClass = opts.elementClass || 'element';

    var sliders = document.getElementsByClassName(opts.slider_container);
    var slider_galery = document.getElementsByClassName(opts.slider_galery);
    var leftRight = ['right', 'left'];
    for (var i = sliders.length - 1; i >= 0; i--) {
      var slider = sliders[i];
      for(var j = 1; j >= 0; j--) {  
        var navEl = document.createElement('div');
        navEl.classList.addMany('nav ' + leftRight[j]);
        navEl.addEventListener('click', (function(slider_galery, inc, activeClass, disabledClass, navClass, elementClass) {
          return function(event) {
            if(!event.target.classList.contains(disabledClass)) {
              var elements = slider_galery.getElementsByClassName(elementClass);
              console.log(slider_galery);
              console.log(elements);
              for(var i = elements.length - 1; i >= 0; i--) {
                if(elements[i].classList.contains(activeClass)) {
                  elements[i].classList.remove(activeClass);
                  elements[i+inc].classList.add(activeClass);
                  if(i+inc !== (elements.length - 1) || i+inc !== 0) {
                    var navs = event.target.parentNode.getElementsByClassName(navClass);
                    navs[0].classList.remove(disabledClass);
                    navs[1].classList.remove(disabledClass);
                    console.log('Ping');
                  }
                  console.log('i: ' + i);
                  console.log('elements.length: ' + elements.length);
                  if(i+inc === (elements.length - 1) || i+inc === 0) {
                    event.target.classList.add(disabledClass);
                    console.log('Pong');
                  }
                  break;
                }
              }
            }
          }
        })(slider_galery[i], Math.pow(-1, j), opts.activeClass, opts.disabledClass, opts.navClass, opts.elementClass), false);
        slider.appendChild(navEl).innerText = '';
      }
      var elements = slider_galery[i].getElementsByTagName('div');
      elements[((elements.length/2)|0)].classList.add(opts.activeClass);
      // sliders[i].style.width = opts.div_width + 'px';
      sliders[i].style.height = opts.div_height + '%';
      slider_galery[i].style.width = elements.length + '00%';
      slider_galery[i].style.height = opts.div_height + 'px';
    }
  }
  var opts = {
    div_width: 430, 
    div_height: 100
  };

  animateSliders(opts);


  var elem = document.querySelector('.grid');

	$(".btn-serch").click(function(e){
		e.preventDefault();
			$('.grid').empty();
			var API_KEY = '4816270-af36daff094a60749f62b82b6';
			var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+$("#find-field").val()+"&per_page=7&webformatURL=_340";
			$.getJSON(URL, function(data){
				if (parseInt(data.totalHits) > 7)
					$.each(data.hits, function(i, hit){ 
						console.log(i);
						if ($('.grid-item').length == 4 || $('.grid-item').length == 5){
							$('.grid').append('<div class="grid-item grid-item--width2"><img src="' + hit.webformatURL + '" alt="" class="galery__img"><p class="galery__title">'+hit.tags+'</p></div>');
						} else {
							$('.grid').append('<div class="grid-item"><img src="' + hit.webformatURL + '" alt="" class="galery__img"><p class="galery__title1">'+hit.tags+'</p></div>');	
						}
						if($('.grid-item').length == 7) {
							var msnry = new Masonry( elem, {
								itemSelector: '.grid-item',
								columnWidth: 1,
								gutter: 20
							});
						}
					});
				else
					console.log('No hits');
			});
	});


	var API_KEY = '4816270-af36daff094a60749f62b82b6';

	var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+Math.floor((Math.random() * 10) + 1)+"&per_page=7&webformatURL=_340";

	$.getJSON(URL, function(data){

		if (parseInt(data.totalHits) > 7)
			$.each(data.hits, function(i, hit){ 
				console.log(i);
				if ($('.grid-item').length == 4 || $('.grid-item').length == 5){
					$('.grid').append('<div class="grid-item grid-item--width2"><img src="' + hit.webformatURL + '" alt="" class="galery__img"><p class="galery__title">'+hit.tags+'</p></div>');
				} else {
					$('.grid').append('<div class="grid-item"><img src="' + hit.webformatURL + '" alt="" class="galery__img"><p class="galery__title1">'+hit.tags+'</p></div>');	
				}
				if($('.grid-item').length == 7) {
					var msnry = new Masonry( elem, {
						itemSelector: '.grid-item',
						columnWidth: 1,
						gutter: 20
					});
				}
			});
		else
			console.log('No hits');
	});



}, false);