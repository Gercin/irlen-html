import { mediaQuery } from './mediaQueries.js'

$(window).on('load', () => {

  const headerHeight = $('.header').height()

  if (mediaQuery.matches && $('.header__panel').length) {
    const list = $('[data-list]');

    // nav links in header
    cloneList()
  
    function cloneList() {
      const headerPanel = $('.header__panel')
      const clone = list.clone()

      headerPanel.append(clone)
    }
  
    const listOffset = list.offset().top

    $(window).on('scroll', function () {
      const scrollPos = this.pageYOffset;

      if ((scrollPos + 65) > listOffset) {
        list.addClass('hidden')
        $('.header').addClass('header--show');
      }

      if ((scrollPos + headerHeight) < listOffset) {
        list.removeClass('hidden')
        $('.header').removeClass('header--show')
      }
    });

    // scroll active change
    const FPS = 60
    const items = $('.header').find('.instruments-page__tabs-item')

    let positions = [],
    currentActive = null,
    links = items;

    // update offset
    upadateOffset()
    $(window).one('resize', handleResize)

    function upadateOffset() {
      positions.length = 0
      $('[data-section]').each(function(){
        positions.push({
          top: $(this).offset().top,
          a: links.filter('[data-scroll="#'+$(this).attr('id')+'"]')
        });
      });

      positions = positions.reverse();
    }

    function handleResize() {
      setTimeout(() => {
        upadateOffset()

        $(window).one('resize', handleResize)
      }, 1000 / FPS);
    }
    
    updateActive()
    $(window).one('scroll', scrollHandler)

    function updateActive() {
      const winTop = $(window).scrollTop()

      for(let i = 0; i < positions.length; i++){
        if(positions[i].top - headerHeight < winTop + headerHeight){
          if(currentActive !== i){
            currentActive = i;
            items.removeClass('active');
            positions[i].a.addClass('active');
          }
          break;
        }
      }

      if (positions[positions.length - 1].top - headerHeight > winTop + headerHeight) {
        items.removeClass('nav-page__item--active');
        positions[positions.length - 1].a.addClass('nav-page__item--active')
      }
    }

    function scrollHandler() {
      setTimeout(() => {
        updateActive()

        $(window).one('scroll', scrollHandler)
      }, 1000 / FPS);
    }

    $('[data-scroll]').on('click', function(event) {
      scrollHandler(event, (headerHeight + list.innerHeight() + 10), this)
    })
  }

  if ($("[data-scroll]").length) {
    $('[data-scroll]').on('click', function(event) {
      scrollHandler(event, headerHeight, this)
    })
  }

  function scrollHandler(event, offset, ths) {
    event.preventDefault();
  
    const elementId = $(ths).data('scroll');
    console.log(elementId);
    const elementOffset = $(elementId).offset().top;

    $('html, body').animate({
      scrollTop: elementOffset - offset
    }, 700);
  }
})