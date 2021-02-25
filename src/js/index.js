import '../js/jquery-3.5.1.min'
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
});

