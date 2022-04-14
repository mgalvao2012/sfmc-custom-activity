
const axios = require('axios')
const { promisify } = require('util');
const fs = require('fs');
const cacheManager = require('cache-manager');

const ACCESS_TOKEN_KEY = "accessToken";
const memoryCache = cacheManager.caching({store: 'memory', ttl: 3600 /*seconds*/ });

const getTokenFromSensedia = async ()  =>{
    try {
        const response = await axios({
            method: "post",
            url: "https://apisulamerica.sensedia.com/homolog/notificacoes/v1/oauth/access-token",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic MDg2ODc4YjYtNGU2Yy0zYzYwLThhOTYtMzUzMjQzOWEyYjAyOjIwNjlhYzA5LTM1NmQtM2QzNy1iMmQzLTZjNmFlMjg3YWE5Mg=='
            },
        });
        return response.data;
    } catch (err) {
        console.error(err)
    }
}

const getAccessToken = async () => {
    const cachedToken = await memoryCache.get(ACCESS_TOKEN_KEY);
    if (cachedToken) return cachedToken;

    const { access_token: accessToken, expires_in: ttl } = await getTokenFromSensedia();
    await memoryCache.set(ACCESS_TOKEN_KEY, accessToken, { ttl });
    return accessToken;
}




module.exports = {
    getAccessToken
    
} 