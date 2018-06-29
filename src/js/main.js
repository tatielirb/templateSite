$(window).on('resize.scrollMagic load.scrollMagic', function () {

  var addScrollMagic = function (_elementId, _triggerHook, _className, _debug) {
    if (!document.querySelectorAll(_elementId).length) {
      return false;
    }
    var elementId = _elementId;
    var triggerHook = _triggerHook;
    var className = _className || 'anime';

    var Controller = new ScrollMagic.Controller();
    var Scene = new ScrollMagic.Scene({
      triggerElement: elementId,
      triggerHook: triggerHook
    });
    if (_debug) {
      Scene.addIndicators();
    }
    Scene
    .setClassToggle(elementId, className) // add class toggle
    .addTo(Controller);

  }

    console.log('load resize 2');
    $('#id').addClass('anime');

    addScrollMagic('#ide', 0.95, false);


    $(window).off('resize.scrollMagic load.scrollMagic');
});
