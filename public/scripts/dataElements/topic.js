class Topic{
    constructor(topics, commentsTopics){
        this.topics = topics;
        this.commentsTopics = commentsTopics;
    }

    setStructureTopic(element, id){
        var user = JSON.parse(localStorage.getItem('user'));
        var topicData = "";
        var comments = [];

        for(var topic of this.topics){
            if(topic.id_topic == id){
                topicData = topic;
                break;
            }
        }
        
        var nameUser = topicData.name_student != undefined ? topicData.name_student : topicData.name_teacher;
        var typeUser = topicData.name_student == undefined ? "Professor" : "Aluno";
        var enableResolved = topicData.id_student == user.id ? "enable" : "disable";
        var topicResolved = topicData.resolved == true ? "on" : "off";

        element.find('.comments .item-comment').remove();
        element.find('label.type-user').text(typeUser);
        element.find('figure[name="user-topic"] img').attr('src', `svg/users/${topicData.user_identity}`);
        element.find('figcaption[name="user-name"]').text(nameUser);
        element.find('figure[name="type-topic"] img').attr('src', `svg/itens/${topicData.file_type_topic}.svg`);
        element.find('figure[name="type-topic"] img').attr('title', topicData.name_type_topic);
        element.find('h4[name="name-topic"]').text(topicData.name_topic);
        element.find('input[name="resolved-topic"]').bootstrapToggle(enableResolved);
        element.find('input[name="resolved-topic"]').bootstrapToggle(topicResolved);
        element.find('p[name="description-topic"]').text(topicData.description_topic);
        
        element.find('.comments').attr('data-id-topic', topicData.id_topic);

        for(var commentTopic of this.commentsTopics){
            if(id == commentTopic.id_topic){
                
                var userCommentId = commentTopic.id_student != undefined ? commentTopic.id_student : commentTopic.id_teacher;

                var dataComment = {
                    'user': {
                        'identity': commentTopic.user_identity,
                        'id': userCommentId
                    },
                    'text': commentTopic.comment,
                    'idTopic': commentTopic.id_topic
                };

                comments.push(this.structureTopic(dataComment));
            }
        }

        if(comments.length > 0){
            $('.comments .not-comment').fadeOut(200, function () {
                setTimeout(function(){
                    element.find('.comments').append(comments);
                    element.find(`.action-comment:not(.action-comment[data-id-user="${user.id}"])`).remove();
                }, 10);
            });
        }else{
            $('.comments .not-comment').fadeIn();
        }
    }

    resetStructure(element){
        element.find('label.type-user').text('');
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
        return $('<article>')
                .append(
                    $('<figure>').append(
                        $('<img>').attr('src', `svg/users/${dataComment.user.identity}`)
                    ).addClass('user-topic')
                ).append(
                    $('<p>').text(dataComment.text)
                ).append(
                    $('<div class="action-comment">')
                    .append(
                        $('<div>').append(
                            $('<div>').addClass('tool open-edit')
                        ).append(
                            $('<label>').text('editar')
                        ).addClass('item-action-comment')
                    ).append(
                        $('<div>').append(
                            $('<div>').addClass('tool remove')
                        ).append(
                            $('<label>').text('remover')
                        ).addClass('item-action-comment')
                    ).addClass().attr('data-id-user', dataComment.user.id)
                ).attr('data-id-comment', dataComment.id).addClass('item-comment');
    }

    createTopicComment(element, dataComment, callback){
        var that = this;

        if(dataComment.user.type == "teacher"){
            var parameters = {
                "typeUser": dataComment.user.type,
                "idTopic": dataComment.idTopic,
                "idTeacher": dataComment.user.id,
                "comment": dataComment.text,
            };
        }else{
            var parameters = {
                "typeUser": dataComment.user.type,
                "idTopic": dataComment.idTopic,
                "idStudent": dataComment.user.id,
                "comment": dataComment.text,
            };
        }

        this.insertTopicComment(parameters, function(data){
            if(data){
                if(dataComment.user.type == "teacher"){
                    var newComment = {
                        'best_comment': false,
                        'comment': dataComment.text,
                        'id_teacher': dataComment.user.id,
                        'id_teacher_topic_comment': data[0].id_teacher_topic_comment,
                        'id_topic': dataComment.idTopic,
                        'name_teacher': dataComment.user.name,
                        'points': 0,
                        'user_identity': dataComment.user.identity
                    }
                }else{
                    var newComment = {
                        'best_comment': false,
                        'comment': dataComment.text,
                        'id_student': dataComment.user.id,
                        'id_student_topic_comment': data[0].id_student_topic_comment,
                        'id_topic': dataComment.idTopic,
                        'name_student': dataComment.user.name,
                        'points': 0,
                        'user_identity': dataComment.user.identity
                    }
                }
                dataComment.id = data[0].id_student_topic_comment;

                that.commentsTopics.push(newComment);
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
            url : `/${parameters.typeUser}/post/insert`,
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