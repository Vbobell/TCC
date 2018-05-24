class ViewReward{
    constructor(rewards){
        this.rewards = rewards;
    }

    setRewardsView(idDiscipline){
        this.rewards.forEach(reward => {
            if(idDiscipline == reward.disciplineid){
                $(`.rewards .reward figure[data-id="${reward.id}"]`).removeClass('inactive');
            }
        });
    }

    domEvents(){
        var that = this;

        $('.reward-menu .item-discipline').on('click', function(){
            $('.reward-menu .item-discipline').removeClass('active');
            $(this).addClass('active');
            
            $('.rewards .reward figure').addClass('inactive');

            if($(this).attr('data-menu')){
                $('.section-reward .rewards').fadeOut(200, function(){
                    $('.section-reward header').fadeIn(200);
                    $(this).removeClass('active');
                });
            }else{
                var idDiscipline = $(this).attr('data-discipline');

                $('.section-reward header').fadeOut(200, function(){
                    that.setRewardsView(idDiscipline);
                    $('.section-reward .rewards').addClass('active');
                });
            }
        });
    }
}