#!/usr/bin/env node

'use strict';

var colors = require('colors/safe'),
    os = require('os'),
    httpServer = require('../lib/http-server'),
    portfinder = require('portfinder'),
    opener = require('opener'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2));
var ifaces = os.networkInterfaces();

process.title = 'http-server';

if (argv.h || argv.help) {
    console.log([
        'usage: wdgX s [path] [options]',
        '',
        'options:',
        '  -p --port    Port to use [4000]',
        '  -a           Address to use [0.0.0.0]',
        '  -d           Show directory listings [true]',
        '  -i           Display autoIndex [true]',
        '  -g --gzip    Serve gzip files when possible [false]',
        '  -b --brotli  Serve brotli files when possible [false]',
        '               If both brotli and gzip are enabled, brotli takes precedence',
        '  -e --ext     Default file extension if none supplied [none]',
        '  -s --silent  Output log message',
        '  --cors[=headers]   Enable CORS via the "Access-Control-Allow-Origin" header',
        '                     Optionally provide CORS headers list separated by commas',
        '  -o [path]    Open browser window after starting the server.',
        '               Optionally provide a URL path to open the browser window to.',
        '  -c           Cache time (max-age) in seconds [3600], e.g. -c10 for 10 seconds.',
        '               To disable caching, use -c-1.',
        '  -t           Connections timeout in seconds [120], e.g. -t60 for 1 minute.',
        '               To disable timeout, use -t0',
        '  -U --utc     Use UTC time format in log messages.',
        '  --log-ip     Enable logging of the client\'s IP address',
        '',
        '  -P --proxy         Fallback proxy if the request cannot be resolved. e.g.: http://someurl.com',
        '',
        '  --username   Username for basic authentication [none]',
        '               Can also be specified with the env variable NODE_HTTP_SERVER_USERNAME',
        '  --password   Password for basic authentication [none]',
        '               Can also be specified with the env variable NODE_HTTP_SERVER_PASSWORD',
        '',
        '  -S --ssl     Enable https.',
        '  -C --cert    Path to ssl cert file (default: cert.pem).',
        '  -K --key     Path to ssl key file (default: key.pem).',
        '',
        '  -r --robots        Respond to /robots.txt [User-agent: *\\nDisallow: /]',
        '  --no-dotfiles      Do not show dotfiles',
        '  -h --help          Print this list and exit.',
        '  -v --version       Print the version and exit.'
    ].join('\n'));
    process.exit();
}

var port = argv.p || argv.port || parseInt(process.env.PORT, 10),
    host = argv.a || '0.0.0.0',
    ssl = argv.S || argv.ssl,
    proxy = argv.P || argv.proxy,
    utc = argv.U || argv.utc,
    version = argv.v || argv.version,
    logger;

if (!argv.s && !argv.silent) {
    logger = {
        info: console.log,
        request: function (req, res, error) {
            var date = utc ? new Date().toUTCString() : new Date();
            var ip = argv['log-ip']
                ? req.headers['x-forwarded-for'] || '' + req.connection.remoteAddress
                : '';
        }
    };
}
else if (colors) {
    logger = {
        info: console.log,
        request: function (req, res, error) {
            var date = utc ? new Date().toUTCString() : new Date();
            var ip = argv['log-ip']
                ? req.headers['x-forwarded-for'] || '' + req.connection.remoteAddress
                : '';
            if (error) {
                logger.info(
                    '[%s] %s "%s %s" Error (%s): "%s"',
                    date, ip, colors.red(req.method), colors.red(req.url),
                    colors.red(error.status.toString()), colors.red(error.message)
                );
            }
            else {
                logger.info(
                    '[%s] %s "%s %s" "%s"',
                    date, ip, colors.cyan(req.method), colors.cyan(req.url),
                    req.headers['user-agent']
                );
            }
        }
    };
}

if (version) {
    logger.info('v' + require('../package.json').version);
    process.exit();
}

if (!port) {
    portfinder.basePort = 4000;
    portfinder.getPort(function (err, port) {
        if (err) { throw err; }
        listen(port);
    });
}
else {
    listen(port);
}

function listen(port) {
    var options = {
        root: argv._[0],
        cache: argv.c,
        timeout: argv.t,
        showDir: argv.d,
        autoIndex: argv.i,
        gzip: argv.g || argv.gzip,
        brotli: argv.b || argv.brotli,
        robots: argv.r || argv.robots,
        ext: argv.e || argv.ext,
        logFn: logger.request,
        proxy: proxy,
        showDotfiles: argv.dotfiles,
        username: argv.username || process.env.NODE_HTTP_SERVER_USERNAME,
        password: argv.password || process.env.NODE_HTTP_SERVER_PASSWORD
    };

    if (argv.cors) {
        options.cors = true;
        if (typeof argv.cors === 'string') {
            options.corsHeaders = argv.cors;
        }
    }

    if (ssl) {
        options.https = {
            cert: argv.C || argv.cert || 'cert.pem',
            key: argv.K || argv.key || 'key.pem'
        };
        try {
            fs.lstatSync(options.https.cert);
        }
        catch (err) {
            logger.info(colors.red('Error: Could not find certificate ' + options.https.cert));
            process.exit(1);
        }
        try {
            fs.lstatSync(options.https.key);
        }
        catch (err) {
            logger.info(colors.red('Error: Could not find private key ' + options.https.key));
            process.exit(1);
        }
    }

    var server = httpServer.createServer(options);
    server.listen(port, host, function () {
        var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
            protocol = ssl ? 'https://' : 'http://';

        logger.info([colors.yellow('Starting up http-server, serving '),
        colors.cyan(server.root),
        ssl ? (colors.yellow(' through') + colors.cyan(' https')) : '',
        colors.yellow('\nAvailable on:')
        ].join(''));

        if (argv.a && host !== '0.0.0.0') {
            logger.info(('  ' + protocol + canonicalHost + ':' + colors.green(port.toString())));
        }
        else {
            Object.keys(ifaces).forEach(function (dev) {
                ifaces[dev].forEach(function (details) {
                    if (details.family === 'IPv4') {
                        logger.info(('  ' + protocol + details.address + ':' + colors.green(port.toString())));
                    }
                });
            });
        }

        if (typeof proxy === 'string') {
            logger.info('Unhandled requests will be served from: ' + proxy);
        }

        logger.info('Hit CTRL-C to stop the server');
        if (argv.o) {
            var openUrl = protocol + canonicalHost + ':' + port;
            if (typeof argv.o === 'string') {
                openUrl += argv.o[0] === '/' ? argv.o : '/' + argv.o;
            }
            logger.info('open: ' + openUrl);
            opener(openUrl);
        }
    });
}

if (process.platform === 'win32') {
    require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', function () {
    logger.info(colors.red('http-server stopped.'));
    process.exit();
});

process.on('SIGTERM', function () {
    logger.info(colors.red('http-server stopped.'));
    process.exit();
});
