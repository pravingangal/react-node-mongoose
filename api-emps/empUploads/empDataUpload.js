import * as Excel from "exceljs";
import empModel from "../empModel/empModel";
import newEmp from "../newEmpModel/newEmpModel";

function empDataUpload(msgSocket) {

  msgSocket.on("message", (data) => {
    
    const workbook = new Excel.Workbook();
    let emptyCellFlag = false;

    workbook.xlsx
      .readFile("empUploads/empsData.xlsx")
      .then(function () {
        const worksheet = workbook.getWorksheet(1); //can also use worksheet name insted of number

        msgSocket.emit("FromEMPAPI", "XLS File upload to MongoDB Initiated..");

        const actualRowCount = worksheet.actualRowCount;
        let empRecordsSaved = 0,
          empRcdsUpPercent = 0;

        let rowsIterated = 0;
        let _newEmp = new newEmp();
        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
          emptyCellFlag = false;
          rowsIterated++; //empty rows not included

          row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
            //colnumber 12 is error column

            if (colNumber !== 12 && cell.value == null && !emptyCellFlag) {
              emptyCellFlag = true;

              row.getCell(12).value = "Error..Row Not Saved";
              workbook.xlsx
                .writeFile("empUploads/empsData.xlsx")
                .then((val) => {//console.log("Written to xls....");
				}
				).catch((err) => {
                 
                  msgSocket.emit(
                    "FromEMPAPI_Err",
                    "Err Writting to xls/XLS File Locked ...."
                  );
                });
            } else {
              //first non empty row is column title row
              //colNumber 9 is email column

              if (rowsIterated > 1 && !emptyCellFlag && colNumber === 9) {
                const newEmpRecord = new empModel(_newEmp.createRecord(row));
                //default password...to be reset by emp
                
                newEmpRecord.encryptPassword(process.env.DB_DEFAULT_PASS);

                newEmpRecord
                  .save()
                  .then((empRecord) => {
                    
                    msgSocket.emit(
                      "FromEMPAPI",
                      "New Emp Record Saved to MongoDB..."
                    );
                    empRecordsSaved++;
                    empRcdsUpPercent = (100 * empRecordsSaved) / actualRowCount;
                    msgSocket.emit(
                      "FromEMPAPI_Percent",
                      "Records Saved/Total...Nos.." +
                        empRecordsSaved +
                        "/" +
                        actualRowCount +
                        "...%.." +
                        empRcdsUpPercent
                    );
                  })
                  .catch((err) => {
                    msgSocket.emit(
                      "FromEMPAPI_Err",
                      "Error while saving newEmp Record$$..." + err
                    );
                    row.getCell(12).value =
                      "MongoError/Duplicate Data..Row Not Saved";
                    workbook.xlsx
                      .writeFile("empUploads/empsData.xlsx")
                      .then((val) => {
						  //console.log("Written to xls...");
					  }
					  ).catch((err) => {
                        
                        msgSocket.emit(
                          "FromEMPAPI_Err",
                          "Err Writting to xls/XLS File Locked...."
                        );
                      });
                  });
              }
            }
          });
        });
      })
      .catch((err) => {
        msgSocket.emit("FromEMPAPI_Err", "Error reading XLS File..." + err);
      });
  });//******** */


  msgSocket.on("disconnect", (data) => {
    msgSocket.emit("FromEMPAPI_Err", "Server diconnected..." + data);
  });

  return true;
} 

export default empDataUpload;

