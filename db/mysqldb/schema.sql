-- FRM_USERS

create table t_frm_users
(
    id int not null primary key AUTO_INCREMENT,
    base_loc varchar(50),
    crt_by int,
    crt_ts datetime,
    designation varchar(50),
    email varchar(100),
    emp_id varchar(50) not null,
    emp_type varchar(50),
    gender varchar(25),
    grade varchar(25),
    mobile varchar(25),
    name varchar(255) not null,
    password varchar(255),
    rfid varchar(255),
    sap_status varchar(50) not null,
    separation_date varchar(50),
    unique_no varchar(50),
    upd_by int,
    upd_ts datetime,
    username varchar(50),
    allowed_domain_login varchar(25)
);


-- FRM TEAMS

create table t_exp_teams
(
    id int not null primary key AUTO_INCREMENT,
    name varchar(100) not null,
    manager_id int not null,
    crt_by int,
    crt_date datetime
);


insert into t_exp_teams (name, manager_id, crt_date) values ('JSR Web Team', 1, NOW());



-- FRM MEMBERS

create table t_exp_team_members
(
    id int not null primary key AUTO_INCREMENT,
    team_id int not null,
    member_id int not null,
    crt_by int,
    crt_date datetime
);


insert into t_exp_team_members (team_id, member_id, crt_date) values (1, 1, NOW());
insert into t_exp_team_members (team_id, member_id, crt_date) values (1, 2, NOW());
insert into t_exp_team_members (team_id, member_id, crt_date) values (1, 3, NOW());

-- FRM PROJECTS

create table t_exp_projects
(
    id int not null primary key AUTO_INCREMENT,
    name varchar(255) not null,
    stage varchar(50),         -- Planning , Development etc
    hosting_status varchar(50) not null, -- In App , Standalone
    hosting_url varchar(500),
    disp_name varchar(255) not null, 
    short_desc varchar(500),
    logo_url varchar(255),    
    project_lead_id int,
    creation_type varchar(50) not null, -- App, Project    
    own_login_url varchar(255),
    client_dept varchar(255),
    client_spoc_id int,
    team_id int,
    crt_by int,
    crt_date datetime,
    upd_by int,
    upd_date datetime,
    project_admins varchar(255),
    status varchar(50) not null,
    base_url varchar(100)
);

insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Occupational Health', 'Active', 'App for Management Health related data for Employees', 'Development', 'In App', 'Health App', 'health_logo.png', 1, 'App', 'Health', 1, 1, NOW(), NOW(), '/health');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Project Management', 'Active', 'Managing Tasks for the Team, Including Performance parameters and Daily activity', 'Development', 'In App', 'Project Management', 'project_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/project');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('CR Management', 'Active', 'Change Request management for Apps or Projects hosted on the platform', 'Development', 'In App', 'CR Management', 'cr_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/change');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Ticketing System', 'Active', 'Ticketing system for managing support tickets and their resolution history', 'Development', 'In App', 'Ticketing App', 'ticketing_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/ticket');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Quiz App', 'Active', 'A general purpose utiity app for creating and conducting Quiz', 'Development', 'In App', 'Quiz App', 'quiz_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/quiz');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Survey App', 'Active', 'A general purpose utility app for Individual for Creating a Survey', 'Development', 'In App', 'Survey App', 'survey_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/survey');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Document Management', 'Active', 'Documents management such as User Manual, PPT etc used in the platform', 'Development', 'In App', 'Document Mangement', 'document_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/document');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Learning App', 'Active', 'A Learning module for PDF or Video based Learning in various categories', 'Development', 'In App', 'LMS App', 'lms_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/learning');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Question and Answer App', 'Active', 'A Question and Anwer module for general discussion on various categories', 'Development', 'In App', 'QnA App', 'qna_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/qna');
insert into t_exp_projects (name, status, short_desc, stage, hosting_status, disp_name, logo_url, project_lead_id, creation_type, client_dept, client_spoc_id, team_id, crt_date, upd_date, base_url) values ('Safety Management', 'Active', 'Managing and Tracking Safety Initiavies in the Organisation', 'Development', 'In App', 'Safety App', 'safety_logo.png', 1, 'App', 'Internal', 1, 1, NOW(), NOW(),'/safety');


-- FRM PROJECT MEMBERS

create table t_exp_project_members
(
    id int not null primary key AUTO_INCREMENT,
    project_id int not null,
    member_id int not null,
    dev_role varchar(10),
    support_role varchar(10),
    testing_role varchar(10),
    crt_by int,
    crt_date datetime
);



insert into t_exp_project_members (project_id, member_id, dev_role, support_role, testing_role, crt_date) values (1, 2, 'Yes', 'No', 'No', NOW());
insert into t_exp_project_members (project_id, member_id, dev_role, support_role, testing_role, crt_date) values (1, 3, 'Yes', 'Yes', 'No', NOW());

-- FRM PROJECT MODULES

create table t_exp_project_modules
(
    id int not null primary key AUTO_INCREMENT,
    project_id int not null,
    name varchar(255) not null,
    disp_name varchar(255) not null,
    module_lead_id int,
    client_spoc_id int,
    module_admins varchar(255),
    logo_url varchar(255),
    short_desc varchar(500),
    status varchar(50)
);


