class Reward{
    constructor(){

    }

    getReward(reward){
        $('body').append(`<div class="reward background">
        <div class="close">X</div>
        <figure class="scaleMin">
        <img class="reward" src="images/reward/${reward.name}.png">
        </figure>`);

        setTimeout(function(){
            $('.reward.background figure').addClass('scaleMax');
            setTimeout(function(){
               $('.reward.background figure').addClass('animated');
            }, 1200);
        }, 1000);

        $('.reward.background .close').on('click', function(){
            $(this).parents('.reward.background').fadeOut(200, function(){
                $(this).remove();
                window.location.reload();
            });
        });
    }
}