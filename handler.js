const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "NoteNestTagsTable";

const response = (statusCode, body) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

module.exports.tags = async (event) => {
    const { httpMethod, pathParameters, body } = event;

    switch (httpMethod) {
        case "POST":
            if (!body) return response(400, { message: "Missing body" });
            return createTag(JSON.parse(body));
        case "GET":
            if (pathParameters) {
                return getTag(pathParameters.id);
            }
            return getAllTags();
        case "DELETE":
            return deleteTag(pathParameters.id);
        default:
            return response(400, { message: "Unsupported route" });
    }
};

const createTag = async (data) => {
    const tag = {
        id: uuidv4(),
        name: data.name,
        createdAt: new Date().toISOString(),
    };

    await dynamodb.put({
        TableName: TABLE_NAME,
        Item: tag,
    }).promise();

    return response(201, tag);
};

const getTag = async (id) => {
    const result = await dynamodb.get({
        TableName: TABLE_NAME,
        Key: { id },
    }).promise();

    if (!result.Item) {
        return response(404, { message: "Tag not found" });
    }

    return response(200, result.Item);
};

const getAllTags = async () => {
    const result = await dynamodb.scan({
        TableName: TABLE_NAME,
    }).promise();

    return response(200, result.Items);
};

const deleteTag = async (id) => {
    await dynamodb.delete({
        TableName: TABLE_NAME,
        Key: { id },
        ConditionExpression: "attribute_exists(id)",
    }).promise();

    return response(200, { message: "Tag deleted", id });
};