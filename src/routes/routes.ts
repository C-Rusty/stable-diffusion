import SignIn from "../components/Content/signIn/SignIn";
import Generator from "../components/Content/generator/Generator";

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