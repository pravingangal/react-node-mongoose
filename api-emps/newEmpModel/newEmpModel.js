class newEmp {
  constructor() {
    this.EmpRecord = {
      id: 0,
      name: "",
      mob: "",
      position: "",
      dept: "",
      sal: 0,
      status: "",
      role: "",
      email: "",
      confirmationToken:"",
      emailErr:"",
      emailInfo:""

    };
  }

  createRecord(row) {
    
    Object.keys(this.EmpRecord).map((val, index) => {

      if (
        val === "email" &&
        Object.keys(row.getCell(index + 1).value).includes("text")
      ) {
        //takes care of email saved as href in xls
        this.EmpRecord[val] = row.getCell(index + 1).value["text"];
      } else this.EmpRecord[val] = row.getCell(index + 1).value;

      if (val === "emailErr"  || val === "emailInfo") this.EmpRecord[val] = null;

    });

   

    return this.EmpRecord;
  }
}
export default newEmp;
