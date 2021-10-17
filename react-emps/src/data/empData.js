export  const empData=()=> {

  return {

  "empCols": [ 
    {
      "col-header": "Emp Name",
      "text": "Emp Name"
    },
    {
      "col-header": "Mobile",
      "text": "Mobile"
    },
    {
      "col-header": "Position",
      "text": "Position"
    },
    {
      "col-header": "Dept",
      "text": "Dept"
    },
    {
      "col-header": "Sal",
      "text": "Sal"
    },
    {
      "col-header": "Status",
      "text": "Status"
    },
    {
      "col-header": "Role",
      "text": "Role"
    },
    {
      "col-header": "Email",
      "text": "Email"
    }
  ],
  "adminCols": [ 
    {
      "col-header": "Send Email",
      "text": "Send Email"
    },
	{
      "col-header": "Email Confirmed?",
      "text": "Email Confirmed?"
    },
	{
      "col-header": "Emp ID",
      "text": "Emp ID"
    },
	{
      "col-header": "Emp Name",
      "text": "Emp Name"
    },
    {
      "col-header": "Mobile",
      "text": "Mobile"
    },
    {
      "col-header": "Position",
      "text": "Position"
    },
    {
      "col-header": "Dept",
      "text": "Dept"
    },
    {
      "col-header": "Sal",
      "text": "Sal"
    },
    {
      "col-header": "Status",
      "text": "Status"
    },
    {
      "col-header": "Role",
      "text": "Role"
    },
    {
      "col-header": "Email",
      "text": "Email"
    }
  ],
  "superAdminCols": [ 
    {
      "col-header": "Role",
      "text": "Role"
    },
    {
      "col-header": "Name",
      "text": "Name"
    },
    {
      "col-header": "Upload Xls",
      "text": "Upload Xls"
    },
    {
      "col-header": "Emps in Dbase",
      "text": "Emps in Dbase"
    }
  ],
  "superAdminDataArr":[
    {"Role":"Super - Admin","Name":"Admin","Upload Xls":"Upload Xls","Emps in Dbase":"Emps in Dbase"}
  ],
  "superAdminConfigArr":
  [
    {
      "Role":"",
      "Name":"",
      "Upload Xls":[{"type":"LinkControl", "valText":"Upload Xls", "onClick":"/upload"}],
      "Emps in Dbase":[
                        {"type":"ButtonControl", "valText":"Emps 0-Refresh", "onClick":"showMsg"},
                        {"type":"ButtonControl", "valText":"Emps-List", "onClick":"showMsg"}           
      ]
    }
  ]

  }
  
}


export default empData;
