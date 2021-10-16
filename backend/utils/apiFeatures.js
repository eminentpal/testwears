class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;

    }

    search(){
        const keyword = this.queryStr.keyword ? {
          name: {
              $regex: this.queryStr.keyword,
              $options: 'i'
          }
        } : { }

        // console.log(keyword)
        this.query = this.query.find({...keyword})
        return this

    }

  filter() {
      const queryCopy = { ...this.queryStr };

   

      //remove some fields from the query

      const removeFields = ['keyword', 'limit', 'page']
      removeFields.forEach(el => delete queryCopy[el]);
   
        //advance filter for price ratings etc

    // we know query is an object so we will turn it to a string
        let queryStr= JSON.stringify(queryCopy)
        
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}` )
   
        // console.log (queryCopy)
      this.query = this.query.find(JSON.parse(queryStr));
      return this
     
  }

pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1

    const skip = resPerPage * (currentPage - 1); 

    this.query = this.query.limit(resPerPage).skip(skip)
    return this;
    //limit has to do with d number of posts we wan to return
    //skip is for skiping d first result and return d next 4 



}

}


// /\b relevance expression, google it 
//el stands for element

module.exports = APIFeatures

// "i " it means case insensitive... google it

// this.queryStr is = req.body
// and this.queryStr.keyword is the keyword we are searching eg apple
