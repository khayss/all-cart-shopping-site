export const catchError = (controllerFunc) => async (req, res, next) => {
  try {
    await controllerFunc(req, res);
  } catch (error) {
    next(error);
  }
};
