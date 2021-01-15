const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  //////CONSTRUCTOR: CHECK FOR USER STORAGE FILE OR CREATE///////////
  constructor(filename) { //filename of the users storage
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }
    this.filename = filename;
    //can't use async functions in a constructor
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]')
    }
  }
  //////RETURN USERS REPOSITORY//////
  async getAll() {
    //open this.filename, read and parse contents, return parsed data
    return JSON.parse(await fs.promises.readFile(this.filename,{encoding:'utf8'}));
  };
  ///////CREATE A USER WITH RANDOM ID///////////
  async create(attrs) {
    attrs.id = this.randomId();
    //attrs: object with attributes of user
    const records = await this.getAll();
    records.push(attrs);
    //save to file
    await this.writeAll(records);
  };
  ///////WRITE RECORDS TO FILENAME HELPER METHOD////////
  async writeAll(records) {
    // write the updated 'records' array back to this.filename in JSON
    //stringify(data,function,indentationLevel)
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  };
  //////CREATE RANDOM ID HELPER METHOD/////
  randomId() {
    // using crypto to create random ID
    return crypto.randomBytes(4).toString('hex');
  };
  //////GET SINGLE USER BY ID///////
  async getOne(id) {
    const records = await this.getAll();
    return records.find(record=>record.id===id);
  };
  //////DELETE USER///////
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record=>record.id!==id);
    await this.writeAll(filteredRecords);
  };
  /////UPDATE USER//////
  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id===id);
    if (!record) {
      throw new Error(`Record with id of ${id} not found`);
    }
    Object.assign(record, attrs); //javascript built-in method
    await this.writeAll(records);
  };
  /////FILTER//////
  async getOneBy(filters) { // filters passed as an object
    const records = await this.getAll();
    for(let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key]!==filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}

// const test = async () => {
//   const repo = new UsersRepository('users.json');
//   const user = await repo.getOneBy({email:'test@test.com'})
//   console.log(user)
// };
// test();

module.exports = new UsersRepository('users.json');
