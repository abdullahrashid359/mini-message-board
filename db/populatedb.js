const net = require('node:net');
net.setDefaultAutoSelectFamily(false);

process.loadEnvFile('.env');
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text TEXT NOT NULL,
    username VARCHAR (255) NOT NULL,
    added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username)
VALUES
    ('Mai bhaaga bhaaga', 'Imran Khan'),
    ('I am a little naughty boy', 'Bilawal Bhutto'),
    ('I thought we were having a nice date', 'Freaky Nikki');
`;

async function main() {
    console.log('seeding...');

    let client;

    try {
        client = new Client(process.env.DATABASE_URL);
        await client.connect();
        await client.query(SQL);
        console.log('done');
    } catch (err) {
        console.log('error seeding database:', err);
    } finally {
        await client.end();
    }
}

main();