import ShellBuilder from "../components/Admin/Mains/Builder/ShellBuilder.jsx";
import MainBuilder from "../components/Admin/Mains/Builder/MainBuilder.jsx";
import BuilderContextProvider from "../components/Admin/Mains/Builder/Context/BuilderContextProvider.jsx";


const BuilderPage = () => {
    return (
        <BuilderContextProvider>
            <ShellBuilder>
                <MainBuilder/>
            </ShellBuilder>
        </BuilderContextProvider>
    )
}

export default BuilderPage