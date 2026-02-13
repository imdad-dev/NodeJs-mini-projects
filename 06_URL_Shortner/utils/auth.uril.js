const sessionIdUserMap = new Map();

function setuser(id , user){
    sessionIdUserMap.set(id , user)
}

function getuser (id) {
    return sessionIdUserMap.get(id);
}

module.exports = { 
       setuser , 
       getuser , 
}