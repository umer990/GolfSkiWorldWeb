'use strict';
var api = "http://backend.golfskiworld.com/admin/api";
//export var GOLFCOURSE_URL='http://test.golfskiworld.com/admin/api'+'/adventure/golf';
exports.GOLFCOURSE_URL = api + '/adventure/golf';
exports.SKICOURSE_URL = api + '/adventure/ski';
exports.Destination = api + "/adventure/destination";
exports.DEALS_URL = api + '/adventure/deal';
exports.DEALS_INDEX_URL = api + '/adventure/deals/1';
exports.LASTMINUTES_URL = api + '/adventure/lastminute';
exports.LASTMINUTES_INDEX_URL = api + '/adventure/lastminutes/1';
exports.S3_URL = 'https://s3-ap-southeast-1.amazonaws.com/aws.golfskiworld.bucket';
//# sourceMappingURL=constants.js.map