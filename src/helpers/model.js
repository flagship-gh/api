const lodash = require("lodash");

function GenerateQuery(query) {
  let {
    dateRange,
    dateField = "createdAt",
    search,
    searchFields = ["name", "code"],
    order = "ascending",
    orderBy = "createdAt",
    fields = [],
    pagination = {
      skip: 0,
      limit: 0,
    },
    ...filter
  } = query;

  let _filter = { ...filter };

  if (search) {
    if (searchFields.length > 1) {
      _filter["$or"] = lodash.map(searchFields, function (field) {
        return {
          [field]: new RegExp(search, "i"),
        };
      });
    } else {
      _filter[searchFields[0]] = new RegExp(search, "i");
    }
  }
  if (dateRange) {
    _filter[dateField] = {
      $gte: new Date(new Date(dateRange.startDate).setHours(0, 0, 0, 0)),
      $lte: new Date(new Date(dateRange.endDate).setHours(23, 59, 59, 999)),
    };
  }
  let _sort = { [orderBy]: order };
  let _select = lodash.join(fields, " ");

  return {
    filter: _filter,
    sort: _sort,
    select: _select,
    skip: pagination.skip,
    limit: pagination.limit,
  };
}

function GetFields(_model) {
  return lodash
    .chain(_model.schema.paths)
    .keys()
    .filter(function (field) {
      return !lodash.includes(["_id", "__v", "__t"], field);
    })
    .value();
}

module.exports = {
  GenerateQuery,
  GetFields,
};
