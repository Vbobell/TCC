class Topic {
    constructor(topics, commentsTopics) {
        this.topics = topics;
        this.commentsTopics = commentsTopics;
    }

    setStructureTopic(element, id) {
        var that = this;
        var user = JSON.parse(localStorage.getItem('user'));
        var topicData = "";
        var comments = [];
        var countTopic = 0;

        for (var topic of this.topics) {
            if (topic.id_topic == id) {
                topicData = topic;
                topicData.countTopic = countTopic;
                break;
            }
            countTopic++;
        }
        var topicIdUser = topicData.id_student != undefined ? topicData.id_student : topicData.id_teacher
        var nameUser = topicData.name_student != undefined ? topicData.name_student : topicData.name_teacher;
        var typeUser = topicData.name_student == undefined ? "Professor" : "Aluno";
        var enableResolved = topicIdUser == user.id ? "enable" : "disable";
        var topicResolved = topicData.resolved == true ? "on" : "off";
        var count = 0;

        element.find('.comments .item-comment').remove();
        element.find('label.type-user').text(typeUser);
        element.find('figure[name="user-topic"] img').attr('src', `svg/users/${topicData.user_identity}`);
        element.find('figcaption[name="user-name"]').text(nameUser);
        element.find('figure[name="type-topic"] img').attr('src', `svg/itens/${topicData.file_type_topic}.svg`);
        element.find('figure[name="type-topic"] img').attr('title', topicData.name_type_topic);
        element.find('h4[name="name-topic"]').text(topicData.name_topic);
        element.find('input[name="resolved-topic"]').bootstrapToggle(enableResolved);
        element.find('input[name="resolved-topic"]').bootstrapToggle(topicResolved);
        element.find('input[name="resolved-topic"]').attr('data-topic', topicData.id_topic);
        element.find('p[name="description-topic"]').text(topicData.description_topic);

        element.find('.comments').attr('data-id-topic', topicData.id_topic);
        element.find('.comments').attr('data-user-topic', topicData.id_student);
        element.find('.comments').attr('data-index-topic', topicData.countTopic);

        that.domEventsTopic(element);

        for (var commentTopic of this.commentsTopics) {
            if (id == commentTopic.id_topic) {
                var typeUser = commentTopic.id_student != undefined ? "student" : "teacher";
                var userCommentId = commentTopic.id_student != undefined ? commentTopic.id_student : commentTopic.id_teacher;
                var commentId = commentTopic.id_student_topic_comment != undefined ? commentTopic.id_student_topic_comment : commentTopic.id_teacher_topic_comment;

                var dataComment = {
                    'id': commentId,
                    'user': {
                        'identity': commentTopic.user_identity,
                        'id': userCommentId,
                        'type': typeUser
                    },
                    'text': commentTopic.comment,
                    'idTopic': commentTopic.id_topic,
                    'points': commentTopic.points,
                    'best_comment': commentTopic.best_comment,
                    'index': count,
                };

                comments.push(this.structureTopic(dataComment));
                count++;
            }
        }

        if (comments.length > 0) {
            $('.comments .not-comment').fadeOut(200, function () {
                setTimeout(function () {
                    element.find('.comments').append(comments);

                    
                    $('.best-comment input:checked').parents('.item-comment').addClass('item-best-comment');

                    element.find(`.comments:not(.comments[data-user-topic="${user.id}"]) .best-comment`).remove();

                    element.find(`.action-comment:not(.action-comment[data-id-user="${user.id}"])`)
                        .find('.edit-comment, .remove-comment, .confirm-edit-comment, .cancel-edit-comment').remove();

                    element.find(`.action-comment[data-id-user="${user.id}"]`)
                        .find('.points-comment, .best-comment').remove();

                    that.domEventsComment($('.item-comment'));
                }, 10);
            });
        } else {
            $('.comments .not-comment').fadeIn();
        }
    }

    resetStructure(element) {
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

    structureTopic(dataComment) {
        return $('<article>')
            .append(
                $('<figure>').append(
                    $('<img>').attr('src', `svg/users/${dataComment.user.identity}`)
                ).addClass('user-topic')
            ).append(
                $('<p>').text(dataComment.text).addClass('text-comment')
            ).append(
                $('<div class="action-comment">')
                    .append(
                        $('<div>').append(
                            $('<div>').addClass('tool open-edit').attr('title', 'editar')
                        ).addClass('item-action-comment edit-comment')
                    ).append(
                        $('<div>').append(
                            $('<div>').addClass('tool remove').attr('title', 'remover')
                        ).addClass('item-action-comment remove-comment')
                    ).append(
                        $('<div>').append(
                            $('<div>').addClass('tool btn-correct').attr('title', 'confirmar edição')
                        ).addClass('item-action-comment confirm-edit-comment')
                    ).append(
                        $('<div>').append(
                            $('<div>').addClass('tool cancel').attr('title', 'cancelar edição')
                        ).addClass('item-action-comment cancel-edit-comment')
                    ).append(
                        $('<div>').append(
                            $('<div>').append(
                                $('<input>').attr({
                                    'type': 'number',
                                    'min': 1,
                                    'value': dataComment.points
                                })
                            ).append(
                                $('<label>').text('votos')
                            ).addClass('points-comment')
                        ).append(
                            $('<div>').append(
                                $('<input>').attr('type', 'checkbox').prop('checked', dataComment.best_comment)
                            ).append(
                                $('<label>').text('Melhor resposta')
                            ).addClass('best-comment')
                        ).addClass(`item-action-comment`)
                    ).addClass().attr('data-id-user', dataComment.user.id).attr('data-type-user', dataComment.user.type)
            ).attr({
                'data-id-comment': dataComment.id,
                'data-index': dataComment.index
            }).addClass('item-comment');
    }

    createTopicComment(element, dataComment, callback) {
        var that = this;

        if (dataComment.user.type == "teacher") {
            var parameters = {
                "typeUser": dataComment.user.type,
                "idTopic": dataComment.idTopic,
                "idTeacher": dataComment.user.id,
                "comment": dataComment.text,
            };
        } else {
            var parameters = {
                "typeUser": dataComment.user.type,
                "idTopic": dataComment.idTopic,
                "idStudent": dataComment.user.id,
                "comment": dataComment.text,
            };
        }

        this.insertTopicComment(parameters, function (data) {
            if (data) {
                if (dataComment.user.type == "teacher") {
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
                } else {
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

                element.find(`.action-comment:not(.action-comment[data-id-user="${user.id}"])`)
                    .find('.edit-comment, .remove-comment, .confirm-edit-comment, .cancel-edit-comment').remove();

                element.find(`.action-comment[data-id-user="${user.id}"]`)
                    .find('.points-comment, .best-comment').remove();
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    insertTopicComment(parameters, callback) {
        var data = {
            'controller': {
                'type': 'insert',
                'entity': 'topicComment',
                parameters
            }
        };

        $.ajax({
            url: `/${parameters.typeUser}/post/insert`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            async: true,
            type: 'POST'
        }).then(function (idComment) {
            return callback(idComment);
        });
    }

    editTopicComment(parameters, callback) {
        var data = {
            'controller': {
                'type': 'update',
                'entity': parameters.entity,
                parameters
            }
        };

        $.ajax({
            url: `/${parameters.typeUser}/post/update`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            async: true,
            type: 'POST'
        }).then(function (data) {
            return callback(data);
        });
    }

    editTopic(parameters, callback){
        var data = {
            'controller': {
                'type': 'update',
                'entity': parameters.entity,
                parameters
            }
        };

        $.ajax({
            url: `/${parameters.typeUser}/post/update`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            async: true,
            type: 'POST'
        }).then(function (data) {
            return callback(data);
        });
    }

    domEventsTopic(element){
        var thatObj = this;
        var parameters = "";

        element.find('input[name="resolved-topic"]').on('change', function(){
            if (user.type == "teacher") {
                parameters = {
                    "typeUser": "teacher",
                    "entity": "updateResolvedTopic",
                    "idTopic": $(this).attr('data-topic'),
                    "idTeacher": user.id,
                    "resolved": $(this).is(':checked')
                };
            } else {
                parameters = {
                    "typeUser": "student",
                    "entity": "updateResolvedTopic",
                    "idTopic": $(this).attr('data-topic'),
                    "idStudent": user.id,
                    "resolved": $(this).is(':checked')
                };
            }
           console.log(parameters);
           
           thatObj.editTopic(parameters, function(data){
               console.log(data);
           }) 
        });
    }

    domEventsComment(element) {
        var thatObj = this;

        element.find('.open-edit').on('click', function () {
            var that = $(this);
            $(this).parents('.item-comment').find('.edit-comment, .remove-comment').fadeOut(200, function () {
                that.parents('.item-comment').find('.confirm-edit-comment, .cancel-edit-comment').fadeIn();
                that.parents('.item-comment').find('p.text-comment').attr('contenteditable', true);
            });
        });
        element.find('.cancel-edit-comment').on('click', function () {
            var that = $(this);
            $(this).parents('.item-comment').find('.confirm-edit-comment, .cancel-edit-comment').fadeOut(200, function () {
                that.parents('.item-comment').find('.edit-comment, .remove-comment').fadeIn();
                that.parents('.item-comment').find('p.text-comment').removeAttr('contenteditable');
            });
        });

        element.find('.confirm-edit-comment').on('click', function () {
            var that = $(this);
            var parameters = {};
            if (user.type == "teacher") {
                parameters = {
                    "typeUser": user.type,
                    "idComment": that.parents('.item-comment').attr('data-id-comment'),
                    "idTeacher": user.id,
                    "comment": that.parents('.item-comment').find('.text-comment').text(),
                    "entity": "topicComment"
                };
            } else {
                parameters = {
                    "typeUser": user.type,
                    "idComment": that.parents('.item-comment').attr('data-id-comment'),
                    "idStudent": user.id,
                    "comment": that.parents('.item-comment').find('.text-comment').text(),
                    "entity": "topicComment"
                };
            }

            thatObj.editTopicComment(parameters, function () {
                var index = parseInt(that.parents('.item-comment').attr('data-index'));
                thatObj.commentsTopics[index].comment = parameters.comment;

                that.parents('.item-comment').find('.confirm-edit-comment, .cancel-edit-comment').fadeOut(200, function () {
                    that.parents('.item-comment').find('.edit-comment, .remove-comment').fadeIn();
                    that.parents('.item-comment').find('p.text-comment').removeAttr('contenteditable');
                });
            });
        });

        element.find('.best-comment input[type="checkbox"]').on('change', function () {
            var that = $(this);
;           var topicNow = thatObj.topics[parseInt($(this).parents('.comments').attr('data-index-topic'))];
            var parameters = {
                "typeUser": user.type,
                "commentTypeUser": $(this).parents('.action-comment').attr('data-type-user'),
                "entity": "bestComment",
                "idTopic": $(this).parents('.comments').attr('data-id-topic'),
                "idComment": $(this).parents('.item-comment').attr('data-id-comment'),
                "idUser": $(this).parents('.action-comment').attr('data-id-user'),
                "bestComment": $(this).is(':checked'),
                "idDiscipline": topicNow.id_discipline,
                "points": topicNow.point_type_topic
            };

            thatObj.editTopicComment(parameters, function () {
                var index = parseInt(that.parents('.item-comment').attr('data-index'));

                if(that.is(':checked')){
                    thatObj.commentsTopics.forEach((element, index) => {
                        if(element.id_topic == that.parents('.comments').attr('data-id-topic')){
                            thatObj.commentsTopics[index].best_comment = true;
                        }else{
                            thatObj.commentsTopics[index].best_comment = false;
                        }
                    });

                    $('.item-comment').removeClass('item-best-comment');
                    that.parents('.item-comment').addClass('item-best-comment');
                }else{
                    that.parents('.item-comment').removeClass('item-best-comment');
                }

                thatObj.commentsTopics[index].best_comment = that.is(':checked');
            });
        });
    }
}