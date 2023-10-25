import { Route } from "react-router-dom";
import Home from "../../page/Home/home";
import AppRoutes from "../../Routes";

function PageContent(){
    return(
        <AppRoutes/>
    );
}

// function Path(){
//     if(PageContent() === <Route path='/' element={<Home/>}></Route>) {
//         return ('/');
//     }
//     else {
//         return ('');
//     }
// }

export {
    PageContent
} 