"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeController = void 0;
const date_range_handler_1 = require("../../../registries/note-types/date-range-handler");
const note_controller_1 = require("../note-controller");
class DateRangeController extends note_controller_1.NoteController {
    constructor() {
        super(...arguments);
        this.dateRangeHandler = new date_range_handler_1.DateRangeNoteHandler();
    }
    mapRequestToNewEntity(username, form) {
        return this.dateRangeHandler.mapRequestToNewEntity(username, form);
    }
}
exports.DateRangeController = DateRangeController;
//# sourceMappingURL=date-range-controller.js.map