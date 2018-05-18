---------------- bonificações ----------------
INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Primeira atividade realizada', 'Primeira atividade realizada em uma disciplina', 'first-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Primeira atividade correta', 'Primeira atividade realizada corretamente em uma disciplina', 'first-correct-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Primeiro(a) a realizar a atividade', 'Primeiro(a) a realizar uma atividade na disciplina', 'first-do-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Sequência de atividades', 'Sequência de atividades realizadas nas disciplinas', 'sequence-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Atividade realizada', 'Atividade realizada na disciplina', 'correct-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Atividade ouro','Atividade com valor de ouro para a disciplina', 'gold-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Atividade prata', 'Atividade com valor de prata para a disciplina', 'silver-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Atividade bronze', 'Atividade com valor de bronze para a disciplina', 'bronze-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Primeira atividade ouro', 'Primeira atividade com valor de ouro realizada na disciplina', 'first-activity-gold');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Primeira atividade prata', 'Primeira atividade com valor de prata realizada na disciplina',  'first-activity-silver');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Primeira atividade bronze', 'Primeira atividade com valor de bronze realizada na disciplina', 'first-activity-bronze');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Sequência de atividades ouro', 'Sequência de atividades ourp realizadas nas disciplinas', 'gold-sequence-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Sequência de atividades prata', 'Sequência de atividades prata realizadas nas disciplinas', 'silver-sequence-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('Sequência de atividades bronze', 'Sequência de atividades bronze realizadas nas disciplinas', 'bronze-sequence-activity');
---------------- bonificações ----------------

---------------- configuração de bonificação ----------------

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('porcentagem de acertos atividade ouro', 'porcentagem de acertos para ser uma atividade ouro', 
'{"name" : "percentageToComplete", "percentageToComplete" : 1}', 6);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('porcentagem de acertos atividade prata', 'porcentagem de acertos para ser uma atividade prata', 
'{"name" : "percentageToComplete", "percentageToComplete" : 1}', 7);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('porcentagem de acertos atividade bronze', 'porcentagem de acertos para ser uma atividade bronze', 
'{"name" : "percentageToComplete", "percentageToComplete" : 1}', 8);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades realizas corretas', 'sequência de atividades realizas corretas', 
'{"name" : "amount", "amount": 1}', 4);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades ouro', 'sequência de atividades ouro realizas corretas', 
'{"name" : "amount", "amount": 1}', 12);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades prata', 'sequência de atividades prata realizas corretas', 
'{"name" : "amount", "amount": 1}', 13);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades bronze', 'sequência de atividades bronze realizas corretas', 
'{"name" : "amount", "amount": 1}', 14);