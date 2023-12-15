import { redirect } from "react-router-dom";

export const AuthHandler = () => {


  const AuthAdmin = async () => {

    const token = localStorage.getItem('token');

    if(!token){
      return redirect(`/admin/login`);
    }
    else {

      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = (new Date(tokenData.exp * 1000)).getTime() ;
      const timeOut: number = (expirationTime - (new Date()).getTime()) / 1000; 
      
      if( timeOut  < 0){
        return redirect(`/admin/login`);
      }

      return null;
    } 
  }

  const AuthSite = async () => {

    const token = localStorage.getItem('token');


    if(!token){
      return redirect(`/login`);
    }
    else {

      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = (new Date(tokenData.exp * 1000)).getTime() ;
      const timeOut: number = (expirationTime - (new Date()).getTime()) / 1000; 
      
      if( timeOut  < 0){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return redirect(`/login`);
      }

      return null;
    } 
  }

  return {
    AuthAdmin,
    AuthSite
  }
}
