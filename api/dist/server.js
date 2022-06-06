"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
//import { MONGODB_URI } from './util/secrets'
const logger_1 = __importDefault(require("./util/logger"));
dotenv_1.default.config({ path: '.env' });
// const mongoUrl = MONGODB_URI
const mongoUrl = `mongodb://fs9-fullstack:${process.env.MONGO}@cluster0-shard-00-00.kienc.mongodb.net:27017,cluster0-shard-00-01.kienc.mongodb.net:27017,cluster0-shard-00-02.kienc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-bq83u0-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose_1.default
    .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    logger_1.default.info('Successfully connected to MongoDB');
})
    .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit(1);
});
/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === 'development') {
    app_1.default.use(errorhandler_1.default());
}
// Start Express server
app_1.default.listen(app_1.default.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map