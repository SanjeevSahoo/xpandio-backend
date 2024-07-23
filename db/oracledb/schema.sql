-- FRM_USERS

create table t_frm_users
(
    id number,
    base_loc varchar2(50),
    crt_by number,
    crt_ts date,
    designation varchar2(50),
    email varchar2(100),
    emp_id varchar2(50) not null,
    emp_type varchar2(50),
    gender varchar2(25),
    grade varchar2(25),
    mobile varchar2(25),
    name varchar2(255) not null,
    password varchar2(255),
    rfid varchar2(255),
    sap_status varchar2(50) not null,
    separation_date varchar2(50),
    unique_no varchar2(50),
    upd_by number,
    upd_ts date,
    username varchar2(50),
    allowed_domain_login varchar2(25)
);

alter table t_frm_users
add constraint pk_frm_user_id primary key (id);


-- FRM TEAMS

create table t_exp_teams
(
    id number,
    name varchar2(100) not null,
    manager_id number not null,
    crt_by number,
    crt_date date
);


alter table t_exp_teams
add constraint pk_exp_teams_id primary key (id);

CREATE SEQUENCE t_exp_teams_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_teams_pk_seq 
BEFORE INSERT ON t_exp_teams 
FOR EACH ROW
BEGIN
  SELECT t_exp_teams_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;


insert into t_exp_teams (name, manager_id, crt_date) values ('JSR Web Team', 1, SYSDATE);



-- FRM MEMBERS

create table t_exp_team_members
(
    id number,
    team_id number not null,
    member_id number not null,
    crt_by number,
    crt_date date
);

alter table t_exp_team_members
add constraint pk_exp_teamsmember_id primary key (id);



CREATE SEQUENCE t_exp_team_mem_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_team_mem_pk_seq 
BEFORE INSERT ON t_exp_team_members 
FOR EACH ROW
BEGIN
  SELECT t_exp_team_mem_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;

insert into t_exp_team_members (team_id, member_id, crt_date) values (1, 1, SYSDATE);
insert into t_exp_team_members (team_id, member_id, crt_date) values (1, 2, SYSDATE);
insert into t_exp_team_members (team_id, member_id, crt_date) values (1, 68636, SYSDATE);

-- FRM PROJECTS

create table t_exp_projects
(
    id number,
    name varchar2(255) not null,
    stage varchar2(50),         -- Planning , Development etc
    hosting_status varchar2(50) not null, -- In App , Standalone
    hosting_url varchar2(500),
    disp_name varchar2(255) not null, 
    short_desc varchar2(500),
    logo_url varchar2(255),    
    project_lead_id number,
    creation_type varchar2(50) not null, -- App, Project
    own_login_url varchar2(255),
    client_dept varchar2(255),
    client_spoc_id number,
    team_id number,
    crt_by number,
    crt_date date,
    upd_by number,
    upd_date date,
    project_admins varchar(255),
    status varchar2(50) not null,
    base_url varchar2(100)
);

alter table t_exp_projects
add constraint pk_exp_projects_id primary key (id);


CREATE SEQUENCE t_exp_projects_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_projects_pk_seq 
BEFORE INSERT ON t_exp_projects
FOR EACH ROW
BEGIN
  SELECT t_exp_projects_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;

insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Occupational Health', 'Active', 'App for Management Health related data for Employees', 'Development', 'In App', 'Health App', 'health_logo.png', 1, 'App', 'Health', 1, 1, SYSDATE, SYSDATE, '/health');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Project Management', 'Active', 'Managing Tasks for the Team, Including Performance parameters and Daily activity', 'Development', 'In App', 'Project Management', 'project_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/project');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('CR Management', 'Active', 'Change Request management for Apps or Projects hosted on the platform', 'Development', 'In App', 'CR Management', 'cr_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/change');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Ticketing System', 'Active', 'Ticketing system for managing support tickets and their resolution history', 'Development', 'In App', 'Ticketing App', 'ticketing_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/ticket');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Quiz App', 'Active', 'A general purpose utiity app for creating and conducting Quiz', 'Development', 'In App', 'Quiz App', 'quiz_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/quiz');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Survey App', 'Active', 'A general purpose utility app for Individual for Creating a Survey', 'Development', 'In App', 'Survey App', 'survey_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/survey');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Document Management', 'Active', 'Documents management such as User Manual, PPT etc used in the platform', 'Development', 'In App', 'Document Mangement', 'document_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/document');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Learning App', 'Active', 'A Learning module for PDF or Video based Learning in various categories', 'Development', 'In App', 'LMS App', 'lms_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/learning');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Question and Answer App', 'Active', 'A Question and Anwer module for general discussion on various categories', 'Development', 'In App', 'QnA App', 'qna_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/qna');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Safety Management', 'Active', 'Managing and Tracking Safety Initiavies in the Organisation', 'Development', 'In App', 'Safety App', 'safety_logo.png', 1, 'App', 'Internal', 1, 1, SYSDATE, SYSDATE,'/safety');



