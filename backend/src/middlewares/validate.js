export const validate = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!parsed.success) {
    return next(parsed.error);
  }

  req.body = parsed.data.body;
  req.params = parsed.data.params;
  req.validated = parsed.data;

  if (req.query && typeof req.query === "object") {
    Object.assign(req.query, parsed.data.query);
  }

  return next();
};
