"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeNoteHandler = void 0;
class DateRangeNoteHandler {
    typeName() {
        return "date-range";
    }
    typeDisplayName() {
        return "date range entry";
    }
    render(note) {
        return {
            ...note,
            renderedContent: note.content,
        };
    }
}
exports.DateRangeNoteHandler = DateRangeNoteHandler;
//# sourceMappingURL=date-range-handler.js.map