-- FRM PROJECT MEMBERS

create table t_exp_project_members
(
    id number,
    project_id number not null,
    member_id number not null,
    dev_role varchar2(10),
    support_role varchar2(10),
    testing_role varchar2(10),
    crt_by number,
    crt_date date
);

alter table t_exp_project_members
add constraint pk_exp_projectmember_id primary key (id);


CREATE SEQUENCE t_exp_project_mem_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_project_mem_pk_seq 
BEFORE INSERT ON t_exp_project_members
FOR EACH ROW
BEGIN
  SELECT t_exp_project_mem_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;


insert into t_exp_project_members (project_id, member_id, dev_role, support_role, testing_role, crt_date) values (1, 2, 'Yes', 'No', 'No', SYSDATE);
insert into t_exp_project_members (project_id, member_id, dev_role, support_role, testing_role, crt_date) values (1, 68636, 'Yes', 'Yes', 'No', SYSDATE);

-- FRM PROJECT MODULES

create table t_exp_project_modules
(
    id number,
    project_id number not null,
    name varchar2(255) not null,
    disp_name varchar2(255) not null,
    module_lead_id number,
    client_spoc_id number,
    module_admins varchar2(255),
    logo_url varchar2(255),
    short_desc varchar2(500),
    status varchar2(50)
);

alter table t_exp_project_modules
add constraint pk_exp_projectmodules_id primary key (id);


CREATE SEQUENCE t_exp_project_mod_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_project_mod_pk_seq 
BEFORE INSERT ON t_exp_project_modules
FOR EACH ROW
BEGIN
  SELECT t_exp_project_mod_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;


insert into t_exp_project_modules (project_id, name, disp_name, module_lead_id, client_spoc_id, logo_url, short_desc, status) values (10, 'Safety Observation', 'Safety Observation', 1, 1, 'safety_sos_logo.png', 'Tracking Behaviour Safety and Reporting', 'Active');
insert into t_exp_project_modules (project_id, name, disp_name, module_lead_id, client_spoc_id, logo_url, short_desc, status) values (10, 'Incident Investigation', 'Incident Investigation', 1, 1, 'safety_iis_logo.png', 'Tracking Incident and Investigation record keeping', 'Active');

-- FRM ROLES 

create table t_exp_roles 
(
    id number,
    name varchar2(255) not null,
    role_assign_auth varchar2(255) not null, 
    status varchar2(50) not null,
    project_id number,
    module_id number,
    crt_by number,
    crt_date date
);

alter table t_exp_roles
add constraint pk_exp_roles_id primary key (id);


CREATE SEQUENCE t_exp_roles_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_roles_pk_seq 
BEFORE INSERT ON t_exp_roles
FOR EACH ROW
BEGIN
  SELECT t_exp_roles_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;


insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Default', '[2]', 'Active', 0, null, SYSDATE);
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Super User', '[]', 'Active', 0, null, SYSDATE);


insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Manager', '[2]', 'Active', 2, null, SYSDATE);
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Team Lead', '[2,3]', 'Active', 2, null, SYSDATE);
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Developer', '[2,3]', 'Active', 2, null, SYSDATE);
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Super Person', '[2,3]', 'Active', 2, null, SYSDATE);
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Tester', '[2,3]', 'Active', 2, null, SYSDATE);
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Client Spoc', '[2,3]', 'Active', 2, null, SYSDATE);

-- FRM USER APPS

create table t_exp_user_roles
(
    id number,
    role_id number not null,
    user_id number not null,
    crt_by number,
    crt_date date
);

alter table t_exp_user_roles
add constraint pk_exp_rolesuser_id primary key (id);


CREATE SEQUENCE t_exp_user_roles_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_user_roles_pk_seq 
BEFORE INSERT ON t_exp_user_roles
FOR EACH ROW
BEGIN
  SELECT t_exp_user_roles_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;

insert into t_exp_user_roles (role_id, user_id, crt_date) values (1,1,SYSDATE);
insert into t_exp_user_roles (role_id, user_id, crt_date) values (1,68636,SYSDATE);
insert into t_exp_user_roles (role_id, user_id, crt_date) values (2,1,SYSDATE);
insert into t_exp_user_roles (role_id, user_id, crt_date) values (2,2,SYSDATE);
insert into t_exp_user_roles (role_id, user_id, crt_date) values (3,1,SYSDATE);

