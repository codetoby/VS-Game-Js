const app = require('./src/app');
const { PORT, checkConfig } = require('./src/config');

checkConfig();
require('./src/tasks');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});