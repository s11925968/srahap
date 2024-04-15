const dataMethods=['body', 'query', 'params'];
const validtion=(schema) => {
  return (req,res,next) => {
    const validationArray=[];
    dataMethods.forEach(method => {
      if(schema[method]){
        const validationResult=schema[method].validate(req[method],{abortEarly:false});
        if(validationResult.error){
          validationArray.push(validationResult.error);
        }
      }
    })
    if(validationArray.length>0){
      return res.status(400).json({message:"validation error",validationArray})
    }

    next();

  }
}
export default validtion;