-- FRM USER ROLES

create table t_exp_user_apps
(
    id number,
    project_id number not null,
    user_id number not null,
    crt_by number,
    crt_date date
);

alter table t_exp_user_apps
add constraint pk_exp_rolesapp_id primary key (id);


CREATE SEQUENCE t_exp_user_apps_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_user_apps_pk_seq 
BEFORE INSERT ON t_exp_user_apps
FOR EACH ROW
BEGIN
  SELECT t_exp_user_apps_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;

insert into t_exp_user_apps (project_id, user_id, crt_date) values (1,1,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (2,1,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (1,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (2,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (3,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (4,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (5,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (6,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (7,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (8,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (9,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (10,2,SYSDATE);
insert into t_exp_user_apps (project_id, user_id, crt_date) values (2,68636,SYSDATE);

-- FRM MENUS

create table t_exp_menus
(
    id number,
    name varchar2(255) not null,
    mas_id number,   
    sr_no number, 
    menu_type varchar2(100) not null, -- Relative / Absolute
    menu_url varchar2(255),
    project_id number,
    module_id number, 
    crt_by number,
    crt_date date,
    status varchar2(25),
    menu_icon varchar2(50)
);

alter table t_exp_menus
add constraint pk_exp_menu_id primary key (id);


CREATE SEQUENCE t_exp_menus_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_menus_pk_seq 
BEFORE INSERT ON t_exp_menus
FOR EACH ROW
BEGIN
  SELECT t_exp_menus_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;


insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative', '/master', 0, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('settings','Active', 'Administration', null, 2, 'Parent',null, 0, null, SYSDATE);

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('roles','Active', 'Roles', 2, 1, 'Relative','/roles', 0, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('apps','Active', 'Apps', 2, 2, 'Relative','/apps', 0, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('menus','Active', 'Menus', 2, 3, 'Relative','/menus', 0, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('users','Active', 'Users', 2, 4, 'Relative','/users', 0, null, SYSDATE);

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative','/health', 1, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('employee','Active', 'Employee Search', null, 2, 'Relative','/health/empsearch', 1, null, SYSDATE);


insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative','/project', 2, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('settings','Active', 'Administration', null, 2, 'Parent',null, 2, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('teams','Active', 'Teams', 10, 1, 'Parent','/project/teams', 2, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('apps','Active', 'Projects', 10, 2, 'Parent','/project/projects', 2, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('config','Active', 'Configuration', 10, 3, 'Parent','/project/configs', 2, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('tasks','Active', 'Tasks', null, 2, 'Relative','/project/tasks', 2, null, SYSDATE);

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative','/safety', 10, null, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('safety', 'Active', 'Safety Observation', null, 1, 'Parent',null, 10, 1, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('log','Active', 'Log Observation', 16, 1, 'Relative','/safety/observation/log', 10, 1, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('view','Active', 'View Observation', 16, 2, 'Relative','/safety/observation/view', 10, 1, SYSDATE);

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('incident','Active', 'Incident Investigation', null, 2, 'Parent',null, 10, 2, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('log','Active', 'Log Incident', 19, 1, 'Relative','/safety/Incident/log', 10, 2, SYSDATE);
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('view','Active', 'View Incident', 19, 2, 'Relative','/safety/Incident/view', 10, 2, SYSDATE);

-- FRM MENU ACCESS

create table t_exp_menu_access 
(
    id number,
    role_id number not null,
    menu_id number not null,
    crt_by number,
    crt_date date
);


alter table t_exp_menu_access
add constraint pk_exp_menuaccess_id primary key (id);


CREATE SEQUENCE t_exp_menu_access_pk_seq START WITH 1;

CREATE OR REPLACE TRIGGER tr_exp_menu_access_pk_seq 
BEFORE INSERT ON table t_exp_menu_access

FOR EACH ROW
BEGIN
  SELECT t_exp_menu_access_pk_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;


insert into t_exp_menu_access (role_id, menu_id, crt_date) values (1,1,SYSDATE);

insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,1,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,2,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,3,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,4,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,5,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,6,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,7,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,8,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,9,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,10,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,11,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,12,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,13,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,14,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,15,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,16,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,17,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,18,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,19,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,20,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,21,SYSDATE);

insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,9,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,10,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,11,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,12,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,13,SYSDATE);
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,14,SYSDATE);


