$(function(){

  const parseData = data => {
    console.log(data, 18);
  };

  const init = function(){
    const CLIENT_HEIGHT = $(window).height(),
          CLIENT_WIDTH = $(window).width(),
          HEADER_HEIGHT = $('.header-block').height(),
          SELECT_HEIGHT = $('.authorization-record-select').height();
    const VIEW_HEIGHT = CLIENT_HEIGHT - HEADER_HEIGHT - SELECT_HEIGHT;
    // console.log(VIEW_HEIGHT);
    $('.authorization-record-block').width(CLIENT_WIDTH);
    $('.authorization-record-list-block').width(CLIENT_WIDTH * 2);
    $('.authorization-record-list-block').height(VIEW_HEIGHT);
    let fetchData = new MyFetch();
    fetchData.get(
      3,
      '/api/DiningAuthorization/GetAuthorizationList',
      null,
      parseData
    );
  };

  init();

  /*$('.author-person-info').on('click', 'label', function(){
    const tag_i = $(this).find('i');
    const css = tag_i.attr('class');
    if (css.includes('active')) {
      tag_i.removeClass('active');
    }else{
      tag_i.addClass('active');
    }
  });*/

  $('.authorization-record-option').on('click', function(){
    $(this).addClass('option-active').siblings().removeClass('option-active');
    const _INDEX = $(this).index(),
          CLIENT_WIDTH = $(window).width();
    $('.authorization-record-list-block').stop().animate({'left': CLIENT_WIDTH * _INDEX * -1}, 500);
  });

});