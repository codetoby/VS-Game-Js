const app = require('./src/app');
const { PORT, checkConfig } = require('./src/config');
const { createTables } = require('./src/sql/tables');

(async () => {
    try {
        checkConfig();
        await createTables();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();

