const conf = {
    apikey: String(import.meta.env.VITE_FIREBASE_KEY),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    cloud_name: String(import.meta.env.VITE_APP_CLOUD_NAME),
    cloud_preset: String(import.meta.env.VITE_APP_UPLOAD_PRESET)
};

console.log("Firebase API Key:", conf.apikey); //Debugging 

export default conf;