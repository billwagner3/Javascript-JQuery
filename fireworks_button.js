$(document).ready(function() {
    var button = $('#button');
    var click = $('#click');
    window.onload = function () {
        button.fadeIn(5000);
        click.fadeIn(5000);
    };
    var fireworks = $('#firework');
    var url = "{{ path('test') }}";
    button.on('click',function(){
	          $(fireworks).load(url);
        });
});