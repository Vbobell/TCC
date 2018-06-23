class ViewReward{
    constructor(rewards, topicsPoint){
        this.rewards = rewards;
        this.topicsPoint = topicsPoint;
    }

    setRewardsView(idDiscipline){
        console.log(this.rewards);
        for(var reward of this.rewards){
            if(idDiscipline == reward.disciplineid){
                $(`.rewards .reward figure[data-id="${reward.id}"]`).removeClass('inactive');
            }
        }
        for(var topic of this.topicsPoint){
            if(idDiscipline == topic.discipline){
                $('.level-topic .level label').text(`Level ${topic.level}`);
                $('.level-topic img').attr('src', `svg/insignis/level-${topic.level}.svg`);
                $('.level-topic progress').attr('value', topic.points);
                $('.level-topic progress').attr('max', topic.level * Math.round(topic.averageTypeTopic));
                break;
            }
        }
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