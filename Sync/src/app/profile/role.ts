export var userRole: String;
export var userEmail: String;
export var userId: String;
export var roleType = function(role){
  userRole = role;
};

export var SetEmail = function (email) {
  userEmail = email;
};

export var showNav = function () {
  if (userRole === "admin" || userRole === "Admin"){
    return true;
  } else {
    return false;
  }
};

export var setId = function (id) {
  userId = id;
}
