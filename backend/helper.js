const token = require('./getAccessToken.js');
const axios = require('axios')

exports.populaMensagem = async (req) => {
    var jsonPopulado = texto(req);
    await reqWhatsapp(jsonPopulado);
}
texto = (data) =>{
    let inArguments = data['inArguments'][0];
    var obj = {
        "template":{
           "nome":inArguments.template,
           "bodyParameters": [inArguments.variables],
           "buttonURL":inArguments.btnLink
        },
        "destino":inArguments.phoneNumber,
        "origem": inArguments.origem
     }
     return obj;
}

reqWhatsapp = async (data) =>{
    return token.getAccessToken().then( (access_token) => {
            console.log("access_token");
            console.log(access_token);
        axios({
            method: "post",
            url: "https://webhook.site/4eb9a22c-8585-4fec-ab78-f98dda56b780",
            headers: {
                'Content-Type': 'application/json'
                /* 'access_token' : access_token */
            },
            data: data
        }).then(resp =>{
            
            console.log(resp.data);
            return resp.data;
        }).catch(error =>{
            console.error( error );
        });   
    });
}