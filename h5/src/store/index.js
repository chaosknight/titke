import axios from 'axios'


var contain = function(ary,key,value) {
  for(var i=0;i<ary.length;i++) {
    if(ary[i][key] == value) {
      return i;
    }
  }
  return -1;
};

export default {
    state: {
        d_complatyname:'',
        d_unit:'',
        all_schools:[],
        all_p_names:[],
        all_companys:[],
        all_units:[],
        all_notes:[]
    },
    mutations: {
        LOADSETTING:(state,data)=>{
          if(data.settings) {
            if(data.settings.d_complatyname) {
              state.d_complatyname = data.settings.d_complatyname;
            }
            if(data.settings.d_unit) {
              state.d_unit = data.settings.d_unit;
            }
          }

          if(data.all_schools) {
            state.all_schools = data.all_schools;
          }

          if(data.all_p_names) {
            state.all_p_names = data.all_p_names;
          }

          if(data.all_companys) {
            state.all_companys = data.all_companys;
          }

          if(data.all_units) {
            state.all_units = data.all_units;
          }

          if(data.all_notes) {
            state.all_notes = data.all_notes;
          }
        },




        SET_D_C_NAME(state,name) {
          state.d_complatyname = name;
        },
        SET_D_UNIT(state,unit) {
          state.d_unit = unit;
        },
        DEL_SUG(state,obj) {
          var index
          switch (obj.type) {
            case "product":
              index = contain(state.all_p_names,"value",obj.value)
              if(index!= -1) {
                state.all_p_names.splice(index,1)
              }
              break;
            case "unit":
              index = contain(state.all_units,"value",obj.value)
              if(index!= -1) {
                state.all_units.splice(index,1)
              }
              break;
            case "company":
              index = contain(state.all_companys,"value",obj.value)
              if(index!= -1) {
                state.all_companys.splice(index,1)
              }
              break;
            case "school":
              index = contain(state.all_schools,"value",obj.value)
              if(index!= -1) {
                state.all_schools.splice(index,1)
              }
              break;
            case "note":
              index = contain(state.all_notes,"value",obj.value)
              if(index!= -1) {
                state.all_notes.splice(index,1)
              }
              break;
            default:
          }
        },
        SAVE_SUG(state,obj) {
          var index
          switch (obj.type) {
            case "product":
              index = contain(state.all_p_names,"value",obj.value)
              if(index== -1) {
                state.all_p_names.push({_id:obj.value,value:obj.value})
              }
              break;
            case "unit":
              index = contain(state.all_units,"value",obj.value)
              if(index== -1) {
                state.all_units.push({_id:obj.value,value:obj.value})
              }
              break;
            case "company":
              index = contain(state.all_companys,"value",obj.value)
              if(index== -1) {
                state.all_companys.push({_id:obj.value,value:obj.value})
              }
              break;
            case "school":
              index = contain(state.all_schools,"value",obj.value)
              if(index== -1) {
                state.all_schools.push({_id:obj.value,value:obj.value})
              }
              break;
            case "note":
              index = contain(state.all_notes,"value",obj.value)
              if(index== -1) {
                state.all_notes.push({_id:obj.value,value:obj.value})
              }
              break;
            default:
          }
        }


    },
    actions: {
      loadsetting:(ctx, params) =>{
        axios.get('/api/settingconfig').then((res)=>{
          if(res.data) {
            ctx.commit('LOADSETTING', res.data);
          }
        });
      },
      setcomplayname:({ commit }, name) => {
          commit('SET_D_C_NAME', name);
      },
      setdunit:({ commit }, unit)=> {
          commit('SET_D_UNIT', unit);
      },

      del_sug:({ commit },type)=> {
          commit('DEL_SUG', type);
      },

      save_sug:({ commit },type)=> {
          commit('SAVE_SUG', type);
      },


    },
    getters: {
        getdunit: (state) => state.d_unit,
        getdcomplayname: (state) => state.d_complatyname,
        getAllschools:(state)=>state.all_schools,
        getAllpnames:(state)=>state.all_p_names,
        getAllcompanys:(state)=>state.all_companys,
        getAllunits:(state)=>state.all_units,
        getAllnotes:(state)=>state.all_notes
    }
}
