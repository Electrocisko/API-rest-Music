import validator from 'validator';

const validate = (params) => {
    let name = !validator.isEmpty(params.name); 
    let email = validator.isEmail(params.email);
    let password = validator.isByteLength(params.password, {min:6})

    if(!name) throw new Error("Error en campo nombre")
    if(!email) throw new Error("Mail no valido")
    if(!password) throw new Error("El password tiene que tener mas de 6 caracteres")
}

export default validate;