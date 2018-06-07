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
        
        var nameUser = topicData.name_student != undefined ? topicData.name_student : topicData.name_teacher;
        element.find('.comments .item-comment').remove();
        element.find('figure[name="user-topic"] img').attr('src', `svg/users/${topicData.user_identity}`);
        element.find('figcaption[name="user-name"]').text(nameUser);
        element.find('figure[name="type-topic"] img').attr('src', `svg/itens/${topicData.file_type_topic}.svg`);
        element.find('figure[name="type-topic"] img').attr('title', topicData.name_type_topic);
        element.find('h4[name="name-topic"]').text(topicData.name_topic);
        element.find('p[name="description-topic"]').text(topicData.description_topic);
        
        element.find('.comments').attr('data-id-topic', topicData.id_topic);
    }

    resetStructure(element){
        element.find('figure[name="user-topic"] img').attr('src', '');
        element.find('figcaption[name="user-name"]').text('');
        element.find('figure[name="type-topic"] img').attr('src', '');
        element.find('figure[name="type-topic"] img').attr('title', '');
        element.find('h4[name="name-topic"]').text('');
        element.find('p[name="description-topic"]').text('');
        
        element.find('.comments').removeAttr('data-id-topic');
        element.find('.comments .item-comment').remove();
    }

    structureTopic(dataComment){
        return $('<article>').append(
                    $('<figure>').append(
                        $('<img>').attr('src', `svg/users/${dataComment.user.identity}`)
                    ).addClass('user-topic')
                ).append(
                    $('<p>').text(dataComment.text)
                ).attr('data-id-comment', dataComment.id).addClass('item-comment');
    }

    createTopicComment(element, dataComment, callback){
        var that = this;
        var parameters = {
            "idTopic" : dataComment.idTopic,
            "idStudent": dataComment.user.id,
            "comment": dataComment.text,
        };

        this.insertTopicComment(parameters, function(data){
            if(data){
                console.log(data);
                dataComment.id = data[0].id_student_topic_comment;

                element.append(that.structureTopic(dataComment));
                return callback(true);
            }else{
                return callback(false);
            }
        });
    }

    insertTopicComment(parameters, callback){
        var data = { 
            'controller' : {
                'type': 'insert',
                'entity': 'topicComment',
                parameters
            }
        };

        $.ajax({
            url : '/student/post/insert',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data : JSON.stringify(data),
            async : true,
            type: 'POST'
        }).then(function(idComment){
            return callback(idComment);
        });
    }
}