insert into t_exp_project_modules (project_id, name, disp_name, module_lead_id, client_spoc_id, logo_url, short_desc, status) values (10, 'Safety Observation', 'Safety Observation', 1, 1, 'safety_sos_logo.png', 'Tracking Behaviour Safety and Reporting', 'Active');
insert into t_exp_project_modules (project_id, name, disp_name, module_lead_id, client_spoc_id, logo_url, short_desc, status) values (10, 'Incident Investigation', 'Incident Investigation', 1, 1, 'safety_iis_logo.png', 'Tracking Incident and Investigation record keeping', 'Active');


-- FRM ROLES

create table t_exp_roles 
(
    id int not null primary key AUTO_INCREMENT,
    name varchar(255) not null,
    role_assign_auth varchar(255) not null, 
    status varchar(50) not null,
    project_id int,
    module_id int,
    crt_by int,
    crt_date datetime
);

insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Default', '[2]', 'Active', 0, null, NOW());
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Super User', '[]', 'Active', 0, null, NOW());


insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Manager', '[2]', 'Active', 2, null, NOW());
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Team Lead', '[2,3]', 'Active', 2, null, NOW());
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Developer', '[2,3]', 'Active', 2, null, NOW());
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Super Person', '[2,3]', 'Active', 2, null, NOW());
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Tester', '[2,3]', 'Active', 2, null, NOW());
insert into t_exp_roles (name, role_assign_auth, status, project_id, module_id, crt_date) values ('Client Spoc', '[2,3]', 'Active', 2, null, NOW());

-- FRM USER APPS

create table t_exp_user_roles
(
    id int not null primary key AUTO_INCREMENT,
    role_id int not null,
    user_id int not null,
    crt_by int,
    crt_date datetime
);

insert into t_exp_user_roles (role_id, user_id, crt_date) values (1,1,NOW());
insert into t_exp_user_roles (role_id, user_id, crt_date) values (1,3,NOW());
insert into t_exp_user_roles (role_id, user_id, crt_date) values (2,1,NOW());
insert into t_exp_user_roles (role_id, user_id, crt_date) values (2,2,NOW());
insert into t_exp_user_roles (role_id, user_id, crt_date) values (3,1,NOW());

-- FRM USER ROLES

create table t_exp_user_apps
(
    id int not null primary key AUTO_INCREMENT,
    project_id int not null,
    user_id int not null,
    crt_by int,
    crt_date datetime
);

insert into t_exp_user_apps (project_id, user_id, crt_date) values (1,1,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (2,1,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (1,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (2,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (3,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (4,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (5,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (6,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (7,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (8,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (9,2,NOW());
insert into t_exp_user_apps (project_id, user_id, crt_date) values (10,2,NOW());


-- FRM MENUS

create table t_exp_menus
(
    id int not null primary key AUTO_INCREMENT,
    name varchar(255) not null,
    mas_id int,   
    sr_no int, 
    menu_type varchar(100) not null, -- Relative / Absolute
    menu_url varchar(255),
    project_id int,
    module_id int, 
    crt_by int,
    crt_date datetime,
    status varchar(25),
    menu_icon varchar(50)
);

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative', '/master', 0, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('settings','Active', 'Administration', null, 2, 'Parent',null, 0, null, NOW());

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('roles','Active', 'Roles', 2, 1, 'Relative','/master/roles', 0, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('apps','Active', 'Apps', 2, 2, 'Relative','/master/apps', 0, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('menus','Active', 'Menus', 2, 3, 'Relative','/master/menus', 0, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('users','Active', 'Users', 2, 4, 'Relative','/master/users', 0, null, NOW());

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative','/health', 1, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('employee','Active', 'Employee Search', null, 2, 'Relative','/health/empsearch', 1, null, NOW());


insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative','/project', 2, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('settings','Active', 'Administration', null, 2, 'Parent',null, 2, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('teams','Active', 'Teams', 10, 1, 'Parent','/project/teams', 2, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('apps','Active', 'Projects', 10, 2, 'Parent','/project/projects', 2, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('config','Active', 'Configuration', 10, 3, 'Parent','/project/configs', 2, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('tasks','Active', 'Tasks', null, 2, 'Relative','/project/tasks', 2, null, NOW());

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('dashboard','Active', 'Dashboard', null, 1, 'Relative','/safety', 10, null, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('safety', 'Active', 'Safety Observation', null, 1, 'Parent',null, 10, 1, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('log','Active', 'Log Observation', 16, 1, 'Relative','/safety/observation/log', 10, 1, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('view','Active', 'View Observation', 16, 2, 'Relative','/safety/observation/view', 10, 1, NOW());

insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('incident','Active', 'Incident Investigation', null, 2, 'Parent',null, 10, 2, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('log','Active', 'Log Incident', 19, 1, 'Relative','/safety/Incident/log', 10, 2, NOW());
insert into t_exp_menus (menu_icon, status,name, mas_id, sr_no, menu_type, menu_url, project_id, module_id, crt_date) values ('view','Active', 'View Incident', 19, 2, 'Relative','/safety/Incident/view', 10, 2, NOW());

-- FRM MENU ACCESS

create table t_exp_menu_access 
(
    id int not null primary key AUTO_INCREMENT,
    role_id int not null,
    menu_id int not null,
    crt_by int,
    crt_date datetime
);

insert into t_exp_menu_access (role_id, menu_id, crt_date) values (1,1,NOW());

insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,1,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,2,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,3,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,4,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,5,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,6,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,7,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,8,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,9,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,10,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,11,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,12,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,13,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,14,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,15,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,16,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,17,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,18,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,19,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,20,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (2,21,NOW());

insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,9,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,10,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,11,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,12,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,13,NOW());
insert into t_exp_menu_access (role_id, menu_id, crt_date) values (3,14,NOW());


