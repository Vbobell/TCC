class Topic{
    constructor(topics, commentsTopics){
        this.topics = topics;
        this.commentsTopics = commentsTopics;
    }

    setStructureTopic(element, id){
        var topicData = "";

        for(var topic of this.topics){
            if(topic.id_topic == id){
                topicData = topic;
                break;
            }
        }

        element.find('figure[name="user-topic"] img').attr('src', 'svg/users/'+topicData.user_identity);
    }
}