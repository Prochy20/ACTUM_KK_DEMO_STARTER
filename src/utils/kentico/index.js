const { createManagementClient } = require('@kentico/kontent-management');

const { KONTENT } = require('../../config');

const client = createManagementClient({
    projectId: KONTENT.PROJECT_ID,
    subscriptionId: KONTENT.SUBSCRIPTION_ID,
    apiKey: KONTENT.MANAGEMENT_API,
});

async function getEnvironments(projectID) {
    const { data: result } = await client.listSubscriptionProjects().toPromise();
    const [project] = result.items.filter((item) => item.id === projectID);
    return {
        environments: project.environments,
        maxAmmount: KONTENT.ENV_LIMIT,
        freeSlots: KONTENT.ENV_LIMIT - project.environments.length,
    };
}

const wait = async (ms = 1000) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

async function poll(fn, fnCondition, ms) {
    let result = await fn();
    while (fnCondition(result)) {
        // eslint-disable-next-line no-await-in-loop
        await wait(ms);
        // eslint-disable-next-line no-await-in-loop
        result = await fn();
    }
    return result;
}

async function createEnvironment(sourceProjectId, sourceApiKey, name) {
    const { data } = await client
        .cloneEnvironment()
        .withData({
            name,
        })
        .toPromise();

    /**
     * TODO: Figure out how to get this information about new environment without using a client
     */

    // await poll(
    //     () => client.getEnvironmentCloningState().toPromise(),
    //     (result) => result.data.cloningInfo.cloningState !== 'done',
    //     3000,
    // );
};

module.exports = {
    getEnvironments,
    createEnvironment,
};
