create table admin(
	id_admin serial NOT NULL primary key,  
    name_admin varchar(30) DEFAULT NULL, 
    registre varchar(10) DEFAULT NULL,
    user_level smallint DEFAULT NULL,
    password varchar(30) DEFAULT 123456
);

create table course(
    id_course serial NOT NULL primary key,
    name_course varchar(30) NOT NULL
);

create table class_(
    id_class serial NOT NULL primary key,
    name_class varchar(30) NOT NULL
);

create table discipline(
    id_discipline serial NOT NULL primary key,
    name_discipline varchar(30) NOT NULL
);

create table course_class(
    id_course_class serial NOT NULL primary key,
    id_course int NOT NULL,
    id_class int NOT NULL,
    foreign key (id_course) references course (id_course),
    foreign key (id_class) references class_ (id_class)
);

create course_discipline(
    id_course_discipline serial NOT NULL primary key,
    id_course int NOT NULL,
    id_discipline int NOT NULL,
    foreign key (id_course) references course (id_course),
    foreign key (id_discipline) references discipline (id_discipline)
);

create table teacher(
    id_teacher serial NOT NULL primary key,
    name_teacher varchar (30) NOT NULL,
    registry varchar (10) NOT NULL,
    password varchar (30) NOT NULL DEFAULT 123456
);

