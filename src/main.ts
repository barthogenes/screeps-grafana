import StatsD from 'hot-shots';
import { exit } from 'process';
import pkg from 'screeps-api';
const { ScreepsAPI } = pkg;

const api = new ScreepsAPI({
    protocol: 'http',
    hostname: process.env.SCREEPS_SERVER_URL,
    port: process.env.SCREEPS_SERVER_PORT,
    path: '/'
});

const statsd = new StatsD({ host: 'graphite', port: 8125, prefix: 'screeps.', errorHandler: (err) => console.error(err.message) });

const authFailedErrorMessage = `Could not authenticate to ${process.env.SCREEPS_EMAIL} using username ${process.env.SCREEPS_EMAIL} and password ${process.env.SCREEPS_PASSWORD}!`
api.auth(process.env.SCREEPS_EMAIL, process.env.SCREEPS_PASSWORD).then(result => {
    if (!result.ok) {
        console.error(authFailedErrorMessage);
        exit(-1);
    }

    setInterval(() => getStats(logData), 10000);
}).catch(err => console.error(`${authFailedErrorMessage} Original error: ${err}`));


/**
 * Retrieve 'Memory.stats' from the screeps server.
 */
function getStats(callback: (data: Memory['stats']) => void) {
    const fetchStatsPromise = (api.memory.get('stats', process.env.SCREEPS_SHARD) as unknown as Promise<{ ok: number, data: Memory['stats'] }>);
    fetchStatsPromise.then(result => {
        if (!result.ok) {
            console.error(`Could not retrieve Memory.stats! Resultcode: ${result.ok}`);
            exit(-1);
        }

        callback(result.data);
    }).catch(err => console.error(err));
}

/**
 * Log data to statsD.
 */
function logData(data: Object, prefix?: string) {
    for (const key in data) {
        // @ts-ignore
        const value = data[key];
        const newPrefix = buildPrefix(prefix, key);
        if (typeof (value) === 'object') {
            logData(value, newPrefix);
        } else {
            statsd.gauge(newPrefix, value);
        }
    }
}

function buildPrefix(prefix: string | undefined, key: string) {
    const prefixArray = [];
    if (prefix)
        prefixArray.push(prefix);
    prefixArray.push(key);
    return prefixArray.join(".");
}