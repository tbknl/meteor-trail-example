if (Meteor.isClient) {

    var getMessageAndLevel = function(template) {
        return {
            msg: template.find('.js-msg').value,
            level: template.find('.js-level').value
        };
    };

    Template.generate.events({
        'click .js-btn-server': function (event, template) {
            var msgAndLevel = getMessageAndLevel(template);
            Meteor.apply('serverSideLog', [msgAndLevel.level, msgAndLevel.msg]);
        },
        'click .js-btn-client': function (event, template) {
            var msgAndLevel = getMessageAndLevel(template);
            Meteor.log.logMessage(msgAndLevel.level, msgAndLevel.msg);
        }
    });
}

if (Meteor.isServer) {
  Meteor.methods({
    'serverSideLog': function(level, msg, meta) {
        Meteor.log.logMessage(level, msg, meta);
    }
  });
}
