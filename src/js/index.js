import '../js/jquery-3.5.1.min'
import '../js/jquery.validate.min'
import '../sass/_style.sass'
import '../styles/fonts.css'
import '../styles/slick.css'
import '../js/slick.min'

$(document).ready(function () {
   $('.carousel__inner').slick({
      speed: 800,
      prevArrow: '<button type="button" class="slick-prev"><img src="../assets/icons/left_solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../assets/icons/right_solid.png"></button>',
      responsive: [
         {
            breakpoint: 991,
            settings: {
               dots: true,
               arrows: false,
            }
         },
      ]
   });
   $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   function toogleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      });
   };
   toogleSlide('.catalog-item__link');
   toogleSlide('.catalog-item__back');

   // Modal

   $('[data-modal=consultation]').on('click', function () {
      $('.overlay,#consultation').fadeIn('slow');
   });

   $('.modal__close').on('click', function () {
      $('.overlay,#consultation,#order,#thanks').fadeOut('slow')
   });

   $('.button_mini').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay,#order').fadeIn('slow');
      })
   });

   function validateForms(form) {
      $(form).validate({
         rules: {
            name: "required",
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: "Пожалуйста, введите своё имя",
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
               required: "Пожалуйста, введите свою почту",
               email: "Проверьте свой адрес!"
            }
         }
      });
   };
   validateForms('#consultation-form');
   validateForms('#order form');
   validateForms('#consultation form');
});

