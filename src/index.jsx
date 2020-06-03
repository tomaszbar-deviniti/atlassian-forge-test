import ForgeUI, {
    render,
    Fragment,
    Form,
    Text,
    IssuePanel,
    Button,
    useState,
    Select,
    useAction, Option, useProductContext, useConfig
} from '@forge/ui';
import {getAnyPage, getConfluenceInfo, getJiraIssue, getLoggedUserInfo} from "./HttpService";

const App = () => {

    const context = useProductContext();
    const config = useConfig();


    return (
        <Fragment>
            <UserInfo dupa={"dupa"}/>
            <IssuesInfo/>
            <ConfluenceSpaces/>
            <AnyPage/>
            <Text>{
                JSON.stringify(context)
            }</Text>
            <Text>
                text
                {
                    JSON.stringify(config)
                }</Text>
        </Fragment>
    );
};

const IssuesInfo = () => {
    const [selectedIssue, setSelectedIssue] = useState("")

    return <Fragment>
        <Form submitButtonText={"Pobierz issue"} onSubmit={(value) => {
            const jiraIssue = getJiraIssue(value.issueKey);
            setSelectedIssue(jiraIssue)
        }}>
            <Select name={"issueKey"} label={"Issues"}>
                <Option defaultSelected label="AT-1" value="AT-1"/>
                <Option label="AT-2" value="AT-2"/>
                <Option label="AT-4" value="AT-3"/>
            </Select>
        </Form>
        {
            selectedIssue && <Text>
                {selectedIssue}
            </Text>
        }
    </Fragment>
}

const UserInfo = (props) => {

    const [userInfo, setUserInfo] = useState("");


    return <Fragment>
        <Text>Hello world! This is awsome!</Text>
        <Text>{
            props.dupa
        }</Text>
        {
            userInfo && <Text>
                User:
                {
                    userInfo
                }
            </Text>
        }
        <Button text={"Pobierz info o userze"} onClick={
            () => {
                const userInfo = getLoggedUserInfo()
                setUserInfo(userInfo)
            }
        }/>
    </Fragment>

}

const ConfluenceSpaces = () => {
    const [confluenceSpaces, setConfluenceSpaces] = useState("");

    return <Fragment>
        <Button text={"Pobierz Confluence Spaces"} onClick={
            () => {
                const spaces = getConfluenceInfo()
                setConfluenceSpaces(spaces)
            }
        }/>
        <Text>{
            confluenceSpaces
        }</Text>

    </Fragment>
}

const AnyPage = () => {
    const [page, setPageText] = useState("");

    return <Fragment>
        <Button text={"Pobiesz stronę"} onClick={
            () => {
                const page = getAnyPage('https://www.google.com/')
                setPageText(page)
            }
        }/>
        <Text>{
            page
        }</Text>
    </Fragment>
}

const StoreValueInIssue = () => {

}

export const run = render(
    <IssuePanel>
        <App/>
    </IssuePanel>
);