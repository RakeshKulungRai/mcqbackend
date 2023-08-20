const bcrypt = require("bcrypt");
const salt_key = 10;
module.exports = class HashingUtils {
    static async hash(password) {
        const data = await bcrypt.hash(password, salt_key);
        return data;
    }

    static async compare(password, hash_password) {
        return await bcrypt.compare(password, hash_password);
    }
};
