import axios from 'axios'
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
      }
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
