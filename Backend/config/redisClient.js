const { createClient } = require('redis')

const redisClient = createClient({
    socket: {
        host: 'redis',
        port: 6379
    }
});

(async () => {

    try {
        await redisClient.connect();
        console.log("Connected to redis");
        
    } catch (error) {
        console.log(`Failed to connect to redis because of ${error}`);
        
    }
    
})();

module.exports = redisClient