const conf = {
    apikey: String(import.meta.env.VITE_FIREBASE_KEY),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
};

console.log("Firebase API Key:", conf.apikey); //Debugging 

export default conf;