// we catch eerors for async when we dont get response

module.exports = func => (req, res, next) => 
      Promise.resolve(func(req,res, next))
         .catch(next)