const imagelink = require('./utility/image_link.json');
const videoLink = require('./utility/video_link.json');
const token = require('./getAccessToken.js');
const axios = require('axios')

exports.populaMensagem = async (req) => {
    let inArguments = req['inArguments'][0];

    //token.getAccesToken();
    //Texto
    if(inArguments.type == '1'){
        console.log("Entrou no type 1");
        var jsonPopulado = texto(req);
        await reqWhatsapp(jsonPopulado);
    }else if(inArguments.type == '2'){
        imagelink['template'].nome = inArguments.template;
        imagelink['template'].bodyParameters = inArguments.variables;
        imagelink['template'].buttonURL = inArguments.btnLink;
        imagelink.destino = inArguments.phoneNumber;
        imagelink.origem = inArguments.origem;
        imagelink['template'].header.body.url = inArguments.url
        reqWhatsapp(imagelink);
    }else{
        videoLink['template'].nome = inArguments.template;
        videoLink['template'].bodyParameters = inArguments.variables;
        videoLink['template'].buttonURL = inArguments.btnLink;
        videoLink.destino = inArguments.phoneNumber;
        videoLink.origem = inArguments.origem;
        videoLink['template'].header.body.url = inArguments.url
        reqWhatsapp(imagelink);
    }
    
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

image = (data) => {
    let inArguments = data['inArguments'][0];
    var obj = {
        "template": {
        "nome": inArguments.template,
        "header": {
            "type": "video",
            "body": {
            "media": "MP4",
            "url": ""
            }
            }
        },
        "destino": "",
        "origem": ""
    };
    return obj;
}
reqWhatsapp = async (data) =>{
    return token.getAccessToken().then( (access_token) => {
            console.log("access_token");
            console.log(access_token);
        axios({
            method: "post",
            url: "https://apisulamerica.sensedia.com/homolog/bff-whatsapp/v1/mensagens/template",
            headers: {
                'Content-Type': 'application/json',
                'client_id': '086878b6-4e6c-3c60-8a96-3532439a2b02',
                'access_token' : access_token
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
    

