export const errorHandler = async (error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    sucess: false,
    message: "an error occured processing the request. Please try again later.",
    error: error.message ? error.message : "something went wrong",
  });
};
