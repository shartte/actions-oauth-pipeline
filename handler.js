import jwt from 'jsonwebtoken';

export async function token(event) {
    let response = '';

    let body = event.body;
    if (event.isBase64Encoded) {
        body = Buffer.from(body, 'base64').toString('ascii');
    }

    if (!body) {
        response = 'No token sent...';
    } else {
        // Grab just the issuer claim
        try {
            let decoded = jwt.decode(body);
            response += JSON.stringify(decoded);
        } catch (e) {
            response += "ERROR: " + e;
        }
    }

    return {
        statusCode: 200,
        body: response
    };
}
