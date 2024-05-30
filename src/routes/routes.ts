import SignIn from "../components/Content/Accounts/SignIn";
import Generator from "../components/Content/Generator/Generator";

export const routes = {
    accounts: {
        path: `/accounts`,
        element: SignIn
    },
    generator: {
        path: `/`,
        element: Generator
    }
}