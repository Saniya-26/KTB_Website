const users = [];

// Join user to a specific chatroom
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    //console.log('User joined:', user); // Debugging
    return user;
}

// Get current user by socket ID
function getCurrUser(id) {
    return users.find(user => user.id === id);
}

// User leaves the chatroom
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const user = users.splice(index, 1)[0];
      //  console.log('User left:', user); // Debugging
        return user;
    }
}

// Get users in a specific room
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrUser,
    userLeave,
    getRoomUsers
};
