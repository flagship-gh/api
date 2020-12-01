const applyPagination = model => condition => (skip, limit) =>
  model
    .find(condition)
    .skip(skip)
    .limit(limit)
    .sort({ updatedAt: -1 });

module.exports = applyPagination;
