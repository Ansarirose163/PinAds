exports.handler = async function(event) {
  const { deviceId } = event.queryStringParameters;

  if (deviceId === "eaf400fd0094fc9f") {
    return {
      statusCode: 200,
      body: JSON.stringify({ verified: true })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ verified: false })
  };
};
