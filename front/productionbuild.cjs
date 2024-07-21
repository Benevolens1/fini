const fs = require('fs');

try {
    let data = fs.readFileSync('./dist/manifest.json')
    let json = JSON.parse(data);
    let jsFile = json["src/main.jsx"].file;
    let cssFile = json["src/main.css"].file;

    let htmlFileProduction = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fini app</title>
    </head>
    <body>
        <div id="root"></div>
        <!-- if production -->
        <link rel="stylesheet" href="${cssFile}" />
        <script type="module" src="${jsFile}"></script>
    </body>
    </html>
    `;
    fs.writeFileSync('./dist/index.html', htmlFileProduction);
    console.log('index.html created');
} catch (e) {
    console.log(e);
}
