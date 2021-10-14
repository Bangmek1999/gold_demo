const { model } = require("mongoose");
module.exports = {
  env: {
    MONGO_URI:
      "mongodb+srv://benz:zxcv1234@goldprojecttest.k6iqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    // NODE_ENV: "production",
    SECRET_COOKIE_PASSWORD: "2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8",
    // SECRET_COOKIE_PASSWORD: "prj_AbaaWUgUxnaVo2UvOgUCZ8Zv0ZYF",

  },
  webpack: function (c) {
    if (c.resolve.alias) {
      delete c.resolve.alias["react"];
      delete c.resolve.alias["react-dom"];
    }
    return c;
  },
};

