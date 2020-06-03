import api from "@forge/api"

export const getLoggedUserInfo = async () => {

    const apiResponsePromise = await api
        .asApp()
        .requestJira(`/rest/api/3/myself`);

    const json = await apiResponsePromise.json();
    return json.displayName
}

export const getJiraIssue = async (issueKey) => {
    let result = {}
    try {
        const apiResponsePromise = await api
            .asApp()
            .requestJira(`/rest/api/3/issue/${issueKey}`);
        result = await apiResponsePromise.json()
    } catch (e) {
        console.error(e)
    }

    return JSON.stringify(result);
}

export async function getConfluenceInfo() {
    const response = await api
        .asApp()
        .requestConfluence(`/wiki/rest/api/space`);

    const json = await response.json();
    return JSON.stringify(json);
}

export async function getAnyPage(url) {
    const response = await api.fetch(url);
    return response.text()
}

