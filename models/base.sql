CREATE TABLE admin(
	id_admin SERIAL NOT NULL PRIMARY KEY,  
    name_admin VARCHAR(70) DEFAULT NULL, 
    registry VARCHAR(30) DEFAULT NULL,
    email VARCHAR (100) NOT NULL,
    password TEXT DEFAULT NULL,
    user_identity VARCHAR (100) DEFAULT 'default-user.svg'
);

CREATE TABLE course(
    id_course SERIAL NOT NULL PRIMARY KEY,
    name_course TEXT NOT NULL,
    description_course TEXT NOT NULL
);

CREATE TABLE discipline(
    id_discipline SERIAL NOT NULL PRIMARY KEY,
    name_discipline TEXT NOT NULL,
    description_discipline TEXT NOT NULL
);

CREATE TABLE class_(
    id_class SERIAL NOT NULL PRIMARY KEY,
    name_class TEXT NOT NULL
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
    name_teacher VARCHAR (70) NOT NULL,
    registry VARCHAR(30) DEFAULT NULL,
    email VARCHAR (100) NOT NULL,
    password TEXT DEFAULT NULL,
    user_identity VARCHAR (100) DEFAULT 'default-user.svg'
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
    name_student VARCHAR (70) NOT NULL,
    registry VARCHAR(30) DEFAULT NULL,
    email VARCHAR (100) NOT NULL,
    password TEXT DEFAULT NULL,
    user_identity VARCHAR (100) DEFAULT 'default-user.svg'
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
    point_activity DOUBLE PRECISION NOT NULL,
    id_discipline INT NOT NULL,
    id_teacher INT NOT NULL,
    id_class INT NOT NULL,
    FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher),
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline),
    FOREIGN KEY (id_class) REFERENCES class_ (id_class)
);

CREATE TABLE activity_question(
    id_question SERIAL NOT NULL PRIMARY KEY,
    description_question TEXT NOT NULL,
    type_question VARCHAR (100) NOT NULL,
    id_activity INT NOT NULL,
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);

CREATE TABLE question_alternative(
    id_alternative SERIAL NOT NULL PRIMARY KEY,
    description_alternative TEXT NOT NULL,
    correct_alternative BOOLEAN NOT NULL,
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

CREATE TABLE student_activity(
    id_student_activity SERIAL NOT NULL PRIMARY KEY,
    id_student INT NOT NULL,
    id_activity INT NOT NULL,
    point_rechead DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (id_student) REFERENCES student (id_student),
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);

CREATE TABLE student_question_answer(
    id_student_question_answer SERIAL NOT NULL PRIMARY KEY,
    id_activity INT NOT NULL,
    id_question INT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity),
    FOREIGN KEY (id_question) REFERENCES activity_question (id_question)
);

CREATE TABLE student_reward(
    id_student_reward SERIAL NOT NULL PRIMARY KEY,
    id_student INT NOT NULL,
    id_reward INT NOT NULL,
    FOREIGN KEY (id_student) REFERENCES student (id_student),
    FOREIGN KEY (id_reward) REFERENCES reward (id_reward)
);

CREATE TABLE topic(
    id_topic SERIAL NOT NULL PRIMARY KEY,
    name_topic VARCHAR(100) NOT NULL,
    description_topic TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE
);

CREATE TABLE type_topic(
    id_type_topic SERIAL NOT NULL PRIMARY KEY,
    name_type_topic VARCHAR(100) NOT NULL,
    description_type_topic TEXT NOT NULL,
    point_type_topic DOUBLE PRECISION NOT NULL,
    file_type_topic VARCHAR(100) NOT NULL
);

CREATE TABLE colaboration_topic(
    id_colaboration_topic SERIAL NOT NULL PRIMARY KEY,
    id_topic INT NOT NULL,
    id_type_topic INT NOT NULL,
    id_discipline INT NOT NULL,
    FOREIGN KEY (id_topic) REFERENCES topic (id_topic),
    FOREIGN KEY (id_type_topic) REFERENCES type_topic (id_type_topic),
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline)
);

CREATE TABLE student_topic(
    id_student_topic SERIAL NOT NULL PRIMARY KEY,
    id_colaboration_topic INT NOT NULL,
    id_student INT NOT NULL,
    FOREIGN KEY (id_colaboration_topic) REFERENCES colaboration_topic (id_colaboration_topic),
    FOREIGN KEY (id_student) REFERENCES student (id_student)
);

CREATE TABLE teacher_topic(
    id_teacher_topic SERIAL NOT NULL PRIMARY KEY,
    id_colaboration_topic INT NOT NULL,
    id_teacher INT NOT NULL,
    FOREIGN KEY (id_colaboration_topic) REFERENCES colaboration_topic (id_colaboration_topic),
    FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher)
);

CREATE TABLE student_points(
    id_student_point SERIAL NOT NULL PRIMARY KEY,
    points DOUBLE PRECISION DEFAULT 0,
    id_student INT NOT NULL,
    id_discipline INT NOT NULL,
    FOREIGN KEY (id_student) REFERENCES student (id_student),
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline)
);

CREATE TABLE teacher_points(
    id_student_point SERIAL NOT NULL PRIMARY KEY,
    points DOUBLE PRECISION DEFAULT 0,
    id_teacher INT NOT NULL,
    id_discipline INT NOT NULL,
    FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher),
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline)
);

CREATE TABLE student_topic_comments(
    id_student_topic_comment SERIAL NOT NULL PRIMARY KEY,
    id_topic INT NOT NULL,
    id_student INT NOT NULL,
    comment TEXT NOT NULL,
    best_comment BOOLEAN DEFAULT false,
    points DOUBLE PRECISION DEFAULT 0,
    FOREIGN KEY (id_topic) REFERENCES topic (id_topic),
    FOREIGN KEY (id_student) REFERENCES student (id_student)
);

CREATE TABLE teacher_topic_comments(
    id_teacher_topic_comment SERIAL NOT NULL PRIMARY KEY,
    id_topic INT NOT NULL,
    id_teacher INT NOT NULL,
    comment TEXT NOT NULL,
    best_comment BOOLEAN DEFAULT false,
    points DOUBLE PRECISION DEFAULT 0,
    FOREIGN KEY (id_topic) REFERENCES topic (id_topic),
    FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher)
);

CREATE TABLE discipline_class(
    id_discipline_class SERIAL NOT NULL PRIMARY KEY,
    id_class INT NOT NULL,
    id_discipline INT NOT NULL,
    FOREIGN KEY (id_class) REFERENCES class_ (id_class),
    FOREIGN KEY (id_discipline) REFERENCES discipline (id_discipline)
);

CREATE TABLE teacher_class(
    id_teacher_class SERIAL NOT NULL PRIMARY KEY,
    id_class INT NOT NULL,
    id_teacher INT NOT NULL,
    FOREIGN KEY (id_class) REFERENCES class_ (id_class),
    FOREIGN KEY (id_teacher) REFERENCES teacher (id_teacher)
);

CREATE TABLE student_class(
    id_student_class SERIAL NOT NULL PRIMARY KEY,
    id_class INT NOT NULL,
    id_student INT NOT NULL,
    FOREIGN KEY (id_class) REFERENCES class_ (id_class),
    FOREIGN KEY (id_student) REFERENCES student (id_student)
);