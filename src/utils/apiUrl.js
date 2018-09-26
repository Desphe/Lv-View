const host='http://192.168.1.102:8080/'

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
  systemManage:{
    loadUserSplitData:`${host}api/User/LoadSplitData`,
    getUserDetail:`${host}api/User/GetUserDetail`,
    editUserData:`${host}api/User/EditUserData`,
    changeUserState:`${host}api/User/ChangeUserState`,

    loadRoleSplitData:`${host}api/Role/LoadSplitData`,
    getRoleDetail:`${host}api/Role/GetDetail`,
    editRoleDetail:`${host}api/Role/EditRoleDetail`,
    deleteRoleByIds:`${host}api/Role/DeleteRoleByIds`,

    getLanguageColumnsConfig:`${host}api/Language/GetColums`,
    loadLanguageSplitData:`${host}api/Language/LoadSplitData`,
    loadLanguageDetail:`${host}api/Language/LoadDetail`,
    editLanguage:`${host}api/Language/EditLanguage`,
    loadLanguageList:`${host}api/Language/GetLanguageList`,

    loadModuleSplitData:`${host}api/Module/LoadSplitData`,
    loadButtonSplitData:`${host}api/Buttons/LoadSplitData`,

    loadSplitData:`${host}api/`,
  }
}

export default apiUrl;
