class Reward{
    constructor(rewards){
        this.rewards = rewards;
    }

    getReward(){
        var that = this;

        $('body').append(`<div class="reward background">
        <div class="content-reward">
        <figure class="scaleMin">
        <img class="reward" src="images/reward/${this.rewards[0].file}.png"/>
        <figcaption>${this.rewards[0].name}</figcaption>
        </figure>
        <div class="close">X</div>
        </div>
        <article class="hidden"><p>${this.rewards[0].description}</p></article>
        </div>`);

        setTimeout(function(){
            $('.reward.background figure').addClass('scaleMax');
            setTimeout(function(){
               $('.reward.background figure').addClass('animated');
            }, 1200);
        }, 1000);

        this.rewards.splice(0, 1);

        $('.reward.background .close').on('click', function(){
            $(this).parents('.reward.background').fadeOut(200, function(){
                $(this).remove();
                if(that.rewards.length > 0){
                    that.getReward();
                }else{
                    window.location.reload();
                }
            });
        });
    }
}