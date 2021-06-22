import Axios from "axios";

const loginUrl = "http://localhost:3001/auth";

export default {
      namespaced: true,

      state: {
            authenticated: false,
      },
      
      mutations: {
            setAuthenticate(state) {
                  state.authenticated = true;
            }
      },
      actions :{
            async authenticate(context, credentials) {
                  let response = await Axios.post(loginUrl, credentials);
                  if (response.data.success == true) {
                        context.commit("setAuthenticate")
                  }
            }
      },
};