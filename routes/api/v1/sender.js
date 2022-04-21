const sender = async (req, res) => {
  await cacheData(req.cacheKey, data);

  try {
    await res.status(200).contentType("application/json").send(data);
    console.log(`GET ${req.originalUrl}`);
  } catch (error) {
    await res.status(404).send(error);
    console.error(`GET ${req.originalUrl} "Failed to respond"`);
  }
};
