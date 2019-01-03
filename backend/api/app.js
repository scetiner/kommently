const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('lodash');
const log4js = require('log4js');
const logHelper = require('./src/utils/log-helper');
const mongoose = require('mongoose');

/**
 * The server.
 *
 * @class Server
 */
class Server {
    static bootstrap() {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // create expressjs application
        this.app = express();

        this.serverConfig = this.loadConfiguration();
        // even though we don't want this - our views depend on global.conf
        global.conf = this.serverConfig;
        logHelper.initializeLogger('./log', './src/conf/log4js.json');
        this.logger = logHelper.getLogger('app');
        this.initializeProperties();
        // configure application
        this.config();

        this.registerAPIRoutes();

        mongoose.connect('mongodb://localhost:27017/kommently',{ useNewUrlParser: true });
        // Create server
        this.server = http.createServer(this.app);

        // Start listening
        this.listen();
    }

    /**
     * Initialization of private objects
     */
    initializeProperties() {
        this._router = require('./src/route/api/index');        
        this._ErrorMiddleware = require('./src/route/infra/middlewares/ErrorMiddleware').ErrorMiddlewareRouter;
    }

    /**
     *  Load Configuration from conf json
     */
    loadConfiguration() {
        // lets build configuration by merging environment dependent and global config
        this.isProduction = process.env.NODE_ENV === 'production';
        this.isDevelopment = process.env.NODE_ENV === 'development';
        const env = process.env.NODE_ENV || 'development';
        const envConfig = require(`./src/conf/config.${env}.json`);
        const globConfig = require('./src/conf/config.json');

        return _.merge(globConfig, envConfig);
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config() {
        this.port = process.env.PORT || this.serverConfig.listenPort;

        this.app.use(log4js.connectLogger(logHelper.getHttpLogger('http'), { level: 'INFO', format: '[:method :status :url - :response-timems :res[content-length]] - [:req[Host] :req[x-forwarded-for] - :remote-addr] - [HTTP/:http-version - :user-agent]' }));
        this.app.use(bodyParser.json({ limit: '2mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        // security related configurations
        this.app.use(helmet());
        this.app.use(cors());
        this.configureCSRFTokenProtection();

        process.on('unhandledRejection', (reason, p) => {
            this.logger.error('Unhandled exception', reason, p);
            throw reason; // optional, in case you want to treat these as errors
        });


        this.logger.info('Environment:', process.env.NODE_ENV);
    }

    /**
     *  Configure CSRF token
     */
    configureCSRFTokenProtection() {
        // this.app.use(csrf());

        this.app.use((req, res, next) => {
            // var token = req.csrfToken();
            // res.cookie('XSRF-TOKEN', token);
            // res.cookie('csrftoken', token);
            // res.locals.csrfToken = token;
            if (req.method === 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });

        // handle invalid csrf error exception
        this.app.use((err, req, res, next) => {
            if (err.code !== 'EBADCSRFTOKEN') {
                return next(err);
            }
            this.logger.error('Session has expired or tampered with', err);
            return res.status(403).json({ error: `Session has expired or tampered with - ${err}` });
        });
    }

    /**
     * Create API routers. This routers do not use csrf token!
     *
     * @class Server
     * @method api
     */
    registerAPIRoutes() {
        this.app.use('/api/user', this._ErrorMiddleware(1), this._router.UserRouter);
        this.app.use('/api/page', this._ErrorMiddleware(2), this._router.PageRouter);
        this.app.use('/api/comment', this._ErrorMiddleware(3), this._router.CommentRouter);
    }

    /**
     * Start HTTP server listening
     */
    listen() {
        // listen on provided ports
        this.server.listen(this.port);

        // add error handler
        this.server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = typeof this.port === 'string' ?
                `Pipe ${this.port}` :
                `Port ${this.port}`;

            // handle specific listen errors with friendly messages
            switch (error.code) {
            case 'EACCES':
                this.logger.error('requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.logger.error(bind, ' is already in use');
                process.exit(1);
                break;

            default:
                throw error;
            }
        });

        // start listening on port
        this.server.on('listening', () => {
            this.logger.info('Server ready. Listening on port ', this.port);
        });
    }
}

// Bootstrap the server
const server = Server.bootstrap();
exports.app = server.app;
