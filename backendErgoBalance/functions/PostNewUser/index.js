const { errorHandler } = require('../../middlewares/errorHandler')
const { validateKey } = require('../../middlewares/validateKey')
const {validateNewUser} = require('../../middlewares/validateNewUser')
const {sendResponse} = require('../../responses/index')
const middy = require('@middy/core')
const { db } = require('../../services/index')
const { hashPassword } = require('../../utils/index')

