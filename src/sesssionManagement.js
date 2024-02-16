const ClientSession = require("./clientSession");

class SessionManagement {
    static sessions = new Map();
    static sessionTimeouts = new Map();

    static createSession(clientPhoneNumber) {

        if (!SessionManagement.sessions.has(clientPhoneNumber)) {

            const newSession = new ClientSession(clientPhoneNumber);
            SessionManagement.sessions.set(clientPhoneNumber, newSession);
            SessionManagement.startSessionTimeout(clientPhoneNumber);
            return newSession;

        }

    }

    static getSession(clientPhoneNumber) {
        var result = SessionManagement.sessions.get(clientPhoneNumber);

        if (result != undefined) {
            return result;
        }
        
        return SessionManagement.createSession(clientPhoneNumber);
        
    }

    static removeSession(clientPhoneNumber) {

        SessionManagement.sessions.delete(clientPhoneNumber);
        SessionManagement.clearSessionTimeout(clientPhoneNumber);

    }

    static startSessionTimeout(clientPhoneNumber) {

        const timeoutId = setTimeout(() => {
            SessionManagement.sendSessionShutdownMessage(clientPhoneNumber);
            SessionManagement.removeSession(clientPhoneNumber);
        }, 1 * 60 * 1000);

        SessionManagement.sessionTimeouts.set(clientPhoneNumber, timeoutId);
    }

    static clearSessionTimeout(clientPhoneNumber) {
        
        const timeoutId = SessionManagement.sessionTimeouts.get(clientPhoneNumber);
        clearTimeout(timeoutId);
        SessionManagement.sessionTimeouts.delete(clientPhoneNumber);

    }

    static sendSessionShutdownMessage(clientPhoneNumber) {
        // Code to send session shutdown message to the client
        // For example: sendMessage(clientPhoneNumber, "Your session has timed out. Please start a new session to continue.");
    }

}

module.exports = SessionManagement;