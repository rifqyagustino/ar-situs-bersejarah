const selfsigned = require('selfsigned');
const fs = require('fs');

async function run() {
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    
    try {
        let pems;
        // Try async/promise way first if the library supports it
        try {
             pems = await selfsigned.generate(attrs, { days: 365 });
        } catch (e) {
            // If it's not a promise, it might have thrown or it's sync but failed
            console.log("Not a promise or error:", e.message);
        }

        // If pems is still empty/undefined, try sync or callback
        if (!pems || Object.keys(pems).length === 0) {
             console.log("Trying callback style...");
             selfsigned.generate(attrs, { days: 365 }, (err, res) => {
                 if (err) {
                     console.error("Callback error:", err);
                     return;
                 }
                 save(res);
             });
        } else {
            save(pems);
        }
    } catch (err) {
        console.error("General error:", err);
    }
}

function save(pems) {
    console.log('Keys available:', Object.keys(pems));
    const cert = pems.cert || pems.certificate;
    const key = pems.private || pems.privateKey || pems.key;

    if (cert && key) {
        fs.writeFileSync('cert.pem', cert);
        fs.writeFileSync('key.pem', key);
        console.log('Certificate created successfully.');
    } else {
        console.error('Failed to extract cert/key.');
    }
}

run();