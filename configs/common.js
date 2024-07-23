const BASE_DB_TYPE = process.env.NODE_BASE_DB_TYPE || "mysqldb";

const LDAP_HOSTS = process.env.NODE_LDAP_HOSTS || "";
const LDAP_HOSTS_TML = LDAP_HOSTS.split(",").map((item) => ({
  url: item,
  dn: process.env.NODE_LDAP_HOSTS_DN,
  dom: process.env.NODE_LDAP_HOSTS_DOM,
}));

const DEFAULT_APP = {
  id: 0,
  name: "Xpandio App",
  stage: "Released",
  hosting_status: "In App",
  hosting_url: "",
  disp_name: "Xpandio App",
  short_desc: "Base App for This platform",
  logo_url: "/images/logo/xpandio_icon.png",
  project_lead_id: 0,
  creation_type: "App",
  own_login_url: "",
  client_dept: "",
  client_spoc_id: 0,
  team_id: 0,
  project_admins: "[]",
  status: "Active",
  base_url: "/master",
};

module.exports = {
  BASE_DB_TYPE,
  LDAP_HOSTS,
  LDAP_HOSTS_TML,
  DEFAULT_APP,
};
