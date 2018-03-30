CREATE TABLE admin(
	id_admin SERIAL NOT NULL PRIMARY KEY,  
    name_admin VARCHAR(30) DEFAULT NULL, 
    registry VARCHAR(10) DEFAULT NULL,
    email VARCHAR (30) NOT NULL,
    password VARCHAR(30) DEFAULT NULL
);

CREATE TABLE course(
    id_course SERIAL NOT NULL PRIMARY KEY,
    name_course VARCHAR(30) NOT NULL,
    description_course TEXT NOT NULL
);

CREATE TABLE discipline(
    id_discipline SERIAL NOT NULL PRIMARY KEY,
    name_discipline VARCHAR(30) NOT NULL,
    description_discipline TEXT NOT NULL
);

CREATE TABLE course_discipline(
    id_course_discipline SERIAL NOT NULL PRIMARY KEY,
    id_course INT NOT NULL,
    id_discipline INT NOT NULL,
    FOREIGN KEY (id_course) REFERENCES course (id_course),
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline)
);

CREATE TABLE teacher(
    id_teacher SERIAL NOT NULL PRIMARY KEY,
    name_teacher VARCHAR (40) NOT NULL,
    registry VARCHAR (10) NOT NULL,
    email VARCHAR (30) NOT NULL,
    password VARCHAR (30) NOT NULL DEFAULT NULL
);

CREATE TABLE teacher_discipline(
    id_teacher_discipline SERIAL NOT NULL PRIMARY KEY,
    id_discipline INT NOT NULL,
    id_teacher INT NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline),
    FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher)
);

CREATE TABLE student(
    id_student SERIAL NOT NULL PRIMARY KEY,
    name_student VARCHAR (40) NOT NULL,
    registry VARCHAR (10) NOT NULL,
    email VARCHAR (30) NOT NULL,
    password VARCHAR (30) NOT NULL DEFAULT NULL
);

CREATE TABLE student_discipline(
    id_student_discipline SERIAL NOT NULL PRIMARY KEY,
    id_discipline INT NOT NULL,
    id_student INT NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline),
    FOREIGN KEY (id_student) REFERENCES student (id_student)
);

CREATE TABLE reward(
    id_reward SERIAL NOT NULL PRIMARY KEY,
    name_reward VARCHAR (100) NOT NULL,
    description_reward TEXT NOT NULL,
    file_reward VARCHAR (40) NOT NULL,
    enable_reward BOOLEAN DEFAULT TRUE
);

CREATE TABLE reward_configuration(
    id_reward_config SERIAL NOT NULL PRIMARY KEY,
    name_config VARCHAR (100) NOT NULL,
    description_config TEXT NOT NULL,
    config TEXT NOT NULL,
    id_reward INT NOT NULL,
    FOREIGN KEY (id_reward) REFERENCES reward (id_reward)
);

CREATE TABLE activity(
    id_activity SERIAL NOT NULL PRIMARY KEY,
    name_activity VARCHAR (100) NOT NULL,
    description_activity TEXT NOT NULL,
    point_activity INT NOT NULL,
    id_discipline INT NOT NULL,
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline)
);

CREATE TABLE activity_question(
    id_question SERIAL NOT NULL PRIMARY KEY,
    description_question TEXT NOT NULL,
    order_question INT NOT NULL,
    id_activity INT NOT NULL,
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);

CREATE TABLE question_alternative(
    id_alternative SERIAL NOT NULL PRIMARY KEY,
    description_alternative TEXT NOT NULL,
    id_question INT NOT NULL,
    FOREIGN KEY (id_question) REFERENCES activity_question (id_question)
);

CREATE TABLE activity_reward(
    id_activity_reward SERIAL NOT NULL PRIMARY KEY,
    id_activity INT NOT NULL,
    id_reward INT NOT NULL,
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity),
    FOREIGN KEY (id_reward) REFERENCES reward (id_reward)
);