class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        //1) Filtering
        const queryObj = {...this.queryString};
        const excludedField = ['page', 'sort', 'limit', 'field'];
        excludedField.forEach(el => delete queryObj[el]);

        //2) Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if(this.queryString.sort){
            // query = query.sort(req.query.sort); // Single sort

            const sortBy = this.queryString.sort.split(',').join(' ');//joing two sort together
            this.query = this.query.sort(sortBy);
        }else{
            //if user doesn't sort then it should sort by date desc order - means desc
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    limit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v'); //minus here works for excluding a data to be send to the client
        }

        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;  // minus one from the current page requested for

        this.query = this.query.skip(skip).limit(limit);

        // if (this.queryString.page) {
        //     const numTour = await Tour.countDocuments();
        //     if(skip > numTour) throw new Error('This page does not exist');  //Not useful
        // }

        return this;
    }
}

module.exports = APIFeatures;