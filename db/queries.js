const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages ORDER BY added DESC");
    return rows;
}

async function getMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return rows[0];
}

async function insertMessage(text, username, added) {
    await pool.query("INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)", [text, username, added]);
}

module.exports = {
    getAllMessages,
    getMessage,
    insertMessage
};