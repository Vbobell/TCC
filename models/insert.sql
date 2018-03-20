---------------- bonificações ----------------
INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('primeira atividade', 'primeira atividade', 'first-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('primeira atividade correta', 'primeira atividade correta', 'first-correct-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('primeiro(a) a realizar a atividade', 'primeiro(a) a realizar a atividade', 'first-do-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('sequência de atividades realizadas corretas', 'sequência de atividades realizadas corretas', 'sequence-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('atividade realizada', 'atividade realizada', 'correct-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('atividade realizada ouro','atividade realizada ouro', 'gold-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('atividade realizada prata', 'atividade realizada prata', 'silver-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('atividade realizada bronze', 'atividade realizada bronze', 'bronze-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('primeira atividade ouro realizada', 'primeira atividade ouro realizada', 'first-activity-gold');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('primeira atividade prata realizada', 'primeira atividade prata realizada',  'first-activity-silver');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('primeira atividade bronze realizada.', 'primeira atividade bronze realizada.', 'first-activity-bronze');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('sequência de atividades ouro realizas corretas', 'sequência de atividades ouro realizas corretas', 'gold-sequence-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('sequência de atividades prata realizas corretas', 'sequência de atividades prata realizas corretas', 'silver-sequence-activity');

INSERT INTO reward (name_reward, description_reward, file_reward)
VALUES ('sequência de atividades bronze realizas corretas', 'sequência de atividades bronze realizas corretas', 'bronze-sequence-activity');
---------------- bonificações ----------------

---------------- configuração de bonificação ----------------

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('porcentagem de acertos atividade ouro', 'porcentagem de acertos para ser uma atividade ouro', '', 6);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('porcentagem de acertos atividade prata', 'porcentagem de acertos para ser uma atividade prata', '', 7);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('porcentagem de acertos atividade bronze', 'porcentagem de acertos para ser uma atividade bronze', '', 8);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades realizas corretas', 'sequência de atividades realizas corretas', '', 4);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades ouro', 'sequência de atividades ouro realizas corretas', '', 12);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades prata', 'sequência de atividades prata realizas corretas', '', 13);

INSERT INTO reward_configuration(name_config, description_config, config, id_reward)
VALUES ('sequência de atividades bronze', 'sequência de atividades bronze realizas corretas', '', 14);