import { PersonalDateRangeNoteHandler } from "./../../src/registries/note-types/personal-date-range-handler";

describe("PersonalDateRangeNoteHandler handler", () => {
  const h = new PersonalDateRangeNoteHandler();
  it("should map to entity with 'personal-date-range' type", () => {
    let entity = h.mapRequestToNewEntity("user1", {});
    expect(entity.type.type).toBe("personal-date-range");
    entity = h.mapRequestToExistingEntity("user1", entity, {});
    expect(entity.type.type).toBe("personal-date-range");
  });
});
