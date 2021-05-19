var context;

if (!process.env.GITHUB_ACTIONS){
    require('dotenv').config()
    context = require('../payload/push.json');
} else {
    context = require('@actions/github').context;
}

module.exports = context;