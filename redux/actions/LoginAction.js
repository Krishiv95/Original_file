
function LoginRespose(response){

    console.log('call LoginRespose',response)
    return{
        type:'LoginResponse',
        response
    }
}
module.exports = {
    LoginRespose,
  };