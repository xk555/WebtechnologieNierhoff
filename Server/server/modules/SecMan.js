/*
Diese Datei stellt folgende REST api's zur verfügung:

    POST /api/section
        Input Parameter:
            name -> String
            relevant_tags -> String Array
            parent_id -> ObjectID
            dozent_id -> ObjectID Array
            user -> String //Name of an admin user
            token -> String //token of an admin user

        Return:
            Jep or Nope
*/
const ff = require('./FunnyFunctions')
const logger = require('./Logger')
const SectionDB = require('../DB_Module/DB_Connection_Storage').SectionDB

module.exports = app => {
    app.post("/api/section", (req, res) => {
        if(req.body.name !== undefined && req.body.relevant_tags !== undefined && req.body.parent_id !== undefined && req.body.dozent_id && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateAdminSession(req.body.user , req.body.token).then(admin => {
                if(admin) {
                    SectionDB.postData({
                        name: req.body.name,
                        revelant_tags: req.body.relevant_tags,
                        dozent_id: req.body.dozent_id,
                        parent_id: req.body.parent_id
                    })
                    res.send("Jep")
                    logger.sendDebug("[SECMAN][POST /api/section] User: " + req.body.user + " added Section: " + req.body.name + ".")
                } else {
                    res.send("Nope")
                    logger.sendDebug("[SECMAN][POST /api/section] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[SECMAN][POST /api/section] called without required parameters.")
        }
    })
}