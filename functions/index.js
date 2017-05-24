var functions = require('firebase-functions');
var axios = require('axios');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const tenantID = 'common';
const clientID = '52a7830c-1d12-4652-8b4b-62ea84d7dd68';
const resourceID = '00000002-0000-0000-c000-000000000000';
const appURI = encodeURIComponent('http://localhost:3000');

exports.azureAD = functions.https.onRequest((request, response) => {
    const { code } = request.body;
    const secret = 'fZH5C+4a86Vm/z2FyaXshE//V6sUZMsFN6OLMXUqh3A=';

    const buildData = data => Object.keys(data).reduce((key, i) => {
        let value = encodeURIComponent(data[key]);
        let prepend = i > 0 ? '&' : '';
        return `${prepend}${key}=${value}`
    }, '');

    /*
    grant_type=authorization_code
    &client_id=2d4d11a2-f814-46a7-890a-274a72a7309e
    &code=AwABAAAAvPM1KaPlrEqdFSBzjqfTGBCmLdgfSTLEMPGYuNHSUYBrqqf_ZT_p5uEAEJJ_nZ3UmphWygRNy2C3jJ239gV_DBnZ2syeg95Ki-374WHUP-i3yIhv5i-7KU2CEoPXwURQp6IVYMw-DjAOzn7C3JCu5wpngXmbZKtJdWmiBzHpcO2aICJPu1KvJrDLDP20chJBXzVYJtkfjviLNNW7l7Y3ydcHDsBRKZc3GuMQanmcghXPyoDg41g8XbwPudVh7uCmUponBQpIhbuffFP_tbV8SNzsPoFz9CLpBCZagJVXeqWoYMPe2dSsPiLO9Alf_YIe5zpi-zY4C3aLw5g9at35eZTfNd0gBRpR5ojkMIcZZ6IgAA
    &redirect_uri=https%3A%2F%2Flocalhost%2Fmyapp%2F
    &resource=https%3A%2F%2Fservice.contoso.com%2F
    &client_secret=p@ssw0rd
    */
    axios({
        method: 'post',
        url: `https://login.microsoftonline.com/${tenantID}/oauth2/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: buildData({
            "grant_type": 'authorization_code',
            "client_id": clientID,
            "code": code,
            "resource": resourceID,
            "client_secret": secret
        })
    })
    .then(res => {
        return response.send(res);
    })
    .catch(err => {
        response.send(err);
    });
});
