const host='http://111.231.145.121:8080/'

const apiUrl = {
  host,
  commonBuild:{
    /* ====================表格==================== */
    loadTbConfig:`${host}api/TableBuild/LoadTbConfig`,
    loadTbSpiltData:`${host}api/TableBuild/LoadSplitData`,
    /* ====================表单==================== */
    loadFormConfig:`${host}api/FormBuild/LoadFormConfig`,
    loadFormData:`${host}api/FormBuild/LoadFormData`,
    deleteFormData:`${host}api/FormBuild/DeleteFormDataByIds`,
    updateFormData:`${host}api/FormBuild/UpdateFormData`,
  },
}

export default apiUrl;
